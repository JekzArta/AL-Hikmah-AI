/**
 * Menguji berkas migrasi SQL di Postgres lokal (PGlite + pgvector), tanpa menyentuh Supabase.
 * Catatan: locale PGlite bisa beda dari Supabase; uji parser Arab yang menentukan dijalankan
 * juga di Supabase (`npm run uji-parser`).
 */
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite-pgvector";
import { beforeAll, describe, expect, it } from "vitest";

const SQL = readFileSync("supabase/migrations/20261118000001_skema_awal.sql", "utf8");
let db: PGlite;

function vek(posisi: number, nilai = 1): string {
  const v = new Array(4096).fill(0);
  v[posisi] = nilai;
  return JSON.stringify(v);
}

beforeAll(async () => {
  db = new PGlite({ extensions: { vector } });
  // role bawaan Supabase, dibuat manual di PGlite
  await db.exec("create role anon; create role authenticated; create role service_role;");
  await db.exec(SQL);
  await db.exec(SQL); // dijalankan ulang: harus aman (idempoten)
  await db.query(
    `insert into public.sumber (id,nama,jenis,lisensi,boleh_tampil_komersial) values ('S','s','dummy','dummy','tidak')`,
  );
  const ins = `insert into public.dalil (id,jenis,teks_arab,teks_arab_polos,terjemahan,sumber_id,istilah_latin,status_review,embedding)
               values ($1,'teks','[DUMMY]','dummy',$2,'S',$3,'dummy',$4)`;
  await db.query(ins, ["DUMMY-001", "contoh tentang wudhu sebelum shalat", "", vek(0)]);
  await db.query(ins, ["DUMMY-002", "contoh tentang puasa", "shaum", vek(1)]);
  await db.query(ins, ["DUMMY-003", "contoh wudhu wudhu", "", vek(0, 0.5)]);
}, 60_000);

describe("migrasi 001 (PGlite)", () => {
  it("semua tabel spek §6.2 ada, RLS aktif di semuanya", async () => {
    const r = await db.query<{ relname: string; relrowsecurity: boolean }>(
      `select relname, relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace
       where n.nspname='public' and relkind='r' order by relname`,
    );
    expect(r.rows.map((x) => x.relname)).toEqual([
      "contoh_pertanyaan", "dalil", "dalil_topik", "glosarium", "hadits_derajat", "kontak_darurat",
      "masalah", "pendapat", "pendapat_dalil", "relasi", "set_uji", "sumber", "topik",
    ]);
    expect(r.rows.every((x) => x.relrowsecurity)).toBe(true);
  });

  it("anon tidak punya hak apa pun; service_role punya", async () => {
    const r = await db.query<{ anon: boolean; srv: boolean; fanon: boolean; fsrv: boolean }>(`select
      has_table_privilege('anon','public.dalil','select') as anon,
      has_table_privilege('service_role','public.dalil','select') as srv,
      has_function_privilege('anon','public.cari_teks(text,int)','execute') as fanon,
      has_function_privilege('service_role','public.cari_teks(text,int)','execute') as fsrv`);
    expect(r.rows[0]).toEqual({ anon: false, srv: true, fanon: false, fsrv: true });
  });

  it("cari_teks: kata digabung ATAU, urut skor, istilah_latin ikut diindeks", async () => {
    const r = await db.query<{ id: string; skor: number }>(`select * from public.cari_teks('wudhu shaum', 10)`);
    const ids = r.rows.map((x) => x.id);
    expect(ids).toContain("DUMMY-001");
    expect(ids).toContain("DUMMY-002"); // lewat istilah_latin "shaum"
    expect(ids[0]).toBe("DUMMY-003"); // "wudhu" dua kali
  });

  it("cari_teks: kueri kosong / tanda baca saja -> tidak error, nol hasil", async () => {
    expect((await db.query(`select * from public.cari_teks('', 10)`)).rows).toEqual([]);
    expect((await db.query(`select * from public.cari_teks('?!', 10)`)).rows).toEqual([]);
    // tanda kutip tidak membuat SQL/tsquery rusak
    expect((await db.query(`select * from public.cari_teks($1, 10)`, ["wudhu' | ! & ("])).rows.length).toBeGreaterThan(0);
  });

  it("cari_embedding: cosine persis, skor = 1 - jarak", async () => {
    const r = await db.query<{ id: string; skor: number }>(`select * from public.cari_embedding($1::extensions.vector, 3)`, [vek(0)]);
    expect(r.rows.map((x) => x.id)).toEqual(["DUMMY-001", "DUMMY-003", "DUMMY-002"]);
    expect(r.rows[0]!.skor).toBeCloseTo(1);
    expect(r.rows[1]!.skor).toBeCloseTo(1); // searah, panjang beda -> cosine tetap 1
    expect(r.rows[2]!.skor).toBeCloseTo(0);
  });
});
