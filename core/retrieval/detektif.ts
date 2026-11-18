/**
 * Detektif hybrid (spek §6.6). Analogi: dua detektif mencari bersama.
 *  - Detektif KATA (BM25 / ts_rank_cd): jago kalau kata di pertanyaan sama persis dengan di dalil.
 *  - Detektif MAKNA (embedding): jago kalau maksudnya mirip walau katanya beda ("kentut" vs "buang angin").
 * RRF menggabungkan dua daftar urutan mereka jadi satu daftar.
 * Keluaran HANYA ID + skor komponen (teks asli diambil belakangan lewat stempel).
 *
 * Multi-kueri (spek §6.5: pertanyaan utuh, masalah, glosarium) baru datang di Fase 2;
 * sekarang satu kueri = kalimat asli.
 */
import type { KlienOpenRouter } from "../klien/openrouter.js";
import type { Hit, Repositori } from "../repositori/tipe.js";
import { normalisasi } from "./normalisasi.js";
import { rrf, type KandidatRRF } from "./skor.js";

export type ModeCari = "hybrid" | "bm25" | "embedding" | "acak";

export interface OpsiDetektif {
  repo: Repositori;
  klien?: KlienOpenRouter; // wajib untuk mode embedding/hybrid
  modelEmbedding: string;
  dimensi: number;
  rrfK: number;
  jumlah: number; // jumlah_kandidat_detektif
  acak?: () => number; // untuk baseline acak (bisa diberi seed)
}

export interface HasilDetektif {
  kueriPolos: string;
  kandidat: KandidatRRF[];
  jalur: Record<string, Hit[]>;
}

/** Pembangkit acak dengan seed (mulberry32) supaya baseline acak bisa diulang persis. */
export function acakBerseed(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export async function cari(pertanyaan: string, mode: ModeCari, o: OpsiDetektif): Promise<HasilDetektif> {
  const kueriPolos = normalisasi(pertanyaan);
  const jalur: Record<string, Hit[]> = {};

  if (mode === "acak") {
    const ids = await o.repo.ambilSemuaIdDalil();
    const r = o.acak ?? Math.random;
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [ids[i], ids[j]] = [ids[j]!, ids[i]!];
    }
    jalur.acak = ids.slice(0, o.jumlah).map((id) => ({ id, skor: 0 }));
  }
  if (mode === "bm25" || mode === "hybrid") {
    jalur.bm25 = await o.repo.cariTeks(kueriPolos, o.jumlah);
  }
  if (mode === "embedding" || mode === "hybrid") {
    if (!o.klien) throw new Error("mode embedding/hybrid butuh klien OpenRouter");
    const h = await o.klien.embed([pertanyaan], o.modelEmbedding, o.dimensi, "embedding_kueri");
    jalur.emb = await o.repo.cariEmbedding(h.vektor[0]!, o.jumlah);
  }

  return { kueriPolos, kandidat: rrf(jalur, o.rrfK).slice(0, o.jumlah), jalur };
}
