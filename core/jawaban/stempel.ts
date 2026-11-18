/**
 * Mesin stempel (spek §6.12). Menukar kode dengan teks ASLI dari database:
 *  - [ID-DALIL]   -> teks_arab asli + terjemahan asli (+ atribusi "dirujuk oleh …")
 *  - [PENDAPAT-n] -> kesimpulan_hukum (kutipan persis) + atribusi (pemilik, rujukan)
 *  - [SYARAT-n]   -> syarat_qayd pendapat n (kutipan persis)
 * Teks dari database disalin apa adanya (tidak dinormalisasi, tidak dipotong).
 * DUMMY selalu diberi label "bukan dalil asli". Kode tak dikenal -> error (tidak pernah dibiarkan).
 */
import type { Dalil, Pendapat, Repositori } from "../repositori/tipe.js";
import type { JawabanTerstruktur, PaketDalil } from "./tipe.js";
import { bersihkanKode } from "./validasi.js";

export class KodeTidakDikenal extends Error {}

export const LABEL_DUMMY = "[DUMMY — bukan dalil asli, hanya uji kabel]";
export const LABEL_BELUM_DITINJAU = "Catatan: sebagian rujukan di jawaban ini belum ditinjau penasihat syariah.";

export function labelDalil(d: Pick<Dalil, "status_review">): string {
  if (d.status_review === "dummy") return LABEL_DUMMY;
  if (d.status_review !== "disetujui_penasihat") return "[belum ditinjau penasihat]";
  return "";
}

export interface BahanStempel {
  dalil: Map<string, Dalil>;
  pendapat: Map<string, Pendapat>; // kunci: kode lokal PENDAPAT-n
  dirujukOleh: Map<string, string[]>; // id dalil -> nama pemilik pendapat
}

export async function ambilBahan(repo: Repositori, paket: PaketDalil): Promise<BahanStempel> {
  const dalil = new Map((await repo.ambilDalil(paket.dalil.map((d) => d.id))).map((d) => [d.id, d]));
  const perId = new Map((await repo.ambilPendapat(paket.pendapat.map((p) => p.id))).map((p) => [p.id, p]));
  const pendapat = new Map<string, Pendapat>();
  for (const p of paket.pendapat) {
    const rec = perId.get(p.id);
    if (rec) pendapat.set(p.kode, rec);
  }
  const dirujukOleh = new Map<string, string[]>();
  for (const d of paket.dalil) {
    const nama = (d.dirujuk_oleh ?? []).flatMap((id) => [...perId.values()].filter((p) => p.id === id).map((p) => p.pemilik_pendapat));
    if (nama.length) dirujukOleh.set(d.id, nama);
  }
  return { dalil, pendapat, dirujukOleh };
}

export function stempelDalil(d: Dalil, dirujukOleh?: string[]): string {
  const label = labelDalil(d);
  return [
    `〔${d.id}〕${label ? ` ${label}` : ""}`,
    d.teks_arab,
    d.terjemahan,
    ...(dirujukOleh?.length ? [`(dirujuk oleh: ${dirujukOleh.join(", ")})`] : []),
  ].join("\n");
}

export function stempelPendapat(p: Pendapat): string {
  const label = p.status_review === "dummy" ? ` ${LABEL_DUMMY}` : "";
  return `${p.pemilik_pendapat} (${p.rujukan}):${label}\n"${p.kesimpulan_hukum}"`;
}

/** Tukar satu kode; kode tak dikenal -> KodeTidakDikenal. */
export function tukarKode(kode: string, b: BahanStempel): string {
  const k = bersihkanKode(kode);
  const d = b.dalil.get(k);
  if (d) return stempelDalil(d, b.dirujukOleh.get(k));
  const p = b.pendapat.get(k);
  if (p) return stempelPendapat(p);
  const s = /^SYARAT-(\d+)$/.exec(k);
  if (s) {
    const ps = b.pendapat.get(`PENDAPAT-${s[1]}`);
    if (ps?.syarat_qayd) return `Syarat menurut ${ps.pemilik_pendapat}: "${ps.syarat_qayd}"`;
  }
  throw new KodeTidakDikenal(`kode tidak dikenal: ${kode}`);
}

/** Tukar semua [KODE] di dalam prosa. */
export function stempelProsa(teks: string, b: BahanStempel): string {
  // satu lintasan: teks database yang sudah ditempel TIDAK dipindai/diubah lagi
  return teks.replace(POLA_KODE_GLOBAL, (_m, k: string) => tukarKode(k, b));
}
const POLA_KODE_GLOBAL = /\[([^\[\]\s]{1,60})\]/g;

/** Rakit jawaban final. Panggil HANYA setelah validasiJawaban lolos. */
export function rakit(j: JawabanTerstruktur, b: BahanStempel, labelBelumDitinjau: boolean): string {
  const bagian: string[] = [`Dipahami sebagai: ${stempelProsa(j.ringkasan_pertanyaan, b)}`];
  if (j.penjelasan_istilah.length) bagian.push(j.penjelasan_istilah.map((t) => stempelProsa(t, b)).join("\n"));
  if (j.pendapat.length) {
    bagian.push(["Pendapat yang tercatat:",
      ...j.pendapat.map((p) => `• ${stempelProsa(p.pengantar, b)}\n${tukarKode(p.kode_pendapat, b)}`)].join("\n"));
  }
  if (j.rujukan_dalil.length) bagian.push(["Dalil yang dirujuk:", ...j.rujukan_dalil.map((k) => tukarKode(k, b))].join("\n\n"));
  if (j.catatan_syarat.length) bagian.push(j.catatan_syarat.map((k) => tukarKode(k, b)).join("\n"));
  if (j.catatan_ikhtilaf.trim()) bagian.push(stempelProsa(j.catatan_ikhtilaf, b));
  bagian.push(stempelProsa(j.kalimat_batas, b));
  if (labelBelumDitinjau) bagian.push(LABEL_BELUM_DITINJAU);
  return bagian.join("\n\n");
}
