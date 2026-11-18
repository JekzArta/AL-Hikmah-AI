/**
 * Fungsi skor murni (spek §6.6): cosine, BM25 sederhana (untuk adapter memori), RRF.
 * Semua deterministik dan punya tes dengan angka yang bisa dihitung tangan.
 */
import type { Hit } from "../repositori/tipe.js";

/** Kemiripan cosine: (a·b) / (|a| |b|). Vektor nol -> 0. */
export function cosine(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error(`panjang vektor beda: ${a.length} vs ${b.length}`);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i]!;
    const y = b[i]!;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/** Pemecah kata sederhana, meniru parser `simple` Postgres: huruf kecil, pisah di non-huruf/angka. */
export function tokenisasi(teks: string): string[] {
  return teks.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}

/**
 * BM25 (Okapi) klasik, dipakai adapter memori.
 * idf = ln(1 + (N - df + 0.5) / (df + 0.5))
 * skor = Σ idf * tf*(k1+1) / (tf + k1*(1 - b + b*|d|/avgdl))
 * Supabase memakai ts_rank_cd (bukan BM25 persis); RRF hanya memakai URUTAN, dampaknya diukur di ablation.
 */
export function bm25(
  dokumen: { id: string; teks: string }[],
  kueri: string,
  k1 = 1.2,
  b = 0.75,
): Hit[] {
  const N = dokumen.length;
  if (N === 0) return [];
  const tokDok = dokumen.map((d) => tokenisasi(d.teks));
  const avgdl = tokDok.reduce((s, t) => s + t.length, 0) / N || 1;
  const kataKueri = [...new Set(tokenisasi(kueri))];
  const df = new Map<string, number>();
  for (const kata of kataKueri) df.set(kata, tokDok.filter((t) => t.includes(kata)).length);

  const hasil: Hit[] = [];
  dokumen.forEach((d, i) => {
    const t = tokDok[i]!;
    let skor = 0;
    for (const kata of kataKueri) {
      const tf = t.filter((x) => x === kata).length;
      if (tf === 0) continue;
      const n = df.get(kata)!;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      skor += (idf * tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * t.length) / avgdl));
    }
    if (skor > 0) hasil.push({ id: d.id, skor });
  });
  return urutkan(hasil);
}

/** Urut skor menurun; seri dipecah dengan ID (supaya deterministik). */
export function urutkan(hit: Hit[]): Hit[] {
  return [...hit].sort((x, y) => y.skor - x.skor || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0));
}

export interface KandidatRRF {
  id: string;
  rrf: number;
  /** peringkat (mulai 1) dan skor mentah per jalur; undefined = tidak ditemukan jalur itu */
  komponen: Record<string, { peringkat: number; skor: number } | undefined>;
}

/**
 * Reciprocal Rank Fusion: rrf(d) = Σ_jalur 1 / (k + peringkat_jalur(d)).
 * Hanya memakai URUTAN, bukan besar skor -> tahan terhadap skala skor yang berbeda.
 */
export function rrf(jalur: Record<string, Hit[]>, k: number): KandidatRRF[] {
  const peta = new Map<string, KandidatRRF>();
  const namaJalur = Object.keys(jalur);
  for (const nama of namaJalur) {
    jalur[nama]!.forEach((h, i) => {
      const peringkat = i + 1;
      let c = peta.get(h.id);
      if (!c) {
        c = { id: h.id, rrf: 0, komponen: Object.fromEntries(namaJalur.map((n) => [n, undefined])) };
        peta.set(h.id, c);
      }
      if (c.komponen[nama]) return; // ID ganda di satu jalur: pakai peringkat terbaik saja
      c.komponen[nama] = { peringkat, skor: h.skor };
      c.rrf += 1 / (k + peringkat);
    });
  }
  return [...peta.values()].sort((x, y) => y.rrf - x.rrf || (x.id < y.id ? -1 : 1));
}
