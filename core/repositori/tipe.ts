/**
 * Tipe data & interface Repositori (spek §6.2).
 *
 * Analogi: Repositori = "petugas gudang". Pipeline cuma bilang "ambilkan dalil X" atau
 * "cari yang mirip kueri ini"; pipeline tidak tahu gudangnya Supabase atau RAM.
 * Dua adapter: Supabase (utama) dan memori (untuk tes).
 */

export type StatusReview =
  | "dummy"
  | "diusulkan"
  | "diusulkan_kurator"
  | "disetujui_kurator"
  | "disetujui_penasihat";

export type JenisDalil = "ayat" | "hadits" | "tafsir" | "fatwa" | "teks";
export type BolehTampil = "ya" | "tidak" | "belum";
export type Peran = "pokok" | "pendukung" | "penjelas";

export interface Sumber {
  id: string;
  nama: string;
  jenis: string;
  url: string | null;
  lisensi: string;
  tanggal_akses: string | null;
  izin_ref: string | null;
  boleh_tampil_komersial: BolehTampil;
}

export interface Dalil {
  id: string;
  jenis: JenisDalil;
  teks_arab: string;
  teks_arab_polos: string;
  terjemahan: string;
  sumber_id: string;
  header_netral: string;
  istilah_latin: string;
  tag: string[];
  status_review: StatusReview;
  tingkat_otoritas: string | null;
  berlaku_sejak: string | null;
  dicabut_oleh: string | null;
}

export interface Topik {
  id: string;
  nama: string;
  induk_id: string | null;
}

export interface DalilTopik {
  dalil_id: string;
  topik_id: string;
  peran: Peran;
  bobot: number;
}

export interface Masalah {
  id: string;
  label: string;
  istilah_latin: string;
  topik_id: string | null;
  rak: 1 | 2;
  kriteria_batas: string | null;
  status_review: StatusReview;
}

export interface Pendapat {
  id: string;
  masalah_id: string;
  pemilik_pendapat: string;
  jenis_pemilik: string;
  kesimpulan_hukum: string;
  syarat_qayd: string | null;
  rujukan: string;
  status_khilaf: string | null;
  penalaran: string | null;
  berlaku_sejak: string | null;
  dicabut_oleh: string | null;
  status_review: StatusReview;
}

export interface PendapatDalil {
  pendapat_id: string;
  dalil_id: string;
  cara_istidlal: string | null;
  status_review: StatusReview;
}

export interface Embedding {
  vektor: number[];
  model: string;
  hash: string;
}

/** Hasil satu jalur pencarian: hanya ID + skor (tiap tahap hanya memindahkan ID). */
export interface Hit {
  id: string;
  skor: number;
}

export interface Repositori {
  // --- tulis (dipakai ingest; semuanya upsert = idempoten) ---
  simpanSumber(baris: Sumber[]): Promise<void>;
  simpanDalil(baris: Dalil[]): Promise<void>;
  simpanTopik(baris: Topik[]): Promise<void>;
  simpanDalilTopik(baris: DalilTopik[]): Promise<void>;
  simpanMasalah(baris: Masalah[]): Promise<void>;
  simpanPendapat(baris: Pendapat[]): Promise<void>;
  simpanPendapatDalil(baris: PendapatDalil[]): Promise<void>;
  simpanEmbedding(dalilId: string, e: Embedding): Promise<void>;
  hapusDalil(ids: string[]): Promise<void>;

  // --- baca ---
  idSumberYangAda(ids: string[]): Promise<Set<string>>;
  ambilDalil(ids: string[]): Promise<Dalil[]>;
  ambilPendapat(ids: string[]): Promise<Pendapat[]>;
  ambilSemuaIdDalil(): Promise<string[]>;
  /** id -> hash embedding yang tersimpan (null bila belum ada), untuk cache. */
  hashEmbedding(ids: string[]): Promise<Map<string, string | null>>;

  // --- cari ---
  /** kueri sudah dinormalisasi oleh `normalisasi()` di kode. */
  cariTeks(kueriPolos: string, jumlah: number): Promise<Hit[]>;
  cariEmbedding(vektor: number[], jumlah: number): Promise<Hit[]>;
}
