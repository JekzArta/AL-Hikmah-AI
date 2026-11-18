/**
 * Objek status giliran (spek §4.3, 💡 usulan bentuk). Prinsip: tiap tahap hanya memindahkan
 * ID; teks asli baru diambil di akhir lewat stempel. Fase 1 baru mengisi sebagian
 * (kandidat, biaya); sisanya diisi Fase 2–4.
 */
import type { JawabanTerstruktur, PaketDalil } from "./jawaban/tipe.js";

export type StatusAkhir =
  | "dijawab" | "menyerah" | "rujukan" | "belum_tercakup"
  | "krisis" | "sesi_selesai" | "ditolak_validasi" | "ditahan_pemeriksa";

export interface StateGiliran {
  sesiId: string;
  giliranKe: number;
  pesanUser: string;
  keputusan?: {
    niat: string;
    nadaLevel: 0 | 1 | 2 | 3;
    kesusahan: "ya" | "tidak" | "tidak_jelas";
    krisis: "ya" | "tidak" | "tidak_jelas";
    lanjutan: "lanjutan" | "topik_baru" | "tidak_jelas";
    keyakinan: Record<string, number>;
    gagal: string[];
  };
  pertanyaanUtuh?: string;
  masalah?: { id: string; label: string; yakin?: number }[];
  istilahLog?: string[];
  kandidat?: { id: string; bm25?: number; emb?: number; rrf: number }[];
  rerank?: { id: string; skorMentah: number }[];
  paketSlot?: { id: string; jenis: string; slot: string; skorMentah: number; terpotong?: string }[];
  gerbangMenyerah?: { skor: boolean; masalah: boolean; veto: boolean; pemicu?: string };
  paket?: PaketDalil;
  jawabanTerstruktur?: JawabanTerstruktur;
  jawabanFinal?: string;
  status: StatusAkhir;
  debug: Record<string, unknown>;
  biaya: { token: Record<string, number>; estimasiUsd: number };
}
