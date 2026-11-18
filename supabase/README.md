# Menjalankan migrasi di Supabase (SQL Editor)

Migrasi = "cetak biru" gudang: berkas SQL yang membuat tabel, indeks, fungsi cari, dan aturan kunci.
Dijalankan **pemilik proyek** di SQL Editor (keputusan-pemilik.md), sekalian belajar.

1. Buka dashboard Supabase → proyek Al Hikmah → menu **SQL Editor** → **New query**.
2. Salin **seluruh** isi `supabase/migrations/20261118000001_skema_awal.sql`, tempel, klik **Run**.
   Harus muncul "Success. No rows returned". Aman dijalankan ulang.
3. Cek di terminal: `npm run cek` → baris Supabase harus `[OK] ... tabel terbaca`.
4. Uji parser: `npm run uji-parser`.

Yang dibuat: 13 tabel (spek §6.2), ekstensi `vector` (pgvector), indeks kata (`fts`),
fungsi `cari_teks`, `cari_embedding`, `uji_parser`. RLS aktif tanpa policy: kunci publik/anon
**tidak bisa membaca apa pun**; hanya kunci server (service_role) yang dipakai CLI.

Catatan `SUPABASE_URL`: cukup `https://<ref>.supabase.co` (tanpa `/rest/v1/`). Kode tetap
menerima bentuk panjang (diambil origin-nya), tetapi bentuk pendek lebih rapi.
