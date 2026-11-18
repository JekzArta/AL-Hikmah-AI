/**
 * Validasi kode atas jawaban AI (spek §6.12 poin 1–4 dan 6). Deterministik, tanpa AI.
 * Poin 5 (validator kata vonis, mode lapor) dibangun di Fase 3.
 *
 * Analogi: pemeriksa formulir. AI hanya boleh mengisi kotak yang disediakan dan hanya
 * boleh menulis nomor rak (kode) yang memang ada di paket. Nomor rak karangan -> ditolak.
 */
import { POLA_ARAB } from "../retrieval/normalisasi.js";
import type { StatusReview } from "../repositori/tipe.js";
import { SkemaJawaban, type JawabanTerstruktur, type PaketDalil } from "./tipe.js";

/** Apa pun di dalam [ ] tanpa spasi dianggap kode, supaya kode karangan/salah ketik ikut tertangkap. */
const POLA_KODE = /\[([^\[\]\s]{1,60})\]/g;
/** Heuristik kutipan dalil yang diketik AI (mis. `bersabda: "..."`). */
const POLA_KUTIPAN = /\b(ber)?(firman|sabda)(nya)?\b\s*[:,]?\s*["“”'‘«]/i;

export function kodeDalam(teks: string): string[] {
  return [...teks.matchAll(POLA_KODE)].map((m) => m[1]!);
}

/** Buang kurung siku opsional: "[PENDAPAT-1]" -> "PENDAPAT-1". */
export function bersihkanKode(k: string): string {
  return k.trim().replace(/^\[/, "").replace(/\]$/, "");
}

/** Semua string prosa AI di jawaban (untuk cek kode, Arab, kutipan). */
export function semuaTeksAI(j: JawabanTerstruktur): string[] {
  return [
    j.ringkasan_pertanyaan, ...j.penjelasan_istilah, ...j.pendapat.map((p) => p.pengantar),
    j.kalimat_batas, j.catatan_ikhtilaf,
  ];
}

export interface HasilValidasi {
  lolos: boolean;
  alasan: string[];
  kodeAsing: string[];
  /** spek §3.2 aturan 9 / §6.12 poin 6 */
  perluLabelBelumDitinjau: boolean;
  jawaban?: JawabanTerstruktur;
}

export interface KonteksValidasi {
  paket: PaketDalil;
  /** status_review semua record yang dipakai paket (dalil + pendapat) */
  statusRecord: Record<string, StatusReview>;
  /** kode PENDAPAT-n yang punya syarat_qayd (boleh dirujuk sebagai SYARAT-n) */
  pendapatBersyarat: string[];
}

export function kodeYangBoleh(k: KonteksValidasi): Set<string> {
  const boleh = new Set<string>();
  for (const d of k.paket.dalil) boleh.add(d.id);
  for (const p of k.paket.pendapat) boleh.add(p.kode);
  for (const p of k.pendapatBersyarat) boleh.add(p.replace(/^PENDAPAT-/, "SYARAT-"));
  for (const c of k.paket.kontak ?? []) boleh.add(c);
  return boleh;
}

export function validasiJawaban(masukan: unknown, k: KonteksValidasi): HasilValidasi {
  const perluLabelBelumDitinjau = Object.values(k.statusRecord).some((s) => s !== "disetujui_penasihat");
  const gagal = (alasan: string[], kodeAsing: string[] = [], jawaban?: JawabanTerstruktur): HasilValidasi =>
    ({ lolos: alasan.length === 0, alasan, kodeAsing, perluLabelBelumDitinjau, jawaban });

  // 1. skema + kalimat batas
  const p = SkemaJawaban.safeParse(masukan);
  if (!p.success) return gagal([`skema JSON tidak valid: ${p.error.issues.map((i) => i.path.join(".")).join(", ")}`]);
  const j = p.data;
  const alasan: string[] = [];
  if (!j.kalimat_batas.trim()) alasan.push("kalimat_batas kosong (aturan 4)");

  // 2. semua kode harus ada di paket
  const boleh = kodeYangBoleh(k);
  const dipakai = [
    ...semuaTeksAI(j).flatMap(kodeDalam),
    ...j.pendapat.map((x) => bersihkanKode(x.kode_pendapat)),
    ...j.rujukan_dalil.map(bersihkanKode),
    ...j.catatan_syarat.map(bersihkanKode),
  ];
  const kodeAsing = [...new Set(dipakai.filter((c) => !boleh.has(c)))];
  if (kodeAsing.length) alasan.push(`kode asing (tidak ada di paket): ${kodeAsing.join(", ")}`);

  // 3. dalil pokok terpakai + semua pendapat disebut
  const set = new Set(dipakai);
  const pokokHilang = k.paket.dalil.filter((d) => d.peran === "pokok" && !set.has(d.id)).map((d) => d.id);
  if (pokokHilang.length) alasan.push(`dalil pokok tidak dipakai (aturan 6): ${pokokHilang.join(", ")}`);
  const disebut = new Set(j.pendapat.map((x) => bersihkanKode(x.kode_pendapat)));
  const pendapatHilang = k.paket.pendapat.filter((x) => !disebut.has(x.kode)).map((x) => x.kode);
  if (pendapatHilang.length) alasan.push(`pendapat tidak disebut semua (aturan 3): ${pendapatHilang.join(", ")}`);

  // 4. tidak ada teks Arab / kutipan dalil yang diketik AI
  const teks = semuaTeksAI(j);
  if (teks.some((t) => POLA_ARAB.test(t))) alasan.push("ada huruf Arab yang diketik AI (aturan 2)");
  if (teks.some((t) => POLA_KUTIPAN.test(t))) alasan.push("pola kutipan firman/sabda diketik AI (aturan 2, heuristik)");

  return gagal(alasan, kodeAsing, j);
}
