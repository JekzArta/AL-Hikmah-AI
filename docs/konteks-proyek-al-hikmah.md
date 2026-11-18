# Konteks Proyek: App Tanya-Jawab Islami (Al Hikmah)

> **Sifat dokumen:** catatan memori proyek, bukan daftar perintah. Isinya menggambarkan apa yang sudah dipahami, diputuskan, diusulkan, dan masih terbuka. Dokumen ini boleh diperbarui kapan saja; perbarui bagian yang berubah dan catat di **Riwayat dokumen**.
>
> **Status keputusan:**
> - ✅ **Diputuskan** — sudah disepakati pemilik proyek
> - 💡 **Usulan** — sudah dibahas, belum dikonfirmasi atau masih bisa berubah
> - ❓ **Terbuka** — belum diputuskan
>
> **Sumber:** percakapan Oktober–13 November 2026. Harga dan ketersediaan model adalah potret pada waktu itu dan bisa berubah.

---

## 1. Gambaran proyek

- ✅ **Fitur AI** tanya-jawab Islami (bagian dari aplikasi siswa Al Hikmah yang dikerjakan tim dev; **aplikasinya belum ada**) berbasis **RAG** (Retrieval-Augmented Generation): user bertanya, sistem mencari dalil dari database sendiri, lalu AI menyusun penjelasan berdasarkan dalil yang ditemukan.
- ✅ Jawaban bisa diubah menjadi **video edukasi** (animasi 2D) lewat skill `video-edukasi-islami`. Tujuan video: membuat user paham, bukan konten medsos pencari viewer.
- ✅ Direncanakan **komersial**; tidak semua user punya akses fitur video (ada paket berlangganan). (Catatan fitur AI; **model bisnis aplikasi urusan tim dev**.)
- ✅ Pemilik proyek mulai dari nol (belum ada setup apa pun) dan membangun dengan bantuan **AI agent** (Claude Code), bukan menulis kode manual.
- ✅ Prinsip utama: **agama tidak boleh salah.** Karena itu setiap lapisan sistem dirancang dengan "sabuk pengaman".
- ✅ **(revisi 3, 17 November 2026)** Cakupan, pengguna (siswa), dan sumber data berubah setelah arahan Edilakso: lihat **§2D**.

### Cara kerja yang disukai pemilik proyek

Pemilik proyek ingin daya pikir kritisnya **naik**, bukan digantikan AI (pola "Brain-to-LLM"). Ini **tidak berarti** semua hal harus dipikirkan pemilik proyek sendiri, dan tidak berarti AI menunggu pasif. Pemilik proyek pernah menyatakan tidak bisa memikirkan sendiri semua alur yang rumit, dan meminta AI yang merancangnya. Yang diinginkan adalah kerja sama: pemilik proyek ikut berpikir dan paham prosesnya, AI menyumbang keahlian dan rancangan secara aktif.

#### Pembagian peran

| Wilayah | Peran pemilik proyek | Peran AI |
|---|---|---|
| Arah produk dan tujuan (apa yang dibangun, untuk siapa, nilai yang dipegang) | Memimpin | Memberi pertimbangan, risiko, dan konsekuensi |
| Ide dan draf awal | Sering datang dari pemilik proyek (contoh: pustaka aset yang hasilnya kembali ke dataset, cek bertahap, feedback user, storyboard sebelum video) | Menajamkan ide, menyusunnya menjadi alur yang rapi, menunjukkan jebakan, dan mengusulkan perbaikan |
| Desain teknis dan alur yang rumit (arsitektur, workflow, struktur data, pemilihan model) | Memahami alasannya dan ikut menimbang | **Merancang secara proaktif**, menjelaskan alasannya, dan menawarkan pilihan bila ada trade-off |
| Pengetahuan teknis | Mulai dari nol soal membangun app AI dan memakai AI agent | Menjelaskan istilah dengan bahasa sederhana, analogi, dan contoh konkret |
| Kebenaran agama (hukum, sumber, penggambaran tokoh) | Bukan diputuskan sendirian | Bukan diputuskan AI; AI menandai hal yang perlu dibawa ke **penasihat syariah** |
| Keputusan akhir | Di tangan pemilik proyek | Memberi rekomendasi yang jelas beserta alasannya |

#### Yang diharapkan dari AI

- Mengoreksi terus terang bila pemahaman atau ide pemilik proyek keliru (pemilik proyek sendiri sering meminta "koreksi kalau salah"), dan mengakui bila AI sendiri keliru.
- Tidak sekadar mengiyakan. Ide yang bagus diakui, tetapi risiko dan batasnya tetap disebut.
- Memberi rekomendasi yang jelas, bukan hanya daftar pilihan tanpa pendapat.
- Mengajak berpikir di titik yang penting: cukup satu pertanyaan tajam pada satu waktu, untuk keputusan yang memang milik pemilik proyek (misalnya "jenis pertanyaan apa yang paling sering muncul dari user?"), bukan rentetan pertanyaan.
- Menyarankan hal yang bisa disiapkan pemilik proyek sendiri sebelum dikerjakan bersama (misalnya menulis 20 pertanyaan uji dengan bahasa gaul, atau mendraf isi satu entri dalil), lalu membandingkannya dengan kebutuhan sistem.
- Bertahap dan terstruktur: rancang → cek → bangun. Untuk tugas besar atau kreatif, mulai dari kerangka/storyboard, bukan sekali jadi lalu direvisi berulang. Alasannya: hemat token, hasil akhir lebih bagus, dan pemilik proyek ingin belajar prosesnya dari awal sampai hasil memuaskan.
- Hemat: bila hanya sebagian kecil yang berubah, ubah bagian itu saja, tidak mengulang seluruh dokumen.

#### Gaya komunikasi

- Bahasa Indonesia santai (pemilik proyek memanggil "bro").
- Diagram alur berbentuk teks (ASCII) dan tabel perbandingan membantu pemahaman.
- Istilah teknis dijelaskan saat pertama kali muncul, idealnya dengan analogi.
- Pemilik proyek berpikir lewat analogi visual (jaring neuron, heat map, lift, orkestra); gambar dan diagram interaktif sangat membantu pemahaman.

#### Yang perlu dihindari

- Menunggu pemilik proyek memikirkan semuanya, atau terus balik bertanya tanpa memberi usulan.
- Menyerahkan desain teknis yang rumit ke pemilik proyek tanpa rancangan awal dari AI.
- Mengerjakan semuanya sekaligus tanpa penjelasan, sehingga pemilik proyek tidak ikut paham prosesnya.
- Memperlakukan usulan (💡) seolah sudah diputuskan (✅).

#### Format dokumen

- Spek atau dokumen untuk Claude Code ditulis sebagai file `.md` biasa (bukan Claude Docs), panjang dan detail sesuai besar tugas, dan membawa seluruh konteks, keputusan, serta riwayat percakapan yang relevan supaya Claude Code tidak bingung.

---

## 2. Arsitektur RAG

RAG pada dasarnya dua jalur:
1. **Jalur persiapan (sekali):** data dipotong menjadi bagian kecil (*chunk*), diubah menjadi embedding, disimpan di database.
2. **Jalur tanya (setiap pertanyaan):** pertanyaan masuk → cari bagian yang relevan → saring → AI menulis jawaban dari hasil saringan.

### Rancangan alur lengkap (dari diagram awal + tambahan)

| Babak | Tahap | Fungsi |
|---|---|---|
| Pintu depan | 💡 Gerbang depan | Pertanyaan yang butuh fatwa personal (kasus talak, pembagian waris konkret, masalah pribadi detail) diarahkan ke ulama/lembaga, tidak dijawab mesin |
| Pintu depan | ✅ Deteksi niat | Klasifikasi: fiqih, waris, aqidah, sejarah, kisah, di luar topik. 💡 Sekaligus memberi label **jenis narasi** (lihat §6.3) |
| Pintu depan | ✅ Penerjemah pertanyaan | Bahasa gaul → istilah kitab (misal "paylater" → bai' bit-taqsith, riba qardh). 💡 Lebih aman dibantu glosarium yang dikurasi manual |
| Retrieval | ✅ Dua detektif | BM25 (kata persis) + HNSW/embedding (kedekatan makna), lalu digabung (*hybrid fusion*) → ±20 kandidat |
| Retrieval | ✅ Reranker | Menyaring 20 kandidat menjadi ±8 kandidat (💡 angka diuji); yang masuk paket ditentukan gerbang relevansi + slot (§2C) |
| Retrieval | 💡 Gerbang relevansi + slot | Kode tanpa AI: buang yang tidak relevan (ambang dikalibrasi), slot per jenis (2/2/2), pendapat ditarik per masalah dengan cek silang, otoritas hanya urutan tampil (lihat §2A dan §2C) |
| Retrieval | 💡 Gerbang menyerah | Logika DAN: skor reranker ≥ ambang terkalibrasi DAN masalah terpetakan dengan record DAN tidak diveto Jev/LLM; salah satu gagal → "dalil belum ditemukan" (§2C) |
| Augmentation | ✅ Benang merah | Dari dalil yang lolos, tarik tafsir, derajat hadits, pendapat mazhab, fatwa. 💡 Di awal cukup tabel relasional yang saling terhubung, belum perlu graph database |
| Generation | ✅ AI penjelas | Menulis penjelasan dari paket dalil. **Dilarang mengetik ayat/hadits sendiri**, hanya boleh menulis kode seperti `[QS-2:275]` |
| Generation | ✅ Mesin stempel | Backend menukar kode dengan teks Arab dan terjemahan asli dari database |
| Generation | 💡 Validasi kode | Kode yang tidak ada di paket dalil → jawaban ditolak (cukup dengan kode, tanpa AI) |
| Generation | 💡 Pemeriksa akhir | Model Decisions mengecek: setiap klaim didukung paket dalil? Jawaban menyimpulkan satu hukum tegas padahal ada ikhtilaf? |

### Batas yang perlu diingat

- Mesin stempel menjamin **teks ayat tidak typo**, tetapi tidak menjamin **kesimpulan hukumnya benar**. Reranker menilai dalil *relevan*, bukan menilai *tafsiran AI benar*.
- Embedding hanya tahu "topiknya nyambung", bukan "kesimpulannya benar". Kalimat "riba itu haram" dan "bunga bank itu halal" bisa berdekatan karena satu topik.
- Akurasi sesungguhnya ditentukan oleh: kualitas dataset, bentuk jawaban (menampilkan ikhtilaf, bukan vonis tunggal), dan review manusia lewat set uji.
- 💡 Hindari klaim seperti "Jawaban Akurat 0% Typo" ke user karena bisa terbaca sebagai "jawabannya pasti benar".

### Tentang "melatih AI"

- ✅ Proyek ini **tidak melatih model**. Model dipakai apa adanya lewat API; pengetahuan berasal dari database (RAG).
- Fine-tuning untuk menanamkan pengetahuan agama kurang cocok: pengetahuan di bobot model tidak bisa ditunjuk sumbernya, tidak bisa dicek per ayat, dan harus dilatih ulang tiap data direvisi.
- "Melatih" dalam proyek ini berarti: memperbaiki data, aturan, dan prompt, lalu mengukur hasilnya dengan set uji.

---

## 2A. Penimbang: bobot dalil dan jaring (tambahan 13 November 2026)

> **Direvisi 13 November 2026 (setelah riset dan wasit):** bagian "Penimbang" berumus diganti **gerbang relevansi + slot per jenis**; lihat §2C. Konsep empat sinyal dan "ukuran lingkaran" tetap sebagai cara berpikir, tetapi **otoritas kini hanya menentukan urutan tampil**, bukan seleksi.

Latar: pemilik proyek membayangkan ilmu ini sebagai **jaring** (seperti jaringan neuron). Tiap dalil/pendapat adalah lingkaran, relasinya adalah garis, dan **ukuran lingkaran = seberapa diprioritaskan data itu untuk pertanyaan tertentu** (seperti heat map yang berubah tiap pertanyaan). Lingkaran besar berarti data itu paling diprioritaskan dipakai AI penulis. Bagian ini menerjemahkan ide itu ke sistem.

### Empat sinyal ukuran lingkaran (💡)

| Sinyal | Berubah tiap pertanyaan? | Siapa menentukan | Tempat |
|---|---|---|---|
| Otoritas (kedudukan sumber: Al-Qur'an, hadits + derajat, pendapat, fatwa) | Tidak | Manusia + penasihat syariah | Kolom di `dalil` (mis. `tingkat_otoritas`) |
| Peran dalam topik (pokok, pendukung, penjelas, contoh) | Tidak, tetapi berbeda per topik | Manusia + penasihat syariah | `dalil_topik` (`peran`, opsional `bobot` 1–3) |
| Keluasan (berapa banyak topik yang memuat dalil ini) | Tidak | Kode, otomatis (hitung baris `dalil_topik`) | Dihitung; sinyal paling lemah, boleh belakangan |
| Relevansi ke pertanyaan | **Ya** | Mesin (detektif + reranker) | Dihitung saat ada pertanyaan |

Catatan istilah: pemilik proyek awalnya menyebut "otoritas universal" untuk dalil yang bisa masuk banyak topik. Itu sebenarnya **keluasan**, bukan otoritas. Keduanya sinyal berbeda dan keduanya dipakai (keluasan paling lemah).

### Gerbang relevansi + slot per jenis (revisi 13 November, menggantikan "penimbang berumus", 💡)

Posisi: setelah reranker, sebelum benang merah. Kode tanpa AI.

1. Reranker mengeluarkan ±8 kandidat dengan **skor mentah** (bukan dinormalisasi min-max).
2. **Gerbang relevansi:** buang yang di bawah ambang (dikalibrasi dari set dev, bukan ditebak). Alasan membuang hanya **tidak relevan**, tidak pernah karena otoritas/bobot rendah.
3. **Slot per jenis:** maks 2 nash pokok, 2 pendukung/penjelas, 2 fatwa; **semua pendapat** untuk satu `masalah_id` ditarik lewat JOIN, **dengan cek silang** (minimal satu dalil terkait lolos gerbang di hasil pencarian). Yang terpotong slot dicatat di log.
4. **Otoritas hanya mengurutkan penyajian blok** (hierarki dari penasihat). `pengaruh` = 0; menjadi eksperimen nanti.
5. Bila semua di bawah gerbang atau cek silang gagal → menyerah.

Alasan perubahan: rumus `relevansi × (1 + pengaruh × bobot)` menjawab dua pertanyaan ("nyambung?" dan "berwibawa?") dengan satu angka dan rapuh. Pada contoh riset, dalil khusus (0,85, bobot 0,4) mengalahkan dalil umum (0,70, bobot 1,0) di `pengaruh` 0,3 (0,95 vs 0,91) tetapi **kalah di 0,5** (1,02 vs 1,05); titik baliknya 0,417. Dan "top 3" bertentangan dengan jatah minimum ikhtilaf.

### Aturan pengaman penimbang

- Bobot dipakai untuk **mengurutkan dan menyajikan**, bukan membuang. Dalil khusus, penjelas dalil umum, atau pendapat minoritas yang sah tidak boleh terkubur karena derajatnya lebih rendah.
- Otoritas tinggi tidak sama dengan cocok dengan kasus.
- Pemeriksaan berlapis tidak otomatis lebih aman: tiap lapisan bisa ikut membuang dalil yang benar. Karena itu penimbang membobot, bukan menyaring ulang relevansi. Tiap tahap menjawab pertanyaan berbeda: detektif + reranker "nyambung?", tombol menyerah "cukup untuk menjawab?", penimbang "mana tulang punggung, mana pelengkap?", pemeriksa akhir "jawaban setia pada paket?".
- Urutan otoritas dan label peran dikonfirmasi penasihat syariah.

### Paket untuk AI penjelas

AI tidak menerima gambar graph, melainkan paket terstruktur per dalil: ID, jenis, peran, bobot, relasi. 💡 Aturan keras yang diusulkan: dalil berperan **pokok wajib dipakai**, pendukung opsional, dicek pemeriksa akhir. ❓ Belum dikonfirmasi: pemilik proyek cenderung menyerahkan pilihan "dibaca dulu atau paling banyak dikutip" ke AI, karena AI hanya diberi data.

### Pendapat ulama dan jenis sumber lain

- Mekanisme gerbang+slot berlaku untuk semua jenis sumber, dengan **skala terpisah per jenis**: bobot pendapat tidak dibandingkan langsung dengan derajat hadits dalam satu angka. Paket disusun per jenis.
- 💡 Profil bobot per niat pertanyaan: ibadah condong ke dalil; muamalah kontemporer (mis. paylater, tanpa nash langsung) condong ke fatwa/pendapat, sementara dalil pondasi tetap masuk walau lingkarannya kecil.
- Lingkaran pendapat boleh lebih besar dari lingkaran dalil (wajar di muamalah kontemporer), dengan tiga syarat: (1) tiap pendapat terhubung ke dalil rujukan, pendapat tanpa rujukan ditandai; (2) ikhtilaf punya **jatah minimum** per mazhab utama, agar satu pendapat besar tidak menutup yang lain; (3) "rasional" tidak dipakai sebagai label perasaan, melainkan diukur lewat: ada dalil rujukan, ada penalaran eksplisit (alasan hukum/hikmah), dan kedudukan penyampai/lembaga. Label ini dari penasihat syariah.
- Penalaran eksplisit itulah yang memungkinkan AI menjelaskan "kenapa", bukan hanya "apa".

### Graph

- 💡 Tetap tabel relasional dulu (ID tetap + `relasi` + `dalil_topik`), supaya migrasi ke graph kelak murah.
- Riset awal (web, 13 November 2026, belum diverifikasi lanjut): banyak kegagalan RAG berasal dari chunking, metadata, query rewriting, dan reranker, yang tidak diperbaiki graph; graph berguna untuk pertanyaan multi-langkah. Saran praktik: kuatkan retrieval dasar dulu, pindah ke graph bila ada kelas pertanyaan multi-langkah yang terbukti gagal. Artikel Islamic QA (Findings of ACL 2026) menemukan retrieval paling konsisten membantu dan pendekatan agentic memberi tambahan terbesar, serta mengakui kasus ikhtilaf belum ditangani.
- Riset lanjutan oleh AI peneliti lain akhirnya dijalankan (laporan "Laporan Riset Desain RAG untuk Tanya-Jawab Fiqih Muamalah Kontemporer", 13 November 2026) dan dinilai wasit independen di chat terpisah; keputusannya di §2C. Kesimpulan graph tetap: tabel relasional dulu, tanpa GraphRAG. Dua klaim blog GraphRAG ("di bawah ±10.000 dokumen", "80–90% kualitas dengan 20–30% biaya") **tidak ditemukan sumbernya**; jangan dipegang.

---

## 2B. Orkestrator: siapa yang memerintah tahap-tahap (tambahan 13 November 2026)

- **Orkestrator** = kode di server (Vercel) yang menentukan urutan: memanggil Jev, pencarian, AI penjelas, dan seterusnya. Jev hanyalah "pemain" yang menjawab satu pertanyaan sempit dan tidak tahu tahap lain.
- 💡 Pilihan desain: **hibrida**. Tulang punggung dipegang kode (urutan tetap; stempel, pemeriksa akhir, penghentian sesi, dan hitungan teguran selalu jalan; tidak bisa dibujuk user). AI boleh memutuskan hal sempit di dalam kerangka (mis. "perlu cari dalil kedua?"). Orkestrator AI penuh (agentic) adalah alternatif yang valid dan dikaji di literatur, tetapi lebih sulit diaudit; prinsip "agama tidak boleh salah" mendukung kerangka berbasis kode.
- **Satu panggilan Jev = satu pertanyaan** (topik, nada, tanda kesusahan, tanda krisis dipanggil terpisah) agar tidak saling menutupi; biayanya hampir nol.
- Pesan campuran (pertanyaan + kata kasar): **nada dipisah dari isi**. Pencarian dalil hanya sekali, untuk isi pertanyaan (kata kasar dibuang dulu). Dalil adab tidak dicari, diambil kode dari paket tetap (lihat §9.3).

---

## 2C. Keputusan prototipe, riset, dan wasit (tambahan 13 November 2026)

Merangkum keputusan **setelah** §2A–2B. Rinciannya ada di `spek-prototipe-agent-al-hikmah.md` (revisi 2), yang **menang bila ada konflik**. Semua rancangan di bagian ini adalah **hipotesis awal**; pembaruannya datang dari **kasus nyata** setelah prototipe jalan (buku kasus), bukan dari kegagalan yang hanya dibayangkan.

### Tujuan dan batas prototipe
- ✅ Yang wajib jalan: **AI agent** (seluruh pipeline chat) lewat OpenRouter. Bentuknya **prototipe**, bukan demo/website/produk; cukup terminal. Website final dikerjakan tim lain.
- Masuk: jalur tanya, sistem keselamatan, data irisan pertama (20–30 dalil muamalah), harness evaluasi. Tidak masuk: UI, video, login, tombol lapor, glosarium yang belajar, graph database, deploy, paywall.
- 💡 Penyimpanan lokal (SQLite) di balik satu interface (Supabase pemilik proyek ada di akun lain, tidak terhubung); kode dipisah `core/` dan `cli/`; mode debug; kunci hanya di `.env`; log lokal tanpa ID user.
- 💡 Dua backend keputusan (Jev dan LLM murah) bisa ditukar lewat satu pengaturan dan dibandingkan di set uji. Jev tertutup, alpha, dan bahasa Indonesia belum diklaim.
- Prototipe **belum boleh ke user publik** sebelum review penasihat syariah dan psikolog.

### Aturan jawaban v1 (9 aturan, 💡)
Bentuk jawaban **bebas bervariasi** (pemilik proyek menyerahkannya ke AI: "jawaban AI memang beda-beda"). Yang tidak boleh bergeser: (1) AI tidak berbicara hukum dengan suaranya sendiri; kesimpulan hukum lewat stempel `[PENDAPAT-n]` berisi kutipan persis dari sumber; (2) teks Arab/terjemahan hanya dari stempel; (3) semua pendapat disebut, tanpa vonis tunggal; (4) kalimat batas wajib; (5) dalil kurang → menyerah; (6) dalil berperan pokok wajib dipakai; (7) tidak menambah klaim hukum dari luar paket; (8) ayat/hadits tampil lewat atribusi pendapat/lembaga (✅ default prototipe, dikonfirmasi penasihat sebelum produk); (9) penanda "belum ditinjau penasihat" bila record belum disahkan.

### Pertanyaan lanjutan
Penyusun ulang (satu panggilan bersama pemetaan masalah) menggabungkan 1–2 giliran terakhir menjadi pertanyaan utuh; Jev menilai "lanjutan atau topik baru"; ambigu → tanya balik satu kali; riwayat hanya menyimpan pertanyaan, pertanyaan utuh, ringkasan, dan kode dalil (tanpa teks dalil).

### Hasil riset dan wasit (D1–D8, 💡)
Pemilik proyek menjalankan riset oleh AI peneliti lain, lalu meminta wasit independen (chat baru tanpa konteks) menilai tujuh keputusan terbuka. Hasil yang diadopsi:

| | Keputusan |
|---|---|
| D1 | Gerbang relevansi + slot per jenis; pendapat via JOIN `masalah_id` dengan cek silang; otoritas hanya urutan tampil; `pengaruh` = 0; tanpa top-3 |
| D2 | Kesimpulan hukum hanya lewat stempel record (kutipan persis, `diusulkan_kurator`); ayat tampil via atribusi; validator kata vonis mode lapor dulu |
| D3a | Skor reranker mentah + ambang dikalibrasi (dev 20–40 soal); tanpa min-max |
| D3b | Gerbang menyerah logika DAN (skor, masalah terpetakan dengan record, tidak diveto); Jev/LLM hanya veto |
| D4 | Pemeriksa akhir: cek deterministik + 1 panggilan LLM per klaim; Jev veto; tanpa self-consistency di suhu 0 |
| D5 | Daftar tertutup masalah + kalimat asli ikut dicari + glosarium + doc2query per masalah; "Dipahami sebagai" |
| D6 | Klasifikasi terpisah dan paralel; krisis ATAU + detektor kedua; tidak_jelas/gagal → kesusahan + tawarkan kontak |
| D7 | Baseline acak/BM25 + pengecoh 200+ + dev/hold-out + laporan jumlah dan selang; gerbang nol toleransi |
| D8 | Pemetaan `masalah_id` sebagai titik gagal tunggal: cek silang + metrik sendiri |

**Prinsip veto:** komponen yang belum terbukti (Jev, LLM-judge, daftar kata) hanya boleh membuat sistem menyerah/menahan, tidak boleh meloloskan jawaban sendirian. Pengecualian: krisis memakai ATAU.

**Koreksi atas rancangan sebelumnya:** (a) normalisasi min-max membuat ambang tak pernah menyala; (b) target "80% top-5" menyesatkan pada korpus 25 dalil (acak = 20%); (c) contoh glosarium "cicilan tanpa kartu" ternyata klasifikasi; (d) rumus penimbang berumus rapuh (titik balik `pengaruh` 0,417 pada contoh); (e) tanya 3× pada suhu 0 tidak bermakna; (f) argumen "5×95%=77%" keliru.

### Keputusan pemilik proyek (✅)
- Ayat tampil lewat atribusi (default prototipe).
- Krisis: detektor mana pun "ya" → jalur krisis; "tidak_jelas"/gagal → mode kesusahan + tawarkan kontak; dua detektor.
- Rancangan diperbarui dari kasus nyata setelah prototipe, bukan dari celah yang dibayangkan.

### Pekerjaan non-kode yang menahan peluncuran
Izin/lisensi (terjemahan dan tafsir Kemenag/LPMQ, hadits, fatwa DSN-MUI) dan kemungkinan tashih (menurut laporan riset; belum diverifikasi; bukan nasihat hukum); penasihat syariah; review psikolog; 3 penulis soal uji.

### Dokumen terkait
`spek-prototipe-agent-al-hikmah.md` (untuk Claude Code), `petunjuk-cari-dataset-al-hikmah.md` (untuk chat dataset), `perbandingan-keputusan-desain-al-hikmah.md` (bahan wasit), laporan riset desain RAG.

---

## 2D. Cakupan rak, pengguna siswa, dan sumber data (revisi 3, 17 November 2026)

**Latar (dari Edilakso dan tim dev; proyek AI tidak memverifikasi):** Al Hikmah adalah aplikasi untuk **siswa** (termasuk absensi ibadah) yang dikerjakan **tim dev** dan **belum ada**. Fitur AI hanya satu fitur. Menurut tim dev (via pemilik proyek, 17 November): belum ada aplikasi yang memakai API, dan **belum ada izin data**. Pengguna kemungkinan **di bawah 18 tahun**. **Tugas proyek ini: membuat fitur AI berhasil dan bisa diuji (prototipe, terminal cukup).** Urusan aplikasi bukan tugas dan bukan penghalang.

**✅ Cakupan "rak bertahap":** AI **menerima pertanyaan apa saja**; yang menentukan bisa menjawab adalah **isi database**.
| Rak | Isi |
|---|---|
| 1 | Ibadah harian: shalat, puasa, Ramadan |
| 2 | Muamalah dekat siswa: pinjol, paylater, judi online, jual beli online, giveaway |
| 3+ | Menyusul sesuai pertanyaan yang paling banyak masuk |

Di luar rak: jawab jujur "rujukannya belum ada" + sarankan **guru agama**. Ini **menggantikan** cakupan awal "fiqih muamalah kontemporer" (muamalah tidak dibuang; urutannya berubah). Nada boleh santai, isi tidak setengah serius; persona tetap (bijak, rasional, hangat, tidak bergaya ustadz). 💡 Irisan prototipe: tiap rak **5–7 `masalah`** dulu, kolom `masalah.rak`; daftarnya **ditulis pemilik proyek dulu**.

**✅ Batas pengguna:** uji **internal boleh**; uji ke **siswa sungguhan belum boleh** sebelum penasihat syariah ada **dan** psikolog meninjau jalur krisis; konten Al Hikmah ditahan (hanya konten proses tanpa isi keagamaan, nanti). **Fitur AI tidak menerima data siswa/akun.**

**💡 Kategori tambahan (❓ kebijakan belum diputuskan):** `sensitif_remaja` (rujukan tetap ke orang dewasa tepercaya/guru agama/guru BK; kasus krisis → jalur krisis); `bergantung_waktu` (awal Ramadan, jadwal shalat, zakat fitrah: tanpa angka/tanggal, arahkan ke pengumuman resmi; API jadwal/Hijriah **ditunda**); Rak 2 beririsan dengan keuangan/hukum/krisis (AI tidak memberi saran finansial/hukum); ibadah banyak ikhtilaf mazhab/ormas (default: tampilkan pendapat utama; rujukan default sekolah = penasihat/guru agama); jenis data baru `bacaan`.

**Sumber data:** **dataset sendiri = jalur utama** (fatwa, pendapat, daftar masalah, set uji). **API komunitas** (`api.quran.gading.dev`, `api.hadith.gading.dev`) = **bahan awal** teks ayat/hadits dan verifikasi ID, **bukan fondasi produksi**: data asal Kemenag/tafsirq (MIT hanya untuk kode), pembatas laju, tanpa pencarian, derajat hadits belum terkonfirmasi. Salinan lokal untuk prototipe internal, ditandai `boleh_tampil_komersial = belum`, **tidak dipublikasikan** (💡 default, belum dibantah pemilik proyek). Detail di spek §14.5. **(revisi 4)** Peta sumber dan lisensi (spek §14.6): teks Arab **Tanzil** (CC BY 3.0, verbatim) dan hadits Arab + derajat **fawazahmed0** (Unlicense) adalah bahan paling bersih; **terjemahan, tafsir, dan terjemahan hadits Indonesia tidak ada yang berlisensi terbuka terverifikasi**, jadi **retrieval tidak boleh bergantung pada terjemahan berlisensi** (indeks utama = pemetaan masalah + contoh pertanyaan + istilah latin); **Rak 2 (dikoreksi 18 November):** pinjol, paylater (fatwa **regional** MUI Jatim 04/2022) dan jual beli online (DSN-MUI 144–146/2021) punya sumber; **judi online dan giveaway tanpa fatwa langsung → default AI jujur menyerah**; **Rak 1 (ibadah) belum punya sumber berlisensi jelas** (prototipe internal: PDF fatwa MUI; satu-lembaga = nyatakan lembaga lain belum tercatat); terjemahan hadits `ind-*` tidak untuk rilis; kitab klasik OpenITI/Shamela riset internal saja (spek §14.7); izin LPMQ/DSN-MUI, kemungkinan tashih, dan badan usaha = urusan tim dev/hukum.

---

## 3. Model AI (via OpenRouter)

### Pilihan model

| Kategori OpenRouter | Tahap | Model | Status |
|---|---|---|---|
| Text | Penerjemah pertanyaan | GLM 5.3 Flash / Haiku 5.5 / DeepSeek V4.1 Flash | ❓ Belum diputuskan; 💡 usulan GLM 5.3 Flash, diuji ±30 contoh bahasa gaul |
| Text | AI penjelas | Haiku 5.5 / DeepSeek V4.1 Flash / GLM 5.3 Flash | ❓ Belum diputuskan; dipilih berdasarkan set uji (paling jarang melanggar aturan), bukan harga |
| Embeddings | Detektif 2 | Qwen3 Embedding 8B | ✅ |
| Rerank | Reranker | Voyage rerank-3 | ✅ |
| Decisions | Gerbang, tombol menyerah, pemeriksa akhir | Jev (TypeSafe AI) | ✅ |
| Text | Naskah video | GLM 5.3 dan/atau Qwen3.8 Max | ✅ dipilih awal; 💡 karena AI hanya menulis JSON (bukan HTML bebas), model yang lebih murah kemungkinan cukup |
| Speech | Narasi video | HeyGen Voice | ✅ |
| — | Bacaan Al-Qur'an | Dataset audio qari asli, **bukan TTS AI** | ✅ |
| Image, Video | — | Tidak dipakai untuk saat ini (video dirender dari kode) | ✅ |

### Potret harga (Okt–Nov 2026, per 1 juta token kecuali disebut lain)

| Model | Input | Output |
|---|---|---|
| Claude Haiku 5.5 | $0,10 | $0,50 (tokenizer baru ±30% lebih banyak token) |
| DeepSeek V4.1 Flash | $0,15 | $0,60 (harga bisa beda per provider) |
| GLM 5.3 Flash | $0,075 | $0,25 |
| GLM 5.3 | $1,40 | $4,40 |
| Qwen3.8 Max (0902) | $2,00 | $6,00 |
| Qwen3 Embedding 8B | $0,01 | — |
| Voyage rerank-3 / rerank-3-lite | $0,05 / $0,02 | — |
| Jev 1.13 | $0,042 | $0 |
| HeyGen Voice / Voice Turbo | $15 / $7,50 per 1 juta karakter (harga promo s.d. 31 Okt; normal $30) | — |

### Estimasi biaya

- Satu jawaban teks lengkap: **±$0,0012–0,0018** (±$1,2–1,8 per 1.000 pertanyaan).
- Embedding seluruh dataset awal (±20–30 juta token): ±$0,20–0,30, sekali.
- Satu video bila AI menulis HTML bebas: ±$0,05–0,07. Dengan pendekatan template/JSON: jauh lebih murah, biaya didominasi TTS.

### Catatan tentang Jev

- Model "System One" dari TypeSafe AI (dirilis early access 15 September 2026). Tidak menghasilkan teks; mengeluarkan pilihan/skor terstruktur beserta tingkat keyakinan yang terkalibrasi.
- Tersedia di OpenRouter (`typesafe/jev-1.13`, alias `jev-latest`) lewat **Decisions API** (endpoint alpha), bukan endpoint chat completions biasa.
- Keterbatasan: arsitektur tertutup; benchmark diukur tim TypeSafe sendiri; dukungan bahasa Indonesia belum diklaim resmi sehingga perlu diuji.
- 💡 Semua tahap keputusan dibungkus dalam satu modul dengan interface sendiri, supaya bisa ganti antara Jev, LLM murah dengan structured output, atau reranker tanpa membongkar sistem.
- 💡 Pemakaian tambahan Jev (13 November 2026): menilai nada kasar (level 0–3), tanda kesusahan, tanda krisis, dan tren nada antar giliran; tiap panggilan satu pertanyaan (lihat §2B dan §9). Dukungan bahasa Indonesia, termasuk bahasa gaul, **wajib diuji** sebelum diandalkan.
- 💡 (13 November, setelah wasit) Versi Jev **dikunci** (mis. `typesafe/jev-1.13`/`1.14`, bukan alias bertilde saat uji); untuk gerbang menyerah dan pemeriksa akhir Jev **hanya veto**. Detektor krisis memakai **dua detektor** (Jev + LLM murah). Skor Voyage rerank **bukan probabilitas** (dokumentasi hanya menyebut skor relevansi); simpan skor mentah dan kalibrasi sendiri.

---

## 4. Dataset

### Empat jenis "dataset" dan tempatnya

| Jenis | Isi | Tempat (💡 usulan) |
|---|---|---|
| Pengetahuan | Ayat, hadits, tafsir, fatwa, kisah, korpus sejarah | Tabel Supabase + kolom embedding |
| Set uji | Pertanyaan + dalil yang seharusnya muncul | File di repo GitHub |
| Aset | Gambar, audio qari | Supabase Storage, metadata di tabel |
| Aturan & skill | `SKILL.md`, spek, aturan jawaban | File di repo |

### Prinsip

- ✅ Validitas sumber (termasuk kisah hikmah) adalah **urusan kurasi dataset**: derajat dari rujukan yang tercatat dan review penasihat syariah. AI di pipeline hanya mengambil dari data yang sudah dikurasi; AI tidak menentukan data masuk atau tidak.
- Setiap potongan data punya **ID tetap**. Format kode: `QS-<surah>:<ayat>`, `HR-<KITAB>-<nomor>`, `FATWA-<LEMBAGA>-<nomor>-<tahun>`.
- Hadits menyimpan derajat beserta siapa yang menilai.
- Teks Arab disimpan dua versi: asli (untuk ditampilkan) dan tanpa harakat (untuk dicari).
- Lisensi setiap sumber diperiksa, terutama karena app komersial. Teks Arab Al-Qur'an tersedia dari Tanzil (dengan atribusi, tanpa diubah); terjemahan, tafsir terjemahan, audio qari, dan font umumnya punya ketentuan sendiri.
- Pertanyaan sejarah Islam memakai **korpus sejarah terpisah** dengan aturan jawaban sendiri: wajib menyebut sumber dan menandai perbedaan versi di antara sejarawan.

### Struktur tabel (💡 usulan, tambahan 13 November 2026)

Dataset dibedakan menjadi **bahan baku** (ayat, hadits, tafsir, fatwa, pendapat, glosarium; dikurasi manusia + penasihat) dan **produk** (jawaban hasil AI; log/cache, tidak otomatis dipercaya, harus bisa ditelusuri ke bahan baku). Pemilik proyek tidak perlu menulis ribuan jawaban; contoh 5 jawaban dummy hanya bentuk keluaran.

Prinsip: satu potongan = satu baris = satu ID tetap. **Irisan pertama:** `sumber`, `dalil`, `topik`, `dalil_topik`, `set_uji`. Sisanya menyusul karena semuanya tinggal tersambung ke `dalil`.

| Tabel | Isi | Kolom penting |
|---|---|---|
| `sumber` | Asal data | nama, lisensi, url, jenis |
| `dalil` | Ayat/hadits/tafsir/fatwa, satu baris per potongan | `id`, `jenis`, `teks_arab`, `teks_arab_polos`, `terjemahan`, `sumber_id`, `embedding`, `status_review`, `tingkat_otoritas` |
| `hadits_derajat` | Penilaian hadits | `dalil_id`, `derajat`, `penilai` |
| `topik` | Pohon topik (muamalah → riba → paylater) | `id`, `nama`, `induk_id` |
| `dalil_topik` | Dalil mana masuk topik mana | `dalil_id`, `topik_id`, `peran`, `bobot` |
| `relasi` | "Benang merah" antar dalil | `dari_id`, `ke_id`, `jenis` (`tafsir_dari`, `menjelaskan`, `dikutip_oleh`) |
| `pendapat` | Perbedaan pendapat ulama per masalah (tabel sendiri karena app tidak boleh memberi vonis tunggal bila ada ikhtilaf) | `masalah_id`, `pemilik_pendapat`, `kesimpulan_hukum` (kutipan persis), `syarat_qayd`, `rujukan`, `status_khilaf`, `penalaran`, `berlaku_sejak`, `dicabut_oleh`, `status_review` |
| `masalah` | Daftar tertutup masalah yang dicakup (±10–15), dipakai memetakan pertanyaan | `id`, `label`, `istilah_latin`, `topik_id`, `rak`, `kriteria_batas`, `status_review` |
| `pendapat_dalil` | Dalil yang dirujuk tiap pendapat | `pendapat_id`, `dalil_id`, `cara_istidlal`, `status_review` |
| `contoh_pertanyaan` | 2–3 pertanyaan gaul per masalah (doc2query), dibuat/diverifikasi manusia | `masalah_id`, `pertanyaan`, `penulis` |
| `glosarium` | Bahasa gaul → istilah kitab | `istilah_gaul`, `istilah_kitab`, `topik_id`, `jenis`, `status_review` |
| `set_uji` | Pertanyaan + dalil yang seharusnya muncul | `pertanyaan`, `dalil_id_benar[]` |
| `kontak_darurat` | Kontak layanan krisis (lihat §9.5) | nama, nomor, jenis, `terakhir_dicek` |
| log pertanyaan | Pertanyaan, hasil terjemahan, label, hasil | Dicatat dari hari pertama (bahan "belajar") |

- 💡 Embedding dibuat dari terjemahan + **header netral** (nama surah, nomor, kelompok ayat; tanpa penilaian hukum); ringkasan AI hanya masuk indeks bila `disetujui_kurator`. BM25 dari teks Arab polos + terjemahan + `istilah_latin`. Teks Arab asli tetap utuh untuk ditampilkan (mesin stempel).
- Tiga jenis label: **label data** (topik, jenis, derajat, `status_review`; manusia), **label pertanyaan** (jenis pertanyaan, jenis narasi; pipeline), **label uji** (dalil yang seharusnya muncul; pemilik proyek + penasihat). Aturan emas: **AI boleh mengusulkan label, manusia yang mengesahkan** (`status_review`: `diusulkan` → `disetujui`). Label jenis narasi menempel di jawaban/pertanyaan, bukan di dalil.

### Jenis sumber dan arti "lingkaran besar" (💡)

| Jenis | Tempat | Lingkaran besar bila |
|---|---|---|
| Ayat, hadits | `dalil` | Derajat kuat, relevan, peran pokok di topik |
| Tafsir | `dalil` + `relasi` | Menjelaskan dalil yang besar |
| Fatwa lembaga | `dalil` | Lembaga resmi, sesuai kasus, tahun relevan |
| Pendapat ulama/mazhab | `pendapat` | Ada dalil rujukan, ada penalaran, kedudukan penyampai |
| Kisah, sejarah | Korpus terpisah | Aturan jawaban sendiri |
| Glosarium | `glosarium` | Tidak masuk jawaban; hanya untuk penerjemah |
| Paket adab dan nasihat (baru) | Tag khusus | Tidak dicari; dipanggil kode bila nada kasar (§9.3) |

### Glosarium pertanyaan (tambahan 13 November 2026)

- 💡 **AI tetap penerjemah utama** (gaul → istilah kitab); glosarium kurasi manual diselipkan ke prompt sebagai kamus contekan. Alasannya, tebakan AI bisa meleset halus dan mengacaukan pencarian sejak awal. Penerjemah hanya mengubah istilah, tidak memutuskan hukum.
- Dua jenis glosarium (kolom `jenis`): **bahasa** (sinonim murni, mis. "telat bayar" = "menunda pembayaran utang"; aman dikurasi pemilik proyek) dan **klasifikasi** (memetakan ke nama akad/kategori fiqih, mis. "cicilan tanpa kartu" → jual beli angsuran, atau paylater → akad tertentu; sudah penilaian fiqih, wajib penasihat syariah; aturan praktis: bila `istilah_kitab` berupa nama akad atau kategori fiqih, otomatis klasifikasi).
- Pemilik proyek menilai glosarium sebagai ide yang sangat baik, termasuk versi yang belajar dari informasi user. ❓ **Ditunda** sampai ada user nyata untuk diuji. Rancangan bila nanti dibuat: terjemahan yang meleset atau berkeyakinan rendah di log → kandidat entri (`diusulkan`) → disahkan manusia secara berkala (antrean batch); tidak pernah langsung mengubah data.
- 💡 Yang dikerjakan sejak awal (murah): kolom `jenis` dan `status_review`, serta log pertanyaan + hasil terjemahan.
- 💡 Pekerjaan rumah pemilik proyek: menulis ±20 pertanyaan gaul (irisan pertama) dan ±10 kalimat dari netral sampai kasar dengan level yang ditandai sendiri (bahan uji Jev dan penentu garis "kasar").

### Struktur yang dibutuhkan skill video (💡 usulan, titik sambung app ↔ skill)

- `jawaban` disimpan sebagai **daftar poin ber-ID**, bukan satu paragraf, supaya setiap adegan video bisa menunjuk poin tertentu.
- Label jenis narasi per bagian jawaban, dengan `versi_label` dan `sumber_label` (`rag` atau `tebakan`).

### Contoh data

- File `contoh-dataset-jawaban.json` berisi 5 contoh **dummy** bidang muamalah (paylater, bunga bank, dropship, mystery box, menunda bayar utang). Belum diverifikasi ustadz; teks Arab/terjemahan sengaja dikosongkan (`<<STEMPEL>>`); nomor hadits dan fatwa perlu dicek ulang. Hanya untuk merancang template.

---

## 5. Rencana build

### Stack (💡 usulan)

| Alat | Fungsi |
|---|---|
| Claude Code | AI agent yang menulis kode; membaca `CLAUDE.md` sebagai aturan proyek |
| GitHub | Penyimpanan kode dan riwayat versi ("tombol undo") |
| OpenRouter | Akses semua model; dengan batas pengeluaran (credit limit) |
| Supabase | Database, pencarian kata (pengganti BM25), pencarian vektor (pgvector + HNSW), storage |
| Vercel | Hosting aplikasi web |

Catatan: `.skill` adalah format fitur Claude. Di aplikasi (lewat OpenRouter), instruksinya dimuat sebagai prompt oleh backend dan skrip validatornya dipanggil backend.

### Tahapan (💡 usulan)

| Fase | Isi | Dianggap selesai bila |
|---|---|---|
| 0. Persiapan | Persempit cakupan (rak bertahap: ibadah harian dulu, lalu muamalah dekat siswa; lihat §2D), cari penasihat syariah sejak awal (dan rencanakan review satu kali oleh psikolog berlisensi sebelum rilis publik), siapkan akun, tulis spek produk & aturan jawaban | Cakupan, penasihat, akun, dan dua dokumen siap |
| 1. Dataset | Kumpulkan sumber berlisensi, rapikan jadi data terstruktur ber-ID, normalisasi teks Arab | Data muamalah ada di Supabase dan relasinya bisa ditelusuri |
| 2. Mesin pencari | Embedding, pencarian kata + makna, hybrid, rewriter; buat set uji 50–100 pertanyaan | Dalil yang benar muncul di 20 hasil teratas untuk sebagian besar set uji |
| 3. Jawaban lengkap | Rerank, gerbang+slot, gerbang menyerah, AI penjelas, stempel, validasi kode; adu model penjelas | Penasihat menyatakan ±50 jawaban aman; pertanyaan tanpa dalil berakhir "menyerah" |
| 4. Lapisan pengaman | Gerbang depan, deteksi niat, pemeriksa akhir, log, tombol lapor, disclaimer, tangga respons nada kasar, jalur krisis, penghentian sesi (lift), set uji keselamatan | Pertanyaan jebakan direspons dengan benar |
| 5. Uji tertutup | 10–30 penguji; jawaban salah jadi pertanyaan baru di set uji | — |
| 6. Video | Template, narasi, audio qari, cache per topik | — |

💡 **Irisan tipis pertama:** 20–30 dalil muamalah → Supabase → embedding → halaman pencarian sederhana (tanpa jawaban AI) → uji dengan 20 pertanyaan. Pertanyaan uji ditulis pemilik proyek sendiri dengan bahasa gaul seperti user asli; penasihat memverifikasi dalil yang seharusnya muncul.

### Kebiasaan kerja dengan AI agent (💡 usulan)

- Satu fase, satu sesi kerja, dengan spek dan tujuan fase itu saja.
- Simpan ke GitHub setiap kali sesuatu berhasil.
- API key tidak pernah ditempel di chat atau kode; disimpan di `.env` / pengaturan environment Vercel.
- AI agent menjelaskan apa yang dibangun dalam bahasa sederhana di akhir sesi.

### Paket berlangganan dan fitur video

- ✅ Label jenis narasi dibuat untuk **semua user** (biayanya hampir nol karena deteksi niat sudah berjalan).
- ✅ Yang dikunci paywall hanya tombol "jadikan video" dan tahap mahal setelahnya. Pengecekan hak akses ada di backend, bukan di skill.
- Dengan begitu, user yang upgrade tidak membuat sistem harus menebak label untuk obrolan lamanya.

---

## 6. Skill video (`video-edukasi-islami`)

### Kondisi sekarang

- AI hanya menulis `naskah.json`; `pemutar.html` (GSAP) yang menganimasikan. Validator (`validasi_naskah.py`) mengecek format, huruf Arab, kata hukum, dan sosok sebelum TTS dan render.
- Visual memakai ikon yang dibangun lewat `scripts/bangun_ikon.py`. **Belum memakai gambar hasil generate.**
- Gaya: motion graphic 2D / explainer (diagram terbangun, token berpindah, kamera bergeser, tempo khusyuk untuk adegan dalil). Tidak ada animasi karakter dan tidak ada 3D.
- Prioritas 16:9, durasi mengikuti panjang jawaban.
- Teks ayat/hadits di video juga lewat mesin stempel; tidak diketik AI.
- Skill pemilah terpisah menyaring topik dari chat dan menentukan pembagian bab; skill video hanya membuat video.
- Rencana dan keputusan pengembangan tercatat di bagian "Peta jalan" pada `references/integrasi-app.md` (ditandai sebagai rencana yang belum berlaku).

### 6.1 Format gambar

- Video berupa HTML. Gambar dari model gambar AI (nanti) berupa file PNG/WebP yang ditempel ke dalam pemutar; gambarnya bukan HTML.
- Gambar acuan (aset master) boleh PNG/JPG; hanya dikirim ke model gambar sebagai contoh gaya, tidak tampil di video.

### 6.2 Pustaka aset gambar (💡 rancangan)

- **Prinsip:** generate kalau belum ada, simpan, pakai ulang. Gambar hasil generate kembali masuk ke pustaka (ide pemilik proyek).
- **Aset master** (dibuat/disetujui manusia) tidak dicek ulang AI dan menjadi satu-satunya acuan gaya. **Aset turunan** boleh dipakai ulang, tetapi tidak pernah menjadi acuan gaya (mencegah "fotokopi dari fotokopi").
- **Status disimpan sebagai kolom database**, bukan folder: `BARU` → cek 1 (langsung, per gambar) → `LOLOS_CEK_1` → cek 2 (batch, banding dengan master + tetangga terdekat, bukan seluruh pustaka; plus persetujuan manusia untuk karakter/adegan/tokoh) → `TERVERIFIKASI`. Gagal di mana pun → `GAGAL` (+ alasan). Ada audit berkala dan banding berkala untuk yang salah tolak.
- **Pemakaian setelah cek 1:** ikon/objek langsung; karakter/adegan memakai cadangan terverifikasi sampai disetujui manusia; tokoh sejarah selalu menunggu manusia.
- **Aset gagal tidak dihapus:** gambarnya jadi contoh bagi AI pengecek; alasannya (teks) diselipkan ke prompt generate berikutnya. Gambar gagal tidak pernah dikirim ke generator sebagai acuan. Model gambar tidak "belajar" sendiri dari pustaka.
- **Metadata:** jenis, master/turunan, alasan pembuatan, peminta (sistem/user), label konteks, penanda `khusus_konteks` (gambar yang sengaja beda gaya karena permintaan tertentu; dipakai ulang hanya di konteks cocok dan tidak jadi acuan gaya), prompt & model, riwayat status, penyetuju, jumlah pemakaian.
- Penghematan datang dari pemakaian ulang, jadi kualitas label sama pentingnya dengan jumlah aset.
- Embedding gambar (misalnya model multimodal) dipakai untuk pencarian dan deteksi duplikat.

### 6.3 Desain berdasarkan jenis narasi

- ✅ Desain video (alur belajar, tema, jenis adegan) dipilih berdasarkan jenis narasi. Jenis narasi mengubah alur belajar, bukan hanya tampilan.

| Jenis | Status | Alur belajar (💡) | Desain visual (💡) |
|---|---|---|---|
| Tematik | Sudah didukung | 8 langkah yang ada | Tema `kertas`/`papan`; adegan `alur`, `banding`, `cek` |
| Ekspositori | Sebagian | Gambaran besar → bagian → dalil per bagian → ringkasan | Adegan semacam `tahapan`/peta konsep; hal ghaib pakai simbol |
| Kronologis | Belum | Konteks → rangkaian peristiwa → pelajaran → sumber | Tema `kisah`, adegan `garis_waktu`, peta lokasi, *motion comic* 2D |
| Anekdot / kisah hikmah | Belum | Latar → satu kejadian → hikmah → sumber | Tema `kisah` versi pendek |

- ✅ **Siapa menentukan jenis narasi:** A. pipeline RAG menentukan (deteksi niat, saat pertanyaan asli masih ada); B. pemilah membawa (satu bab satu jenis); C. skill video hanya membaca, dengan tebakan sebagai cadangan bila label kosong (ditandai `tebakan`, kerangka dicek lebih ketat).
- ✅ **Mode bab beda jenis:** setiap bab memakai alur dan tema sesuai jenisnya. Aturan desain: **satu video, satu identitas** — huruf, warna dasar, suara narator, kartu judul bab tetap; yang berganti hanya tema dan jenis adegan.
- ✅ **Risiko di lapisan video untuk kisah adalah dramatisasi:** dialog hanya dari dalil lewat stempel; perasaan/niat tokoh hanya bila ada di data; rincian populer di luar data (termasuk Israiliyat) tidak ditambahkan. ❓ Batas visual suasana (misalnya petir atau malam yang tidak disebut data) belum diputuskan.
- **Format visual:** dipakai motion graphic 2D dan *motion comic*. Tidak dipakai: 3D (rumit, berat di HP, makin realistis makin sensitif soal sosok), stock footage dan talking head (alat membangun suasana ala medsos; ada urusan lisensi; avatar AI yang "berceramah" menyesatkan soal siapa yang bicara).

### 6.4 Workflow bertahap: kerangka sebelum naskah

- ✅ Meniru alur kerja manusia (storyboard dulu) agar kesalahan tertangkap saat masih murah.

```
[PAKET pemilah] bab[] + jenis_narasi per bab + id_jawaban
  → 1. KERANGKA (AI, pendek): alur belajar sesuai jenis; per adegan:
       tipe + tujuan (1 kalimat) + RUJUKAN DATA ("dalil[0]", "jawaban poin-3")
  → 2. CEK KERANGKA: a. kode (rujukan ada? semua dalil & pendapat terpakai?
       urutan sesuai jenis?)  b. AI Decisions (tujuan adegan bersandar ke data?)
       gagal → perbaiki (maks 2x)
  → 3. NASKAH (AI)
  → 4. CEK NASKAH: a. validator yang ada  b. AI cek dramatisasi
  → 5. TTS (mulai keluar biaya)
  → 6. RAKIT → video.html
```

- Kunci desain: **rujukan data per adegan** membuat sebagian besar cek "cocok dengan dataset" bisa dikerjakan kode; AI hanya untuk hal yang butuh penilaian.

### 6.5 Hemat biaya video (💡)

- AI mengisi data JSON ke template, bukan menulis HTML bebas — lebih murah, konsisten, dan teks ayat tetap lewat stempel.
- Cache video per topik (pertanyaan yang sama ditanya banyak orang).

---

## 7. Aturan sosok dan tokoh

| Kelompok | Aturan sekarang | Status |
|---|---|---|
| Nabi dan malaikat | Digambarkan sebagai cahaya | ✅ di skill; ❓ dikonfirmasi penasihat (sebagian ulama juga keberatan dengan cahaya) |
| Sahabat, istri Nabi, ahlul bait | Tidak digambar sebagai sosok; disebut di narasi, cahaya bila kisah benar-benar butuh | ✅ sementara; ❓ dikonfirmasi penasihat |
| Orang umum (pembeli, penjual) | Sosok tanpa wajah | ✅ di skill; ❓ batasnya untuk aset gambar dikonfirmasi penasihat |
| Ulama besar, imam mazhab | Sangat hati-hati (tanpa wajah atau simbol saja) | 💡 usulan |
| Tokoh politik belakangan (sultan Utsmani) | Lukisan sejarah domain publik berlabel sumber, atau tanpa wajah; bukan wajah karangan AI | 💡 usulan |
| Hal ghaib (Dajjal, surga, neraka, alam kubur, jin) | Tidak divisualkan harfiah; teks, simbol netral, garis waktu | 💡 usulan; ❓ penasihat |

- Alasan menghindari wajah karangan AI untuk tokoh nyata: wajah karangan yang dipakai berulang pelan-pelan dianggap wajah asli.
- Adegan sejarah perlu cek **akurasi zaman** (pakaian, arsitektur, benda).
- Sejarah kaya visual yang aman: peta, arsitektur, manuskrip, koin, garis waktu.
- Teks Arab tidak pernah dibuat oleh model gambar (hampir pasti rusak).

---

## 8. Feedback user (sisi app)

- ✅ Ada kolom feedback setelah video; feedback user dianggap penting supaya sistem tidak sepenuhnya bergantung pada AI.
- 💡 AI hanya **menyortir** (spam/serius) dan **mengelompokkan** (gambar, penjelasan, dalil), tidak menjadi hakim kebenaran agama.
- 💡 Banyaknya laporan berbeda tentang hal sama menjadi sinyal prioritas.
- 💡 Feedback gambar boleh memicu audit ulang aset; feedback dalil/hukum selalu ke penasihat syariah.
- 💡 Feedback tidak pernah mengubah data langsung; hanya menaikkan tanda ke antrean review (melindungi dari feedback yang sengaja melenceng).

---

## 9. Sistem keselamatan percakapan (di luar RAG, tambahan 13 November 2026)

Bagian dari satu produk yang sama dengan RAG, tetapi bekerja di sekelilingnya. Sabuk pengaman ada di empat tempat: sebelum (gerbang depan), di dalam (RAG), sesudah (pemeriksa akhir), dan di sekeliling (bagian ini). Semuanya dijalankan **orkestrator** (§2B).

### 9.1 Dua mode

- Urusan fiqih dan adab: AI **bijak dan hangat**.
- Urusan kejiwaan: AI **jujur sebagai AI** ("AI being AI"), tidak berpura-pura menjadi konselor atau ustad.
- ✅ User **bukan perintah absolut**: aturan perilaku ada di sistem, bukan di permintaan user. Pengamannya tidak boleh hanya di AI penjelas (bisa dibujuk): pemeriksa akhir adalah panggilan terpisah, dan stempel/validasi kode tidak bisa dirayu.

### 9.2 Tangga respons terhadap nada kasar

Keputusan pemilik proyek:
- ✅ AI harus **rasional dan bijaksana**: bukan "mabok agama", bukan seperti orang tua. Tidak menegur frontal, tetapi juga tidak dibiarkan: **diingatkan 1–3 kali**.
- ✅ Kasar yang tampak karena **kesusahan** (bukan iseng): AI **membantu dulu** sampai user merasa terbantu dan emosinya turun; baru setelah itu diingatkan.
- ✅ **Stop** = penghentian sesi, dengan mekanisme yang sama seperti konteks penuh (user diminta membuka chat baru). Stop adalah **ujung tangga**, bukan reaksi pertama terhadap kata kasar. Ini menggantikan usulan sebelumnya ("setelah teguran ketiga diserahkan ke AI").

Tangga (💡 rancangan):
1. Ada tanda krisis? → jalur krisis (§9.5), tidak pernah distop.
2. Tampak susah/emosi? → **bantu dulu**, tanpa teguran. Bila iseng (tidak tampak susah) → langsung ke tahap 3.
3. **Ingatkan lembut**, maksimal tiga kali (setelah emosi turun, atau pada kasar iseng).
4. Tetap kurang ajar → **tegas dan jelas** (batas disebut, tanpa menghakimi, tidak rancu).
5. Masih berlanjut → **sesi selesai**, chat baru.

Level kasar (dinilai Jev, 💡): 0 netral (jawab biasa); 1 gaul ringan, mis. "anjir ribet banget" (jawab biasa, tanpa teguran, agar AI tidak jadi "maniak agama"); 2 umpatan jelas (jawab dulu, satu kalimat ajakan lembut + satu dalil adab); 3 hinaan ke orang/agama (tetap jawab pertanyaannya bila ada, batas lebih jelas).

Aturan teknis (💡):
- Hitungan teguran dipegang **kode** (penghitung per chat), bukan AI. Redaksi tiap teguran berbeda.
- "Emosi turun" dibaca dari **tren nada** antar giliran (skor Jev), dibaca kode.
- Keyakinan Jev rendah → perlakukan sebagai level lebih rendah dan **anggap mungkin kesusahan** (benefit of the doubt).
- "Bijaksana" diterjemahkan ke aturan yang bisa diuji: satu hal per giliran; nasihat berupa ajakan, bukan "kamu harusnya"; paling banyak satu dalil; redaksi tidak diulang; nada mengikuti tren emosi.
- Nada teguran dicek pemeriksa akhir (tidak menghakimi, tidak menyalahkan).
- User bisa membuka chat baru: stop adalah reset, bukan hukuman.
- ❓ Garis antara level 2 dan 3, batas hinaan agama, dan redaksi "tegas" belum diputuskan (penasihat syariah).

### 9.3 Paket adab dan nasihat (💡)

Set kecil dan tetap (dalil dan teks tentang menjaga lisan dan cara menasihati dengan hikmah), dipilih penasihat syariah sekali dan diberi tag khusus. **Tidak dicari** lewat pencarian: kode mengambilnya bila nada kasar, sehingga hasilnya pasti, tidak bisa "miss", dan tetap lewat mesin stempel.

### 9.4 Penghentian sesi karena konteks penuh ("lift", 💡)

- Alasan: makin panjang konteks, makin tinggi risiko halusinasi, walau memakai RAG.
- Kode menghitung token tiap giliran, tanpa AI. Berhenti **sebelum** penuh (usulan ±60%; angka diuji).
- Riwayat tidak menyimpan teks dalil lama (tiap pertanyaan mencari dalil baru); cukup pertanyaan dan inti jawaban, supaya lift lebih lama penuh.
- Ringkasan otomatis oleh AI berisiko mengubah makna dalil; lebih aman meminta user membuka chat baru.
- Penutup hangat sebelum menghentikan. **Jalur krisis dikecualikan** dari penghentian.

### 9.5 Jalur krisis ("AI being AI")

- ✅ Keputusan pemilik proyek: AI menyatakan dirinya AI, menyarankan psikolog dan nomor darurat, **membantu sebisa mungkin dalam batas wajar**; selebihnya dilempar: urusan kejiwaan → psikolog; yang menyangkut agama → ustad/ulama.
- 💡 Aturan: bilang terang bahwa dia AI; tidak mendiagnosis; tidak menjanjikan; tidak memberi narasi "kamu begini karena..."; mendengarkan dan mengakui perasaan tanpa membenarkan hal yang berbahaya; satu langkah kecil; mengajak menghubungi orang terdekat; tetap menemani; tidak distop; pipeline fiqih biasa dilewati (dalil hukum tidak ditembakkan otomatis); bahasa agama di jalur ini ditentukan penasihat syariah dan tidak boleh menyiratkan bahwa kesusahan adalah tanda iman lemah.
- ✅ **Deteksi (13 November):** logika **ATAU** dengan dua detektor (Jev + LLM murah). Detektor mana pun `ya` → jalur krisis; `tidak_jelas`/gagal → mode kesusahan (tanpa teguran, tawarkan kontak), pipeline fiqih tetap jalan. Alarm palsu = rujukan lembut; krisis terlewat bisa fatal.
- 💡 **Kontak darurat tidak diketik AI.** AI menulis kode seperti `[KONTAK-KRISIS]`; backend menukar dengan data tabel `kontak_darurat`. Pemilik proyek mengecek ulang nomor secara berkala (nomor bisa berubah atau diputus).
- Hasil cek web 13 November 2026 (**wajib diverifikasi ulang sebelum rilis**): Healing119 (Kemenkes), dukungan psikologis awal gratis untuk keputusasaan, pikiran bunuh diri, dan krisis psikologis, lewat **119 ekstensi 8** atau healing119.id (telepon dan WhatsApp; situs menyebut layanan 24 jam dan konsultasi psikolog via call/chat). **119** adalah layanan darurat medis (gratis). Healing119 bukan pengganti diagnosis atau perawatan psikolog/psikiater. Untuk kasus tidak mendesak: puskesmas (Kemenkes menyebut ±64 persen puskesmas mampu memberi layanan jiwa, Oktober 2026).
- ❓ Pemilik proyek **belum punya akses ke psikolog**. 💡 Jalan tengah: skrip paling konservatif dulu (mengaku AI, empati singkat, kode kontak, mengajak orang terdekat, tetap menemani, tidak "terapi"), lalu **review satu kali oleh psikolog berlisensi sebelum rilis publik** (bukan tim tetap). Dua keputusan yang dibawa ke psikolog, bukan ke pemilik proyek atau AI: apakah AI boleh bertanya langsung soal niat menyakiti diri, serta nada dan panjang respons.

Rujukan (mekanisme yang sama dengan gerbang depan):

| Hal | Dilempar ke |
|---|---|
| Krisis, bahaya diri | Layanan krisis dan darurat |
| Tekanan psikologis berlanjut | Psikolog atau puskesmas |
| Beban agama pribadi (rasa bersalah, ragu, kasus pribadi) | Ustad/ulama terpercaya |
| Fatwa personal | Ulama/lembaga (gerbang depan) |

### 9.6 Lubang yang sudah dikritik

1. Stop bisa menyakiti orang yang sedang susah → jalur krisis tidak distop; lift butuh penutup hangat.
2. Deteksi kesusahan rapuh (dukungan Indonesia Jev belum diklaim; bahasa gaul) dan salah deteksi tidak sama mahalnya (ragu → anggap kesusahan). Arah gagal dibedakan: urusan hukum agama gagal ke "menyerah"; urusan sikap gagal ke "lembut", bukan ke "stop".
3. Penasihat syariah bukan psikolog; jalur krisis dan skrip "bantu dulu" butuh peninjauan orang yang paham sisi kejiwaan.
4. Semuanya bertumpu pada Jev dan orkestrator → bila Jev gagal atau ragu: default aman (jawab hati-hati, jangan menegur, jangan stop).
5. **Set uji keselamatan** tersendiri: kasar iseng; kasar karena susah; memancing 10 giliran berturut-turut; meminta AI berkata kasar; kalimat gaul ambigu; pesan campuran (kasar + pertanyaan sah); konteks hampir penuh pada percakapan berat.

---

## 10. Hal yang masih terbuka

| Hal | Catatan |
|---|---|
| Model penerjemah & penjelas | Ditentukan lewat set uji |
| Jenis narasi yang dibangun lebih dulu | Bergantung pada jenis pertanyaan yang paling sering muncul di app |
| Struktur dataset bersama app ↔ skill video | `jawaban` sebagai poin ber-ID, `jenis_narasi`, `versi_label`, `sumber_label` |
| Batas visual suasana pada kisah | Misalnya petir atau malam yang tidak disebut data |
| Keputusan penasihat syariah | Cahaya untuk Nabi/malaikat; sahabat dkk. di video kisah; hal ghaib; tingkatan tokoh sejarah; penggambaran orang umum |
| Penasihat syariah | Belum ada; dibutuhkan untuk memilih sumber, memverifikasi set uji, mereview jawaban |
| Kemampuan Jev menerima gambar | Perlu dicek bila Jev dipakai untuk pengecekan aset gambar |
| Ambang relevansi (kalibrasi), batas slot, jumlah kandidat reranker | Kalibrasi dev + set uji |
| Aturan "dalil pokok wajib dipakai" | Diusulkan; pemilik proyek cenderung menyerahkan ke AI; belum dikonfirmasi |
| Urutan otoritas dan label peran dalil; label "penalaran" pada pendapat | Penasihat syariah |
| Perlakuan pendapat tanpa dalil rujukan; profil bobot per niat pertanyaan | Dirancang bersama penasihat |
| Kapan pindah ke graph | Bila ada kelas pertanyaan multi-langkah yang terbukti gagal |
| Garis nada kasar (level 2 vs 3), batas hinaan agama, redaksi "tegas" | Penasihat syariah |
| Angka batas konteks untuk penghentian sesi | Diuji |
| Glosarium yang belajar dari user | Ditunda sampai ada user nyata; verifikasi lewat antrean berkala |
| Review psikolog dan keputusan jalur krisis | Pemilik proyek belum punya akses; review satu kali sebelum rilis publik |
| Verifikasi nomor darurat | Dicek berkala (tabel `kontak_darurat`), wajib sebelum rilis |
| Ambang relevansi, batas slot, jumlah kandidat reranker | Kalibrasi dev + set uji |
| Akurasi pemetaan `masalah_id` dan batas antar-masalah | Set uji; batas masalah: penasihat |
| Validator kata vonis: kapan naik dari "lapor" ke "menolak" | Setelah false positive/negative dikumpulkan |
| Pertanyaan majemuk ("paylater halal? terus dendanya?") | ❓ Belum ada desain "menyerah sebagian"; tunggu kasus nyata |
| Izin/lisensi komersial (terjemahan, tafsir, hadits, fatwa) dan kemungkinan tashih | Tim/pihak hukum; klaim laporan riset belum diverifikasi |
| Privasi log pesan sensitif (utang, krisis) | Prototipe: konfigurasi; produk: tim dan pihak hukum |
| Daftar masalah per rak (5–7 per rak) | Pemilik proyek menulis dulu |
| Kebijakan `sensitif_remaja`, `bergantung_waktu`, rujukan default ibadah | Psikolog/guru/penasihat |
| Izin/lisensi data API komunitas | Tim dev: belum ada izin; prototipe uji internal saja |
| 3 penulis soal uji, pengecoh 200+ | Pemilik proyek mencari penulis; pengecoh dari chat dataset |

---

## 11. Glosarium singkat

- **RAG:** model menjawab berdasarkan data yang dicari dari database sendiri saat ada pertanyaan.
- **Embedding:** teks diubah menjadi deretan angka yang mewakili makna ("koordinat makna"); teks bermakna mirip letaknya berdekatan.
- **Chunk:** potongan kecil data (satu ayat + terjemahan, satu hadits, satu paragraf tafsir).
- **HNSW:** cara menyusun indeks agar pencarian titik terdekat tetap cepat.
- **BM25:** pencarian berdasarkan kecocokan kata.
- **Reranker:** model yang mengurutkan ulang kandidat berdasarkan relevansi.
- **Model Decisions:** model yang mengeluarkan pilihan/skor plus tingkat keyakinan, bukan teks (contoh: Jev).
- **Mesin stempel:** sistem backend yang menukar kode (`[QS-2:275]`) dengan teks asli dari database.
- **Set uji:** kumpulan pertanyaan beserta jawaban/dalil yang benar, diverifikasi penasihat, dipakai untuk mengukur sistem setiap kali ada perubahan.
- **Israiliyat:** riwayat yang bersumber dari tradisi Ahli Kitab, sering muncul di versi populer kisah nabi.
- **Orkestrator:** kode di server yang menentukan urutan tahap dan memanggil model (Jev, pencarian, AI penjelas); "dirigen" sistem.
- **Gerbang relevansi + slot (dulu "penimbang"):** langkah kode setelah reranker: gerbang membuang yang tidak nyambung, slot menjamin tiap jenis dalil hadir, otoritas hanya mengurutkan penyajian.
- **Prinsip veto:** komponen yang belum terbukti hanya boleh membuat sistem menyerah/menahan, tidak boleh meloloskan jawaban sendirian.
- **`masalah_id`:** identitas satu masalah muamalah yang lebih sempit dari topik; dipakai memetakan pertanyaan dan menarik semua pendapat terkait.
- **Kalibrasi, dev/hold-out, gerbang nol toleransi, buku kasus:** lihat spek §6.17 dan §14.
- **Relevansi, otoritas, keluasan, peran dalam topik:** empat sinyal ukuran "lingkaran" dalil (lihat §2A).
- **AI being AI:** AI jujur bahwa dirinya AI di urusan kejiwaan; membantu dalam batas wajar lalu merujuk ke psikolog/layanan krisis.
- **Paket adab:** kumpulan kecil dalil/teks tentang adab dan cara menasihati, diambil kode (bukan dicari) saat nada kasar.
- **Lift (penghentian sesi):** menghentikan chat sebelum konteks penuh dan meminta user membuka chat baru.

---

## Riwayat dokumen

| Tanggal | Perubahan |
|---|---|
| 12 November 2026 | Versi pertama, merangkum percakapan Oktober–November 2026 |
| 12 November 2026 | Memperluas bagian "Cara kerja yang disukai pemilik proyek": pembagian peran, harapan terhadap AI, gaya komunikasi, hal yang dihindari |
| 13 November 2026 | Menambah §2A (penimbang, jaring dalil, pendapat ulama), §2B (orkestrator), struktur tabel + jenis sumber + glosarium pertanyaan di §4, §9 sistem keselamatan percakapan; memperbarui tabel arsitektur §2, catatan Jev §3, tabel fase §5, daftar hal terbuka, glosarium; hal terbuka dan glosarium dinomori ulang menjadi §10 dan §11 |
| 13 November 2026 (revisi 2) | Menambah §2C (keputusan prototipe, aturan jawaban v1, riset dan wasit D1–D8); merevisi §2A (penimbang berumus → gerbang+slot), tabel arsitektur §2, catatan Jev §3, tabel dataset §4 (masalah, pendapat_dalil, contoh_pertanyaan, header netral, koreksi glosarium), tabel fase §5, §9.5 (krisis ATAU), hal terbuka §10, glosarium §11 |
| 17 November 2026 (revisi 3) | Menambah §2D (rak bertahap, pengguna siswa, sumber data API, kategori sensitif/bergantung waktu); meluruskan §1 (fitur AI dari aplikasi siswa yang belum ada); kolom `masalah.rak`; hal terbuka |
| 17 November 2026 (revisi 4) | §2D diperluas dengan ringkasan peta sumber data dan lisensi; rincian di spek §14.6 |
| 18 November 2026 (revisi 5) | §2D: koreksi status Rak 2 dan ringkasan sumber Rak 1 setelah riset lanjutan; rincian di spek §14.7 |
