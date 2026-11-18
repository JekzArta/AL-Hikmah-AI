import { describe, expect, it } from "vitest";
import { RepositoriMemori } from "../core/repositori/memori.js";
import { dalilUji, sumberUji } from "./bantu.js";

describe("RepositoriMemori: buat, isi, baca, hapus", () => {
  it("siklus lengkap", async () => {
    const r = new RepositoriMemori();
    await r.simpanSumber([sumberUji]);
    await r.simpanDalil([dalilUji("DUMMY-001", "contoh wudhu"), dalilUji("DUMMY-002", "contoh puasa")]);
    expect(await r.ambilSemuaIdDalil()).toEqual(["DUMMY-001", "DUMMY-002"]);
    const [d] = await r.ambilDalil(["DUMMY-002"]);
    expect(d?.terjemahan).toBe("contoh puasa");
    await r.hapusDalil(["DUMMY-001"]);
    expect(await r.ambilSemuaIdDalil()).toEqual(["DUMMY-002"]);
  });

  it("upsert idempoten: simpan dua kali tidak menggandakan", async () => {
    const r = new RepositoriMemori();
    await r.simpanSumber([sumberUji]);
    await r.simpanDalil([dalilUji("DUMMY-001", "a")]);
    await r.simpanDalil([dalilUji("DUMMY-001", "b")]);
    expect(await r.ambilSemuaIdDalil()).toEqual(["DUMMY-001"]);
    expect((await r.ambilDalil(["DUMMY-001"]))[0]?.terjemahan).toBe("b");
  });

  it("menolak dalil yang sumbernya tidak ada (seperti foreign key)", async () => {
    const r = new RepositoriMemori();
    await expect(r.simpanDalil([dalilUji("DUMMY-001", "a")])).rejects.toThrow(/sumber/);
  });

  it("ambilDalil mengikuti urutan permintaan dan melewati ID tak dikenal", async () => {
    const r = new RepositoriMemori();
    await r.simpanSumber([sumberUji]);
    await r.simpanDalil([dalilUji("DUMMY-001", "a"), dalilUji("DUMMY-002", "b")]);
    expect((await r.ambilDalil(["DUMMY-002", "X", "DUMMY-001"])).map((d) => d.id)).toEqual(["DUMMY-002", "DUMMY-001"]);
  });

  it("embedding + cariEmbedding + hash cache", async () => {
    const r = new RepositoriMemori();
    await r.simpanSumber([sumberUji]);
    await r.simpanDalil([dalilUji("DUMMY-001", "a"), dalilUji("DUMMY-002", "b")]);
    await r.simpanEmbedding("DUMMY-001", { vektor: [1, 0], model: "m", hash: "h1" });
    await r.simpanEmbedding("DUMMY-002", { vektor: [0, 1], model: "m", hash: "h2" });
    expect((await r.cariEmbedding([1, 0.1], 2)).map((h) => h.id)).toEqual(["DUMMY-001", "DUMMY-002"]);
    expect(await r.hashEmbedding(["DUMMY-001", "X"])).toEqual(new Map([["DUMMY-001", "h1"], ["X", null]]));
  });
});

import { urlDasarSupabase } from "../core/repositori/supabase.js";
describe("urlDasarSupabase", () => {
  it("menerima alamat dasar maupun alamat REST lengkap", () => {
    expect(urlDasarSupabase("https://abc.supabase.co")).toBe("https://abc.supabase.co");
    expect(urlDasarSupabase("https://abc.supabase.co/rest/v1/")).toBe("https://abc.supabase.co");
    expect(urlDasarSupabase(" https://abc.supabase.co/ ")).toBe("https://abc.supabase.co");
  });
});
