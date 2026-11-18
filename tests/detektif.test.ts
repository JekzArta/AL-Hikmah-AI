import { describe, expect, it } from "vitest";
import { acakBerseed, cari } from "../core/retrieval/detektif.js";
import { PencatatBiaya } from "../core/klien/biaya.js";
import { KlienOpenRouter, type Fetch } from "../core/klien/openrouter.js";
import { RepositoriMemori } from "../core/repositori/memori.js";
import { dalilUji, sumberUji } from "./bantu.js";

async function repoUji() {
  const r = new RepositoriMemori();
  await r.simpanSumber([sumberUji]);
  await r.simpanDalil([
    dalilUji("DUMMY-001", "contoh wudhu dan buang angin"),
    dalilUji("DUMMY-002", "contoh puasa dan sikat gigi"),
    dalilUji("DUMMY-003", "contoh jual beli online"),
  ]);
  // embedding mainan 2 dimensi
  await r.simpanEmbedding("DUMMY-001", { vektor: [1, 0], model: "m", hash: "1" });
  await r.simpanEmbedding("DUMMY-002", { vektor: [0, 1], model: "m", hash: "2" });
  await r.simpanEmbedding("DUMMY-003", { vektor: [0.7, 0.7], model: "m", hash: "3" });
  return r;
}

// kueri apa pun di-embed jadi [1, 0.1] -> paling dekat DUMMY-001
const fetchPalsu = (async () =>
  new Response(JSON.stringify({ data: [{ index: 0, embedding: [1, 0.1] }], usage: { total_tokens: 3, cost: 0 } }))) as unknown as Fetch;

describe("detektif", () => {
  it("hybrid: menggabungkan BM25 + embedding lewat RRF dan menyimpan skor komponen", async () => {
    const repo = await repoUji();
    const klien = new KlienOpenRouter({ kunci: "x", biaya: new PencatatBiaya(1), fetch: fetchPalsu });
    const h = await cari("Wudhu terus KENTUT", "hybrid", { repo, klien, modelEmbedding: "m", dimensi: 2, rrfK: 60, jumlah: 20 });
    expect(h.kueriPolos).toBe("wudhu terus kentut");
    expect(h.kandidat[0]!.id).toBe("DUMMY-001"); // peringkat 1 di dua jalur
    expect(h.kandidat[0]!.rrf).toBeCloseTo(2 / 61, 12);
    expect(h.kandidat[0]!.komponen.bm25?.peringkat).toBe(1);
    expect(h.kandidat[0]!.komponen.emb?.peringkat).toBe(1);
  });

  it("bm25 saja tidak memanggil API embedding", async () => {
    const repo = await repoUji();
    const h = await cari("puasa", "bm25", { repo, modelEmbedding: "m", dimensi: 2, rrfK: 60, jumlah: 20 });
    expect(h.kandidat.map((c) => c.id)).toEqual(["DUMMY-002"]);
    expect(Object.keys(h.jalur)).toEqual(["bm25"]);
  });

  it("acak dengan seed: bisa diulang persis, dan berisi semua ID", async () => {
    const repo = await repoUji();
    const o = { repo, modelEmbedding: "m", dimensi: 2, rrfK: 60, jumlah: 20 };
    const a = await cari("x", "acak", { ...o, acak: acakBerseed(7) });
    const b = await cari("x", "acak", { ...o, acak: acakBerseed(7) });
    expect(a.kandidat.map((c) => c.id)).toEqual(b.kandidat.map((c) => c.id));
    expect([...a.kandidat.map((c) => c.id)].sort()).toEqual(["DUMMY-001", "DUMMY-002", "DUMMY-003"]);
  });
});
