# Riset Lanjutan Sumber Rak 1 (Ibadah) dan Sisa Rak 2: Peta Sumber, Lisensi, dan Status Verifikasi

Temuan terpenting: untuk Rak 1 (ibadah harian), **belum ada satu pun sumber pendapat/fatwa ibadah berbahasa Indonesia yang lisensinya terverifikasi boleh disimpan dan diindeks untuk produk komersial**. Kabar yang lebih baik ada di Rak 2: klaim "Fatwa MUI Jawa Timur soal paylater" yang tadinya belum terverifikasi ternyata **benar dan bernomor**, yaitu Fatwa MUI Provinsi Jawa Timur Nomor 04 Tahun 2022 tentang Transaksi Digital dengan Sistem Paylater.\[1\] PDF-nya saya buka langsung di muijatim.or.id.

## TL;DR

- **Hadits (A5):** fawazahmed0/hadith-api punya 10 kitab dan **7 edisi berbahasa Indonesia** (ind-abudawud, ind-bukhari, ind-ibnmajah, ind-malik, ind-muslim, ind-nasai, ind-tirmidhi). Namun semua edisi Indonesia ditandai `"author": "Unknown"` dan `"source": ""`, jadi terjemahan Indonesianya **tidak layak untuk rilis komersial**.\[2\] Teks Arab + derajat tetap bisa dipakai untuk prototipe. Daftar penilai derajat terlihat di dataset Hugging Face milik penulis yang sama.\[3\] Nama key persis di dalam objek `grades` **belum terverifikasi**, karena berkas edisi mentah gagal dibuka.
- **Ibadah (A1–A4):** ChatHPT (Muhammadiyah) memakai korpus 1.153 naskah dan halamannya bertuliskan "© 2026 Muhammadiyah. Hak cipta dilindungi.".\[4\]\[5\]\[6\] Saya tidak menemukan API maupun kebijakan data terbuka, jadi jalurnya harus izin lewat Majelis Tarjih/MPI/LabMu. Database fatwa MUI pusat (fatwamui.com) memuat fatwa ibadah bernomor dalam PDF. Syarat pemakaian situs nu.or.id, tarjih.or.id, dan Kemenag **tidak sempat diperiksa**.
- **Rak 2:** Paylater kini punya **fatwa bernomor regional** (MUI Jatim 04/2022). Jual beli online punya fatwa DSN-MUI 144, 145, 146/DSN-MUI/XII/2021 (marketplace, dropship, online shop); judul ketiganya tercantum di daftar resmi DSN-MUI (dsnmui.or.id/kategori/fatwa), masing-masing dengan tautan "Salinan Fatwa (PDF)". Kuis/SMS berhadiah punya Fatwa MUI Nomor 9 Tahun 2008 (dari cuplikan PDF Himpunan Fatwa MUI di mui.or.id). Pinjol: PDF Keputusan Ijtima' VII tentang pinjol ada di fatwamui.com; bab/halamannya belum dicatat.

---

## 1. Ringkasan 10 baris (bahasa sederhana)

1. Untuk ibadah harian, sumber resmi ormas dan MUI memang ada, tetapi tidak satu pun memberi izin terbuka untuk menyimpan seluruh isinya di database komersial.
2. Untuk prototipe internal yang tidak dipublikasikan, kamu bisa mulai dari PDF fatwa MUI (fatwamui.com) asal setiap entri ditandai "lisensi_belum_jelas".
3. ChatHPT Muhammadiyah sudah memakai pendekatan yang mirip proyekmu (RAG dari dokumen resmi).\[7\] Ini peluang kerja sama, bukan sumber data yang bisa diambil begitu saja.
4. Hadits Arab + derajat dari fawazahmed0 tetap sumber utama. Terjemahan Indonesianya tidak jelas asal-usulnya, jadi jangan dirilis.
5. Kitab fiqih klasik: OpenITI berlisensi CC BY-NC-SA 4.0 (NC = Non-Commercial, tidak boleh komersial), dan Shamela tidak punya lisensi terbuka.\[8\]\[9\] Untuk produk komersial, keduanya hanya boleh untuk riset internal.
6. Paylater: ada fatwa bernomor dari MUI Jawa Timur (04/2022).\[1\]\[10\] Statusnya regional, bukan fatwa MUI pusat atau DSN-MUI.
7. Jual beli online: DSN-MUI punya fatwa khusus marketplace, dropship, dan online shop (2021).\[11\] PDF resminya perlu diunduh dan dicek.
8. Giveaway/kuis: ada fatwa MUI tentang SMS berhadiah (2008) dan fatwa DSN tentang hadiah promosi di lembaga keuangan syariah (2012).\[12\]\[13\] Fatwa khusus "giveaway media sosial" tidak ditemukan.
9. Untuk awal Ramadan, jadwal shalat, dan zakat fitrah, aplikasi cukup menyuruh pengguna "ikuti pengumuman resmi". Halaman pengumuman Kemenag/BAZNAS belum sempat saya verifikasi.
10. Semua ini peta fakta dan risiko, **bukan nasihat hukum** dan **bukan fatwa**. Pemilihan pendapat harus lewat penasihat syariah.

---

## 2. Tabel putusan per sub-topik

| Sub-topik | Sumber utama (rekomendasi) | Cadangan | Status lisensi | Bisa diekstrak? | Perlu penasihat syariah? |
|---|---|---|---|---|---|
| Thaharah, shalat, puasa, zakat fitrah (pendapat/fatwa) | Database fatwa MUI pusat (fatwamui.com), kategori "Ibadah" | HPT/Fatwa Tarjih via kerja sama ChatHPT | Tidak jelas (MUI); "Hak cipta dilindungi" (ChatHPT) | Ya, PDF per fatwa (perlu cek apakah teks digital atau scan) | Ya, untuk memilih lembaga rujukan per topik |
| Perbedaan pendapat (A2) | **Belum ada kandidat terverifikasi** | – | – | – | Ya |
| Kitab fiqih klasik (A3) | Teks Arab dari edisi domain publik yang diverifikasi manual (belum ditemukan repositori yang aman komersial) | OpenITI (hanya riset internal, NC) | OpenITI CC BY-NC-SA 4.0; Shamela tidak jelas | OpenITI: ya (teks mARkdown/berkas teks); Shamela: ya, tapi lisensi tidak jelas | Ya, untuk memilih kitab dan edisi |
| Bacaan (niat, doa) (A4) | **Belum ada kandidat terverifikasi**; usulan: satu buku tuntunan ormas/Kemenag lewat izin | Pointer ke ayat (Tanzil) dan hadits (fawazahmed0 Arab) | – | Pointer: ya | Ya, terutama lafaz niat |
| Hadits ibadah (A5) | fawazahmed0/hadith-api, **edisi Arab** + derajat | sunnah.com sebagai pembanding teks (sesuai pernyataan maintainer)\[14\] | Unlicense (kompilasi); edisi ind- tidak jelas asalnya | Ya, JSON | Ya, untuk kebijakan penilai derajat |
| Rujukan waktu (A6) | Kemenag (sidang isbat) – URL belum terverifikasi | Majelis Tarjih (KHGT), LBM PBNU, BAZNAS – belum diperiksa | Hanya ditautkan, tidak disimpan | Tidak perlu | Ya, untuk kebijakan "ikuti siapa" |
| Jual beli online (B1) | Fatwa DSN-MUI 146/DSN-MUI/XII/2021 (Online Shop) | 144 (Marketplace), 145 (Dropship), 110/DSN-MUI/IX/2017 (Akad Jual Beli) | Kutip boleh dengan sumber (DSN); simpan penuh butuh izin | Ya, PDF | Ya |
| Giveaway/undian/kuis (B2) | Fatwa MUI No. 9 Tahun 2008 tentang SMS Berhadiah | Fatwa DSN-MUI 86/DSN-MUI/XII/2012 tentang Hadiah dalam Penghimpunan Dana LKS | Tidak jelas | Ya, PDF (Himpunan Fatwa MUI, hal. 523) | Ya, karena giveaway modern belum tentu analog |
| Paylater (B3) | **Fatwa MUI Prov. Jawa Timur No. 04 Tahun 2022** | Keputusan Ijtima' VII 2021 (pinjol) sebagai rujukan pembanding | Tidak jelas (situs MUI Jatim) | Ya, PDF teks digital | Ya, karena berstatus regional |
| Judi online (B3) | Tidak ada fatwa bernomor MUI pusat yang ditemukan (latar riset sebelumnya) | Fatwa MUI Jatim No. 1 Tahun 2022 tentang Game Higgs Domino Island (perlu_verifikasi isi) | Tidak jelas | Ya, PDF | Ya |
| Pinjol (B4) | Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia VII (11 Nov 2021) di fatwamui.com | Fatwa 117/DSN-MUI/II/2018 (latar) | Tidak jelas | Ya, PDF | Ya |
| Terjemahan Qur'an Indonesia terbuka (C) | **Tidak ditemukan** | – | – | – | – |

---

## 3. Kartu sumber

### 3.1 Hadits

```
nama: fawazahmed0/hadith-api – edisi Arab (ara-*) + derajat
jenis: hadits
url: https://github.com/fawazahmed0/hadith-api/blob/1/editions.json ; https://github.com/fawazahmed0/hadith-api/blob/1/References.md
tanggal_akses: 18 November 2026
pemegang_hak: fawazahmed0 (kompilasi); teks sumber dari situs pihak ketiga (lihat References.md)
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): LICENSE (Unlicense): "free and unencumbered software released into the public domain"\[15\]
kutip_boleh: ya
simpan_salinan_dan_indeks_boleh: ya (untuk kompilasi); tidak_jelas untuk teks hulu
atribusi_wajib: tidak diwajibkan oleh Unlicense; tetap disarankan
format: API (JSON statis via CDN jsDelivr)\[16\]
cara_ekstraksi: unduh JSON per edisi (link/linkmin di editions.json)
struktur_dan_id_kutipan: per edisi: name, book, author, language, has_sections, direction, source, comments, link, linkmin. Per hadits (terlihat di dataset HF penulis yang sama): hadithnumber, arabicnumber, text, kolom per penilai, book, hadith, section\[2\]\[3\]
status_berlaku: aktif; branch "1" terus berubah, jadi kunci (pin) ke satu commit\[17\]
cara_minta_izin: GitHub issues repo (ada isu terbuka soal provenansi, mis. #128)\[18\]
catatan_risiko: References.md menyebut al-maktaba.org, iium.edu.my, hadithbd.com, sunnah.com, dll. Maintainer menyebut "sunnah.com" sebagai rujukan teks Arab (issue #128).\[14\]\[19\] Unlicense dari pengunggah tidak otomatis membersihkan hak pihak hulu.
putusan_sementara: layak_dengan_syarat
```

Bukti mentah dari `editions.json` (dibuka langsung, URL: https://github.com/fawazahmed0/hadith-api/blob/1/editions.json, akses 18 November 2026). Baris pembuka berkas:

```
"name": "ara-abudawud", "book": "abudawud", "author": "Unknown", "language": "Arabic", "has_sections": true, "direction": "rtl", "source": "", "comments": "",
```

Entri Indonesia (dari pembacaan penuh editions.json oleh subagen, URL sama):

```
{"name": "ind-abudawud", "book": "abudawud", "author": "Unknown", "language": "Indonesian", "has_sections": true, "direction": "ltr", "source": "", "comments": "", "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ind-abudawud.json", ...}
```

Kitab yang tersedia (key → nama): abudawud (Sunan Abu Dawud), bukhari (Sahih al Bukhari), dehlawi (Forty Hadith of Shah Waliullah Dehlawi), ibnmajah (Sunan Ibn Majah), malik (Muwatta Malik), muslim (Sahih Muslim), nasai (Sunan an Nasai), nawawi (Forty Hadith of an-Nawawi), qudsi (Forty Hadith Qudsi), tirmidhi (Jami At Tirmidhi). Edisi Indonesia ada untuk 7 kitab. Tidak ada ind- untuk dehlawi, nawawi, dan qudsi.\[2\]

**Field derajat dan penilai (A5):**
- Di dataset Hugging Face `fawazahmed0/hadith-data` (CC0-1.0, `source: https://github.com/fawazahmed0/hadith-api`), derajat muncul sebagai **kolom terpisah per penilai**: `Al-Albani`, `Muhammad Muhyi Al-Din Abdul Hamid`, `Shuaib Al Arnaut`, `Zubair Ali Zai`, `Muhammad Fouad Abd al-Baqi`, `Salim al-Hilali`, `Abu Ghuddah`, `Ahmad Muhammad Shakir`, `Bashar Awad Maarouf`. Contoh baris Abu Dawud no. 1: Al-Albani "Hasan Sahih", Shuaib Al Arnaut "Sahih Lighairihi", Zubair Ali Zai "Isnaad Hasan".\[3\]\[20\]
- Di JSON mentah, kode pihak ketiga memakai `hadiths[]`, `hadithnumber`, `text`, `reference.book`, dan `grades` berbentuk array (kosong untuk Bukhari/Muslim).\[21\]\[22\] **Nama key di dalam setiap objek `grades` tidak terlihat langsung, jadi statusnya `perlu_verifikasi`.** Berkas edisi mentah (cdn.jsdelivr.net, raw.githubusercontent.com), `download.md`, dan `info.json` **gagal dibuka** oleh alat saya.

```
nama: fawazahmed0/hadith-api – edisi Indonesia (ind-*)
jenis: hadits / terjemahan
url: https://github.com/fawazahmed0/hadith-api/blob/1/editions.json
tanggal_akses: 18 November 2026
pemegang_hak: tidak diketahui ("author": "Unknown", "source": "")\[2\]
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak ada pernyataan asal terjemahan
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: tidak bisa dipenuhi karena penerjemah tidak diketahui
format: API (JSON)
cara_ekstraksi: JSON, digabung ke edisi Arab lewat (reference.book, arabicnumber) – metode ini dipakai proyek pihak ketiga\[22\]
struktur_dan_id_kutipan: sama dengan edisi Arab
status_berlaku: aktif
cara_minta_izin: GitHub issues (pemegang hak asli tidak diketahui)
catatan_risiko: terjemahan Indonesia hampir pasti berhak cipta milik penerbit tertentu; asalnya tidak terdokumentasi di mana pun yang saya temukan
putusan_sementara: lisensi_tidak_jelas (prototipe internal saja, ditandai)
```

### 3.2 Pendapat/fatwa ibadah

```
nama: ChatHPT – Majelis Tarjih dan Tajdid PP Muhammadiyah
jenis: pendapat_ibadah
url: https://hpt.muhammadiyah.or.id/about
tanggal_akses: 18 November 2026
pemegang_hak: Muhammadiyah (footer: "© 2026 Muhammadiyah. Hak cipta dilindungi."; dikembangkan MPI PP Muhammadiyah bersama LabMu)\[23\]
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): "Hak cipta dilindungi." Tidak ditemukan halaman syarat pemakaian, kebijakan data, atau API publik
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak (tanpa izin)
atribusi_wajib: ya (secara etis dan hukum)
format: HTML (chat + menu "Jelajah" arsip); bertanya butuh login Muhammadiyah ID\[6\]
cara_ekstraksi: jangan di-scrape; minta akses resmi
struktur_dan_id_kutipan: 1.153 naskah, 6.597 konsep & entitas, rentang 1998–2026.\[4\] Rincian menurut artikel muhammadiyah.or.id "Mengenal ChatHPT…" (Nov 2026): "836 naskah Fatwa Tarjih, 255 dokumen Tanya Jawab Agama, dan 62 dokumen Himpunan Putusan Tarjih", plus 2.742 konsep fikih dan usul fikih serta 3.855 entitas
status_berlaku: diluncurkan 5 November 2026; halaman menegaskan "ChatHPT tidak dimaksudkan untuk menghasilkan fatwa baru"\[4\]\[6\]
cara_minta_izin: tiga pihak di halaman: Majelis Tarjih dan Tajdid PP Muhammadiyah (otoritas keilmuan), Majelis Pustaka dan Informasi PP Muhammadiyah, LabMu – Divisi AIMU (pengembang).\[4\]\[23\] Kontak email/telepon tidak tercantum di halaman yang dibuka
catatan_risiko: menu "Jelajah" bisa diakses tanpa login, tapi "bisa dibaca" tidak sama dengan "boleh diambil"
putusan_sementara: tidak_layak (tanpa izin); layak_dengan_syarat bila ada kerja sama
```

```
nama: Database Fatwa MUI (fatwamui.com/data-fatwa)
jenis: fatwa
url: https://fatwamui.com/data-fatwa
tanggal_akses: 18 November 2026
pemegang_hak: Majelis Ulama Indonesia (asumsi; situs ini ditautkan dari menu "Kumpulan Fatwa MUI Pusat" di muijatim.or.id)
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak ditemukan di bagian halaman yang terbuka
kutip_boleh: tidak_jelas (praktik umum: kutip dengan sumber)
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: ya
format: tabel HTML + PDF per fatwa (path /storage/<id>/<nama>.pdf)
cara_ekstraksi: unduh PDF; cek apakah ada lapisan teks atau perlu OCR (OCR = mengubah gambar scan jadi teks)
struktur_dan_id_kutipan: kolom No (urutan tabel, BUKAN nomor fatwa), Judul, Tema (mis. "Ibadah", "POM Iptek", "Sosial Kemasyarakatan", "HASIL IJTIMA"), Nomor Fatwa (mis. "03 Tahun 2010" untuk KIBLAT, "08 Tahun 2011" untuk AMIL ZAKAT), Tgl Ditetapkan\[24\]
status_berlaku: tidak ada kolom status berlaku/dicabut
cara_minta_izin: belum ditemukan kontak di halaman ini
catatan_risiko: ada ketidakcocokan label, mis. baris 1 berjudul "PANDUAN PENYELENGGARAAN IBADAH DI BULAN RAMADAN DAN SYAWAL 1442 H" tapi bernomor "KEPUTUSAN IJTIMA ULAMA KOMISI FATWA SE-INDONESIA TAHUN 2003" dan menaut ke PDF "Ijtima'-Ulama-Tentang-Penetapan-Awal-Ramadhan-Syawal-dan-Dzulhijah.pdf".\[24\] Metadata perlu dicek manual
putusan_sementara: lisensi_tidak_jelas (layak untuk prototipe bila ditandai)
```

Muhammadiyah (tarjih.or.id, muhammadiyah.or.id rubrik Tanya Jawab Agama), NU (nu.or.id, LBM PBNU, Ahkamul Fuqaha), Kemenag (pustakalajnah, bimasislam), Persis/Al-Irsyad/Hidayatullah: **tidak sempat diperiksa syarat pemakaiannya**. Pencarian "tarjih.or.id hak cipta ketentuan penggunaan" hanya mengembalikan artikel tarjih.or.id tentang hukum software bajakan, bukan halaman syarat situs.\[25\] Pencarian "nu.or.id syarat dan ketentuan hak cipta" hanya mengembalikan situs NU cabang (NU Banyumas, NU Lebaksiu, Harian NU) yang menyatakan "Semua hak kekayaan intelektual dilindungi"; itu bukan bukti untuk nu.or.id pusat.\[26\]\[27\]\[28\]

### 3.3 Kitab klasik

```
nama: OpenITI (Open Islamicate Texts Initiative)
jenis: kitab_klasik
url: https://kitab-project.org/docs/openITI (hanya cuplikan pencarian; tidak dibuka penuh)
tanggal_akses: 18 November 2026
pemegang_hak: KITAB project/OpenITI (kompilasi); hak edisi cetak pada muhaqqiq/penerbit
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): "OpenITI releases are published under the CC BY-NC-SA 4.0 license."\[8\]
kutip_boleh: ya
simpan_salinan_dan_indeks_boleh: ya untuk non-komersial; tidak untuk komersial\[9\]
atribusi_wajib: ya
format: berkas teks (dirilis di GitHub/Zenodo)\[8\]
cara_ekstraksi: unduh rilis; berkas per kitab per versi edisi
struktur_dan_id_kutipan: URI per teks menyebut koleksi asal (mis. "Shamela", "Sham19Y", "JK")
status_berlaku: aktif
cara_minta_izin: tim KITAB (kontak belum dibuka)
catatan_risiko: dokumentasinya menyebut teks umumnya "reliable reproductions of modern printed editions", artinya edisi modern yang bisa berhak cipta; menurut Peter Verkinderen (KITAB/AKU-ISMC), "about 45% of the texts in the corpus come from Shamela"
putusan_sementara: tidak_layak (komersial); layak_dengan_syarat (riset internal)
```

```
nama: al-Maktaba al-Shamela (dan turunannya di Hugging Face)
jenis: kitab_klasik
url: (cuplikan) https://huggingface.co/datasets/salehabdurrahman12/Shamela4_Full_DB ; https://kitab-project.org/Bias-in-the-OpenITI-corpus/
tanggal_akses: 18 November 2026
pemegang_hak: Al-Maktaba Al-Shamela Foundation (perangkat lunak); edisi tahqiq pada muhaqqiq/penerbit
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): dataset HF berlabel MIT tetapi kartunya sendiri menulis "The compilation and digitization rights belong to their respective owners."\[29\]
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: ya
format: database (Lucene + SQLite), teks
cara_ekstraksi: mudah secara teknis
struktur_dan_id_kutipan: per kitab/halaman cetakan
status_berlaku: aktif
cara_minta_izin: shamela.ws (tidak dibuka)
catatan_risiko: menurut KITAB, versi Shamela terbaru "do not mention the origin of the texts";\[30\] label MIT dari pengunggah HF BUKAN bukti izin pemegang hak
putusan_sementara: lisensi_tidak_jelas
```

Waqfeya, Turath.io, dan al-maktaba.org: **tidak sempat diperiksa**.

### 3.4 Fatwa Rak 2

```
nama: Fatwa MUI Provinsi Jawa Timur Nomor 04 Tahun 2022 tentang Transaksi Digital dengan Sistem Paylater
jenis: fatwa
url: https://muijatim.or.id/wp-content/uploads/2022/09/Fatwa-No.4-Tahun-2022-tentang-transaksi-digital-menggunakan-Paylater.pdf
tanggal_akses: 18 November 2026
pemegang_hak: Dewan Pimpinan MUI Provinsi Jawa Timur
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak ada pernyataan lisensi di halaman yang terbuka
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: ya
format: PDF berlapis teks (teks bisa diekstrak; teks Arab di dalamnya terpecah saat diekstrak, jadi ambil lewat skrip + cek manual)
cara_ekstraksi: pdftotext; kop surat tertulis "Komisi Fatwa Majelis Ulama Indonesia Provinsi Jawa Timur"
struktur_dan_id_kutipan: "Nomor: 04 Tahun 2022"; bagian MENIMBANG (a–e), MENGINGAT (ayat-ayat), dst.\[1\] Teks PDF yang sama menyatakan "Ditetapkan di : Surabaya… 5 Muharram 1444 H. 3 Agustus 2022 M.", setelah sidang Komisi Fatwa MUI se Jawa Timur pada tanggal 3 Agustus 2022
status_berlaku: tidak tertera status dicabut; tercantum di daftar "Kumpulan Fatwa MUI Jatim" (cuplikan) sebagai "Fatwa No.4 Tahun 2022 tentang transaksi digital menggunakan Paylater"\[31\]
cara_minta_izin: Sekretariat MUI Jatim, Jl. Dharmahusada Selatan No. 5 Surabaya; email muiprovinsijawatimur@gmail.com; telp (031) 5926018 (dari kop PDF)\[1\]
catatan_risiko: fatwa REGIONAL. Media sempat melaporkan "paylater haram" secara mutlak, lalu MUI Jatim mengklarifikasi bahwa yang dipersoalkan adalah akad berbunga (Kompas TV 2 Agustus 2022, Republika 5 Agustus 2022).\[32\]\[33\]\[34\]\[35\] Selalu kutip diktum fatwanya, bukan berita
putusan_sementara: layak_dengan_syarat
```

Untuk B3 (paylater), empat tingkatnya dibedakan sebagai berikut:
- **(i) Fatwa bernomor:** Fatwa MUI Prov. Jatim No. 04 Tahun 2022 (terverifikasi di PDF resmi).
- **(ii) Keputusan forum tak bernomor:** Ijtima' Ulama Komisi Fatwa MUI se-Jawa Timur, 27 Juli 2022 di Surabaya (dilaporkan NU Online Jatim, Radar Surabaya).\[36\]\[37\]\[38\] Fatwa 04/2022 adalah bentuk resmi hasil forum ini.
- **(iii) Pernyataan pengurus:** KH Ma'ruf Khozin (Ketua Komisi Fatwa MUI Jatim) dan KH Sholihin Hasan (Sekretaris), dikutip media 29 Juli–5 Agustus 2022; misalnya Suara Surabaya (5 Agustus 2022) mengutip Sekretaris Komisi Fatwa: "Jika ada ketentuan bunga maka hukumnya haram dan akadnya tidak sah, karena termasuk riba." Artikel di muijatim.or.id berjudul "Penjelasan Komisi Fatwa Terkait Haramnya Paylater" (30 Juli 2022, rubrik Fatwa) **bukan teks fatwa**, melainkan berita.\[10\]
- **(iv) Artikel/opini:** CNN Indonesia, detikJatim, IDN Times, KlikLegal, dan sejenisnya.\[32\]\[39\]\[40\]\[41\]

Fatwa paylater dari DSN-MUI pusat, Majelis Tarjih, atau LBM PBNU tidak dicari ulang dalam riset ini (anggaran habis). Status latarnya tetap: tidak ditemukan.

```
nama: Fatwa DSN-MUI tentang transaksi daring (144, 145, 146/DSN-MUI/XII/2021) + 110/DSN-MUI/IX/2017
jenis: fatwa
url: (artikel resmi, hanya cuplikan) https://mui.or.id/baca/berita/agar-belanja-online-anda-sesuai-dengan-syariah-simak-fatwa-mui-berikut
tanggal_akses: 18 November 2026
pemegang_hak: DSN-MUI
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): (latar riset sebelumnya) "Anda diperbolehkan untuk mengutip informasi dari situs ini, dengan tetap mencantumkan sumbernya"
kutip_boleh: ya
simpan_salinan_dan_indeks_boleh: tidak (butuh izin untuk simpan penuh)
atribusi_wajib: ya
format: PDF (via Google Drive di situs DSN-MUI, menurut riset sebelumnya)
cara_ekstraksi: unduh PDF per nomor
struktur_dan_id_kutipan: 144 = Marketplace Berdasarkan Prinsip Syariah; 145 = Dropship Berdasarkan Prinsip Syariah; 146 = Online Shop Berdasarkan Prinsip Syariah (semua XII/2021); 110 = Akad Jual Beli (IX/2017).\[11\]\[42\] Judul 144/145/146 tercantum di daftar resmi DSN-MUI (dsnmui.or.id/kategori/fatwa/page/3/), masing-masing dengan tautan "Salinan Fatwa (PDF)" via Google Drive; judul 110 masih dari jurnal akademik, jadi perlu_verifikasi
status_berlaku: tidak dicek
cara_minta_izin: DSN-MUI (kontak tidak dibuka di riset ini)
catatan_risiko: artikel mui.or.id menyebut 146 mengatur ijab-qabul "dalam satu majelis akad, baik secara fisik maupun elektronik"; ini parafrase redaksi, bukan diktum\[43\]
putusan_sementara: layak_dengan_syarat
```

Fatwa ormas tentang COD, dropship, dan jual beli barang yang belum dimiliki: **tidak sempat dicari**.

```
nama: Fatwa MUI Nomor 9 Tahun 2008 tentang SMS Berhadiah (dalam buku Himpunan Fatwa MUI)
jenis: fatwa
url: https://mui.or.id/storage/fatwa/3aef2bdd9713011f71d6f712c6c0e869-lampiran.pdf (hanya cuplikan; tidak dibuka penuh)
tanggal_akses: 18 November 2026
pemegang_hak: Majelis Ulama Indonesia
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak diperiksa
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: ya
format: PDF (halaman buku "HIMPUNAN FATWA MAJELIS ULAMA INDONESIA", hal. 523)
cara_ekstraksi: PDF; cek lapisan teks
struktur_dan_id_kutipan: Nomor 9 Tahun 2008; menimbang merujuk Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia 26 Mei 2006 tentang Hukum SMS Berhadiah; cakupan termasuk "kontes, kuis, olahraga, permainan (games), kompetisi"\[12\]
status_berlaku: tidak dicek
cara_minta_izin: MUI pusat
catatan_risiko: cuplikan menunjukkan ada ketentuan haram DAN pengecualian mubah; jangan diringkas tanpa membaca diktum lengkap\[12\]
putusan_sementara: lisensi_tidak_jelas
```

Fatwa DSN-MUI 86/DSN-MUI/XII/2012 tentang Hadiah dalam Penghimpunan Dana Lembaga Keuangan Syariah tercatat di Hukumonline dan juga di Direktori Peraturan Mahkamah Agung (putusan3.mahkamahagung.go.id); diktumnya antara lain: "Hadiah promosi… harus dalam bentuk barang dan/atau jasa, tidak boleh dalam bentuk uang." Artikel NU Online "Berbagai Macam Kuis Berhadiah yang Haram" (islam.nu.or.id) adalah **artikel redaksi, bukan keputusan Bahtsul Masail**.\[44\] Pernyataan KH Hamdan Rasyid (anggota Komisi Fatwa MUI) di Republika adalah **pernyataan pengurus**.\[45\] Keputusan Bahtsul Masail atau Tarjih tentang undian dan giveaway media sosial: **tidak ditemukan dalam riset ini**.

```
nama: Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia VII tentang Hukum Pinjaman Online (Pinjol)
jenis: fatwa
url: https://fatwamui.com/storage/556/HUKUM-PINJAMAN-ONLINE-(PINJOL).pdf (cuplikan); daftar di https://fatwamui.com/data-fatwa (dibuka, baris pinjol tidak masuk bagian yang terbaca)
tanggal_akses: 18 November 2026
pemegang_hak: Majelis Ulama Indonesia
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak ditemukan
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak_jelas
atribusi_wajib: ya
format: PDF per keputusan; ada juga buku utuh di https://muijatim.or.id/wp-content/uploads/2022/09/HASIL-IJTIMA_-ULAMA-KOMISI-FATWA-SE-INDONESIA-VII-TAHUN-2021.pdf (situs daerah)
cara_ekstraksi: PDF
struktur_dan_id_kutipan: tak bernomor. Cuplikan PDF pleno: Sidang Komisi B-1 "Masalah Fikih Kontemporer" meliputi I. Cryptocurrency, II. Pernikahan Online, III. Pinjaman Online, IV. Transplantasi Rahim; ditetapkan di Hotel Sultan Jakarta, 11 November 2021.\[46\] Bab/halaman di buku utuh: BELUM dicatat
status_berlaku: tidak ada kolom status
cara_minta_izin: MUI pusat
catatan_risiko: kolom "No" di fatwamui.com (347/348) adalah nomor baris, BUKAN nomor fatwa\[24\]\[47\]
putusan_sementara: lisensi_tidak_jelas
```

### 3.5 Qur'an API (Bagian C)

```
nama: Al Quran Cloud (api.alquran.cloud)
jenis: terjemahan
url: https://alquran.cloud/terms-and-conditions
tanggal_akses: 18 November 2026
pemegang_hak: Islamic Network (layanan); penerjemah masing-masing (terjemahan)
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): teks Qur'an: "You may use, store and show the text freely." Terjemahan: "Translations and recitations remain the copyright of their translators and reciters."\[48\]
kutip_boleh: ya (teks Arab); tidak_jelas (terjemahan)
simpan_salinan_dan_indeks_boleh: ya (teks Arab, tanpa diubah); tidak (terjemahan Indonesia tanpa izin penerjemah)
atribusi_wajib: ya ("credit its source"; terjemahan: "credit the translator by name")
format: API (REST JSON)
cara_ekstraksi: REST; untuk mirror penuh diminta menghubungi mereka
struktur_dan_id_kutipan: surah:ayat
status_berlaku: syarat terakhir diperbarui 13 November 2026\[48\]
cara_minta_izin: https://islamic.network/contact.html
catatan_risiko: pernyataan maintainer di forum (cuplikan) bahwa API boleh untuk app komersial tidak mengubah status hak cipta terjemahan\[49\]
putusan_sementara: layak_dengan_syarat (teks Arab saja; untuk itu Tanzil sudah cukup)
```

```
nama: EQuran.id API
jenis: terjemahan / tafsir
url: https://equran.id/apidev (cuplikan); https://equran.id/apidev/v2 (cuplikan)
tanggal_akses: 18 November 2026
pemegang_hak: data Al-Qur'an dari Kemenag RI (LPMQ)
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): "Sumber data Al-Quran: Kementerian Agama Republik Indonesia (quran.kemenag.go.id)"; jadwal shalat dari "Bimas Islam Kementerian Agama RI"\[50\]\[51\]
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak (data hak cipta LPMQ, lihat latar)
atribusi_wajib: ya
format: API (JSON, tanpa API key)
cara_ekstraksi: REST
struktur_dan_id_kutipan: surat/ayat
status_berlaku: aktif (v2 direkomendasikan)\[50\]
cara_minta_izin: ke LPMQ Kemenag, bukan ke equran.id
catatan_risiko: SDK npm berlisensi MIT, tapi itu hanya kode\[52\]
putusan_sementara: tidak_layak (untuk rilis)
```

tafsirq.com: **tidak sempat diperiksa** dalam riset ini. Pencarian ulang terjemahan Qur'an Indonesia berlisensi terbuka: **tidak dilakukan secara khusus** karena anggaran habis. Dua temuan sampingan tidak memenuhi syarat:
- Buku Fadhli Lukman (Open Book Publishers, CC BY 4.0) adalah buku *tentang* sejarah terjemahan Kemenag, bukan terjemahannya.\[53\]
- Dataset Telkom University berlabel CC0 berisi terjemahan Indonesia; label itu dari pengunggah, bukan dari pemegang hak (LPMQ), jadi bukan bukti.\[54\]

### 3.6 Rujukan waktu (A6)

```
nama: Kemenag (sidang isbat), Majelis Tarjih (KHGT), LBM PBNU, BAZNAS (zakat fitrah)
jenis: rujukan_waktu
url: tidak terverifikasi (pencarian gagal karena anggaran habis)
tanggal_akses: –
pemegang_hak: masing-masing lembaga
lisensi / syarat pemakaian (kutip pernyataan aslinya, singkat): tidak diperiksa
kutip_boleh: tidak_jelas
simpan_salinan_dan_indeks_boleh: tidak perlu (hanya ditautkan)
atribusi_wajib: ya
format: siaran pers/SK (dugaan, belum diverifikasi)
cara_ekstraksi: tidak perlu
struktur_dan_id_kutipan: –
status_berlaku: berubah tiap tahun
cara_minta_izin: –
catatan_risiko: satu-satunya petunjuk resmi yang terlihat: fatwamui.com memuat Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia 2003 terkait penetapan awal Ramadan, Syawal, dan Dzulhijjah; equran.id menyebut jadwal shalat bersumber dari Bimas Islam Kemenag\[24\]\[51\]
putusan_sementara: lisensi_tidak_jelas (tetapi cukup ditautkan)
```

---

## 4. Analisis dan pendapat saya

- **A2 (perbedaan pendapat):** saya tidak menemukan sumber terbuka yang menampilkan beberapa pendapat berdampingan dengan rujukan. Pendapat saya: pendekatan paling realistis adalah menyimpan **satu entri per lembaga** (MUI, Tarjih, NU) untuk pertanyaan yang sama, lalu menampilkannya berdampingan dengan label lembaga. AI tidak perlu "memilih". Konsekuensinya, kamu butuh izin minimal dari dua lembaga.
- **A4 (bacaan sebagai pointer):** rencana pointer ke ayat/hadits realistis untuk doa yang matannya ada di hadits, karena edisi Arab fawazahmed0 bisa dirujuk lewat (kitab, nomor). Ada tiga lubang:
  - lafaz niat umumnya bukan matan hadits, jadi butuh buku tuntunan satu lembaga yang berhak cipta;
  - penomoran hadits berbeda antar-edisi (hadithnumber vs arabicnumber, terutama Muslim), sehingga pointer bisa salah tunjuk;\[55\]\[56\]
  - terjemahan Indonesia bacaan tidak punya sumber terbuka.
- **ChatHPT:** karena Muhammadiyah sudah membangun RAG dari 1.153 naskahnya sendiri, permintaan "berikan datanya" kemungkinan lebih sulit daripada permintaan "integrasi/rujuk silang" (misalnya menautkan pengguna ke ChatHPT untuk perspektif Tarjih).\[4\]\[7\]\[23\] Ini dugaan saya, bukan fakta.
- **Paylater:** fatwa MUI Jatim adalah rujukan bernomor terkuat yang ada, tetapi aplikasi wajib menandainya "fatwa MUI Provinsi Jawa Timur", bukan "fatwa MUI".\[1\]

---

## 5. Daftar "gagal dibuka / tidak sempat diperiksa"

**Gagal dibuka (ditolak alat atau tidak ada URL yang bisa diambil):**
- https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json (ditolak; saya buka versi github.com/.../blob/1/editions.json sebagai gantinya)
- Berkas edisi mentah: cdn.jsdelivr.net/.../editions/ind-abudawud/1.json dan raw.githubusercontent.com/.../ara-abudawud/1.json (ditolak, oleh subagen)
- https://github.com/fawazahmed0/hadith-api/blob/1/download.md (ditolak)
- info.json (tidak ada URL yang bisa diambil)
- References.md: terbuka tetapi terpotong setelah beberapa entri\[19\]

**Tidak sempat diperiksa (anggaran pencarian habis):** syarat pemakaian tarjih.or.id, muhammadiyah.or.id, nu.or.id; LBM PBNU dan Ahkamul Fuqaha; buku Kemenag (pustakalajnah, bimasislam); Persis, Al-Irsyad, Hidayatullah; Waqfeya, Turath.io, al-maktaba.org; halaman sidang isbat Kemenag, KHGT Muhammadiyah, BAZNAS; tafsirq.com; syarat pemakaian equran.id; status Fatwa 117/DSN-MUI/II/2018; bab/halaman pinjol di buku Ijtima' VII; fatwa ormas tentang COD dan dropship; pencarian ulang terjemahan Qur'an Indonesia terbuka; fatwa paylater/judi dari Tarjih/LBM PBNU.

Cara mencari yang sudah dipakai, supaya bisa diulang: kata kunci "fatwa MUI Jawa Timur paylater haram", "muijatim.or.id kumpulan fatwa MUI Jatim nomor paylater", "ChatHPT Muhammadiyah Himpunan Putusan Tarjih AI", "fatwa DSN-MUI jual beli online e-commerce dropship nomor 146", "fatwa undian berhadiah kuis giveaway MUI bahtsul masail", "OpenITI corpus license", "Shamela license copyright OpenITI", "alquran.cloud terms", "equran.id API lisensi". Ingat: "tidak ditemukan" di sini **tidak berarti tidak ada**.

**Klaim yang hanya berasal dari pihak ketiga atau cuplikan (belum dibuka di halaman resmi):**
- Rincian korpus ChatHPT 836/255/62 (artikel muhammadiyah.or.id "Mengenal ChatHPT…", Nov 2026; tidak dibuka penuh oleh saya)
- Judul fatwa DSN 110 (jurnal akademik)
- Fatwa DSN 86/2012 (Hukumonline dan Direktori Peraturan Mahkamah Agung)
- Fatwa MUI 9/2008 (cuplikan PDF mui.or.id)
- Lisensi OpenITI (cuplikan kitab-project.org)\[8\]
- Klarifikasi MUI Jatim (Kompas TV, Republika)
- Fatwa MUI Jatim No. 1 Tahun 2022 tentang Game Higgs Domino Island (cuplikan daftar muijatim.or.id)\[31\]
- Pernyataan maintainer Al Quran Cloud soal komersial (forum, cuplikan)
- Struktur JSON hadits (kode pihak ketiga)\[21\]

---

## 6. Daftar untuk penasihat syariah [perlu penasihat syariah]

1. Lembaga mana yang dijadikan rujukan default per topik ibadah (MUI, Tarjih, NU), atau apakah semuanya ditampilkan berdampingan.
2. Kebijakan derajat hadits: penilai mana yang dipakai (Al-Albani, Shuaib Al Arnaut, Zubair Ali Zai, dll.) dan derajat minimal yang boleh dikutip untuk ibadah.\[3\]
3. Apakah fatwa regional (MUI Jatim 04/2022 paylater; Fatwa Jatim 1/2022 Higgs Domino) layak dikutip untuk siswa di luar Jawa Timur, dan dengan label apa.
4. Apakah Fatwa MUI 9/2008 (SMS berhadiah) dan DSN 86/2012 boleh dianalogikan ke giveaway media sosial. Saya tidak boleh menarik analogi ini.
5. Sumber lafaz niat dan bacaan shalat yang dipakai, termasuk perbedaannya antar-ormas.
6. Kitab fiqih klasik dan edisi mana yang menjadi rujukan pesantren/madrasah sasaran.
7. Kebijakan "ikuti pengumuman resmi" untuk awal Ramadan/Syawal bila Kemenag dan Muhammadiyah berbeda.

---

## 7. Rekomendasi urutan kerja 2 minggu

**Minggu 1: yang bisa dikerjakan sendiri sekarang (prototipe internal, tidak dipublikasikan):**
1. Kunci (pin) satu commit fawazahmed0/hadith-api. Unduh edisi `ara-*` untuk 7 kitab Rak 1. Buka satu berkas edisi di komputer sendiri untuk memastikan nama key di dalam `grades`, lalu catat di dokumen skema.
2. Unduh edisi `ind-*` hanya ke folder terpisah berlabel `lisensi_tidak_jelas_jangan_rilis`.
3. Unduh PDF Fatwa MUI Jatim 04/2022, Keputusan Ijtima' VII (pinjol), Fatwa MUI 9/2008, dan DSN 144/145/146/2021. Cek mana yang PDF teks dan mana yang scan.
4. Dari fatwamui.com, saring baris bertema "Ibadah" (kiblat, zakat, dll.) dan susun tabel metadata. Isi kolom "status_berlaku" secara manual.
5. Buka sendiri halaman yang gagal saya periksa: syarat pemakaian nu.or.id, tarjih.or.id, equran.id, tafsirq.com, serta halaman isbat Kemenag dan BAZNAS.

**Minggu 2: yang harus menunggu izin (kirim surat sekarang, karena prosesnya lama):**
1. Surat ke Majelis Tarjih dan Tajdid PP Muhammadiyah, tembusan MPI dan LabMu: minta akses HPT/Fatwa Tarjih atau integrasi ChatHPT.
2. Surat ke MUI Jatim (muiprovinsijawatimur@gmail.com) dan MUI pusat/DSN-MUI: izin menyimpan dan menampilkan kutipan persis fatwa dengan atribusi.
3. Surat ke LPMQ Kemenag dan satu ormas untuk buku tuntunan shalat/puasa yang memuat bacaan beserta rujukannya.
4. Sambil menunggu, jangan memasukkan kitab dari OpenITI/Shamela ke indeks yang akan dirilis.

---

## Caveats

- Laporan ini **bukan nasihat hukum** dan **bukan fatwa**. Semua status lisensi adalah peta fakta dan risiko per 18 November 2026.
- Anggaran pencarian habis sebelum A1 (NU, Kemenag), A6, dan Bagian C selesai, sehingga banyak kartu masih berstatus "tidak diperiksa".
- Teks Arab, ayat, dan hadits sengaja tidak ditampilkan. Ambil lewat skrip dari sumbernya.

## Sources

1. [Fatwa Hukum Transaksi Digital Dengan Sistem Paylater](https://muijatim.or.id/wp-content/uploads/2022/09/Fatwa-No.4-Tahun-2022-tentang-transaksi-digital-menggunakan-Paylater.pdf)
2. [hadith-api/editions.json at 1 · fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api/blob/1/editions.json)
3. [fawazahmed0/hadith-data · Datasets at Hugging Face](https://huggingface.co/datasets/fawazahmed0/hadith-data)
4. [Tentang ChatHPT](https://hpt.muhammadiyah.or.id/about)
5. [Muhammadiyah Bikin ChatHPT: AI Buat Tanya Masalah Agama dan Fatwa, Bisa Diakses Umum](https://kumparan.com/kumparantekno/muhammadiyah-bikin-chathpt-ai-buat-tanya-masalah-agama-dan-fatwa-bisa-diakses-umum-28WIAo8UBuC)
6. [Muhammadiyah Resmi Luncurkan ChatHPT, Asisten AI untuk Mempermudah Akses Informasi Keagamaan](https://lphkhtmuhammadiyah.or.id/muhammadiyah-luncurkan-chathpt-ai-keagamaan/)
7. [Muhammadiyah Launches ChatHPT: A New AI Innovation in the Muslim World to Combat Religious Disinformation](https://www.dompetdhuafa.org/en/muhammadiyah-launches-chathpt-a-new-ai-innovation-in-the-muslim-world-to-combat-religious-disinformation/)
8. [OpenITI documentation - KITAB Project](https://kitab-project.org/docs/openITI)
9. [Sharing Openly, Sharing Globally - Creative Commons](https://creativecommons.org/cc-licenses/)
10. [Penjelasan Komisi Fatwa Terkait Haramnya Paylater - MUI Jatim](https://muijatim.or.id/2022/07/30/penjelasan-komisi-fatwa-terkait-haramnya-paylater)
11. [ANALISIS AKAD JUAL BELI ONLINE PADA APLIKASI ...](https://jim.unisma.ac.id/index.php/laswq/article/viewFile/25790/19517)
12. [HIMPUNAN FATWA MAJELIS ULAMA INDONESIA 523 44 FATWA MAJELIS ULAMA INDONESIA](https://mui.or.id/storage/fatwa/3aef2bdd9713011f71d6f712c6c0e869-lampiran.pdf)
13. [Bolehkah Bank Syariah Mengadakan Undian Berhadiah?](https://www.hukumonline.com/klinik/a/bolehkah-bank-syariah-mengadakan-undian-berhadiah-lt60617a8d02b1f/)
14. [Source of French (fra-\*) translations — attribution and textual reference](https://github.com/fawazahmed0/hadith-api/issues/128)
15. [hadith-api/LICENSE at 1 · fawazahmed0/hadith-api · GitHub](https://github.com/fawazahmed0/hadith-api/blob/1/LICENSE)
16. [GitHub - fawazahmed0/hadith-api: Free Hadith API Service with Multiple Languages and Multiple Grades](https://github.com/fawazahmed0/hadith-api)
17. [GitHub - cubecodefowad/Hadithly · GitHub](https://github.com/cubecodefowad/Hadithly)
18. [Issues · fawazahmed0/hadith-api · GitHub](https://github.com/fawazahmed0/hadith-api/issues)
19. [hadith-api/References.md at 1 · fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api/blob/1/References.md)
20. [Upload README.md with huggingface\_hub · fawazahmed0/hadith-data at 9bb26bd](https://huggingface.co/datasets/fawazahmed0/hadith-data/commit/9bb26bde1d71efe9875aa54f9e00582774952e4b)
21. [glama.ai](https://glama.ai/mcp/servers/@Prince77-7/quranMCP/blob/f975a811740e7617288cc2079bc4930df1822377/src/tools/hadith.ts)
22. [feat(kajianq-domain): accept the Ibn Umar reports in 006 (#376) by ahaqqu · Pull Request #669 · ahaqqu/KajianQ · GitHub](https://github.com/ahaqqu/KajianQ/pull/669)
23. [Mengenal ChatHPT, Asisten AI Muhammadiyah untuk Mengakses Ribuan Dokumen Tarjih](https://muhammadiyah.or.id/2026/11/mengenal-chathpt-asisten-ai-muhammadiyah-untuk-mengakses-ribuan-dokumen-tarjih/)
24. [Database Fatwa Majelis Ulama Indonesia](https://fatwamui.com/data-fatwa)
25. [HUKUM PENGGUNAAN SOFTWARE BAJAKAN](https://tarjih.or.id/hukum-penggunaan-software-bajakan/)
26. [Ketentuan Penggunaan - NU Online Lebaksiu](https://nulebaksiu.or.id/ketentuan-penggunaan/)
27. [Syarat dan Ketentuan - NU Online Banyumas](https://nubanyumas.com/syarat-dan-ketentuan/)
28. [Syarat dan Ketentuan - Harian NU](https://hariannu.com/syarat-dan-ketentuan/)
29. [salehabdurrahman12/Shamela4\_Full\_DB · Datasets at Hugging Face](https://huggingface.co/datasets/salehabdurrahman12/Shamela4_Full_DB)
30. [Bias in the OpenITI corpus - KITAB](https://kitab-project.org/Bias-in-the-OpenITI-corpus/)
31. [Kumpulan Fatwa MUI Jatim - MUI Jatim .html](https://muijatim.or.id/kumpulan-fatwa-mui-jatim)
32. [MUI Jatim Cap Haram Paylater](https://www.cnnindonesia.com/ekonomi/20220729170517-78-827930/mui-jatim-cap-haram-paylater)
33. [Klarifikasi MUI Jatim soal Paylater: Kami Tidak Fatwakan Haram, tapi Akad Bunganya Unsur Riba](https://www.kompas.tv/nasional/315084/klarifikasi-mui-jatim-soal-paylater-kami-tidak-fatwakan-haram-tapi-akad-bunganya-unsur-riba)
34. [MUI Jatim Tegaskan Paylater dengan Sistem Bunga Haram](https://khazanah.republika.co.id/berita/rg52vj366/mui-jatim-tegaskan-paylater-dengan-sistem-bunga-haram)
35. [MUI Jatim Nyatakan Paylater Haram - Suara Surabaya](https://www.suarasurabaya.net/kelanakota/2022/mui-jatim-menyatakan-paylater-haram/)
36. [Mirip Leasing, MUI Jatim Putuskan Paylater Haram](https://jatim.nu.or.id/metropolis/mirip-leasing-mui-jatim-putuskan-paylater-haram-JUXR4)
37. [Komisi Fatwa MUI Jatim: Pembayaran Pakai Paylater Haram - Radar Surabaya](https://radarsurabaya.jawapos.com/ekonomi/2207300021/komisi-fatwa-mui-jatim-pembayaran-pakai-paylater-haram)
38. [Penjelasan MUI Jatim Soal Paylater Haram](https://www.wowkeren.com/berita/tampil/00442512.html)
39. [Hasil Ijtima Ulama Jatim: Paylater Haram](https://jatim.idntimes.com/news/jawa-timur/paylater-haram-00-hc4tp-z7wp10)
40. [MUI Jatim Haramkan Paylater Berbunga](https://www.detik.com/jatim/berita/d-6207577/mui-jatim-haramkan-paylater-berbunga)
41. [Dinilai Mirip dengan Utang, Fatwa MUI Putuskan Layanan Paylater Haram - KlikLegal](https://kliklegal.com/dinilai-mirip-dengan-utang-fatwa-mui-putuskan-layanan-paylater-haram/)
42. [Analisis Penerapan Hukum Syariah Dalam Transaksi Jual Beli Online Di Era Digital](https://journal.pascasarjana-unpas.web.id/index.php/jjih/article/view/411)
43. [Agar Belanja Online Anda Sesuai dengan Syariah, Simak Fatwa MUI Berikut - mui.or.id](https://mui.or.id/baca/berita/agar-belanja-online-anda-sesuai-dengan-syariah-simak-fatwa-mui-berikut)
44. [Berbagai Macam Kuis Berhadiah yang Haram](https://islam.nu.or.id/syariah/berbagai-macam-kuis-berhadiah-yang-haram-C8NUm)
45. [Samakah Undian Berhadiah dengan Judi? |](https://www.republika.id/posts/14977/samakah-undian-berhadiah-dengan-judi)
46. [KEPUTUSAN IJTIMA’ ULAMA KOMISI FATWA SE-INDONESIA VII Tentang](https://fatwamui.com/storage/614/HUKUM-CRYPTOCURRENCY.pdf)
47. [Komisi Fatwa](https://www.fatwamuisiak.com/?p=fatwa)
48. [Terms & Conditions · Al Quran Cloud](https://alquran.cloud/terms-and-conditions)
49. [Copyright - Islamic Network Community](https://community.islamic.network/d/34-copyright)
50. [EQuran.id - Al Quran Digital Bahasa Indonesia](https://equran.id/apidev)
51. [Al-Quran API v2](https://equran.id/apidev/v2)
52. [equran (EQuran.id) · GitHub](https://github.com/equran)
53. [The Official Indonesian Translation GLOBAL QURʾĀN The History and Politics of](https://books.openbookpublishers.com/10.11647/obp.0289.01.pdf)
54. [Indonesian Translation of the Holy Quran (Multi-label) - Islamic Corpus](https://dataverse.telkomuniversity.ac.id/dataset.xhtml?persistentId=doi:10.34820/FK2/XQCNPN)
55. [Source registry: fetch texts from quran.com and hadith-api, admit Tirmidhi by mssnoussi92 · Pull Request #2 · mssnoussi92/quran-themes-demo · GitHub](https://github.com/mssnoussi92/quran-themes-demo/pull/2)
56. [GitHub - uAnu0/manba: Manba: verification of Quran and hadith quotes in sermons and text (private, team use) · GitHub](https://github.com/uAnu0/manba)
