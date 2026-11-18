# CLAUDE.md: Al Hikmah (prototipe AI agent)

## Tujuan
Prototipe AI agent tanya-jawab Islami (RAG, rak bertahap: ibadah harian dan muamalah dekat siswa).
Prinsip utama: agama tidak boleh salah. Detail: docs/spek-prototipe-agent-al-hikmah.md (menang bila konflik).
Peta kerja: docs/PANDUAN-FASE-CLAUDE-CODE.md. Konteks latar: docs/konteks-proyek-al-hikmah.md
(abaikan bagian video, aturan sosok, feedback). Keputusan pemilik yang mengubah spek: docs/keputusan-pemilik.md.

## Larangan utama
- Jangan mengetik ayat/hadits/fatwa dari ingatan; teks hanya dari database lewat mesin stempel.
- Jangan mengarang ID dalil/nomor hadits/isi data; uji kabel pakai DUMMY (ditandai, bukan dalil asli).
- Jangan memberi fatwa; hal agama ditandai "perlu penasihat syariah" ke pemilik proyek.
- AI penjelas hanya menulis KODE; kesimpulan hukum hanya lewat [PENDAPAT-n] (kutipan persis).
- Aturan jawaban v1 (9 aturan + 3b, spek §3.2) dijaga kode, bukan hanya prompt.
- Prinsip veto: Jev/LLM-judge/daftar kata hanya boleh menahan, tidak meloloskan sendirian.
- Jangan menempel/mencetak kunci; .env, DB lokal, log masuk .gitignore. Kunci service_role Supabase
  hanya di server/CLI, tidak pernah ke UI.
- Jangan menambah fitur di luar cakupan; usulkan dulu. UI basic baru setelah pipeline menjawab (keputusan-pemilik).
- 💡 usulan bukan ✅ keputusan. Jangan menebak slug/endpoint API: cek docs/catatan-api.md.

## Cara bekerja
- Satu fase per sesi; ikuti gerbang masuk, tugas, bukti, selesai bila, berhenti dan lapor (template panduan §0.3).
- Tes hijau sebelum lanjut; commit kecil; tempel keluaran sebagai bukti.
- Pemilik proyek pemula dan ingin belajar: jelaskan sederhana dengan analogi, satu pertanyaan tajam per waktu,
  gunakan --debug untuk memperlihatkan proses.
- Bahasa Indonesia santai ("bro"). Nama tabel/kolom mengikuti spek (Indonesia).

## Arsitektur singkat
core/ = pipeline murni (handleTurn), tanpa I/O terminal. cli/ = pembungkus tipis. Penyimpanan di balik
interface Repositori (adapter Supabase utama; adapter memori untuk tes). Tiap tahap hanya memindahkan ID;
teks asli diambil di akhir (stempel).

## Arah gagal
Hukum agama -> menyerah. Nada/sikap -> lembut (jangan menegur/stop bila ragu). Krisis -> waspada
(detektor mana pun "ya" -> jalur krisis; tidak_jelas/gagal -> mode kesusahan + tawarkan kontak).
Tangga nada: level 1 tanpa teguran; teguran dihitung kode (maks 3); stop = ujung tangga; krisis tak pernah distop.

## Hipotesis
D1–D8 dan semua angka = hipotesis. Revisi hanya dari kasus nyata di docs/buku-kasus.md.

## Perintah
npm run cek | test | typecheck   (menyusul: ingest | cari "<q>" [--debug] | chat [--debug] | uji)

## Cakupan dan pengguna (revisi 3–5)
Al Hikmah = aplikasi siswa (belum ada, urusan tim dev). Kita hanya fitur AI. Rak 1 ibadah harian, Rak 2 muamalah
dekat siswa (irisan: pinjol, paylater [label regional], jual beli online; judi online & giveaway -> menyerah).
Di luar rak -> jujur "rujukannya belum ada" + saran guru agama. Pengguna kemungkinan siswa <18:
uji internal boleh, uji ke siswa belum. Core tidak menerima data siswa/akun.
Data API komunitas / lisensi belum jelas: boleh_tampil_komersial=belum.

## Lingkungan cloud
Sesi Claude Code cloud: kunci sebagai environment variable (bukan .env); host openrouter.ai dan
<ref>.supabase.co harus ada di Allowed domains. Container hilang bila tak dipush: push tiap selesai langkah.

## Peringatan
Prototipe BELUM boleh dicoba user publik sebelum review penasihat syariah dan psikolog.
