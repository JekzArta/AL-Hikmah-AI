/**
 * Log jejak per giliran (spek §6.15). Lokal (folder logs/, di .gitignore), satu baris JSON
 * per giliran, satu berkas per hari -> mudah dihapus.
 *  - TANPA ID user: hanya ID sesi acak (UUID).
 *  - Pesan sensitif (krisis/utang sensitif): bila simpan_teks_sensitif = false, hanya LABEL.
 *  - Retensi: hapusLogLama() menghapus berkas lebih tua dari retensi_hari; hapusSesi() membuang satu sesi.
 */
import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { StatusReview } from "../repositori/tipe.js";

export const TEKS_DISEMBUNYIKAN = "[disembunyikan: sensitif]";

export interface EntriGiliran {
  sesiId: string;
  giliranKe: number;
  perintah: string; // cari | chat | uji
  pesanUser: string;
  /** ditandai krisis / utang sensitif oleh tahap keputusan (Fase 2/4) */
  sensitif: boolean;
  labelSensitif?: string;
  status: string; // StatusAkhir (spek §4.3) atau "cari_saja"
  mode?: string;
  kueriPolos?: string;
  pertanyaanUtuh?: string;
  keputusan?: Record<string, unknown>;
  kandidat?: { id: string; bm25?: number; emb?: number; rrf: number }[];
  gerbang?: Record<string, unknown>;
  statusDalil?: Record<string, StatusReview>;
  versiPrompt?: Record<string, string>;
  model?: Record<string, string | null>;
  biaya: { token: number; estimasiUsd: number };
}

export interface KonfigLog {
  simpan_teks_sensitif: boolean;
  folder: string;
  retensi_hari: number;
}

export function sesiBaru(): string {
  return randomUUID();
}

/** Bentuk baris log (murni, bisa dites). */
export function bangunBaris(e: EntriGiliran, k: Pick<KonfigLog, "simpan_teks_sensitif">, waktu = new Date()) {
  const sembunyi = e.sensitif && !k.simpan_teks_sensitif;
  return {
    waktu: waktu.toISOString(),
    ...e,
    pesanUser: sembunyi ? TEKS_DISEMBUNYIKAN : e.pesanUser,
    kueriPolos: sembunyi && e.kueriPolos !== undefined ? TEKS_DISEMBUNYIKAN : e.kueriPolos,
    pertanyaanUtuh: sembunyi && e.pertanyaanUtuh !== undefined ? TEKS_DISEMBUNYIKAN : e.pertanyaanUtuh,
  };
}

/** Tulis satu baris; kembalikan jalur berkas. */
export function catatGiliran(e: EntriGiliran, k: KonfigLog, waktu = new Date()): string {
  mkdirSync(k.folder, { recursive: true });
  const jalur = join(k.folder, `jejak-${waktu.toISOString().slice(0, 10)}.jsonl`);
  appendFileSync(jalur, JSON.stringify(bangunBaris(e, k, waktu)) + "\n");
  return jalur;
}

const POLA_BERKAS = /^jejak-(\d{4}-\d{2}-\d{2})\.jsonl$/;

/** Hapus berkas log yang lebih tua dari retensi_hari. Hanya menyentuh berkas jejak-YYYY-MM-DD.jsonl. */
export function hapusLogLama(k: KonfigLog, sekarang = new Date()): string[] {
  if (!existsSync(k.folder)) return [];
  const batas = sekarang.getTime() - k.retensi_hari * 86_400_000;
  const dihapus: string[] = [];
  for (const nama of readdirSync(k.folder)) {
    const m = POLA_BERKAS.exec(nama);
    if (m && new Date(`${m[1]}T23:59:59Z`).getTime() < batas) {
      unlinkSync(join(k.folder, nama));
      dihapus.push(nama);
    }
  }
  return dihapus;
}

/** Buang semua baris milik satu sesi (permintaan hapus). Kembalikan jumlah baris yang dibuang. */
export function hapusSesi(k: KonfigLog, sesiId: string): number {
  if (!existsSync(k.folder)) return 0;
  let dibuang = 0;
  for (const nama of readdirSync(k.folder).filter((n) => POLA_BERKAS.test(n))) {
    const jalur = join(k.folder, nama);
    const baris = readFileSync(jalur, "utf8").split("\n").filter(Boolean);
    const sisa = baris.filter((b) => (JSON.parse(b) as { sesiId?: string }).sesiId !== sesiId);
    dibuang += baris.length - sisa.length;
    if (sisa.length !== baris.length) writeFileSync(jalur, sisa.length ? sisa.join("\n") + "\n" : "");
  }
  return dibuang;
}
