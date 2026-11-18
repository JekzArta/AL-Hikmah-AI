-- =====================================================================
-- Migrasi 001: skema awal Al Hikmah (spek §6.2, keputusan-pemilik.md)
-- Cara pakai: salin SELURUH isi berkas ini ke Supabase > SQL Editor > Run.
-- Aman dijalankan ulang (pakai IF NOT EXISTS / OR REPLACE).
--
-- Prinsip keamanan:
--   * RLS aktif di semua tabel, TANPA policy -> kunci anon/publik tidak bisa baca apa pun.
--   * Hak akses hanya diberikan ke role `service_role` (kunci server, dipakai CLI).
--   * Fungsi: EXECUTE dicabut dari PUBLIC/anon/authenticated, hanya service_role.
-- Log percakapan TIDAK disimpan di sini (tetap lokal, spek §3.3).
-- =====================================================================

create schema if not exists extensions;
create extension if not exists vector with schema extensions;

-- ---------- sumber: asal data + lisensi ----------
create table if not exists public.sumber (
  id                     text primary key,
  nama                   text not null,
  jenis                  text not null,
  url                    text,
  lisensi                text not null,
  tanggal_akses          date,
  izin_ref               text,
  boleh_tampil_komersial text not null check (boleh_tampil_komersial in ('ya','tidak','belum')),
  dibuat                 timestamptz not null default now()
);

-- ---------- dalil: 1 potongan = 1 baris = 1 ID tetap ----------
create table if not exists public.dalil (
  id               text primary key,
  jenis            text not null check (jenis in ('ayat','hadits','tafsir','fatwa','teks')),
  teks_arab        text not null,          -- asli, untuk TAMPIL (lewat stempel)
  teks_arab_polos  text not null,          -- hasil normalisasi kode kita, hanya untuk CARI
  terjemahan       text not null,
  sumber_id        text not null references public.sumber(id),
  header_netral    text not null default '',
  istilah_latin    text not null default '',
  tag              text[] not null default '{}',
  status_review    text not null check (status_review in
                     ('dummy','diusulkan','diusulkan_kurator','disetujui_kurator','disetujui_penasihat')),
  tingkat_otoritas text,
  berlaku_sejak    date,
  dicabut_oleh     text,
  -- embedding: Qwen3 Embedding 8B, 4096 dimensi (terverifikasi 18 Nov 2026).
  -- Tanpa indeks: pencarian = scan penuh yang persis (cukup untuk skala prototipe).
  embedding        extensions.vector(4096),
  embedding_model  text,
  embedding_hash   text,                   -- sha256(model|dimensi|teks) -> cache: tidak embed ulang
  -- indeks kata (pengganti FTS5): Arab polos + terjemahan + istilah latin, parser `simple`
  fts              tsvector generated always as (
                     to_tsvector('simple'::regconfig,
                       teks_arab_polos || ' ' || terjemahan || ' ' || istilah_latin)
                   ) stored,
  dibuat           timestamptz not null default now(),
  diubah           timestamptz not null default now()
);
create index if not exists dalil_fts_idx on public.dalil using gin (fts);

create table if not exists public.hadits_derajat (
  dalil_id text not null references public.dalil(id) on delete cascade,
  derajat  text not null,
  penilai  text not null,
  primary key (dalil_id, penilai)
);

create table if not exists public.topik (
  id       text primary key,
  nama     text not null,
  induk_id text references public.topik(id)
);

create table if not exists public.dalil_topik (
  dalil_id text not null references public.dalil(id) on delete cascade,
  topik_id text not null references public.topik(id) on delete cascade,
  peran    text not null check (peran in ('pokok','pendukung','penjelas')),
  bobot    real not null default 1,
  primary key (dalil_id, topik_id)
);

create table if not exists public.relasi (
  dari_id text not null references public.dalil(id) on delete cascade,
  ke_id   text not null references public.dalil(id) on delete cascade,
  jenis   text not null check (jenis in ('tafsir_dari','menjelaskan','dikutip_oleh')),
  primary key (dari_id, ke_id, jenis)
);

create table if not exists public.masalah (
  id             text primary key,
  label          text not null,
  istilah_latin  text not null default '',
  topik_id       text references public.topik(id),
  rak            int not null check (rak in (1,2)),
  kriteria_batas text,
  status_review  text not null
);

create table if not exists public.pendapat (
  id               text primary key,
  masalah_id       text not null references public.masalah(id),
  pemilik_pendapat text not null,
  jenis_pemilik    text not null,
  kesimpulan_hukum text not null,   -- KUTIPAN PERSIS dari sumber
  syarat_qayd      text,            -- kutipan persis
  rujukan          text not null,   -- lokasi kutipan (halaman/butir)
  status_khilaf    text,
  penalaran        text,
  berlaku_sejak    date,
  dicabut_oleh     text,
  status_review    text not null
);

create table if not exists public.pendapat_dalil (
  pendapat_id   text not null references public.pendapat(id) on delete cascade,
  dalil_id      text not null references public.dalil(id) on delete cascade,
  cara_istidlal text,
  status_review text not null,
  primary key (pendapat_id, dalil_id)
);

create table if not exists public.contoh_pertanyaan (
  id            bigint generated always as identity primary key,
  masalah_id    text not null references public.masalah(id) on delete cascade,
  pertanyaan    text not null,
  penulis       text not null,
  status_review text not null
);

create table if not exists public.glosarium (
  istilah_gaul  text not null,
  istilah_kitab text not null,
  topik_id      text references public.topik(id),
  jenis         text not null check (jenis in ('bahasa','klasifikasi')),
  status_review text not null,
  primary key (istilah_gaul, istilah_kitab)
);

create table if not exists public.kontak_darurat (
  kode           text primary key,
  nama           text not null,
  nomor          text not null,
  jenis          text not null,
  terakhir_dicek date
);

create table if not exists public.set_uji (
  id             bigint generated always as identity primary key,
  pertanyaan     text not null,
  dalil_id_benar text[] not null default '{}',
  harus_menyerah boolean not null default false
);

-- ---------- fungsi pencarian (dipanggil lewat rpc) ----------

-- Pencarian kata: kueri SUDAH dinormalisasi di kode (fungsi yang sama dengan dokumen).
-- Kata-kata digabung dengan ATAU (|) lalu diurutkan ts_rank_cd (bukan BM25 persis).
create or replace function public.cari_teks(kueri text, jumlah int)
returns table (id text, skor real)
language sql stable
set search_path = ''
as $$
  with q as (
    select to_tsquery('simple'::regconfig, string_agg(quote_literal(t.lexeme), ' | ')) as tsq
    from unnest(to_tsvector('simple'::regconfig, kueri)) as t
  )
  select d.id, ts_rank_cd(d.fts, q.tsq) as skor
  from public.dalil d, q
  where q.tsq is not null and d.fts @@ q.tsq
  order by skor desc, d.id
  limit jumlah;
$$;

-- Pencarian makna: cosine persis (scan penuh). skor = 1 - jarak cosine.
create or replace function public.cari_embedding(vektor extensions.vector(4096), jumlah int)
returns table (id text, skor double precision)
language sql stable
set search_path = ''
as $$
  select d.id, 1 - (d.embedding operator(extensions.<=>) vektor) as skor
  from public.dalil d
  where d.embedding is not null
  order by d.embedding operator(extensions.<=>) vektor, d.id
  limit jumlah;
$$;

-- Alat belajar/uji: bagaimana parser `simple` memecah sebuah teks (mis. Arab berharakat).
create or replace function public.uji_parser(teks text)
returns text
language sql stable
set search_path = ''
as $$ select to_tsvector('simple'::regconfig, teks)::text; $$;

-- ---------- keamanan: RLS + hak akses ----------
do $$
declare t text;
begin
  foreach t in array array['sumber','dalil','hadits_derajat','topik','dalil_topik','relasi','masalah',
                           'pendapat','pendapat_dalil','contoh_pertanyaan','glosarium','kontak_darurat','set_uji']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant select, insert, update, delete on table public.%I to service_role', t);
  end loop;
end $$;

grant usage on schema extensions to service_role;
grant usage, select on all sequences in schema public to service_role;

revoke execute on function public.cari_teks(text, int) from public, anon, authenticated;
revoke execute on function public.cari_embedding(extensions.vector, int) from public, anon, authenticated;
revoke execute on function public.uji_parser(text) from public, anon, authenticated;
grant execute on function public.cari_teks(text, int) to service_role;
grant execute on function public.cari_embedding(extensions.vector, int) to service_role;
grant execute on function public.uji_parser(text) to service_role;

-- Beri tahu Data API (PostgREST) untuk memuat ulang skema.
notify pgrst, 'reload schema';
