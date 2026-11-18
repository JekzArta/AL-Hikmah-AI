/**
 * Adapter Supabase (utama). Akses lewat HTTPS (supabase-js -> Data API/PostgREST + rpc),
 * bukan koneksi Postgres langsung. Kunci server (service_role) HANYA dari environment
 * variable, tidak pernah dicetak, tidak pernah ke UI.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  Dalil, DalilTopik, Embedding, Hit, Masalah, Pendapat, PendapatDalil, Repositori, Sumber, Topik,
} from "./tipe.js";

const KOLOM_DALIL =
  "id,jenis,teks_arab,teks_arab_polos,terjemahan,sumber_id,header_netral,istilah_latin,tag,status_review,tingkat_otoritas,berlaku_sejak,dicabut_oleh";
const UKURAN_BATCH = 200;

function periksa<T>(r: { data: T | null; error: { message: string; code?: string; hint?: string | null } | null }, apa: string): T {
  if (r.error) {
    const petunjuk =
      r.error.code === "PGRST205" || r.error.code === "PGRST202"
        ? " (tabel/fungsi belum ada? jalankan migrasi supabase/migrations/ di SQL Editor)"
        : "";
    throw new Error(`Supabase gagal saat ${apa}: ${r.error.message}${petunjuk}`);
  }
  return r.data as T;
}

/**
 * supabase-js butuh alamat DASAR proyek (https://<ref>.supabase.co). Bila yang diisi
 * alamat REST lengkap (…/rest/v1/), ambil origin-nya saja.
 */
export function urlDasarSupabase(url: string): string {
  return new URL(url.trim()).origin;
}

function potong<T>(xs: T[], n = UKURAN_BATCH): T[][] {
  const hasil: T[][] = [];
  for (let i = 0; i < xs.length; i += n) hasil.push(xs.slice(i, i + n));
  return hasil;
}

export class RepositoriSupabase implements Repositori {
  private readonly db: SupabaseClient;

  constructor(url: string, kunciServer: string) {
    this.db = createClient(urlDasarSupabase(url), kunciServer, { auth: { persistSession: false, autoRefreshToken: false } });
  }

  static dariEnv(env: NodeJS.ProcessEnv = process.env): RepositoriSupabase {
    const url = env.SUPABASE_URL;
    const kunci = env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !kunci) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi (jalankan `npm run cek`)");
    return new RepositoriSupabase(url, kunci);
  }

  private async upsert(tabel: string, baris: object[], onConflict: string) {
    for (const b of potong(baris)) {
      periksa(await this.db.from(tabel).upsert(b, { onConflict }), `upsert ${tabel}`);
    }
  }

  simpanSumber(b: Sumber[]) { return this.upsert("sumber", b, "id"); }
  simpanDalil(b: Dalil[]) {
    return this.upsert("dalil", b.map((d) => ({ ...d, diubah: new Date().toISOString() })), "id");
  }
  simpanTopik(b: Topik[]) { return this.upsert("topik", b, "id"); }
  simpanDalilTopik(b: DalilTopik[]) { return this.upsert("dalil_topik", b, "dalil_id,topik_id"); }
  simpanMasalah(b: Masalah[]) { return this.upsert("masalah", b, "id"); }
  simpanPendapat(b: Pendapat[]) { return this.upsert("pendapat", b, "id"); }
  simpanPendapatDalil(b: PendapatDalil[]) { return this.upsert("pendapat_dalil", b, "pendapat_id,dalil_id"); }

  async simpanEmbedding(id: string, e: Embedding) {
    periksa(
      await this.db.from("dalil")
        .update({ embedding: JSON.stringify(e.vektor), embedding_model: e.model, embedding_hash: e.hash })
        .eq("id", id),
      `simpan embedding ${id}`,
    );
  }

  async hapusDalil(ids: string[]) {
    for (const b of potong(ids)) periksa(await this.db.from("dalil").delete().in("id", b), "hapus dalil");
  }

  async idSumberYangAda(ids: string[]) {
    const ada = new Set<string>();
    for (const b of potong(ids)) {
      const data = periksa(await this.db.from("sumber").select("id").in("id", b), "baca sumber") as { id: string }[];
      for (const r of data) ada.add(r.id);
    }
    return ada;
  }

  async ambilDalil(ids: string[]): Promise<Dalil[]> {
    const peta = new Map<string, Dalil>();
    for (const b of potong(ids)) {
      const data = periksa(await this.db.from("dalil").select(KOLOM_DALIL).in("id", b), "baca dalil") as Dalil[];
      for (const d of data) peta.set(d.id, d);
    }
    return ids.flatMap((i) => (peta.has(i) ? [peta.get(i)!] : [])); // urutan mengikuti permintaan
  }

  async ambilPendapat(ids: string[]): Promise<Pendapat[]> {
    const peta = new Map<string, Pendapat>();
    for (const b of potong(ids)) {
      const data = periksa(await this.db.from("pendapat").select("*").in("id", b), "baca pendapat") as Pendapat[];
      for (const p of data) peta.set(p.id, p);
    }
    return ids.flatMap((i) => (peta.has(i) ? [peta.get(i)!] : []));
  }

  async ambilSemuaIdDalil() {
    const hasil: string[] = [];
    for (let dari = 0; ; dari += 1000) {
      const data = periksa(
        await this.db.from("dalil").select("id").order("id").range(dari, dari + 999),
        "daftar id dalil",
      ) as { id: string }[];
      hasil.push(...data.map((r) => r.id));
      if (data.length < 1000) return hasil;
    }
  }

  async hashEmbedding(ids: string[]) {
    const peta = new Map<string, string | null>(ids.map((i) => [i, null]));
    for (const b of potong(ids)) {
      const data = periksa(
        await this.db.from("dalil").select("id,embedding_hash").in("id", b), "baca hash embedding",
      ) as { id: string; embedding_hash: string | null }[];
      for (const r of data) peta.set(r.id, r.embedding_hash);
    }
    return peta;
  }

  async cariTeks(kueriPolos: string, jumlah: number): Promise<Hit[]> {
    const data = periksa(await this.db.rpc("cari_teks", { kueri: kueriPolos, jumlah }), "cari_teks") as Hit[];
    return data.map((h) => ({ id: h.id, skor: Number(h.skor) }));
  }

  async cariEmbedding(vektor: number[], jumlah: number): Promise<Hit[]> {
    const data = periksa(
      await this.db.rpc("cari_embedding", { vektor: JSON.stringify(vektor), jumlah }), "cari_embedding",
    ) as Hit[];
    return data.map((h) => ({ id: h.id, skor: Number(h.skor) }));
  }

  /** Alat uji: bagaimana parser `simple` Postgres memecah teks. */
  async ujiParser(teks: string): Promise<string> {
    return periksa(await this.db.rpc("uji_parser", { teks }), "uji_parser") as string;
  }
}
