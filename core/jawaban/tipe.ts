/**
 * Bentuk paket dalil (hasil gerbang+slot, Fase 2) dan jawaban berslot AI penjelas (spek §6.11).
 * Fase 1 hanya memakai bentuk ini untuk menguji validasi + stempel.
 */
import { z } from "zod";
import type { Peran } from "../repositori/tipe.js";

export interface PaketDalil {
  dalil: { id: string; peran: Peran; dirujuk_oleh?: string[] /* id pendapat (pendapat_dalil) */ }[];
  /** kode lokal paket "PENDAPAT-n" -> id pendapat di database */
  pendapat: { kode: string; id: string }[];
  /** kode kontak yang boleh dipakai, mis. "KONTAK-KRISIS" (Fase 4) */
  kontak?: string[];
}

export const SkemaJawaban = z.object({
  ringkasan_pertanyaan: z.string(),
  penjelasan_istilah: z.array(z.string()),
  pendapat: z.array(z.object({ kode_pendapat: z.string(), pengantar: z.string() })),
  rujukan_dalil: z.array(z.string()),
  catatan_syarat: z.array(z.string()),
  kalimat_batas: z.string(),
  catatan_ikhtilaf: z.string(),
  mode_dipakai: z.string(),
});
export type JawabanTerstruktur = z.infer<typeof SkemaJawaban>;
