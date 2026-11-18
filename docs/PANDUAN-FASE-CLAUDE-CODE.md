# Panduan Fase Claude Code: Prototipe AI Agent "Al Hikmah"

> **Untuk:** Claude Code. Taruh di repo sebagai `docs/PANDUAN-FASE-CLAUDE-CODE.md`.
> **Tanggal:** 13 November 2026.
> **Sifat dokumen:** **peta kerja**: urutan fase, tugas konkret, tes, bukti, dan gerbang berhenti. Ini **bukan** tempat alasan desain.
> **Dokumen lain:**
> - `docs/spek-prototipe-agent-al-hikmah.md` (revisi 2): **detail desain dan alasan**. **Menang bila ada konflik** dengan dokumen ini. Setiap fase di bawah menunjuk bagian spek yang harus dibaca.
> - `docs/konteks-proyek-al-hikmah.md`: latar saja. **Abaikan §6, §7, §8** (video, aturan sosok, feedback); itu di luar prototipe.
> - Data asli dan berkas uji datang dari **chat dataset** (format di spek §9), bukan dari dokumen ini.
> - **Revisi 3 (17 November 2026):** Al Hikmah adalah **aplikasi siswa yang belum ada**; kamu hanya membangun **fitur AI** (prototipe, terminal). Cakupan = **rak bertahap** (Rak 1 ibadah harian, Rak 2 muamalah dekat siswa); pengguna kemungkinan **siswa di bawah 18**. Detail: spek **§14.5**. Jangan menanyakan atau menunggu urusan aplikasi/tim dev.
>
> **Penanda status:** ✅ diputuskan pemilik proyek · 💡 usulan (boleh dikritisi dengan alasan, jangan diperlakukan seperti ✅) · ❓ terbuka (tanyakan atau putuskan lewat uji).

---

## 0. Cara memakai panduan ini (berlaku di semua fase)

### 0.1 Prinsip kerja
1. **Satu fase = satu sesi kerja.** Jangan melompat. Jangan mengerjakan fase berikutnya "sekalian".
2. Setiap fase punya urutan: **Gerbang masuk → Baca → Tugas → Bukti → Selesai bila → Berhenti dan lapor**. Bila gerbang masuk belum terpenuhi, **berhenti dan katakan apa yang kurang**; jangan menambal dengan data karangan.
3. **Baca hanya yang ditunjuk** untuk fase itu (hemat token). Baca bagian spek lain bila perlu, tetapi jangan memuat seluruh dokumen setiap sesi.
4. **Tes hijau dulu, baru lanjut.** Commit kecil dan sering, satu pesan commit per langkah yang berhasil.
5. Jangan klaim "selesai" atau "aman" sebelum tes yang relevan dijalankan dan hasilnya **ditunjukkan** (tempel keluaran, bukan hanya "lulus").
6. **Kamu yang merancang secara proaktif.** Beri rekomendasi dan alasan, jangan melempar keputusan teknis ke pemilik proyek tanpa usulan. Tetapi keputusan yang **milik pemilik proyek** (nilai produk, hal yang menyentuh agama/keselamatan) ditanyakan, **satu pertanyaan tajam pada satu waktu**.
7. **Pemilik proyek pemula total** dan ingin belajar prosesnya (pola "Brain-to-LLM": ia berpikir/menulis draf dulu, kamu membantu). Maka:
   - jelaskan istilah teknis saat pertama muncul, dengan analogi;
   - gunakan **mode debug** untuk memperlihatkan sistem "berpikir";
   - bila fase punya **Latihan pemilik proyek**, minta ia mengerjakannya **sebelum** kamu menjalankan langkah terkait;
   - koreksi ide yang keliru dengan terus terang, akui kekeliruanmu sendiri.
8. Bahasa komunikasi: **Bahasa Indonesia santai** (ia memanggil "bro"). Nama tabel/kolom data **mengikuti spek (Indonesia)**.

### 0.2 Aturan keras (ringkas; lengkap di spek §3, tidak boleh dilanggar)
- **Jangan pernah mengetik teks ayat/hadits/fatwa dari ingatan.** Teks Arab dan terjemahan hanya dari database lewat mesin stempel. AI penjelas hanya menulis **kode**.
- **Jangan mengarang ID dalil, nomor hadits, atau isi data.** Uji kabel pakai data **DUMMY** (spek §9.3), diberi tanda jelas, tidak pernah ditampilkan sebagai dalil asli, tidak dipakai menilai kualitas.
- **Prototipe tidak memberi fatwa.** Hal yang menyentuh kebenaran agama ditandai **"perlu penasihat syariah"** ke pemilik proyek, bukan ke user.
- **Prinsip veto (spek §3.5):** Jev, LLM-judge, dan daftar kata hanya boleh **menahan/menyerah**, tidak boleh jadi satu-satunya alasan jawaban **lolos**. (Krisis memakai ATAU.)
- **Arah gagal:** hukum agama → **menyerah**; nada/sikap → **lembut** (jangan menegur/menghentikan bila ragu); krisis → **waspada** (detektor mana pun "ya" → jalur krisis).
- **Rahasia:** kunci hanya di `.env`; `.env`, DB lokal, dan log masuk `.gitignore`. Jangan pernah mencetak kunci atau menempelkannya di chat/kode.
- **Pengguna kemungkinan siswa di bawah 18:** uji **internal** boleh; uji ke siswa **belum boleh**. `core` **tidak boleh menerima data siswa/akun** (hanya teks pertanyaan dan ID sesi acak). Pertanyaan di luar rak dijawab jujur "rujukannya belum ada" + saran **guru agama**; topik `sensitif_remaja` dan `bergantung_waktu` ditangani sesuai spek §14.5.
- **Data API komunitas** dipakai sebagai bahan awal: tandai `boleh_tampil_komersial = belum`, jangan dipublikasikan.
- **Tanpa UI, tanpa fitur di luar cakupan** (spek §2). Bila merasa perlu menambah sesuatu, **usulkan dulu**.
- **Rancangan D1–D8 adalah hipotesis** (spek §3.6, §14). Jangan membangun pertahanan tambahan hanya karena membayangkan kegagalan; tambahkan setelah kegagalan itu **terlihat** dan dicatat di buku kasus.

### 0.3 Template laporan akhir fase (wajib, singkat)
Setiap fase diakhiri dengan laporan ini, dalam Bahasa Indonesia sederhana:

```
LAPORAN FASE <n>
1. Yang dibangun (3–5 baris, bahasa sederhana, pakai analogi bila perlu)
2. Bukti (tempel keluaran tes/perintah; bukan klaim)
3. Yang mengejutkan atau tidak sesuai harapan
4. Yang belum beres / ditunda dan alasannya
5. Keputusan yang menunggu pemilik proyek / penasihat / psikolog
6. Catatan untuk buku kasus (bila ada kegagalan nyata)
7. Satu pertanyaan tajam (bila ada)
```
Setelah laporan: **berhenti dan tunggu persetujuan.**

### 0.4 Bila macet atau bertentangan
- Konflik antara dokumen → spek menang; sampaikan konfliknya ke pemilik proyek.
- Dokumentasi API tidak cocok dengan spek (slug model, endpoint, skema) → **jangan menebak**; catat di `docs/catatan-api.md` dan laporkan.
- Tes gagal setelah dua percobaan perbaikan → berhenti, jelaskan apa yang kamu coba, tunjukkan keluaran, minta arahan.

---

## 1. Peta fase

| Fase | Tujuan (satu kalimat) | Output utama | Butuh data asli? | Berhenti untuk |
|---|---|---|---|---|
| **0** | Menyamakan pemahaman dan menyiapkan fondasi repo | Struktur repo, `CLAUDE.md`, cek lingkungan, `catatan-api.md` | Tidak | Persetujuan ringkasan dan struktur |
| **1** | Inti deterministik: penyimpanan, ingest, pencarian polos, stempel, validasi | `cari`, tes hijau, ablation kecil, log jejak | Tidak (pakai DUMMY) | Pemilik proyek melihat retrieval bekerja |
| **2** | Reranker, kalibrasi, pemetaan masalah, gerbang+slot, gerbang menyerah | Ambang terkalibrasi, laporan evaluasi dev | **Ya** (kalibrasi dan evaluasi) | Laporan evaluasi dev pertama |
| **3** | AI penjelas berslot, stempel hukum, validasi, pemeriksa akhir | Jawaban contoh, daftar FP/FN validator | **Ya** (data pendapat) | Jawaban contoh ditinjau |
| **4** | Sistem keselamatan | Tangga nada, jalur krisis, lift, transkrip uji | Ya (uji keselamatan) | Transkrip lulus/gagal |
| **5** | Evaluasi hold-out dan serah-terima | Laporan akhir, README, panduan `core` | **Ya** (hold-out) | Laporan akhir |
| **6** | Perbaikan dari kasus nyata | Buku kasus, revisi berbukti | Ya | Tiap siklus perbaikan |

**Urutan ketergantungan data:** Fase 1 boleh jalan dengan DUMMY. **Fase 2 langkah kalibrasi/evaluasi tidak boleh dengan DUMMY**; bila data asli belum ada, kerjakan hanya bagian kabel (klien, antarmuka, tes unit) dan **laporkan bahwa fase tidak bisa selesai**.

---

## Fase 0: Persiapan dan kesepakatan

**Gerbang masuk:** `docs/` berisi spek dan konteks; pemilik proyek punya akun OpenRouter dan kunci; repo Git kosong.

**Baca:** spek §0–§3, §5.1, §12. Konteks: hanya §1 sebagai latar.

**Tugas:**
1. **Ringkas pemahamanmu dalam 10 baris**, minta pemilik proyek mengoreksi.
2. **Tanyakan satu per satu** (berhenti menunggu tiap jawaban):
   - stack: "Tim web sudah punya stack backend (mis. Next.js/TypeScript atau Python)?" Bila tidak tahu → **TypeScript (Node 20+)** (💡 usulan, supaya `core/` mudah dipakai backend web);
   - `.env` dan kunci OpenRouter siap? credit limit sudah dipasang?
   - 3 orang penulis soal uji sudah ada? (mereka harus menulis **sebelum** database jadi);
   - repo Git sudah ada?
3. Buat struktur repo (Lampiran B), `CLAUDE.md` (Lampiran A), `.gitignore`, `.env.example`, kerangka `README.md`, kerangka konfigurasi (spek §5.3), `docs/buku-kasus.md` (kosong dengan template, Lampiran C).
4. Skrip `cek` (mis. `npm run cek`): memeriksa versi Node, `.env` ada, kunci terbaca **tanpa dicetak**, dan satu panggilan murah ke OpenRouter berhasil.
5. **Baca dokumentasi resmi** OpenRouter (chat completions, embeddings, rerank) dan **Decisions API/Jev** (alpha). Tulis `docs/catatan-api.md`: bentuk request/response **yang sebenarnya**, slug model yang tersedia hari ini, batas masukan Jev, dan **hal yang berbeda dari spek**. Jangan menebak.
6. **Jangan menulis logika pipeline.**

**Bukti:** keluaran `cek`; isi `docs/catatan-api.md`; struktur repo.
**Selesai bila:** pemilik proyek menyetujui ringkasan dan struktur; `cek` hijau.

**Latihan pemilik proyek (sebelum lanjut):** tulis satu baris: *"Menurutku bagian pipeline yang paling mungkin gagal adalah ____ karena ____."* Disimpan di `docs/tebakan.md`, dibandingkan di Fase 5.

---

## Fase 1: Inti deterministik, ingest, dan retrieval polos ("irisan tipis")

**Gerbang masuk:** Fase 0 disetujui.

**Baca:** spek §4.3, §6.1–6.3, §6.6, §6.12 (poin 1–4 dan stempel), §6.15–6.16, §9 (format), §9.3 (DUMMY). **Hanya bila mengunduh/memuat data asli:** `docs/referensi/peta-sumber-data-dan-lisensi.md` (§2 Tanzil, §4 hadits, §11 rencana ekstraksi). Itu **referensi, belum diverifikasi penuh; spek §14.6 menang.** Untuk fatwa/ibadah: `docs/referensi/sumber-rak1-dan-rak2.md` (§2 tabel putusan, §3.4 fatwa Rak 2). Jangan memuat referensi tiap sesi.

**Tugas (urut; commit tiap langkah):**
1. **Skema SQLite + antarmuka `Repositori`** (tabel spek §6.2) beserta migrasi. Tes: buat, isi, baca, hapus.
2. **Normalisasi teks Arab** (hapus harakat dan tatwil, samakan varian alif, dst.) dengan tes kasus. **Skrip pendek (±5 baris)** menguji bagaimana tokenizer FTS5 `unicode61` memperlakukan harakat; catat hasilnya (dugaan: harakat dianggap pemisah kata). **Kueri harus dinormalisasi dengan fungsi yang sama.**
3. **Data DUMMY** (6–8 baris, `status_review = dummy`, `teks_arab = "[DUMMY]"`, ID jelas palsu) sesuai spek §9.3. **Loader ingest + validasi**: tolak baris tanpa sumber/lisensi, ID tidak sesuai format; idempoten; laporan penolakan yang jelas.
4. **Klien embedding** (OpenRouter), teks yang di-embed = `terjemahan` + `header_netral` (bukan ringkasan AI); simpan; cache; **batas biaya per run**; catat token dan estimasi biaya.
5. **BM25 (FTS5)** atas `teks_arab_polos` + `terjemahan` + `istilah_latin`; **cosine di kode**; **RRF** (k = 60, tidak disetel). **Tes unit dengan angka yang bisa dihitung tangan.**
6. **Baseline acak** dan perintah **`cari "<pertanyaan>"`** dengan `--debug` (skor BM25, embedding, RRF per kandidat). **Ablation mini**: acak vs BM25-saja vs embedding-saja vs hybrid.
7. **Mesin stempel + validasi kode** (spek §6.12 poin 1–4 dan 6): kode asing ditolak; teks stempel **identik byte-per-byte** dengan database; deteksi karakter Arab pada keluaran AI.
8. **Log jejak** per giliran (spek §6.15): ID sesi acak, tanpa ID user, opsi `simpan_teks_sensitif`.

**Catatan:** data DUMMY **tidak** menilai kualitas retrieval. Bila data asli dari chat dataset sudah ada, muat dan jalankan ulang ablation; tandai hasil mana yang dari dummy dan mana yang dari data asli. Bila data Tanzil/hadits asli sudah ada: tes **6.236 baris Qur'an**, basmalah tidak dipotong, UTF-8 apa adanya, checksum berkas, `skema_penomoran` hadits (spek §14.6). Tambahkan ablation **indeks tanpa terjemahan vs dengan terjemahan**.

**Bukti:** keluaran `cari` untuk 3–5 pertanyaan; keluaran tes; tabel ablation; hasil uji tokenizer.
**Selesai bila:** `cari` mengembalikan kandidat dengan skor komponen; tes RRF/cosine/normalisasi/stempel/validasi hijau; ablation menunjukkan hasil dibanding baseline; pemilik proyek **melihat sendiri** retrieval bekerja dan di mana meleset.

**Latihan pemilik proyek:** **sebelum** menjalankan `cari`, tulis prediksi: *"Dari 5 pertanyaan ini, yang akan gagal: ____ karena ____."* Bandingkan setelahnya.

---

## Fase 2: Reranker, kalibrasi, pemetaan masalah, gerbang + slot, gerbang menyerah

**Gerbang masuk:** Fase 1 hijau. **Data asli** minimal: ≥ 20 dalil + daftar `masalah` (**5–7 per rak**, Rak 1 dan Rak 2) + pendapat + **≥ 20 soal dev** (dari chat dataset). **Bila belum ada, kerjakan hanya langkah kabel (2.1, 2.2, 2.5, 2.6 dengan fixture sintetis) dan laporkan bahwa kalibrasi/evaluasi (2.4, 2.7) belum bisa.**

**Baca:** spek §5.2–5.3, §6.4, §6.5, §6.7–6.9, §6.17 (kalibrasi, metrik).

**Tugas:**
1. **Klien rerank** (Voyage via OpenRouter); simpan **skor mentah**; verifikasi (dan catat) apakah OpenRouter meneruskan skor apa adanya. **Dilarang min-max per pertanyaan.**
2. **Backend keputusan** (satu antarmuka, dua implementasi: **Jev** via Decisions API dan **LLM murah** dengan structured output), versi dikunci, **fixture rekam/putar ulang** agar tes tidak berbayar, panggilan **paralel**, tabel fail-safe (spek §6.4), detektor krisis kedua disiapkan (dipakai Fase 4).
3. **Penyusun ulang + pemetaan masalah** (spek §6.5): `pertanyaan_utuh`, pemilihan **ID dari daftar tertutup** atau "tidak ada", kalimat asli ikut dicari, multi-kueri, "Dipahami sebagai: …" di terminal, `contoh_pertanyaan` (doc2query) sebagai bahan kueri. Metrik pemetaan: *salah ID dengan yakin* vs *"tidak ada" padahal ada*.
4. **Kalibrasi ambang** (spek §6.17), **butuh data asli**:
   - jalankan soal dev sampai reranker, simpan skor mentah top-8;
   - buat **alat pelabelan CLI** cepat; pemilik proyek (+ satu orang lain) memberi label "ya/tidak: membahas masalah yang ditanya?";
   - buat histogram (teks/CSV); **bila tumpang tindih parah, laporkan: satu ambang tidak cukup**;
   - pilih ambang **konservatif** (semua near-miss harus menyerah; hitung soal sah yang ikut terbuang); **bekukan**; tulis `docs/kalibrasi-ambang.md`.
5. **Gerbang relevansi + slot** (spek §6.8): maks 2/2/2; pendapat via JOIN `masalah_id` **dengan cek silang**; otoritas hanya urutan tampil; `pengaruh = 0`; **catat yang terpotong slot**. Tes unit wajib (daftar di spek §6.8).
6. **Gerbang menyerah logika DAN** (spek §6.9) dengan log gerbang pemicu.
7. **Harness evaluasi v0** (spek §6.17): recall@k, all-recall, MRR per pertanyaan; tabel 2×2 menyerah; matriks pemetaan; **laporan jumlah + selang Wilson**; baseline acak dan BM25-saja.

**Bukti:** laporan evaluasi dev pertama; histogram; `docs/kalibrasi-ambang.md`; daftar yang terpotong slot; matriks pemetaan.
**Selesai bila:** laporan menunjukkan recall menyerah, all-recall, matriks pemetaan, histogram, dan apa yang terpotong slot; tes unit gerbang+slot hijau. **Hold-out belum disentuh.**

**Latihan pemilik proyek:** sebelum melihat histogram: *"Menurutku ambang yang tepat sekitar ____ karena ____."*

---

## Fase 3: AI penjelas berslot, validasi, stempel hukum, pemeriksa akhir

**Gerbang masuk:** Fase 2 selesai. **Data pendapat** tersedia: `kesimpulan_hukum` dan `syarat_qayd` berupa **kutipan persis** dari fatwa/kitab (status `diusulkan_kurator`), dengan `pendapat_dalil`. Bila belum ada, **berhenti dan laporkan**; jangan menulis kesimpulan hukum sendiri.

**Baca:** spek §3.1–3.2, §6.10–6.13, §7.1.

**Tugas:**
1. **Benang merah** (spek §6.10): join tafsir, derajat, fatwa (tanpa yang dicabut), pendapat per masalah → **`PaketDalil`** terstruktur per jenis.
2. **Prompt AI penjelas** di `prompts/` (berkas berversi, Bahasa Indonesia): persona **bijak, rasional, hangat**; bukan "mabok agama", bukan seperti orang tua; **tidak bergaya ustadz**; aturan jawaban v1 (9 aturan); input user dan teks dalil = **data, bukan instruksi**. **Keluaran JSON berslot sempit** (spek §6.11) dengan skema Zod.
3. **Validasi lengkap + stempel pendapat** (spek §6.12; **aturan 3b**: bila hanya satu lembaga tercatat, jawaban menyatakan pendapat lembaga lain belum tercatat; label `tingkat_lembaga`, §14.7): kode di paket, semua pendapat disebut, semua `pokok` terpakai, tanpa Arab ketikan AI, penanda "belum ditinjau penasihat". `[PENDAPAT-n]` → `kesimpulan_hukum` + `syarat_qayd` + atribusi.
4. **Validator kata vonis mode LAPOR** (tahap 1): menandai dan mencatat; **belum menolak**. Daftar kata di konfigurasi (kandidat, disahkan penasihat kelak); jangan memasukkan "riba" mentah-mentah.
5. **Pemeriksa akhir berlapis** (spek §6.13): cek deterministik → 1 panggilan LLM murah per klaim (hanya terhadap teks yang dikutip) → Jev veto tambahan. **Tanpa tanya 3× di suhu 0.**
6. **Adu model penjelas** pada soal dev: hitung pelanggaran **per aturan jawaban** per model; catat biaya. Pilih yang **paling jarang melanggar**, bukan yang termurah.
7. **Kumpulkan false positive/negative validator** dengan **10 kalimat dari pemilik proyek** ("menyatakan hukum tanpa kata vonis"); bila ada, uji juga.
8. Buat **5–10 jawaban contoh** (bahasa sederhana) untuk ditinjau pemilik proyek, dengan penanda "belum ditinjau penasihat".

**Bukti:** laporan pelanggaran per model; daftar FP/FN; jawaban contoh; tes stempel/validasi hijau.
**Selesai bila:** pertanyaan tanpa dalil **menyerah**; kode asing selalu ditolak; stempel identik dengan database; daftar FP/FN terkumpul; jawaban contoh siap ditinjau.

**Latihan pemilik proyek (wajib, sebelum langkah 7):** tulis **10 kalimat yang menyatakan hukum tanpa memakai kata vonis apa pun**. Kalau mudah, ia membuktikan sendiri kenapa daftar kata itu hanya alarm asap; hasilnya jadi soal uji validator.

---

## Fase 4: Sistem keselamatan

**Gerbang masuk:** Fase 3 selesai.

**Baca:** spek §7 (semua), §6.4, §6.14, §6.15.

**Tugas:**
1. **Detektor keputusan** (paralel, fail-safe sesuai spek §6.4): `krisis` (**dua detektor, logika ATAU**), `kesusahan`, `nada` (0–3), `niat` (termasuk `fatwa_personal`, `di_luar_topik`), `lanjutan`.
2. **Tangga respons nada kasar** (spek §7.2–7.3): **penghitung teguran di kode** (maks 3), tren nada → "emosi turun" (heuristik awal di spek), aksi (`BANTU_DULU`, `JAWAB_DENGAN_AJAKAN`, `TEGAS`, `SESI_SELESAI`), redaksi teguran tidak diulang. **Stop = ujung tangga**, bukan reaksi pertama.
3. **Paket adab** (tag `adab_lisan`): DUMMY dulu; isi asli dari penasihat; tetap lewat stempel.
4. **Jalur krisis "AI being AI"** (spek §7.5): melewati pipeline fiqih; skrip **paling konservatif**; `[KONTAK-KRISIS]` ditukar dari tabel `kontak_darurat` (benih dengan catatan verifikasi; **AI tidak mengetik nomor**); **tidak distop**; `tidak_jelas`/gagal → mode kesusahan + tawarkan kontak.
5. **Lift** (spek §7.4): hitung token tiap giliran oleh kode; berhenti **sebelum** penuh (ambang dari konfigurasi); penutup hangat; **jalur krisis dikecualikan**.
6. **Rujukan** untuk fatwa personal dan "belum tercakup" untuk di luar cakupan.
7. **Jalankan set uji keselamatan** (spek §7.7) termasuk **soal campuran** dan **putus asa karena utang**; hasil = **transkrip lulus/gagal per skenario, dinilai dari perilaku** (mode/status/ada-tidaknya teguran/kode kontak), bukan kata persis. **Baca tiap kegagalan.** Penilaian nada dan kelayakan **ditandai untuk peninjau manusia**, tidak dinilai otomatis.
8. Tulis di README: **prototipe belum boleh dicoba user publik** sebelum review penasihat syariah dan psikolog.

**Bukti:** transkrip per skenario; tabel lulus/gagal; kegagalan yang tersisa dijelaskan **terus terang**.
**Selesai bila:** semua skenario spek §7.7 ditunjukkan; hasil "boleh dicoba orang lain?" (Lampiran G) dijawab jujur.

**Latihan pemilik proyek:** beri catatan pada transkrip: *"ini terlalu galak / terlalu lembek / pas"* untuk 5 respons teguran.

---

## Fase 5: Evaluasi menyeluruh dan serah-terima

**Gerbang masuk:** Fase 4 selesai. **Hold-out** (40 soal, ditulis penulis lain) ada dan **belum pernah dipakai menyetel apa pun**.

**Baca:** spek §6.17, §14, §8 (Fase 5).

**Tugas:**
1. **Bekukan konfigurasi** (commit + tag). Tidak ada penyetelan setelah ini.
2. Jalankan **hold-out sekali**.
3. **Laporan akhir:** metrik dengan **jumlah + selang Wilson**; **gerbang nol toleransi dibaca per kejadian** (kode asing lolos, teks dalil diketik AI, vonis tunggal saat ada ikhtilaf, menjawab soal yang harus menyerah, krisis terlewat); perbandingan backend (Jev vs LLM murah) dan model; **kegagalan terburuk**; **biaya per 1.000 pertanyaan** (estimasi dari log); angka yang **tidak bermakna** pada ukuran sampel itu disebut jelas.
4. **Daftar yang menunggu** penasihat syariah (spek §11) dan psikolog.
5. **README** cara menjalankan dan batasannya; **panduan `core`** untuk tim web (`handleTurn`, bentuk hasil, konfigurasi) dan **elemen yang wajib tampil di UI** ("belum ditinjau penasihat", "Dipahami sebagai", teks menyerah).
6. Isi **buku kasus** dari kegagalan hold-out.

**Bukti:** `reports/<tanggal>.md` + data mentah; README; panduan `core`.
**Selesai bila:** laporan akhir diterima pemilik proyek.

**Latihan pemilik proyek:** bandingkan tebakan Fase 0 (`docs/tebakan.md`) dengan hasil. Apa yang meleset dari dugaanmu?

---

## Fase 6: Putaran perbaikan dari kasus nyata

Berlangsung setelah prototipe dipakai. **Siklus:**
1. **Pakai** prototipe (set uji baru, pemakaian oleh pemilik proyek/penguji).
2. **Catat** tiap kegagalan nyata di `docs/buku-kasus.md` (Lampiran C), termasuk **tahap yang gagal** (dari log jejak).
3. **Cari pola**: ≥ 3 kasus sejenis atau turunnya metrik di hold-out. Kasus **nol toleransi** langsung ditindaklanjuti. Satu kasus kosmetik tidak cukup mengubah desain besar.
4. **Ubah satu hal**, uji di dev, lalu hold-out **baru** (hold-out yang sudah dipakai menyetel dianggap terpakai).
5. **Catat** perubahan dan alasannya di Riwayat spek (§14.3) beserta keputusan D-n yang terkait.
6. Periksa **tanda tinjau ulang** (spek §14.4).

Aturan: **jangan menambah pertahanan dari kegagalan yang hanya dibayangkan.** Pengecualian: aturan keras dan sistem keselamatan tidak menunggu kasus.

---

## Lampiran A: Isi `CLAUDE.md` siap salin (maks ±60 baris)

```markdown
# CLAUDE.md: Al Hikmah (prototipe AI agent)

## Tujuan
Prototipe AI agent tanya-jawab Islami (RAG, rak bertahap: ibadah harian dan muamalah dekat siswa), terminal saja.
Prinsip utama: agama tidak boleh salah. Detail: docs/spek-prototipe-agent-al-hikmah.md (menang bila konflik).
Peta kerja: docs/PANDUAN-FASE-CLAUDE-CODE.md. Konteks latar: docs/konteks-proyek-al-hikmah.md
(abaikan bagian video, aturan sosok, feedback).

## Larangan utama
- Jangan mengetik ayat/hadits/fatwa dari ingatan; teks hanya dari database lewat mesin stempel.
- Jangan mengarang ID dalil/nomor hadits/isi data; uji kabel pakai DUMMY (ditandai, bukan dalil asli).
- Jangan memberi fatwa; hal agama ditandai "perlu penasihat syariah" ke pemilik proyek.
- AI penjelas hanya menulis KODE; kesimpulan hukum hanya lewat [PENDAPAT-n] (kutipan persis).
- Prinsip veto: Jev/LLM-judge/daftar kata hanya boleh menahan, tidak meloloskan sendirian.
- Jangan menempel/mencetak kunci; .env, DB lokal, log masuk .gitignore.
- Jangan menambah UI atau fitur di luar cakupan; usulkan dulu.
- 💡 usulan bukan ✅ keputusan.

## Cara bekerja
- Satu fase per sesi; ikuti gerbang masuk, tugas, bukti, selesai bila, berhenti dan lapor.
- Tes hijau sebelum lanjut; commit kecil; tempel keluaran sebagai bukti.
- Pemilik proyek pemula dan ingin belajar: jelaskan sederhana, satu pertanyaan tajam per waktu,
  gunakan --debug untuk memperlihatkan proses.
- Bahasa Indonesia santai.

## Arah gagal
Hukum agama -> menyerah. Nada/sikap -> lembut (jangan menegur/stop bila ragu). Krisis -> waspada
(detektor mana pun "ya" -> jalur krisis; tidak_jelas/gagal -> mode kesusahan + tawarkan kontak).

## Hipotesis
D1–D8 dan semua angka = hipotesis. Revisi hanya dari kasus nyata di docs/buku-kasus.md.

## Perintah
npm run cek | ingest | cari "<q>" [--debug] | chat [--debug] | uji | test

## Cakupan dan pengguna (revisi 3)
Al Hikmah = aplikasi siswa (belum ada, urusan tim dev). Kita hanya fitur AI. Rak 1 ibadah harian, Rak 2 muamalah
dekat siswa; di luar rak -> jujur "rujukannya belum ada" + saran guru agama. Pengguna kemungkinan siswa <18:
uji internal boleh, uji ke siswa belum. Core tidak menerima data siswa/akun. Data API komunitas: boleh_tampil_komersial=belum.

## Peringatan
Prototipe BELUM boleh dicoba user publik sebelum review penasihat syariah dan psikolog.
```

## Lampiran B: Struktur folder (💡)

```
al-hikmah-agent/
  CLAUDE.md  README.md  .env.example  .gitignore
  config/            # konfigurasi tunggal (model, ambang, slot, batas biaya)
  prompts/           # prompt berversi (penjelas, penyusun ulang, pemeriksa, keputusan)
  core/              # pipeline murni, tanpa I/O terminal; handleTurn(session, pesan)
    keputusan/  retrieval/  gerbang/  jawaban/  keselamatan/  repositori/
  cli/               # pembungkus tipis: ingest, cari, chat, uji, cek
  data/              # SQLite lokal, berkas masukan (gitignored bila sensitif)
  reports/           # laporan evaluasi (+ data mentah JSONL)
  tests/             # unit + fixture rekam/putar ulang
  docs/              # spek, panduan fase, konteks, referensi/ (peta-sumber-data-dan-lisensi.md),
                     # catatan-api.md, kalibrasi-ambang.md,
                     # tebakan.md, buku-kasus.md
```

## Lampiran C: Template entri `docs/buku-kasus.md`

```
### K-<nomor>  (<tanggal>)
- Pertanyaan (tanpa data pribadi):
- Tahap yang gagal (dari log jejak):
- Diharapkan:
- Terjadi:
- Keputusan terkait (D1–D8):
- Tingkat: nol toleransi | mengganggu | kosmetik
- Dugaan penyebab:
- Tindakan / perubahan:
- Hasil uji setelah perbaikan (dev, lalu hold-out baru):
```

## Lampiran D: Contoh keluaran `--debug` (ilustrasi bentuk, bukan data asli)

```
[1] keputusan (paralel)  krisis: tidak (0.97 | LLM: tidak) | kesusahan: tidak | nada: 1 | niat: fiqih_muamalah | lanjutan: topik_baru
[2] pertanyaan_utuh: "hukum paylater untuk kredit motor?"
    Dipahami sebagai: M-07 "<label masalah>"  (yakin: 0.82)   kueri: [M-07, glosarium, kalimat asli]
[3] detektif (RRF) 20 kandidat | top: <id> bm25=… emb=… rrf=…
[4] reranker skor mentah: <id> 0.91 | <id> 0.74 | <id> 0.40 …
[5] gerbang ambang=<hasil kalibrasi>: lolos 4, dibuang 4 (alasan: di bawah ambang)
    slot: pokok 1/2 | pendukung 2/2 | fatwa 1/2 | pendapat 3 (cek silang: OK)   terpotong: –
[6] gerbang menyerah: skor OK | masalah OK | veto: tidak  → LANJUT
[9] jawaban berslot (JSON valid) | [10] validasi OK (kata vonis: 0 tanda)
[12] pemeriksa: deterministik OK | per klaim 5/5 didukung | Jev: aman
biaya: 3 541 token, ≈ $0.001
```

## Lampiran E: Tes minimal per modul

| Modul | Tes yang wajib ada |
|---|---|
| Normalisasi Arab | harakat, tatwil, varian alif; kueri dan dokumen dinormalisasi sama; teks asli tidak berubah |
| Ingest | tolak tanpa sumber/lisensi; ID tidak valid; idempoten; DUMMY tertandai |
| RRF / cosine | angka yang bisa dihitung tangan |
| Stempel | kode asing ditolak; teks identik byte-per-byte; `[PENDAPAT-n]` terisi benar |
| Validasi | pokok terpakai; semua pendapat disebut; karakter Arab dari AI terdeteksi; `kalimat_batas` wajib |
| Gerbang + slot | di bawah ambang selalu dibuang + alasan; slot ≤ batas + terpotong tercatat; cek silang; `pengaruh=0` tak mengubah seleksi |
| Gerbang menyerah | satu "tidak" cukup menyerah; pemicu tercatat |
| Keputusan (fail-safe) | tiap baris tabel spek §6.4 (ragu/gagal) berperilaku sesuai |
| Tangga nada | penghitung teguran di kode; redaksi tidak berulang; stop hanya di ujung; krisis tak pernah distop |
| Lift | berhenti sebelum penuh; penutup hangat; krisis dikecualikan |
| Kontak darurat | AI tidak bisa menampilkan nomor yang tidak berasal dari tabel |

## Lampiran F: Prompt pembuka per fase (pemilik proyek menempel di Claude Code)

**Fase 0**
```
Baca docs/PANDUAN-FASE-CLAUDE-CODE.md (Bagian 0, 1, dan Fase 0) dan docs/spek-prototipe-agent-al-hikmah.md
(§0–§3, §5.1, §12). Konteks latar: docs/konteks-proyek-al-hikmah.md (abaikan §6–§8). Kerjakan HANYA Fase 0.
Jangan menulis logika pipeline. Mulai dengan ringkasan 10 baris, lalu tanya satu per satu.
```
**Fase 1**
```
Lanjut Fase 1. Baca Fase 1 di panduan dan spek §4.3, §6.1–6.3, §6.6, §6.12, §6.15–6.16, §9. Pakai data DUMMY.
Bila saya sudah mengunduh data asli, baca juga docs/referensi/peta-sumber-data-dan-lisensi.md (§2, §4, §11) sebagai referensi.
Kerjakan langkah berurutan, commit tiap langkah, tempel keluaran tes sebagai bukti. Berhenti di akhir dan buat laporan.
```
**Fase 2**
```
Lanjut Fase 2. Baca Fase 2 di panduan dan spek §5.2–5.3, §6.4, §6.5, §6.7–6.9, §6.17. Periksa gerbang masuk:
bila data asli dan soal dev belum ada, kerjakan hanya langkah kabel dan laporkan.
```
**Fase 3**
```
Lanjut Fase 3. Baca Fase 3 di panduan dan spek §3.1–3.2, §6.10–6.13, §7.1. Minta dulu 10 kalimat "hukum tanpa kata vonis"
dari saya sebelum langkah 7. Jangan menulis kesimpulan hukum sendiri; hanya kutipan persis dari data.
```
**Fase 4**
```
Lanjut Fase 4. Baca Fase 4 di panduan dan spek §7 (semua), §6.4, §6.14, §6.15. Jalankan set uji keselamatan dan
tunjukkan transkrip lulus/gagal; jangan menutupi kegagalan.
```
**Fase 5**
```
Lanjut Fase 5. Baca Fase 5 di panduan dan spek §6.17, §14. Pastikan hold-out belum pernah dipakai menyetel.
Bekukan konfigurasi, jalankan hold-out SEKALI, buat laporan akhir.
```
**Fase 6 (tiap siklus)**
```
Siklus Fase 6. Ini kasus nyata: <ringkas>. Catat di docs/buku-kasus.md, cari tahap yang gagal dari log jejak,
usulkan SATU perubahan dengan alasan, uji di dev, jangan sentuh hold-out lama.
```

## Lampiran G: Checklist "boleh dicoba orang lain?" (jawab jujur di akhir Fase 4)

- [ ] Jalur krisis jalan dan **tidak** bisa distop; kontak berasal dari tabel `kontak_darurat`.
- [ ] Nomor darurat **diverifikasi ulang** hari ini dan `terakhir_dicek` terisi.
- [ ] Skrip krisis **sudah ditinjau psikolog** (bila belum → **jawab TIDAK**).
- [ ] Jawaban membawa penanda **"belum ditinjau penasihat"** bila record belum disahkan.
- [ ] Hal yang menyentuh kebenaran agama sudah **ditinjau penasihat syariah** (bila belum → **jawab TIDAK** untuk pemakai publik).
- [ ] Log tidak menyimpan teks sensitif (`simpan_teks_sensitif = false`) dan bisa dihapus.
- [ ] Kegagalan nol toleransi di set uji: **nol**, atau setiap kejadian sudah dibaca dan dijelaskan.
- [ ] README menyatakan batasan dan larangan memakai prototipe sebagai fatwa.

Catatan: **untuk penguji tertutup** (pemilik proyek dan beberapa teman yang paham ini prototipe), cukup poin 1, 2, 4, 6, 7, dan 8 dengan peringatan jelas. **Untuk user publik, semua poin wajib YA.**

---

## Riwayat dokumen

| Tanggal | Perubahan |
|---|---|
| 13 November 2026 | Versi pertama: panduan fase untuk Claude Code (Fase 0–6, gerbang, bukti, latihan pemilik proyek, `CLAUDE.md`, template buku kasus, prompt pembuka, checklist uji orang lain), selaras dengan spek revisi 2 |
| 17 November 2026 (revisi 3) | Menyelaraskan dengan arahan Edilakso: aplikasi belum ada, cakupan rak bertahap, pengguna siswa, data API komunitas; Fase 2 mensyaratkan 5–7 masalah per rak; `CLAUDE.md` diperbarui |
| 17 November 2026 (revisi 4) | Fase 1: tes ingest data asli (6.236 ayat, basmalah, checksum) dan ablation tanpa/dengan terjemahan sesuai peta sumber (spek §14.6) |
| 18 November 2026 (revisi 5) | Fase 1: rujukan ke `sumber-rak1-dan-rak2.md`; Fase 3: aturan 3b dan `tingkat_lembaga` |
