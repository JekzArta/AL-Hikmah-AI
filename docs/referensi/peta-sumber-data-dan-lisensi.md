# Al Hikmah — Peta Sumber Data & Cek Lisensi Komersial (per 17 November 2026)

Bro, intinya: teks Arab Al-Qur'an aman dipakai komersial (Tanzil, CC BY 3.0, asal tidak diubah), tapi **tidak ada satu pun terjemahan Al-Qur'an Indonesia, terjemahan hadits Indonesia, atau tafsir Indonesia yang terverifikasi berlisensi terbuka untuk komersial** — semua harus lewat surat izin, dan jalur terpenting adalah izin API Qur'an Kemenag dari LPMQ. Selain itu, PMA 44/2016 mendefinisikan "Mushaf Al-Qur'an" termasuk bentuk digital dan potongan ayat, jadi aplikasi kamu kemungkinan besar wajib Surat Tanda Tashih juga.

> **Disclaimer:** Ini BUKAN nasihat hukum dan BUKAN fatwa. Ini peta awal fakta dan risiko dari halaman yang benar-benar dibuka. Semua tanggal akses = **17 November 2026** kecuali disebut lain.

## TL;DR

- **Teks Arab:** pakai Tanzil sekarang (CC BY 3.0, komersial boleh, "CHANGING IT IS NOT ALLOWED"), tapi untuk tampilan final arahkan ke teks Mushaf Standar Indonesia (MSI) dari API Qur'an Kemenag, karena tashih LPMQ mengecek kesesuaian dengan MSI.
- **Terjemahan/tafsir/hadits Indonesia:** semuanya berhak cipta atau lisensinya non-komersial (Tanzil: "for non-commercial purposes only"; LPMQ sudah mencatatkan hak cipta Al-Qur'an dan Terjemahannya edisi 2019); jawaban tegas soal cadangan terbuka: **tidak ditemukan** terjemahan Indonesia berlisensi terbuka yang terverifikasi.
- **Fatwa:** DSN-MUI menerbitkan PDF per fatwa dan mengizinkan mengutip dengan menyebut sumber (bukan izin menyalin penuh komersial); Fatwa 117/DSN-MUI/II/2018 soal pembiayaan berbasis teknologi informasi terverifikasi ada di daftar resmi, sedangkan fatwa khusus paylater dan fatwa bernomor khusus judi online **tidak ditemukan** — Ketua Umum MUI sendiri bilang tidak ada fatwa MUI soal judi.

---

## 0. Kamus mini

- **API** = "loket drive-thru" di server orang lain: kamu pesan data (misal ayat 2:275), dia kasih, kamu nggak masuk dapurnya. **Endpoint** = alamat loket spesifik.
- **JSON/CSV/XML/SQL** = jenis "kardus" data. JSON = daftar belanja berlabel; CSV = tabel Excel polos; SQL = skrip pengisi database.
- **Token/API key** = kartu member loket. **Rate limit** = batas pesanan per menit.
- **Dump** = salinan utuh data dalam satu file, unduh sekali simpan lokal.
- **Lisensi CC BY** = boleh dipakai (termasuk jualan) asal sebut sumber. **NC** = tidak boleh komersial. **ND** = tidak boleh diubah. **MIT/Unlicense** = lisensi *kode program*, sangat bebas.
- **"MIT untuk kode ≠ hak atas data"** — jebakan nomor satu. Analogi: kurirnya (kode) boleh kamu sewa gratis, tapi paket yang dia antar (misal terjemahan Kemenag) tetap milik pengirim aslinya. Pembuat repo tidak bisa memberi hak yang dia sendiri tidak punya.
- **Tashih** = pemeriksaan resmi LPMQ Kemenag atas kebenaran teks Al-Qur'an; hasilnya **Surat Tanda Tashih**. **MSI** = standar rasm, harakat, tanda baca, dan waqaf Al-Qur'an yang dibakukan pemerintah.\[1\]

---

## 1. Kerangka hukum dasar

### (a) Fakta bersumber

- **PMA No. 44 Tahun 2016** (teks dibaca via pasal.id, situs pihak ketiga yang menandai salinannya "Diproses, belum ditinjau"; penomoran dikonfirmasi FAQ resmi LPMQ yang mengutip "Pasal 1, 2 dan 16 PMA 44/2016"). PDF resmi di tashih.kemenag.go.id menampilkan "Situsweb sedang dalam perbaikan".\[1\]\[2\]\[3\]
  - Pasal 1 angka 1: "Mushaf Al-Qur'an adalah lembaran atau media yang berisikan ayat-ayat Al-Qur'an lengkap 30 juz dan/atau bagian dari surah atau ayat-ayatnya, baik cetak maupun digital."\[1\]\[3\]
  - Pasal 2: "Setiap Mushaf Al-Qu'ran yang diterbitkan, dicetak dan/atau diedarkan di Indonesia wajib memperoleh Surat Tanda Tashih atau Surat Izin Edar dari LPMQ."\[3\]\[4\]
  - Pasal 8 ayat (1): "Teks Mushaf Al-Qur'an tidak memiliki hak cipta."\[3\]
  - Pasal 16 ayat (4): Surat Tanda Tashih "berlaku selama 2 (dua) tahun dan dapat diperpanjang"; ayat (5): bila materi/desain berubah, proses "dimulai dari awal."\[1\]\[3\]
  - Pasal 20: sanksi administratif "teguran; peringatan; penarikan dan pelarangan produk untuk beredar; dan pencabutan Surat Tanda Tashih atau Surat Izin Edar." Tidak ada pidana/denda.\[3\]
  - Tidak ditemukan pengecualian untuk aplikasi yang menampilkan sebagian ayat, dan tidak ditemukan peraturan pengganti sampai November 2026 (pasal.id: "Berlaku"). LPMQ sempat merencanakan "Peraturan Standardisasi Penerbitan dan Percetakan Al-Qur'an" untuk 2024; tidak ada bukti sudah terbit.\[3\]\[5\]
- **Standar Pelayanan Surat Tanda Tashih** (tashih.lpmqkemenag.id, dibaca langsung): akun penerbit "PT Perorangan" butuh antara lain SK Kemenkumham, NPWP, NIB, KTP penanggung jawab;\[6\] kategori "Mushaf Al-Qur'an Digital" = 15 hari kerja (naskah awal), 7 HK (perbaikan), 3 HK (dumi/perpanjangan); PNBP wajib dibayar dalam 7 hari kalender setelah kode billing. Kontak: **tashih@kemenag.go.id**, WhatsApp **+62 811-1997-125**.\[1\]\[6\]
- Panduan permohonan tashih LPMQ (dibaca subagen): "Jika berupa digital, maka harus mengunggah file aplikasi".\[7\]
- Cuplikan berita LPMQ "Gandeng Kominfo, LPMQ Perkuat Pengawasan Al-Qur'an Digital" (halaman error): "Kedudukan Al-Qur'an digital, sesungguhnya sama dengan mushaf Al-Qur'an cetak. Semuanya harus mengantongi Surat Tanda Tashih…"\[8\]
- UU Hak Cipta 28/2014: teks resmi di situs DJKI (dgip.go.id), Pasal 42: "Tidak ada Hak Cipta atas hasil karya berupa: … e. kitab suci atau simbol keagamaan." Pasal 40 = terjemahan dilindungi (dari catatan riset sebelumnya, tidak dibuka ulang).

### (b) Analisis

- Pasal 1 angka 1 (digital + "bagian dari surah atau ayat-ayatnya") + Pasal 2 (tanpa pengecualian) = Al Hikmah **kemungkinan besar wajib tashih**, walau teksnya dari API Kemenag. Ini tafsiran saya, bukan posisi resmi LPMQ.
- Menurut Standar Pelayanan LPMQ (tashih.lpmqkemenag.id), master lolos verifikasi jika "Master mushaf sesuai dengan Mushaf Standar Indonesia dan pedoman pentashihan yang diterbitkan oleh LPMQ" dan "tidak terdapat banyak kesalahan". Tanzil bukan MSI → risiko ditolak. Itu alasan saya menyarankan MSI untuk tampilan final.
- Tashih 2 tahun dan diulang bila materi berubah → kunci versi data sejak awal.
- Akun penerbit butuh badan usaha. Kalau masih perorangan, ini blocker. **[perlu keputusan tim/hukum]**

### (c) Tidak pasti

- Teks pasal belum dicocokkan ke PDF resmi; Pasal 4 kemungkinan punya ayat (4) yang tidak terlihat. `perlu_verifikasi`
- Tarif PNBP "Mushaf Al-Qur'an Digital": halaman resmi tashih.lpmqkemenag.id hanya menyebut dasar tarifnya ("Peraturan Pemerintah Republik Indonesia Nomor 59 Tahun 2018"), angka rupiahnya tidak terbaca. Blog gemarisalah.com menulis "Rp1.000.000 [30 juz] ditambah Rp500.000 per komponen tambahan". Jadi Rp500.000 itu tarif per komponen tambahan, bukan tarif kategori digital. `perlu_verifikasi`.
- Pengecualian untuk aplikasi tanya-jawab berbasis API Kemenag: **tidak ada pernyataan resmi**; ditanyakan di surat J-1.

---

## 2. Bagian A — Teks Al-Qur'an Arab

### (a) Fakta bersumber

- **Tanzil** (tanzil.net/docs/text_license, dibaca langsung): "License: Creative Commons Attribution 3.0"; "Permission is granted to copy and distribute verbatim copies of this text, but CHANGING IT IS NOT ALLOWED."; boleh dipakai di aplikasi apa pun asal "its source (Tanzil Project) is clearly indicated, and a link is made to tanzil.net"; notice harus "reproduced appropriately in all files derived from or containing substantial portion of this text." Halaman tanzil.net/download **gagal dibuka**. Versi dikonfirmasi tanzil.net/docs/news: "February 12, 2021 — Version 1.1 of Tanzil Quran text is released." Grup Google tanzil-text (Hamid Zarrabi-Zadeh) juga menyebut "no typo has been reported in the Tanzil quran text since its latest release in 2008." Info varian (Uthmani, Uthmani Minimal, Simple) masih hanya dari Grokipedia.
- **QUL (Tarteel)** — FAQ resmi: "Yes, you can use QUL data in commercial projects." tetapi "The resources available on QUL vary in their copyright status." Repo GitHub berlisensi MIT (kode). Issue #704, #991, #957, #818 (s.d. November 2026) melaporkan halaman lisensi per sumber berbunyi "We don't have copyright information for this resource."\[9\]\[10\]\[11\]\[12\]\[13\]
- **Quran Foundation (Quran.com) Developer Terms** (api-docs.quran.foundation, dibaca dari halaman resmi): aplikasi boleh berbayar/iklan/freemium asal "QF Content and raw API data are not sold, sublicensed, or redistributed"; redistribusi butuh "a signed commercial license"; "Content Sync is the only permitted path for obtaining and maintaining an offline copy"; dilarang "extract, scrape, or index QF Content … outside the API responses"; dilarang membangun "machine-learning models without written consent"; atribusi "Quran data provided by Quran Foundation"; kontak developers@quran.com.\[14\]\[15\]\[16\]
- **fawazahmed0/quran-api**: Unlicense; "90+ languages & 440+ Translations"; "No Rate limits"; pola `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/<edisi>.json`; `editions.json` punya field `"source"` per edisi (misal "http://tanzil.net"); README: "Few of the translations were OCRed and may contain mistakes."\[17\]\[18\]
- **gadingnst/quran-api** (api.quran.gading.dev): MIT; "This API data source comes from the combination of several parameters from api.alquran.cloud and quran.kemenag.go.id"; terjemahan & tafsir Indonesia dari quran.kemenag.go.id. Repo serupa (nyancodeid/quran-api-go, ianoit, rzkytmgr) mengaku "Grabbed from Officially Kementerian Agama Website", lisensi MIT.\[19\]\[20\]\[21\]

### (b) Analisis

- **Tanzil = satu-satunya sumber Arab dengan izin komersial yang saya baca sendiri.** Syarat: tampil verbatim, atribusi + link tanzil.net di aplikasi, notice di file data.
- **Jebakan "CHANGING IT IS NOT ALLOWED" vs indeks BM25:** simpan `teks_arab` verbatim untuk tampil; `teks_arab_index` (tanpa harakat) hanya internal, tidak pernah tampil, dengan notice Tanzil di tabelnya. Apakah ini "mengubah"? **[perlu keputusan tim/hukum]**
- **Quran Foundation API bentrok dengan desain RAG kamu** (larangan indeks di luar respons API, larangan ML model/embedding tanpa izin, offline hanya via Content Sync). Jangan jadi sumber utama.
- **QUL:** anggap tiap berkas `lisensi_tidak_jelas` sampai ada jawaban tertulis.
- **fawazahmed0/quran-api:** Unlicense hanya untuk kompilasi; edisi bersumber Tanzil tetap terikat syarat Tanzil. Anggap `lisensi_tidak_jelas` per edisi.
- **Repo GitHub Indonesia:** MIT hanya untuk kode; terjemahan/tafsir milik LPMQ. Jangan dipakai di produksi.

### (c) Tidak pasti

- Basmalah: menurut pihak ketiga (ekstensi VS Code "Quran for Claude Code"), Tanzil menyisipkan basmalah di awal teks ayat 1 tiap surah kecuali Al-Fatihah dan At-Taubah; Al-Fatihah ayat 1 = basmalah. `perlu_verifikasi` saat unduh.\[22\]
- Penomoran: semua sumber di atas diduga memakai hitungan Kufi 6.236 ayat, riwayat Hafs 'an 'Ashim (pengetahuan umum, tidak tertulis di halaman yang dibuka). `perlu_verifikasi`
- api.alquran.cloud, dataset Al-Qur'an Hugging Face, repo risan/rioastamal/semnoc: **tidak sempat diperiksa**.

### Kartu sumber

```
nama: Tanzil Quran Text (Uthmani / Simple)
jenis: quran_arab
url: https://tanzil.net/docs/text_license (lisensi); https://tanzil.net/download/ (gagal dibuka)
tanggal_akses: 2026-11-17
pemegang_hak: Tanzil Project
lisensi: "License: Creative Commons Attribution 3.0" ; "Permission is granted to copy and distribute verbatim copies of this text, but CHANGING IT IS NOT ALLOWED."
komersial_boleh: ya
redistribusi_boleh: ya (verbatim)
atribusi_wajib: sebut "Tanzil Project" + link tanzil.net + sertakan notice di semua salinan/berkas turunan
teks_boleh_diubah: tidak
format: teks/XML/SQL (perlu_verifikasi) — unduh sekali, simpan lokal
cakupan: 114 surah, Arab (riwayat Hafs, perlu_verifikasi)
metadata_tersedia: nomor surah & ayat
catatan_risiko: bukan MSI → bisa bermasalah saat tashih; indeks tanpa harakat = berkas turunan
izin_ref:
boleh_tampil_komersial: ya
putusan_sementara: layak_dengan_syarat
```

```
nama: API Qur'an Kemenag — teks Mushaf Standar Indonesia
jenis: quran_arab
url: https://quran-api.lpmqkemenag.id/
tanggal_akses: 2026-11-17
pemegang_hak: LPMQ, Kementerian Agama RI (teks ayat tidak berhak cipta per Pasal 8(1) PMA 44/2016)
lisensi: tidak ada ToS publik; "Surat permohonan ditujukan kepada Kepala Lajnah Pentashihan Mushaf Al-Qur'an"
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: belum diketahui
teks_boleh_diubah: tidak
format: JSON via API; endpoint diberikan setelah token & survei
cakupan: teks MSI + terjemahan + tafsir (berita peluncuran Okt 2025)
metadata_tersedia: perlu_verifikasi setelah token
catatan_risiko: bergantung izin; syarat baru terlihat setelah daftar
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: layak_dengan_syarat
```

```
nama: Quranic Universal Library (QUL)
jenis: quran_arab
url: https://qul.tarteel.ai/faq
tanggal_akses: 2026-11-17
pemegang_hak: bervariasi per sumber; dikelola Tarteel
lisensi: "Yes, you can use QUL data in commercial projects." + "The resources available on QUL vary in their copyright status."
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: per sumber (banyak kosong)
teks_boleh_diubah: tidak_jelas
format: unduhan JSON/SQLite per sumber (menurut issue #818)
cakupan: skrip Qur'an, terjemahan, tafsir, layout mushaf
metadata_tersedia: ayah_key, group_ayah_key (tafsir)
catatan_risiko: "We don't have copyright information for this resource."
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: lisensi_tidak_jelas
```

```
nama: Quran Foundation (Quran.com) API
jenis: quran_arab
url: https://api-docs.quran.foundation/legal/developer-terms/
tanggal_akses: 2026-11-17
pemegang_hak: Quran Foundation + pemegang hak per edisi
lisensi: "A Developer must obtain a signed commercial license before selling, sublicensing, or redistributing QF Content or raw API data"
komersial_boleh: ya (tampil di dalam aplikasi saja)
redistribusi_boleh: tidak
atribusi_wajib: "Quran data provided by Quran Foundation" + kredit per edisi
teks_boleh_diubah: tidak
format: REST API + OAuth2 (Developer Console); offline hanya via Content Sync
cakupan: teks, terjemahan, tafsir, audio
metadata_tersedia: lengkap
catatan_risiko: larangan indeks & ML model tanpa izin → bentrok dengan BM25/embedding
izin_ref:
boleh_tampil_komersial: ya (hanya tampil via API)
putusan_sementara: tidak_layak
```

---

## 3. Bagian B — Terjemahan Al-Qur'an Indonesia (titik paling kritis)

### (a) Fakta bersumber

- **API Qur'an Kemenag** (quran-api.lpmqkemenag.id, dibaca langsung): (1) "Isi form pendaftaran… Data harus sesuai dengan surat yang akan diajukan kepada LPMQ." (2) "Format surat permohonan dapat diunduh pada link yang dapat diakses pada akun pengguna. Kirimkan surat permohonan ke email lajnah@kemenag.go.id dan tembusannya ke quran.kemenag@gmail.com" (3) "End point untuk akses API akan kami berikan setelah mengisi survey." Tidak ada ToS publik; kata "komersial" tidak muncul.\[23\]
- **Peluncuran API (9–10 Oktober 2025)**: berita LPMQ di lajnah.kemenag.go.id (Kamis, 9/10/2025) hanya terbaca lewat cuplikan pencarian; teks lengkapnya saya baca dari Netizens.id. Kepala LPMQ Abdul Aziz Sidqi menyebut akses "teks Al-Qur'an, terjemahan, dan tafsir resmi Mushaf Standar Indonesia", format JSON; "lebih dari 1.000 pengguna" terdaftar di quran-api.kemenag.go.id, "sekitar 40 pengguna aktif setiap hari"; BPKH rata-rata 1.400 akses/hari, PT Digital Axis Indonesia 243/hari; "Sebagian besar pengguna lain rata-rata melakukan 10 kali akses per hari." Tidak ada syarat komersial diumumkan.
- **Hak cipta LPMQ** (Monitor, Muslim Obsession, Suara Merdeka, 27–28 Mei 2024): Surat Pencatatan Ciptaan DJKI untuk sembilan produk (didaftarkan 27 Juli 2023), termasuk "Al-Qur'an dan Terjemahannya edisi 2019", Tafsir Tahlili, Tafsir Wajiz. Abdul Aziz Sidqi: "Kita persilakan masyarakat memanfaatkan hasil kajian LPMQ seluas-luasnya… Namun, kalau mau mencetak untuk kepentingan komersial harus izin terlebih dahulu agar tertib administrasi."\[24\]
- **Berita LPMQ** (lajnah.kemenag.go.id): narasumber Bagus Purnomo: "pemerintah tidak mewajibkan ataupun melarang pihak manapun untuk menggunakan terjemahan Al-Qur'an Kemenag… kami mempersilakan dan siap memfasilitasi." Terbit 1965, disempurnakan 1989, 2002, 2019.\[25\] Jurnal Suhuf Kemenag mencatat revisi 1971, 1990, 2002, 2019 (berbeda).\[26\]
- **Tanzil Translations** (tanzil.net/trans, dibaca langsung): "The translations provided at this page are for non-commercial purposes only. If used otherwise, you need to obtain necessary permission from the translator or the publisher."\[27\] Indonesia: "Indonesian Ministry of Religious Affairs", "Muhammad Quraish Shihab et al.", "Tafsir Jalalayn".\[27\] Format: Text, Text (with aya numbers), XML, SQL. "Redistributing the following list in another website is not allowed".\[27\]
- **Archive.org** memuat "Al Quran Kemenag Edisi Penyempurnaan 2019" berlabel "Public Domain Mark 1.0"\[28\] — label dari pengunggah, bukan Kemenag.

### (b) Analisis

- **Jawaban tegas: tidak ada terjemahan Al-Qur'an Indonesia berlisensi terbuka (CC BY/CC0/domain publik) yang bisa saya verifikasi.** Kemenag, Quraish Shihab, Jalalayn Indonesia di Tanzil = non-komersial; edisi 2019 tercatat hak ciptanya atas nama LPMQ.
- **Label "Public Domain" Archive.org jangan dipercaya** — bertentangan dengan pencatatan ciptaan LPMQ 2024.
- **Edisi lama vs 2019:** Pasal 58 ayat (3) UU 28/2014 (dgip.go.id): hak cipta "yang dimiliki atau dipegang oleh badan hukum berlaku selama 50 (lima puluh) tahun sejak pertama kali dilakukan Pengumuman." Dengan hitungan itu, edisi 1965 secara teori sudah lewat 50 tahun, tapi tidak tersedia digital terverifikasi dan bahasanya kuno; 1989/2002 masih terlindungi. Praktisnya **tidak ada edisi Kemenag yang aman tanpa izin**. **[perlu keputusan tim/hukum]**
- Sinyal positif: LPMQ pro-pemakaian dan API dipakai juga oleh perusahaan (PT Digital Axis Indonesia).\[29\] Peluang izin menurut saya tinggi, tapi wajib tertulis dan eksplisit untuk: simpan lokal, indeks, embedding, tampil komersial.
- **Cadangan bila izin tidak keluar:** (1) tampilkan Arab (Tanzil) + tautan keluar ke quran.kemenag.go.id, embedding dari ringkasan kata kunci buatan tim; (2) minta izin pemegang hak terjemahan lain (sama sulitnya); (3) terjemahan baru sendiri — mahal dan wajib tashih (PMA 44 mencakup terjemah).\[3\] **[perlu penasihat syariah]**

### (c) Tidak pasti

- Syarat API, format surat resmi, rate limit: hanya terlihat setelah daftar.
- Konflik tahun revisi (1989/2002/2019 vs 1971/1990/2002/2019) tidak bisa didamaikan.
- Terjemahan Indonesia di QUL tidak diperiksa per sumber.

### Kartu sumber

```
nama: Al-Qur'an dan Terjemahannya Edisi Penyempurnaan 2019 (via API Qur'an Kemenag)
jenis: terjemahan
url: https://quran-api.lpmqkemenag.id/
tanggal_akses: 2026-11-17
pemegang_hak: LPMQ, Kementerian Agama RI (Surat Pencatatan Ciptaan, diumumkan Mei 2024)
lisensi: tidak terbuka; "kalau mau mencetak untuk kepentingan komersial harus izin terlebih dahulu" (Kepala LPMQ, Mei 2024)
komersial_boleh: tidak_jelas (butuh izin tertulis)
redistribusi_boleh: tidak
atribusi_wajib: belum diketahui
teks_boleh_diubah: tidak
format: JSON via API; daftar → surat ke lajnah@kemenag.go.id (cc quran.kemenag@gmail.com) → token → survei → endpoint
cakupan: 6.236 ayat, Indonesia, edisi 2019 (perlu_verifikasi)
metadata_tersedia: perlu_verifikasi
catatan_risiko: izin bisa lama/ditolak; tashih aplikasi kemungkinan tetap wajib
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: layak_dengan_syarat
```

```
nama: Tanzil — terjemahan Indonesia (Kemenag / Quraish Shihab / Jalalayn)
jenis: terjemahan
url: https://tanzil.net/trans/
tanggal_akses: 2026-11-17
pemegang_hak: Kementerian Agama RI; Muhammad Quraish Shihab et al.; penerjemah Jalalayn (tidak disebut)
lisensi: "The translations provided at this page are for non-commercial purposes only."
komersial_boleh: tidak
redistribusi_boleh: tidak
atribusi_wajib: link ke tanzil.net/trans bila memakai >3 terjemahan
teks_boleh_diubah: tidak
format: Text / XML / SQL, UTF-8
cakupan: 6.236 ayat per terjemahan
metadata_tersedia: nomor surah & ayat
catatan_risiko: banyak repo GitHub menyalin ini dengan label MIT — tetap non-komersial
izin_ref:
boleh_tampil_komersial: tidak
putusan_sementara: tidak_layak
```

---

## 4. Bagian C — Hadits

### (a) Fakta bersumber

- **fawazahmed0/hadith-api** (GitHub, dibaca langsung): Unlicense ("Anyone is free to copy, modify, publish, use, compile, sell, or distribute… for any purpose, commercial or non-commercial"); "Multiple Languages", "Multiple Grades", "No Rate limits"; URL `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@{apiVersion}/{endpoint}` (.json/.min.json); folder `database`, `editions`, berkas `editions.json`, `References.md`, `download.md`.\[30\] Repo turunan (famashines/sakinah-data) mendaftar referensinya antara lain sunnah.com dan github.com/gadingnst/hadith-api. Issue sunnah-com/api #4255: dataset ini punya "a significant number of missing translations".\[30\]\[31\]\[32\]\[33\]
- Kaggle "hadith-api-data" mengemas ulang data ini dengan label CC BY-NC 4.0 — bertentangan dengan Unlicense hulu.\[34\]
- **gadingnst/hadith-api** (api.hadith.gading.dev): "Data Source — tafsirq.com"; kitab Muslim, Bukhari, Tirmidzi, Nasai, Abu Daud, Ibnu Majah, Ahmad, Darimi, Malik; MIT; package.json punya `"crawl": "ts-node crawler/script.ts"` dengan puppeteer (alat scraping).\[35\]\[36\]\[37\]
- **sunnah.com**: akses API lewat GitHub issue (ratusan permohonan, #3786–#4359). Issue #4290 mengutip: "API access does not automatically grant permission to reproduce complete books or collections on another website". Tidak ada dump terbuka.\[38\]\[39\]\[40\]

### (b) Analisis

- **Teks Arab hadits** relatif aman (matan klasik; kompilasi Unlicense), tapi sebagian kompilasi bersumber sunnah.com → rantai hak tidak 100% bersih. **[perlu keputusan tim/hukum]**
- **Terjemahan Indonesia hadits: tidak ada yang bersih.** gadingnst menyalin tafsirq.com lewat crawler; MIT tidak memberi hak atas terjemahan. Dugaan saya terjemahan tafsirq.com berasal dari Lidwa Pusaka (proprietary) — `perlu_verifikasi`.
- **Derajat + nama penilai:** fawazahmed0 mengklaim "Multiple Grades", nama field penilai belum dilihat. Memilih penilai mana yang ditampilkan **[perlu penasihat syariah]**.
- **PERINGATAN PENOMORAN:** nomor sama bisa menunjuk hadits berbeda antar sumber (Bukhari ala sunnah.com vs Lidwa/tafsirq vs cetakan tertentu; Muslim nomor Abdul Baqi vs per-bab). Penanganan: (1) kolom wajib `skema_penomoran`, ID jadi `HR-<KITAB>-<nomor>` + skema; (2) simpan semua nomor yang tersedia; (3) jangan cocokkan antar sumber hanya dari nomor, cocokkan dari teks Arab; (4) uji sampel terhadap kitab cetak. **[perlu penasihat syariah]**

### (c) Tidak pasti

- Ada/tidaknya edisi Indonesia di fawazahmed0: `perlu_verifikasi` via `editions.json`.
- Derajat & rate limit di gadingnst/hadith-api: tidak tercantum.
- HadithAPI.com, Open Hadith Data, LK Hadith Corpus, hadith-json, hadits.id, Lidwa Pusaka, dataset Hugging Face: **tidak sempat diperiksa**.

### Kartu sumber

```
nama: fawazahmed0/hadith-api
jenis: hadits
url: https://github.com/fawazahmed0/hadith-api
tanggal_akses: 2026-11-17
pemegang_hak: kompilasi: fawazahmed0; terjemahan: penerjemah masing-masing; sebagian sumber: sunnah.com dll.
lisensi: "Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software … for any purpose, commercial or non-commercial"
komersial_boleh: ya (kompilasi & Arab); tidak_jelas (terjemahan)
redistribusi_boleh: ya (kompilasi); tidak_jelas (terjemahan)
atribusi_wajib: tidak diwajibkan; disarankan sebut fawazahmed0 + sumber asli
teks_boleh_diubah: ya (kompilasi) — proyek tetap menampilkan verbatim
format: JSON via jsDelivr .../hadith-api@{apiVersion}/{endpoint}.json; folder database/
cakupan: beberapa kitab, banyak bahasa (Indonesia: perlu_verifikasi)
metadata_tersedia: nomor, derajat ("Multiple Grades"); penilai perlu_verifikasi
catatan_risiko: terjemahan banyak hilang; sebagian data dari sunnah.com
izin_ref:
boleh_tampil_komersial: ya (Arab); belum (terjemahan)
putusan_sementara: layak_dengan_syarat
```

```
nama: gadingnst/hadith-api (api.hadith.gading.dev)
jenis: hadits
url: https://github.com/gadingnst/hadith-api
tanggal_akses: 2026-11-17
pemegang_hak: kode: Sutan Gading Fadhillah Nasution; data: tafsirq.com (pemegang hak terjemahan perlu_verifikasi)
lisensi: "MIT" (kode saja)
komersial_boleh: tidak
redistribusi_boleh: tidak
atribusi_wajib: -
teks_boleh_diubah: tidak_jelas
format: REST API + crawler puppeteer
cakupan: 9 kitab, terjemahan Indonesia
metadata_tersedia: nomor skema tafsirq.com (perlu_verifikasi); derajat tidak terlihat
catatan_risiko: hasil scraping; nomor beda dengan sunnah.com
izin_ref:
boleh_tampil_komersial: tidak
putusan_sementara: tidak_layak
```

```
nama: sunnah.com API
jenis: hadits
url: https://github.com/sunnah-com/api/issues
tanggal_akses: 2026-11-17
pemegang_hak: sunnah.com + penerjemah/penerbit
lisensi: tidak terbuka; dikutip pihak ketiga: "API access does not automatically grant permission to reproduce complete books or collections"
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak
atribusi_wajib: per izin
teks_boleh_diubah: tidak
format: API berkunci; permohonan via GitHub issue
cakupan: Arab + Inggris (Indonesia tidak terlihat)
metadata_tersedia: kitab, bab, nomor, derajat dengan penilai (menurut pemohon)
catatan_risiko: antrean panjang; tanpa terjemahan Indonesia
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: lisensi_tidak_jelas
```

---

## 5. Bagian D — Tafsir Indonesia

### (a) Fakta bersumber
- LPMQ mencatatkan hak cipta Tafsir Tahlili (11 jilid), Tafsir Wajiz (2 jilid), Tafsir Tematik, Tafsir Ilmi (Mei 2024); API Kemenag mencakup tafsir resmi MSI (Okt 2025).\[29\]
- gadingnst/quran-api memuat tafsir pendek/panjang dari quran.kemenag.go.id; Tanzil memuat Tafsir Jalalayn Indonesia (non-komersial).\[20\]\[27\]
- QUL issue #818: ekspor tafsir JSON "keyed by surah:ayah, with group_ayah_key for commentary shared across a range"; "I could not find those terms stated for any tafsir resource."\[41\]

### (b) Analisis
- Satu-satunya jalur realistis: Tafsir Ringkas/Wajiz Kemenag dalam surat izin yang sama dengan terjemahan. Tafsir sering per *kelompok* ayat → siapkan kolom `ayat_mulai`, `ayat_akhir`.

### (c) Tidak pasti
- tafsirq.com, tafsirweb.com, Tafsir Ibnu Katsir terjemahan Indonesia, repositori tafsir GitHub/Hugging Face: **tidak sempat diperiksa**; anggap berhak cipta.

### Kartu sumber

```
nama: Tafsir Kemenag (Ringkas/Wajiz/Tahlili) via API Qur'an Kemenag
jenis: tafsir
url: https://quran-api.lpmqkemenag.id/
tanggal_akses: 2026-11-17
pemegang_hak: LPMQ Kementerian Agama RI
lisensi: tidak terbuka; izin komersial wajib
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak
atribusi_wajib: belum diketahui
teks_boleh_diubah: tidak
format: JSON via API (setelah token)
cakupan: perlu_verifikasi
metadata_tersedia: perlu_verifikasi
catatan_risiko: sama dengan terjemahan; kemungkinan per kelompok ayat
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: layak_dengan_syarat
```

---

## 6. Bagian E — Fatwa lembaga Indonesia

### (a) Fakta bersumber

**DSN-MUI**
- dsnmui.or.id/kategori/fatwa/ (dibaca langsung): tabel "Nomor Fatwa | Tentang | Baca / Unduh"; tiap baris "Salinan Fatwa (PDF)" bertaut ke **Google Drive**; 17 halaman, kategori Fatwa "(168)".\[42\]
- Hasil pencarian halaman resmi yang sama menampilkan baris "117/DSN-MUI/II/2018 | Layanan Pembiayaan Berbasis Teknologi Informasi Berdasarkan Prinsip Syariah". Salinan PDF di shariaknowledgecentre.id (pihak ketiga) memuat: "Layanan Pembiayaan Berbasis Teknologi Informasi dibolehkan dengan syarat sesuai dengan prinsip syariah."\[42\]\[43\]
- Penyangkalan situs DSN-MUI: "Seluruh konten yang terdapat di situs ini merupakan hak milik DSN MUI… Anda diperbolehkan untuk mengutip informasi dari situs ini, dengan tetap mencantumkan sumbernya (situs kami)…". Kontak di dsnmui.or.id/kontak (tidak dibuka).\[42\]
- **Paylater:** tidak ditemukan fatwa DSN-MUI khusus. Jurnal Al-Ikhtisar (Juni 2025): "belum terdapat satu fatwa DSN-MUI yang secara khusus dan komprehensif mengatur paylater syariah". Rujukan terkait yang disebut jurnal (116/DSN-MUI/IX/2017 uang elektronik; 19/DSN-MUI/IV/2001 qardh; fatwa MUI Jatim soal paylater) — semuanya `perlu_verifikasi`. Satu jurnal menulis "177/DSN-MUI/II/2018" padahal maksudnya 117 — contoh salah nomor di sumber sekunder.\[44\]\[45\]\[46\]

**Komisi Fatwa MUI**
- **Pinjol:** Ijtima Ulama Komisi Fatwa se-Indonesia VII (9–11 November 2021) menetapkan "Hukum Pinjaman Online (Pinjol)"; buku hasil keputusan (PDF di muijatim.or.id, diterbitkan Sekretariat Komisi Fatwa MUI) memuat bab itu.\[47\] Asrorun Niam Soleh (Antara/Liputan6, 11 Nov 2021): "Layanan pinjaman baik offline maupun online yang mengandung riba, hukumnya haram, meskipun dilakukan atas dasar kerelaan."\[48\]\[49\] Ini **keputusan Ijtima'**, bukan fatwa bernomor.
- **Judi online:** Ketua Umum MUI Anwar Iskandar (CNBC Indonesia & Antara, 25 Juli 2024): "Jadi kalau tanya fatwa tentang judi, tidak ada fatwa dari MUI…". mui.or.id memuat pernyataan pengurus (Sekjen MUI, 21 Juni 2024; KH Aminudin Yaqub) — pernyataan, bukan fatwa. Klaim "Fatwa Nomor 11 Tahun 2009" (situs pemda endekab.go.id) tidak terverifikasi dan bertentangan dengan pernyataan Ketua Umum.\[50\]\[51\]\[52\]\[53\]\[54\]

**Muhammadiyah**
- **ChatHPT** diluncurkan Kamis, 5 November 2026 di Munas Tarjih XXXIII, Universitas Muhammadiyah Surabaya (muhammadiyah.or.id); memakai "Retrieval-Augmented Generation (RAG)"; dikembangkan Majelis Tarjih dan Tajdid, Majelis Pustaka dan Informasi (MPI), dan LabMu; "bukan mufti digital".\[55\]\[56\] Alamat hpt.muhammadiyah.or.id hanya dari situs pihak ketiga.\[57\]
- Status hak cipta HPT, fatwa online, kontak data: **tidak ditemukan**.

**NU**
- nu.or.id punya kanal Bahtsul Masail (HTML per masalah). Syarat pakai situs tidak terbaca. NU Online memuat putusan Munas NU bahwa menerbitkan karya pihak lain "hukumnya haram kecuali ada izin dari pemilik hak" — sikap lembaga ini sendiri terhadap hak cipta.\[58\]

### (b) Analisis

- Izin DSN-MUI "mengutip dengan mencantumkan sumber" ≠ izin menyimpan penuh dan menampilkan di produk komersial. Kirim surat izin; sementara itu aman untuk pengembangan internal.
- **Rak 2 berlubang:** pinjol punya 117/2018 + Ijtima' 2021; paylater dan judi online **tanpa fatwa nasional bernomor terverifikasi**. Mau bersandar ke ayat + pernyataan resmi atau tidak menjawab? **[perlu penasihat syariah]**
- Keputusan Ijtima' tak bernomor → usul ID `FATWA-MUI-IJTIMA7-2021-PINJOL`. **[perlu keputusan tim/hukum]**
- PDF via Google Drive, sebagian hasil scan; salinan Fatwa 117 yang saya buka penuh salah OCR (mis. "1 1 TIDSN-MUI/II|Z}I9").\[43\] Ketik ulang diktum dengan verifikasi dua orang.
- ChatHPT = bukti Muhammadiyah punya korpus terstruktur → peluang kerja sama, bukan sumber yang bisa diambil.

### (c) Tidak pasti
- Status berlaku/dicabut Fatwa 117/2018 tidak tercantum. PDF resmi Google Drive tidak saya buka.
- Alamat/email DSN-MUI, Komisi Fatwa MUI, Majelis Tarjih, LBM PBNU: tidak dibaca langsung. Kompilasi fatwa oleh OJK: tidak diperiksa.

### Kartu sumber

```
nama: Fatwa DSN-MUI (koleksi PDF resmi)
jenis: fatwa
url: https://dsnmui.or.id/kategori/fatwa/
tanggal_akses: 2026-11-17
pemegang_hak: Dewan Syariah Nasional – Majelis Ulama Indonesia
lisensi: "Anda diperbolehkan untuk mengutip informasi dari situs ini, dengan tetap mencantumkan sumbernya (situs kami)"
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: cantumkan sumber (situs DSN-MUI)
teks_boleh_diubah: tidak
format: PDF per fatwa via Google Drive; daftar HTML 17 halaman, 168 entri
cakupan: fatwa keuangan syariah, termasuk 117/DSN-MUI/II/2018
metadata_tersedia: nomor fatwa, judul ("Tentang")
catatan_risiko: PDF scan/OCR rawan salah; tidak ada fatwa paylater; status pencabutan tidak tertera
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: layak_dengan_syarat
```

```
nama: Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia VII 2021 (Hukum Pinjol)
jenis: fatwa
url: https://muijatim.or.id/wp-content/uploads/2022/09/HASIL-IJTIMA_-ULAMA-KOMISI-FATWA-SE-INDONESIA-VII-TAHUN-2021.pdf
tanggal_akses: 2026-11-17
pemegang_hak: Sekretariat Komisi Fatwa Majelis Ulama Indonesia
lisensi: tidak ada pernyataan; buku memuat "Menghimbau semua pihak untuk menyebarluaskan hasil Ijtima' Ulama"
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: sebut MUI
teks_boleh_diubah: tidak
format: PDF (dihosting MUI Jatim)
cakupan: 12 poin bahasan Ijtima' VII
metadata_tersedia: judul bab, tanggal
catatan_risiko: tidak bernomor; cari salinan di mui.or.id
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: layak_dengan_syarat
```

```
nama: Putusan & fatwa Majelis Tarjih Muhammadiyah (HPT, ChatHPT)
jenis: fatwa
url: https://muhammadiyah.or.id/2026/11/muhammadiyah-luncurkan-chathpt-ai-keagamaan-yang-tidak-mengambil-alih-kewenangan-fatwa/
tanggal_akses: 2026-11-17
pemegang_hak: PP Muhammadiyah / Majelis Tarjih dan Tajdid
lisensi: tidak ditemukan
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: -
teks_boleh_diubah: tidak
format: buku HPT, fatwa online, ChatHPT (RAG, web)
cakupan: ibadah + fatwa kontemporer
metadata_tersedia: -
catatan_risiko: korpus tertutup; butuh kerja sama via MPI/LabMu
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: lisensi_tidak_jelas
```

```
nama: NU Online — Bahtsul Masail
jenis: fatwa
url: https://nu.or.id/bahtsul-masail/hukum-menerbitkan-karya-tulis-orang-lain-tanpa-izin-5TZqM
tanggal_akses: 2026-11-17
pemegang_hak: NU Online / PBNU (perlu_verifikasi)
lisensi: tidak terbaca
komersial_boleh: tidak_jelas
redistribusi_boleh: tidak_jelas
atribusi_wajib: -
teks_boleh_diubah: tidak
format: artikel HTML per masalah
cakupan: tanya-jawab fiqih (jumlah tidak diverifikasi)
metadata_tersedia: judul, tanggal
catatan_risiko: jawaban redaksi ≠ putusan resmi LBM PBNU
izin_ref:
boleh_tampil_komersial: belum
putusan_sementara: lisensi_tidak_jelas
```

---

## 7. Bagian F — Bacaan (niat, doa, bacaan shalat)

- **(a) Fakta:** tidak ada sumber bacaan berlisensi terbuka dengan rujukan per bacaan yang terverifikasi di sesi ini. ChatHPT berbasis Himpunan Putusan Tarjih yang memuat tuntunan ibadah (situs pihak ketiga).\[57\]
- **(b) Analisis:** banyak bacaan shalat dan doa harian adalah matan hadits atau ayat. Jalur paling bersih: simpan bacaan sebagai **pointer** ke tabel hadits/ayat (`HR-…`/`QS-…`), sehingga tiap bacaan punya rujukan asal dan tidak diketik dari ingatan. Lafaz niat yang bukan matan hadits harus dari terbitan resmi satu lembaga dengan izin; pemilihan versi antar mazhab/ormas **[perlu penasihat syariah]**. Dataset "doa harian JSON" di GitHub biasanya tanpa rujukan/lisensi data → anggap tidak layak.
- **(c) Tidak pasti:** terbitan Kemenag tentang tuntunan shalat/doa, buku HPT, dataset doa GitHub/Hugging Face: tidak sempat diperiksa.

```
nama: Bacaan dari matan hadits/ayat (pointer ke fawazahmed0/hadith-api + Tanzil)
jenis: bacaan
url: https://github.com/fawazahmed0/hadith-api ; https://tanzil.net/docs/text_license
tanggal_akses: 2026-11-17
pemegang_hak: lihat kartu induk
lisensi: Unlicense (kompilasi hadits) ; "Creative Commons Attribution 3.0" (Tanzil)
komersial_boleh: ya (teks Arab)
redistribusi_boleh: ya (verbatim)
atribusi_wajib: Tanzil Project + tautan; sebut sumber hadits
teks_boleh_diubah: tidak
format: pointer ID ke tabel hadits/ayat
cakupan: hanya bacaan yang berupa matan hadits/ayat
metadata_tersedia: ID rujukan, derajat (dari induk)
catatan_risiko: terjemahan tetap butuh izin; niat non-matan tidak tercakup
izin_ref:
boleh_tampil_komersial: ya (Arab); belum (terjemahan)
putusan_sementara: layak_dengan_syarat
```

---

## 8. Bagian G — API komunitas: MIT kode vs hak data

- **(a) Fakta:** api.quran.gading.dev = gadingnst/quran-api (MIT; data dari api.alquran.cloud + quran.kemenag.go.id). api.hadith.gading.dev = gadingnst/hadith-api (MIT; data dari tafsirq.com; 9 kitab; juga di api.hadith.sutanlab.id). Endpoint persis, pencarian, rate limit, derajat: tidak tercantum di README yang saya baca.\[20\]\[35\]\[37\]
- **(b) Analisis:** README-nya sendiri mengakui data dari Kemenag dan tafsirq.com. MIT hanya membebaskan kodenya; pembuat repo tidak punya hak atas terjemahan, jadi tidak bisa melisensikannya ke kamu. Ditambah risiko server pribadi gratis mati sewaktu-waktu. **Tidak layak untuk produksi**, boleh untuk prototipe internal.
- **(c) Tidak pasti:** api.alquran.cloud, equran.id, api.myquran.com: tidak sempat diverifikasi.

---

## 9. Bagian H — Pengecoh (distractor)

- **(a) Fakta (kartu dataset Hugging Face):** IndoQA (jakartaresearch/indoqa) "cc-by-nd-4.0", QA umum; IndoMMLU "Creative Commons Attribution-NonCommercial-ShareAlike 4.0" (metadata hub menulis "mit" — konflik); LCQA-Islamic "CC BY-NC-SA 4.0", bahasa Inggris.\[59\]\[60\]\[61\]\[62\] **Tidak ditemukan dataset tanya-jawab Islami berbahasa Indonesia berlisensi komersial yang jelas.**
- **(b) Analisis:** ambil pengecoh dari korpus yang **sudah kamu lisensikan**: ayat surah lain, fatwa DSN-MUI bertopik dekat tapi bukan jawaban (DSN-MUI saja 168 entri), hadits bab lain. ND/NC di dataset HF tidak cocok (chunking bisa dianggap adaptasi; NC = non-komersial). Apakah uji internal di perusahaan komersial terhitung "komersial" menurut CC BY-NC: **[perlu keputusan tim/hukum]**.

```
nama: Pengecoh dari korpus berlisensi sendiri (Tanzil + Kemenag + DSN-MUI + hadits)
jenis: pengecoh
url: (lihat kartu induk)
tanggal_akses: 2026-11-17
pemegang_hak: per sumber induk
lisensi: mengikuti induk
komersial_boleh: ya untuk Tanzil/hadits Arab; belum untuk terjemahan & fatwa
redistribusi_boleh: tidak (internal)
atribusi_wajib: per induk
teks_boleh_diubah: tidak
format: subset tabel yang sama, kolom is_pengecoh
cakupan: 200+ potongan mudah tercapai
metadata_tersedia: sama dengan induk
catatan_risiko: bergantung izin induk
izin_ref:
boleh_tampil_komersial: tidak relevan (internal)
putusan_sementara: layak_dengan_syarat
```

---

## 10. Rekomendasi tegas per jenis data

1. **quran_arab → MSI dari API Qur'an Kemenag untuk tampilan final; Tanzil Uthmani sekarang untuk pengembangan dan cadangan.** Risiko: izin lambat; Tanzil bisa ditolak saat tashih. Cadangan: tampil Tanzil + ajukan tashih; bila LPMQ mensyaratkan MSI, minta master lewat layanan "Permohonan Master Mushaf" LPMQ.
2. **terjemahan → Kemenag edisi 2019 via API, dengan izin tertulis eksplisit (simpan lokal, indeks, embedding, tampil komersial).** Cadangan: Arab + tautan keluar ke quran.kemenag.go.id.
3. **hadits → fawazahmed0/hadith-api untuk Arab + derajat; terjemahan Indonesia hanya dengan izin pemegang hak (kemungkinan Lidwa Pusaka/tafsirq.com — `perlu_verifikasi`).** Cadangan: Arab + rujukan tanpa terjemahan. **[perlu penasihat syariah]**
4. **tafsir → Tafsir Ringkas/Wajiz Kemenag, satu surat dengan terjemahan.** Cadangan: tidak menampilkan tafsir.
5. **fatwa → DSN-MUI PDF resmi + keputusan Komisi Fatwa MUI; simpan penuh setelah izin; sementara tampilkan kutipan pendek + tautan PDF resmi.**
6. **bacaan → pointer ke matan hadits/ayat; niat non-matan menunggu izin satu lembaga.** **[perlu penasihat syariah]**
7. **pengecoh → subset korpus berlisensi sendiri.** Cadangan: ayat & hadits Arab saja.

---

## 11. Bagian I — Rencana ekstraksi

> Kejujuran: saya **tidak** mengambil contoh baris mentah dari berkas data (unduhan Tanzil tertolak, API Kemenag butuh token, JSON fawazahmed0 tidak dibuka). Nama field yang belum terlihat ditandai `perlu_verifikasi`. Langkah pertama skrip: unduh, cetak 1 baris, tempel ke dokumen ini + URL + tanggal.

**Skema tabel (usulan):** `id`, `jenis`, `teks_arab` (verbatim, tampil), `teks_arab_index` (internal), `terjemahan`, `sumber_id`, `skema_penomoran`, `derajat`, `penilai`, `ayat_mulai`, `ayat_akhir`, `lisensi_ref`, `izin_ref`, `versi_sumber`, `checksum`.

- **I-1 Tanzil:** unduh sekali (Uthmani untuk tampil, Simple untuk indeks — `perlu_verifikasi`), simpan notice. `id` = `QS-<surah>:<ayat>`; `sumber_id` = `tanzil-uthmani-<versi>`. Jebakan: basmalah menempel di ayat 1 (kecuali surah 1 dan 9) → jangan dipotong; simbol Unicode Qur'ani (tanda waqaf, alif kecil) → simpan UTF-8 apa adanya, normalisasi hanya di kolom indeks; total wajib 6.236 baris.
- **I-2 API Kemenag:** setelah token; tarik sekali, simpan lokal **hanya bila izin membolehkan**. Tafsir ke tabel terpisah dengan `ayat_mulai/ayat_akhir`. Jebakan: catatan kaki terjemahan menempel di teks → pisahkan; rate limit tidak diketahui → beri jeda; catat edisi di `versi_sumber`.
- **I-3 fawazahmed0/hadith-api:** ambil `.../hadith-api@1/editions.json` lalu per edisi, atau folder `database/` (lihat `download.md`). `id` = `HR-<KITAB>-<nomor>` + `skema_penomoran` = `fawazahmed0`; `derajat`/`penilai` dari field grades (`perlu_verifikasi`) ke tabel terpisah (satu hadits bisa banyak penilai); `terjemahan` kosong sampai izin. Jebakan: dua sistem nomor → simpan keduanya; terjemahan hilang.
- **I-4 DSN-MUI:** scrape *daftar* 17 halaman (nomor, judul, tautan); unduh PDF manual dari Google Drive; OCR + verifikasi manusia. `id` = `FATWA-DSNMUI-117-2018` (dari baris resmi "117/DSN-MUI/II/2018 | Layanan Pembiayaan Berbasis Teknologi Informasi Berdasarkan Prinsip Syariah"); potong per diktum.\[42\] Jebakan: ayat/hadits di dalam fatwa jangan dijadikan sumber ayat (stempel tetap dari tabel Qur'an); tautan Drive bisa berubah → simpan hash.
- **I-5 Ijtima' MUI 2021:** satu PDF; cari salinan primer di mui.or.id; `id` usulan `FATWA-MUI-IJTIMA7-2021-PINJOL`.

---

## 12. Bagian J — Draf surat permohonan izin

### J-1. Ke LPMQ Kemenag
Kirim ke **lajnah@kemenag.go.id**, tembusan **quran.kemenag@gmail.com**; pertanyaan tashih juga ke **tashih@kemenag.go.id**. LPMQ menyediakan format surat resmi di akun pengguna — **pakai format itu**, draf ini sebagai isi.\[23\]

> Perihal: Permohonan Akses API Qur'an Kemenag dan Izin Pemanfaatan Terjemahan serta Tafsir untuk Aplikasi Komersial
>
> Kepada Yth. Kepala Lajnah Pentashihan Mushaf Al-Qur'an, Kementerian Agama Republik Indonesia, di Jakarta
>
> Assalamu'alaikum warahmatullahi wabarakatuh.
>
> Dengan hormat, kami [NAMA BADAN USAHA], beralamat di [ALAMAT], NIB [NOMOR], mengajukan permohonan akses API Qur'an Kemenag serta izin pemanfaatan teks Mushaf Standar Indonesia, Al-Qur'an dan Terjemahannya Edisi Penyempurnaan 2019, dan Tafsir [Ringkas/Wajiz] Kementerian Agama untuk aplikasi "Al Hikmah".
>
> Al Hikmah adalah aplikasi tanya-jawab keislaman berbahasa Indonesia untuk pelajar. Sistem mencari rujukan dari basis data kami lalu menampilkan teks ayat dan terjemahan **persis sesuai sumber**. Kecerdasan buatan hanya menyusun penjelasan dan tidak menulis ulang teks ayat maupun terjemahannya. Aplikasi bersifat komersial dengan model [BERLANGGANAN/IKLAN/FREEMIUM].
>
> Kami mohon kejelasan dan izin tertulis atas: (1) penggunaan teks, terjemahan, dan tafsir melalui API dalam aplikasi komersial; (2) penyimpanan salinan data di server kami tanpa distribusi ulang sebagai data mentah; (3) pemrosesan internal untuk pencarian (indeks kata kunci dan embedding) yang tidak ditampilkan kepada pengguna; (4) teks atribusi yang wajib dicantumkan; (5) batas pemanggilan API dan ketentuan pembaruan data; (6) apakah aplikasi yang menampilkan sebagian ayat bersumber API Qur'an Kemenag tetap wajib memperoleh Surat Tanda Tashih sebagaimana Pasal 1 angka 1 dan Pasal 2 PMA Nomor 44 Tahun 2016, beserta prosedur, kategori naskah, dan biaya PNBP yang berlaku.
>
> Kami berkomitmen tidak mengubah teks, mencantumkan sumber, dan mematuhi ketentuan LPMQ. Profil aplikasi kami lampirkan.
>
> Wassalamu'alaikum warahmatullahi wabarakatuh.
> [KOTA, TANGGAL] — [NAMA, JABATAN, TANDA TANGAN & STEMPEL] — Kontak: [EMAIL/TELEPON]

### J-2. Ke DSN-MUI
Tujuan: Sekretariat DSN-MUI (alamat/email dari dsnmui.or.id/kontak — `perlu_verifikasi`).

> Perihal: Permohonan Izin Pemanfaatan Teks Fatwa DSN-MUI dalam Aplikasi Edukasi Komersial
>
> Kami [NAMA BADAN USAHA] mengembangkan "Al Hikmah", aplikasi tanya-jawab keislaman untuk pelajar, termasuk topik muamalah sehari-hari seperti layanan pembiayaan berbasis teknologi informasi dan belanja daring. Kami telah membaca ketentuan situs DSN-MUI yang memperkenankan pengutipan dengan mencantumkan sumber. Karena aplikasi bersifat komersial dan memerlukan penyimpanan teks fatwa secara utuh untuk pencarian, kami memohon izin tertulis untuk: (1) menyimpan salinan teks fatwa yang dipublikasikan di situs resmi; (2) menampilkan kutipan diktum secara verbatim dengan nomor, judul, dan tautan dokumen resmi; (3) memproses teks secara internal (indeks dan embedding) tanpa distribusi ulang; (4) memperoleh informasi fatwa yang dicabut atau diperbarui. Kami berkomitmen tidak mengubah isi fatwa dan tidak mengatasnamakan DSN-MUI atas penjelasan yang disusun sistem.
>
> [penutup, tanda tangan, kontak seperti J-1]

### J-3. Generik (Majelis Tarjih / LBM PBNU / penerbit terjemahan hadits)

> Perihal: Permohonan Izin Pemanfaatan [NAMA KARYA/KORPUS] untuk Aplikasi Edukasi Keislaman
>
> Kepada Yth. [NAMA UNIT], [ALAMAT]
>
> Kami [NAMA BADAN USAHA] mengembangkan "Al Hikmah" untuk membantu pelajar memahami tuntunan ibadah dan muamalah dengan menampilkan rujukan asli secara utuh. Kami memohon izin memanfaatkan [NAMA KARYA, edisi, tahun] untuk: (1) penyimpanan di basis data kami, (2) penampilan kutipan verbatim beserta rujukan, (3) pemrosesan internal untuk pencarian, dalam aplikasi komersial.
> [Untuk Majelis Tarjih:] Kami terbuka untuk kerja sama data dengan pengembang ChatHPT (MPI dan LabMu), termasuk mengarahkan pengguna ke ChatHPT untuk persoalan yang memerlukan putusan Tarjih.
> [Untuk penerbit terjemahan hadits:] Mohon informasi skema penomoran hadits dan sumber penilaian derajat dalam karya tersebut.
> Kami siap mengikuti syarat atribusi, royalti, atau perjanjian lisensi yang ditetapkan.
>
> [penutup, tanda tangan, kontak]

**Isian untuk pemilik proyek:** nama & bentuk badan usaha, NIB, NPWP, alamat, penanggung jawab; deskripsi aplikasi + mockup; model bisnis & perkiraan pengguna; sasaran pengguna (sebut terus terang ada pengguna di bawah 18 tahun); data persis yang diminta (edisi/kitab/rentang); cara penyimpanan & atribusi di layar; kontak aktif.

---

## 13. Tabel putusan ringkas

| jenis data | sumber direkomendasikan | status lisensi | boleh_tampil_komersial | rencana cadangan |
|---|---|---|---|---|
| quran_arab | API Qur'an Kemenag (MSI) untuk tampil; Tanzil untuk sekarang | Tanzil: CC BY 3.0, verbatim; Kemenag: izin | ya (Tanzil) / belum (MSI) | Tanzil + ajukan tashih; minta master MSI |
| terjemahan | Kemenag edisi 2019 via API | Hak cipta LPMQ (dicatat 2024); izin wajib | belum | Arab + tautan keluar ke quran.kemenag.go.id |
| hadits | fawazahmed0/hadith-api (Arab + derajat) | Unlicense (kompilasi); terjemahan tidak jelas | ya (Arab) / belum (terjemahan) | Arab + rujukan tanpa terjemahan |
| tafsir | Tafsir Ringkas/Wajiz Kemenag via API | Hak cipta LPMQ; izin wajib | belum | Tidak menampilkan tafsir |
| fatwa | DSN-MUI PDF resmi + Ijtima' MUI 2021 | Boleh kutip dengan sumber; simpan penuh butuh izin | belum (kutipan pendek + tautan: ya) | Kutipan pendek + tautan PDF resmi |
| bacaan | Pointer ke matan hadits/ayat | Mengikuti induk | ya (Arab) / belum (terjemahan) | Tunda niat non-matan |
| pengecoh | Subset korpus berlisensi sendiri | Mengikuti induk | tidak relevan (internal) | Ayat & hadits Arab saja |

---

## 14. Daftar tindakan berurutan

**Bisa dikerjakan sendiri minggu ini:**
1. Unduh Tanzil (Uthmani + Simple), simpan notice, cek 6.236 baris, tulis atribusi di halaman "Tentang" prototipe.
2. Unduh `editions.json` fawazahmed0/hadith-api; catat ada/tidaknya edisi Indonesia, nama field derajat/penilai, dan 1 baris mentah (URL + tanggal).
3. Daftar akun di quran-api.lpmqkemenag.id, unduh format surat resmi, baca syarat setelah login.
4. Scrape daftar 17 halaman fatwa DSN-MUI (nomor, judul, tautan).
5. Buka halaman kontak/footer dsnmui.or.id, mui.or.id, tarjih.or.id, nu.or.id; catat alamat/email + pernyataan hak cipta.
6. Kunci skema ID dengan kolom `skema_penomoran` sebelum ingest hadits.
7. Jangan pakai api.quran.gading.dev / api.hadith.gading.dev / repo berisi terjemahan Kemenag untuk apa pun yang dirilis.

**Bergantung pihak lain:**
8. Siapkan badan usaha (minimal PT Perorangan) untuk akun penerbit tashih. **[perlu keputusan tim/hukum]**
9. Kirim J-1 ke LPMQ.
10. Kirim J-2 ke DSN-MUI.
11. Konfirmasi ke tashih@kemenag.go.id / WA +62 811-1997-125 soal kategori "Mushaf Al-Qur'an Digital" dan PNBP.
12. Kirim J-3 ke Majelis Tarjih (via MPI/LabMu) dan pemegang hak terjemahan hadits.
13. Setelah izin keluar: isi `izin_ref`, perbarui `boleh_tampil_komersial`, ajukan tashih aplikasi.

---

## 15. Hal yang menunggu keputusan

**[perlu penasihat syariah]**
- Pemilihan penilai derajat hadits dan kebijakan menampilkan hadits dhaif.
- Versi bacaan niat/doa/bacaan shalat antar mazhab/ormas.
- Topik tanpa fatwa bernomor (judi online, paylater): cukup ayat + pernyataan resmi, atau tidak dijawab.
- Validasi sampel penomoran hadits terhadap kitab cetak.
- Kelayakan menampilkan hadits Arab tanpa terjemahan untuk siswa; opsi terjemahan sendiri.

**[perlu keputusan tim/hukum]**
- Kolom indeks Arab tanpa harakat vs "CHANGING IT IS NOT ALLOWED" Tanzil.
- Embedding sebagai "machine-learning model" (bila memakai Quran Foundation).
- Status hak cipta edisi Kemenag 1965/1989/2002.
- Rantai hak fawazahmed0 yang sebagian dari sunnah.com.
- Format ID keputusan Ijtima' tanpa nomor; bentuk badan usaha untuk tashih.
- Uji internal dengan dataset CC BY-NC; perlindungan data pengguna di bawah 18 tahun.

---

## 16. Hal yang tidak bisa saya verifikasi / saya ragukan

- **Gagal dibuka:** tanzil.net/download; PDF PMA 44/2016 di tashih.kemenag.go.id (maintenance); peraturan.bpk.go.id (diblokir, menurut subagen); berita LPMQ "Gandeng Kominfo…" (hanya cuplikan).
- **Hanya terlihat setelah login:** format surat, syarat, endpoint, rate limit, nama field API Kemenag.
- **Teks PMA 44/2016** dari pasal.id ("belum ditinjau"); Pasal 4 ayat (4) tidak terlihat.
- **Tidak sempat diperiksa (anggaran pencarian habis):** api.alquran.cloud, equran.id, api.myquran.com, HadithAPI.com, Open Hadith Data, LK Hadith Corpus, hadith-json, hadits.id, Lidwa Pusaka, tafsirq.com, tafsirweb.com, Tafsir Ibnu Katsir Indonesia, repo risan/rioastamal/semnoc, dataset Qur'an/hadits/doa Hugging Face, terbitan doa Kemenag, status hak cipta HPT, syarat situs nu.or.id dan tarjih.or.id, kontak resmi lembaga, kompilasi fatwa OJK.
- **Klaim pihak ketiga belum terkonfirmasi:** varian Tanzil (Grokipedia; versi 1.1 sudah dikonfirmasi tanzil.net/docs/news, 12 Februari 2021); tarif PNBP (gemarisalah.com menulis "Rp1.000.000 [30 juz] ditambah Rp500.000 per komponen tambahan", halaman resmi hanya menyebut dasar PP 59/2018); label "Public Domain" Archive.org; label CC BY-NC Kaggle atas data fawazahmed0; "Fatwa MUI Nomor 11 Tahun 2009" (endekab.go.id); fatwa paylater MUI Jatim; hpt.muhammadiyah.or.id sebagai alamat ChatHPT; asal terjemahan tafsirq.com = Lidwa.
- **Konflik:** tahun revisi terjemahan Kemenag; lisensi IndoMMLU (CC BY-NC-SA vs "mit").
- **Status berlaku Fatwa 117/DSN-MUI/II/2018** tidak tercantum.
- **UU 28/2014:** Pasal 42 dan Pasal 58 ayat (3) sudah dicocokkan ke teks resmi DJKI (dgip.go.id); Pasal 40 tidak dibuka ulang dan masih mengandalkan catatan riset sebelumnya.

## Sources

1. [Sistem Informasi Layanan Tashih Mushaf Al-Qur'an Kementerian Agama RI](https://tashih.lpmqkemenag.id/faq?page=1)
2. [Kementerian Agama Republik Indonesia](https://tashih.kemenag.go.id/uploads/1/2018-05/pma_nomor_44_tahun_2016.pdf)
3. [Permenag 44/2016 — Penerbitan, Pentashihan, dan…](https://pasal.id/peraturan/permen/peraturan-menag-no-44-tahun-2016)
4. [Kementerian Agama RI on X: "2. Apa itu Mushaf Alquran? Yaitu lembaran atau media yang berisikan ayat-ayat Alquran lengkap 30 juz dan/atau bagian dari surah atau ayat-ayatnya, baik cetak maupun digital #kultwit #LPMQ" / X](https://x.com/Kemenag_RI/status/1059648450759782400)
5. [LPMQ Akan Susun Aturan Standardisasi Penerbitan dan Percetakan Al-Qur’an](https://lajnah.kemenag.go.id/info-lpmq/berita-dan-artikel/berita/lpmq-akan-susun-aturan-standardisasi-penerbitan-dan-percetakan-al-qur%E2%80%99an.html)
6. [Sistem Informasi Layanan Tashih Mushaf Al-Qur'an Kementerian Agama RI](https://tashih.lpmqkemenag.id/info-layanan-pentashihan/read/standar-pelayanan-permohonan-surat-tanda-tashih)
7. [PANDUAN MENGAJUKAN PERMOHONAN TANDA TASHIH Lajnah Pentashihan Mushaf Al-Qur’an](https://tashih.lpmqkemenag.id/uploads/1/2019-08/panduan_mengajukan_permohonan_surat_tanda_tashih.pdf)
8. [Gandeng Kominfo, LPMQ Perkuat Pengawasan Al-Qur’an Digital](https://lajnah.kemenag.go.id/info-lpmq/berita-dan-artikel/berita/gandeng-kominfo,-lpmq-perkuat-pengawasan-al-qur%E2%80%99an-digital.html)
9. [Question about using a resource · Issue #991 · TarteelAI/quranic-universal-library · GitHub](https://github.com/TarteelAI/quranic-universal-library/issues/991)
10. [License clarification for resources 73 (Mutashabihat ul Quran) and 74 (Similar Ayah) · Issue #704 · TarteelAI/quranic-universal-library · GitHub](https://github.com/TarteelAI/quranic-universal-library/issues/704)
11. [Licensing Permission for Quran Translations, Arabic Text, and Recitations · Issue #957 · TarteelAI/quranic-universal-library · GitHub](https://github.com/TarteelAI/quranic-universal-library/issues/957)
12. [FAQ - Quranic Universal Library - Tarteel](https://qul.tarteel.ai/faq)
13. [GitHub - TarteelAI/quranic-universal-library: A comprehensive collection of Quran resources · GitHub](https://github.com/TarteelAI/quranic-universal-library)
14. [Quran Foundation Developer Terms of Service](https://api-docs.quran.foundation/legal/developer-terms/)
15. [Frequently Asked Questions](https://api-docs.quran.com/docs/tutorials/faq/)
16. [Quran Foundation Developer Terms of Service](https://qf-api-docs.pages.dev/legal/developer-terms/)
17. [GitHub - fawazahmed0/quran-api: Free Quran API Service with 90+ different languages and 400+ translations · GitHub](https://github.com/fawazahmed0/quran-api)
18. [quran-api/editions.json at 1 · fawazahmed0/quran-api · GitHub](https://github.com/fawazahmed0/quran-api/blob/1/editions.json)
19. [GitHub - nyancodeid/quran-api-go: Al-Qur'an JSON API \[id-ID\] · GitHub](https://github.com/nyancodeid/quran-api-go)
20. [GitHub - gadingnst/quran-api: Simple Quran API & Database with Indonesia Tafsir and media audio (murrotal) Syekh. Mishary Rashid Alafasy · GitHub](https://github.com/gadingnst/quran-api)
21. [GitHub - rzkytmgr/quran-api: A free and open-source multilingual Qur'an REST API providing surahs, ayahs, audio, and support for custom reciters. Easy to integrate into your frontend or any project that needs reliable Qur'an data. · GitHub](https://github.com/rzkytmgr/quran-api)
22. [Quran for Claude Code (Unofficial) - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=WisangJatiAnggoro.quran-for-claude-code)
23. [Qur'an Kemenag API](https://quran-api.lpmqkemenag.id/)
24. [Pengumuman, Sembilan Produk Kajian Al-Qur'an LPMQ ini Sudah Peroleh Surat Hak Cipta - MONITOR](https://monitor.co.id/2024/05/28/pengumuman-sembilan-produk-kajian-al-quran-lpmq-ini-sudah-peroleh-surat-hak-cipta/)
25. [Mahasantri PPBQ Mengikuti Kuliah Umum Terjemahan Al-Qur’an Kemenag di LPMQ](https://lajnah.kemenag.go.id/info-lpmq/berita-dan-artikel/berita/mahasantri-ppbq-mengikuti-kuliah-umum-terjemahan-al-qur%E2%80%99an-kemenag-di-lpmq.html)
26. [SEJARAH DAN KARAKTERISTIK AL-QUR’AN DAN TERJEMAHNYA KEMENTERIAN AGAMA RI](https://jurnalsuhuf.kemenag.go.id/suhuf/article/download/669/240)
27. [Quran Translations - Tanzil](https://tanzil.net/trans/)
28. [Al Quran Kemenag Edisi Penyempurnaan 2019 : Kemenag RI : Free Download, Borrow, and Streaming : Internet Archive](https://archive.org/details/al-quran-kemenag-edisi-penyempurnaan-2019)
29. [LPMQ Sediakan Akses API Qur’an Bagi Programmer, Upaya Menjamin Keaslian Teks, Terjemahan, dan Tafsir Al-Qur’an - Beranda Indonesia](https://www.berandaindonesia.id/2025/10/10/lpmq-sediakan-akses-api-quran-bagi-programmer-upaya-menjamin-keaslian-teks-terjemahan-dan-tafsir-al-quran/)
30. [GitHub - fawazahmed0/hadith-api: Free Hadith API Service with Multiple Languages and Multiple Grades](https://github.com/fawazahmed0/hadith-api)
31. [Request for API access: \[Muhammad Fahad\] · Issue #4255 · sunnah-com/api · GitHub](https://github.com/sunnah-com/api/issues/4255)
32. [GitHub - famashines/sakinah-data: Data files for the Sakinah prayer app, served through jsDelivr · GitHub](https://github.com/famashines/sakinah-data)
33. [hadith-api/LICENSE at 1 · fawazahmed0/hadith-api · GitHub](https://github.com/fawazahmed0/hadith-api/blob/1/LICENSE)
34. [hadith-api-data](https://www.kaggle.com/datasets/mahmoudlotfi/hadith-api-data)
35. [GitHub - gadingnst/hadith-api: Simple Islamic Hadith API with Indonesia Translation. · GitHub](https://github.com/gadingnst/hadith-api)
36. [hadith-api/package.json at master · gadingnst/hadith-api · GitHub](https://github.com/gadingnst/hadith-api/blob/master/package.json)
37. [GitHub - indratdev/hadith-api](https://github.com/indratdev/hadith-api)
38. [API access and written permission enquiry for ApnaQuran.com · Issue #4290 · sunnah-com/api · GitHub](https://github.com/sunnah-com/api/issues/4290)
39. [Request for API access: Mohammad Bawaya · Issue #3786 · sunnah-com/api · GitHub](https://github.com/sunnah-com/api/issues/3786)
40. [Request for API access: Mohamed Kenneh · Issue #4359 · sunnah-com/api · GitHub](https://github.com/sunnah-com/api/issues/4359)
41. [License needed for tafsir resources: may they ground AI-drafted content in a free, non-commercial app? · Issue #818 · TarteelAI/quranic-universal-library · GitHub](https://github.com/TarteelAI/quranic-universal-library/issues/818)
42. [Fatwa – Laman 5 – DSN-MUI](https://dsnmui.or.id/kategori/fatwa/page/5/)
43. [117-layanan-pembiayaan-berbasis-teknologi-informasi- ...](https://www.shariaknowledgecentre.id/content/dam/prudential-aem-lbu/skid/files/117-layanan-pembiayaan-berbasis-teknologi-informasi-berdasarkan-prinsip-syariah.pdf)
44. [Analisis fitur pembayaran Shopee PayLater dalam sudut ...](https://urj.uin-malang.ac.id/index.php/mij/article/download/9131/3915)
45. [The Renewal of Islamic Economic Law Volume 6 No 1, Juni 2025, 1-9](https://jurnal.idaqu.ac.id/index.php/al-ikhtisar/article/download/1168/548/3972)
46. [JIMMI: Jurnal Ilmiah Mahasiswa Multidisiplin](https://jurnal.fanshurinstitute.org/index.php/jimmi/article/download/467/353)
47. [KEPUTUSAN IJTIMA’ ULAMA KOMISI FATWA SE-INDONESIA VII MAJELIS ULAMA INDONESIA](https://muijatim.or.id/wp-content/uploads/2022/09/HASIL-IJTIMA_-ULAMA-KOMISI-FATWA-SE-INDONESIA-VII-TAHUN-2021.pdf)
48. [MUI menetapkan pinjol haram karena riba, mengancam, dan membuka aib - ANTARA News Mataram](https://mataram.antaranews.com/berita/175789/mui-menetapkan-pinjol-haram-karena-riba-mengancam-dan-membuka-aib)
49. [MUI: Pinjaman Online Haram, Ini Alasannya](https://www.liputan6.com/bisnis/read/4708538/mui-pinjaman-online-haram-ini-alasannya)
50. [Judi Online tak Membuat Kaya, Simak Deretan Alasan Haramnya Perjudian - mui.or.id](https://mui.or.id/baca/berita/judi-online-tak-membuat-kaya-simak-deretan-alasan-haramnya-perjudian)
51. [Sekjen MUI: Judi Online Haram, Merusak Moral dan Mental](https://mui.or.id/baca/berita/sekjen-mui-judi-online-haram-merusak-moral-dan-mental)
52. [Ditanya Fatwa Haram Judi Online, Ketua MUI Langsung Baca Ayat Ini](https://www.cnbcindonesia.com/tech/20240725172024-37-557664/ditanya-fatwa-haram-judi-online-ketua-mui-langsung-baca-ayat-ini)
53. [MUI sebut tak perlu fatwa judi "online" karena sudah haram di Al Quran - ANTARA News](https://www.antaranews.com/berita/4216831/mui-sebut-tak-perlu-fatwa-judi-online-karena-sudah-haram-di-al-quran)
54. [MUI Tegaskan Beda Hiburan Game dan Perjudian Haram, Ini Batasan yang Jelas](https://dinkopumkm.endekab.go.id/berita/news2601093.html)
55. [Muhammadiyah Luncurkan ChatHPT, AI Keagamaan yang Tidak Mengambil Alih Kewenangan Fatwa](https://muhammadiyah.or.id/2026/11/muhammadiyah-luncurkan-chathpt-ai-keagamaan-yang-tidak-mengambil-alih-kewenangan-fatwa/)
56. [Muhammadiyah Resmi Luncurkan ChatHPT, Asisten AI Keagamaan yang Mudahkan Akses Fatwa dan Putusan Tarjih - Universitas Muhammadiyah Mataram](https://ummat.ac.id/en/muhammadiyah-resmi-luncurkan-chathpt-asisten-ai-keagamaan-yang-mudahkan-akses-fatwa-dan-putusan-tarjih/)
57. [Muhammadiyah Resmi Luncurkan ChatHPT, Asisten AI untuk Mempermudah Akses Informasi Keagamaan](https://lphkhtmuhammadiyah.or.id/muhammadiyah-luncurkan-chathpt-ai-keagamaan/)
58. [Hukum Menerbitkan Karya Tulis Orang Lain tanpa Izin](https://nu.or.id/bahtsul-masail/hukum-menerbitkan-karya-tulis-orang-lain-tanpa-izin-5TZqM)
59. [SEACrowd/indoqa · Datasets at Hugging Face](https://huggingface.co/datasets/SEACrowd/indoqa)
60. [indolem/IndoMMLU · Datasets at Hugging Face](https://huggingface.co/datasets/indolem/IndoMMLU)
61. [jakartaresearch/indoqa · Datasets at Hugging Face](https://huggingface.co/datasets/jakartaresearch/indoqa)
62. [Faiz28/LCQA-Islamic · Datasets at Hugging Face](https://huggingface.co/datasets/Faiz28/LCQA-Islamic)
