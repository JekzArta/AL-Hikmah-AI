/** Tes klien embedding dengan REKAMAN respons asli (record/replay): gratis, tanpa internet. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { embedDalil, hashEmbed, teksUntukEmbed } from "../core/ingest/embed.js";
import { muat } from "../core/ingest/muat.js";
import { BatasBiayaTerlampaui, PencatatBiaya } from "../core/klien/biaya.js";
import { KlienOpenRouter, type Fetch } from "../core/klien/openrouter.js";
import { RepositoriMemori } from "../core/repositori/memori.js";
import { bacaFolder } from "../cli/baca-data.js";

const rekaman = JSON.parse(readFileSync("tests/fixtures/rekaman/embeddings-qwen3-8b.json", "utf8"));

/** fetch palsu: memutar bentuk respons rekaman, dengan vektor 3 dimensi per input. */
function fetchPalsu(hitung: { n: number }, kunciDicek?: string): Fetch {
  return (async (_url: string, init: RequestInit) => {
    hitung.n++;
    if (kunciDicek) expect(String((init.headers as Record<string, string>).Authorization)).toBe(`Bearer ${kunciDicek}`);
    const body = JSON.parse(String(init.body));
    const input: string[] = Array.isArray(body.input) ? body.input : [body.input];
    const resp = structuredClone(rekaman.response);
    resp.data = input.map((t, i) => ({ object: "embedding", index: i, embedding: [t.length, 1, i] }));
    return new Response(JSON.stringify(resp), { status: 200 });
  }) as unknown as Fetch;
}

describe("klien embedding (rekaman)", () => {
  it("mengurai bentuk respons asli dan mencatat token + biaya dari usage.cost", async () => {
    const biaya = new PencatatBiaya(1);
    const k = new KlienOpenRouter({ kunci: "kunci-uji", biaya, fetch: fetchPalsu({ n: 0 }, "kunci-uji") });
    const h = await k.embed(["a", "bb"], "qwen/qwen3-embedding-8b", 3);
    expect(h.vektor).toEqual([[1, 1, 0], [2, 1, 1]]);
    expect(h.provider).toBe("DeepInfra");
    expect(biaya.totalToken).toBe(11);
    expect(biaya.totalUsd).toBeCloseTo(1.1e-7);
  });

  it("menolak vektor yang panjangnya tidak sesuai config", async () => {
    const k = new KlienOpenRouter({ kunci: "x", biaya: new PencatatBiaya(1), fetch: fetchPalsu({ n: 0 }) });
    await expect(k.embed(["a"], "m", 4096)).rejects.toThrow(/panjang 3, harusnya 4096/);
  });

  it("batas biaya per run: panggilan ditolak sebelum dikirim bila batas tercapai", async () => {
    const hitung = { n: 0 };
    const biaya = new PencatatBiaya(1e-7); // lebih kecil dari biaya satu panggilan rekaman
    const k = new KlienOpenRouter({ kunci: "x", biaya, fetch: fetchPalsu(hitung) });
    await k.embed(["a"], "m", 3);
    await expect(k.embed(["b"], "m", 3)).rejects.toBeInstanceOf(BatasBiayaTerlampaui);
    expect(hitung.n).toBe(1); // panggilan kedua tidak pernah dikirim
  });

  it("error HTTP tidak membocorkan kunci", async () => {
    const f = (async () => new Response("kunci-rahasia-123 salah", { status: 401 })) as unknown as Fetch;
    const k = new KlienOpenRouter({ kunci: "kunci-rahasia-123", biaya: new PencatatBiaya(1), fetch: f });
    const e = await k.embed(["a"], "m", 3).catch((x: Error) => x);
    expect(String(e)).not.toContain("kunci-rahasia-123");
    expect(String(e)).toContain("[DISENSOR]");
  });
});

describe("embedDalil", () => {
  it("teks yang di-embed = terjemahan + header_netral", () => {
    expect(teksUntukEmbed({ terjemahan: "t", header_netral: "h" })).toBe("t\nh");
    expect(teksUntukEmbed({ terjemahan: "t", header_netral: "" })).toBe("t");
  });

  it("cache: run kedua tidak memanggil API; teks berubah -> hanya baris itu di-embed ulang", async () => {
    const repo = new RepositoriMemori();
    await muat(repo, bacaFolder("data/dummy").data);
    const hitung = { n: 0 };
    const k = new KlienOpenRouter({ kunci: "x", biaya: new PencatatBiaya(1), fetch: fetchPalsu(hitung) });

    const r1 = await embedDalil(repo, k, "m", 3);
    expect(r1.diembed).toHaveLength(8);
    expect(hitung.n).toBe(1); // 8 teks dalam satu batch

    const r2 = await embedDalil(repo, k, "m", 3);
    expect(r2.diembed).toEqual([]);
    expect(hitung.n).toBe(1);

    const [d] = await repo.ambilDalil(["DUMMY-003"]);
    await repo.simpanDalil([{ ...d!, terjemahan: `${d!.terjemahan} (diubah)` }]);
    const r3 = await embedDalil(repo, k, "m", 3);
    expect(r3.diembed).toEqual(["DUMMY-003"]);
  });

  it("ganti model -> hash beda -> embed ulang semua", () => {
    expect(hashEmbed("a", 3, "t")).not.toBe(hashEmbed("b", 3, "t"));
    expect(hashEmbed("a", 3, "t")).not.toBe(hashEmbed("a", 4, "t"));
  });
});
