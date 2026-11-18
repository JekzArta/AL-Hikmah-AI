/**
 * Konfigurasi tunggal (spek §5.3).
 *
 * Semua angka di sini adalah HIPOTESIS awal (💡), bukan kebenaran. Diubah hanya
 * lewat uji / kasus nyata (spek §3.6, §14). Slug model diisi dari
 * docs/catatan-api.md setelah diverifikasi di dokumentasi resmi — jangan ditebak.
 */
import { z } from "zod";

export const SkemaKonfigurasi = z.object({
  mode: z.enum(["prototipe", "produk"]),

  penyimpanan: z.object({
    // ✅ pemilik proyek (18 Nov 2026): pakai Supabase. Pipeline hanya kenal interface Repositori.
    backend: z.enum(["supabase", "memori"]),
  }),

  model: z.object({
    // null = belum diverifikasi di dokumentasi resmi (lihat docs/catatan-api.md)
    embedding: z.string().nullable(),
    reranker: z.string().nullable(),
    keputusan_jev: z.string().nullable(),
    keputusan_llm: z.string().nullable(),
    penyusun_ulang: z.string().nullable(),
    penjelas: z.string().nullable(),
    detektor_krisis_kedua: z.string().nullable(),
  }),
  backend_keputusan: z.enum(["jev", "llm"]),

  retrieval: z.object({
    rrf_k: z.number().int().positive(),
    jumlah_kandidat_detektif: z.number().int().positive(),
    jumlah_setelah_rerank: z.number().int().positive(),
    ambang_relevansi: z.number().nullable(), // null sampai kalibrasi Fase 2 (§6.17)
    pengaruh_bobot: z.number().min(0).max(1),
  }),

  slot_maks: z.object({
    pokok: z.number().int().nonnegative(),
    pendukung_penjelas: z.number().int().nonnegative(),
    fatwa: z.number().int().nonnegative(),
    // pendapat: semua untuk masalah_id (dengan cek silang) — tidak dibatasi angka
  }),

  keselamatan: z.object({
    maks_teguran: z.number().int().positive(),
    detektor_krisis_kedua_aktif: z.boolean(),
    ambang_lift_persen_konteks: z.number().min(1).max(100),
    ambang_keyakinan_jev: z.number().nullable(), // null sampai diuji
  }),

  log: z.object({
    simpan_teks_sensitif: z.boolean(),
    folder: z.string(),
  }),

  biaya: z.object({
    batas_usd_per_run: z.number().positive(),
  }),
});

export type Konfigurasi = z.infer<typeof SkemaKonfigurasi>;

export const konfigurasi: Konfigurasi = SkemaKonfigurasi.parse({
  mode: "prototipe",
  penyimpanan: { backend: "supabase" },
  model: {
    embedding: null,
    reranker: null,
    keputusan_jev: null,
    keputusan_llm: null,
    penyusun_ulang: null,
    penjelas: null,
    detektor_krisis_kedua: null,
  },
  backend_keputusan: "jev", // ✅ Jev dipilih (spek §5.2); "llm" = cadangan pembanding
  retrieval: {
    rrf_k: 60,
    jumlah_kandidat_detektif: 20,
    jumlah_setelah_rerank: 8,
    ambang_relevansi: null,
    pengaruh_bobot: 0,
  },
  slot_maks: { pokok: 2, pendukung_penjelas: 2, fatwa: 2 },
  keselamatan: {
    maks_teguran: 3,
    detektor_krisis_kedua_aktif: true,
    ambang_lift_persen_konteks: 60,
    ambang_keyakinan_jev: null,
  },
  log: { simpan_teks_sensitif: false, folder: "logs" },
  biaya: { batas_usd_per_run: 0.5 },
});
