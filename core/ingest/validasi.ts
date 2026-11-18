/**
 * Validasi ingest (spek §6.3, §9.1, §9.3). Analogi: satpam gudang. Barang tanpa surat
 * (sumber/lisensi), label salah (format ID), atau dummy yang menyamar jadi asli -> DITOLAK,
 * dengan alasan tertulis. Satu baris gagal tidak menggagalkan baris lain.
 */
import { z } from "zod";
import { normalisasi } from "../retrieval/normalisasi.js";
import type {
  Dalil, DalilTopik, Masalah, Pendapat, PendapatDalil, Sumber, Topik,
} from "../repositori/tipe.js";

export const POLA_ID = {
  ayat: /^QS-(\d{1,3}):(\d{1,3})$/,
  hadits: /^HR-[A-Z]+-\d+$/,
  fatwa: /^FATWA-[A-Z0-9]+-\d+-\d{4}$/,
  dummy: /^DUMMY-\d{3}$/,
} as const;

const STATUS = z.enum(["dummy", "diusulkan", "diusulkan_kurator", "disetujui_kurator", "disetujui_penasihat"]);
const teksWajib = z.string().trim().min(1, "wajib diisi");
const opsional = z.string().nullish().transform((v) => v ?? null);

const SkemaSumber = z.object({
  id: teksWajib, nama: teksWajib, jenis: teksWajib, url: opsional,
  lisensi: teksWajib, tanggal_akses: opsional, izin_ref: opsional,
  boleh_tampil_komersial: z.enum(["ya", "tidak", "belum"]),
});

const SkemaDalilMasuk = z.object({
  id: teksWajib,
  jenis: z.enum(["ayat", "hadits", "tafsir", "fatwa", "teks"]),
  teks_arab: teksWajib,
  terjemahan: teksWajib,
  sumber_id: teksWajib,
  header_netral: z.string().default(""),
  istilah_latin: z.string().default(""),
  tag: z.array(z.string()).default([]),
  status_review: STATUS,
  tingkat_otoritas: opsional,
  berlaku_sejak: opsional,
  dicabut_oleh: opsional,
});

const SkemaTopik = z.object({ id: teksWajib, nama: teksWajib, induk_id: opsional });
const SkemaDalilTopik = z.object({
  dalil_id: teksWajib, topik_id: teksWajib,
  peran: z.enum(["pokok", "pendukung", "penjelas"]), bobot: z.number().default(1),
});
const SkemaMasalah = z.object({
  id: teksWajib, label: teksWajib, istilah_latin: z.string().default(""), topik_id: opsional,
  rak: z.union([z.literal(1), z.literal(2)]), kriteria_batas: opsional, status_review: STATUS,
});
const SkemaPendapat = z.object({
  id: teksWajib, masalah_id: teksWajib, pemilik_pendapat: teksWajib, jenis_pemilik: teksWajib,
  kesimpulan_hukum: teksWajib, syarat_qayd: opsional,
  rujukan: z.string().trim().min(1, "wajib: lokasi kutipan persis (halaman/butir)"),
  status_khilaf: opsional, penalaran: opsional, berlaku_sejak: opsional, dicabut_oleh: opsional,
  status_review: STATUS,
});
const SkemaPendapatDalil = z.object({
  pendapat_id: teksWajib, dalil_id: teksWajib, cara_istidlal: opsional, status_review: STATUS,
});

export interface BarisMentah {
  berkas: string;
  baris: number;
  isi: unknown;
}

export interface Penolakan {
  berkas: string;
  baris: number;
  id: string;
  alasan: string;
}

export interface DataMasuk {
  sumber?: BarisMentah[];
  dalil?: BarisMentah[];
  topik?: BarisMentah[];
  dalil_topik?: BarisMentah[];
  masalah?: BarisMentah[];
  pendapat?: BarisMentah[];
  pendapat_dalil?: BarisMentah[];
}

export interface DataSah {
  sumber: Sumber[];
  dalil: Dalil[];
  topik: Topik[];
  dalil_topik: DalilTopik[];
  masalah: Masalah[];
  pendapat: Pendapat[];
  pendapat_dalil: PendapatDalil[];
}

/** ID yang sudah ada di database (dari Repositori), supaya rujukan lintas-run bisa dicek. */
export interface YangSudahAda {
  sumber: Set<string>;
  dalil: Set<string>;
}

function idDari(isi: unknown, ...kunci: string[]): string {
  const o = (isi ?? {}) as Record<string, unknown>;
  return kunci.map((k) => String(o[k] ?? "?")).join("|");
}

function pesanZod(e: z.ZodError): string {
  return e.issues.map((i) => `${i.path.join(".") || "(baris)"}: ${i.message}`).join("; ");
}

/** Aturan khusus dalil di luar skema. Kembalikan alasan tolak, atau null bila lolos. */
export function cekAturanDalil(d: z.infer<typeof SkemaDalilMasuk>): string | null {
  const dummy = d.status_review === "dummy";
  const idDummy = POLA_ID.dummy.test(d.id);
  if (dummy !== idDummy) return "DUMMY harus konsisten: status_review=dummy HANYA untuk ID DUMMY-nnn, dan sebaliknya";
  if (dummy) {
    if (d.teks_arab !== "[DUMMY]") return 'baris DUMMY wajib teks_arab = "[DUMMY]"';
    if (!d.terjemahan.includes("DUMMY")) return "terjemahan baris DUMMY wajib memuat kata DUMMY (penanda jelas)";
    return null;
  }
  if (d.jenis === "ayat") {
    const m = POLA_ID.ayat.exec(d.id);
    if (!m) return "ID ayat harus berformat QS-<surah>:<ayat>";
    const surah = Number(m[1]);
    if (surah < 1 || surah > 114 || Number(m[2]) < 1) return "nomor surah/ayat di luar rentang";
    return null;
  }
  if (d.jenis === "hadits") return POLA_ID.hadits.test(d.id) ? null : "ID hadits harus berformat HR-<KITAB>-<nomor>";
  if (d.jenis === "fatwa") return POLA_ID.fatwa.test(d.id) ? null : "ID fatwa harus berformat FATWA-<LEMBAGA>-<nomor>-<tahun>";
  return `format ID untuk jenis "${d.jenis}" belum ditetapkan spek (tanyakan pemilik proyek)`;
}

export function validasi(masuk: DataMasuk, sudahAda: YangSudahAda = { sumber: new Set(), dalil: new Set() }) {
  const ditolak: Penolakan[] = [];
  const sah: DataSah = { sumber: [], dalil: [], topik: [], dalil_topik: [], masalah: [], pendapat: [], pendapat_dalil: [] };

  function proses<T>(
    baris: BarisMentah[] | undefined,
    skema: z.ZodType<T>,
    kunci: string[],
    aturan: (x: T) => string | null,
    terima: (x: T) => void,
  ) {
    const terlihat = new Set<string>();
    for (const b of baris ?? []) {
      const id = idDari(b.isi, ...kunci);
      const tolak = (alasan: string) => ditolak.push({ berkas: b.berkas, baris: b.baris, id, alasan });
      const r = skema.safeParse(b.isi);
      if (!r.success) { tolak(pesanZod(r.error)); continue; }
      if (terlihat.has(id)) { tolak("ID ganda di berkas masukan"); continue; }
      const alasan = aturan(r.data);
      if (alasan) { tolak(alasan); continue; }
      terlihat.add(id);
      terima(r.data);
    }
  }

  proses(masuk.sumber, SkemaSumber, ["id"], (s) =>
    /api komunitas/i.test(s.lisensi) && s.boleh_tampil_komersial !== "belum"
      ? "data API komunitas wajib boleh_tampil_komersial = belum (spek §14.5)"
      : null,
    (s) => sah.sumber.push(s));

  const adaSumber = new Set([...sudahAda.sumber, ...sah.sumber.map((s) => s.id)]);
  proses(masuk.dalil, SkemaDalilMasuk, ["id"], (d) =>
    !adaSumber.has(d.sumber_id) ? `sumber_id "${d.sumber_id}" tidak ada (wajib sumber + lisensi)` : cekAturanDalil(d),
    (d) => sah.dalil.push({ ...d, teks_arab_polos: normalisasi(d.teks_arab) }));

  proses(masuk.topik, SkemaTopik, ["id"], () => null, (t) => sah.topik.push(t));
  const adaTopik = new Set(sah.topik.map((t) => t.id));
  for (const t of sah.topik) {
    if (t.induk_id && !adaTopik.has(t.induk_id)) {
      // induk tak dikenal: tetap simpan topik, tapi lepas induknya dan laporkan
      ditolak.push({ berkas: "topik", baris: 0, id: t.id, alasan: `induk_id "${t.induk_id}" tidak ada; induk dikosongkan` });
      t.induk_id = null;
    }
  }

  const adaDalil = new Set([...sudahAda.dalil, ...sah.dalil.map((d) => d.id)]);
  proses(masuk.dalil_topik, SkemaDalilTopik, ["dalil_id", "topik_id"], (x) =>
    !adaDalil.has(x.dalil_id) ? `dalil "${x.dalil_id}" tidak ada`
      : !adaTopik.has(x.topik_id) ? `topik "${x.topik_id}" tidak ada` : null,
    (x) => sah.dalil_topik.push(x));

  proses(masuk.masalah, SkemaMasalah, ["id"], (m) =>
    m.topik_id && !adaTopik.has(m.topik_id) ? `topik "${m.topik_id}" tidak ada` : null,
    (m) => sah.masalah.push(m as Masalah));

  const adaMasalah = new Set(sah.masalah.map((m) => m.id));
  proses(masuk.pendapat, SkemaPendapat, ["id"], (p) =>
    !adaMasalah.has(p.masalah_id) ? `masalah "${p.masalah_id}" tidak ada` : null,
    (p) => sah.pendapat.push(p));

  const adaPendapat = new Set(sah.pendapat.map((p) => p.id));
  proses(masuk.pendapat_dalil, SkemaPendapatDalil, ["pendapat_id", "dalil_id"], (x) =>
    !adaPendapat.has(x.pendapat_id) ? `pendapat "${x.pendapat_id}" tidak ada`
      : !adaDalil.has(x.dalil_id) ? `dalil "${x.dalil_id}" tidak ada` : null,
    (x) => sah.pendapat_dalil.push(x));

  return { sah, ditolak };
}
