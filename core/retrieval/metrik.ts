/** Metrik retrieval sederhana untuk ablation (spek §6.17 versi mini). */

/** Peringkat (mulai 1) dalil benar pertama di daftar; null bila tidak ada. */
export function peringkatBenar(hasil: string[], benar: string[]): number | null {
  const i = hasil.findIndex((id) => benar.includes(id));
  return i < 0 ? null : i + 1;
}

export interface Ringkasan {
  n: number;
  hit1: number; // proporsi soal yang dalil benarnya di peringkat 1
  hit3: number;
  mrr: number; // rata-rata 1/peringkat (0 bila tidak ketemu)
}

export function ringkas(peringkat: (number | null)[]): Ringkasan {
  const n = peringkat.length;
  if (n === 0) return { n: 0, hit1: 0, hit3: 0, mrr: 0 };
  const hit = (k: number) => peringkat.filter((p) => p !== null && p <= k).length / n;
  const mrr = peringkat.reduce<number>((s, p) => s + (p ? 1 / p : 0), 0) / n;
  return { n, hit1: hit(1), hit3: hit(3), mrr };
}
