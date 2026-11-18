# Spek Claude Code: Prototipe AI Agent "Al Hikmah"

> **Untuk:** Claude Code (AI agent yang menulis kode).
> **Tanggal:** 13 November 2026.
> **Dibaca bersama:** `konteks-proyek-al-hikmah.md` (catatan konteks lengkap proyek). Dokumen ini membawa juga keputusan yang **lebih baru** dari dokumen konteks itu (ditandai "baru"). Bila ada konflik, **dokumen ini yang menang**.
> **Dataset** punya dokumen sendiri (lihat §9). Dokumen ini hanya mendefinisikan format masukannya.
> **Revisi 5 (18 November 2026):** setelah riset lanjutan **sumber Rak 1 dan Rak 2**. Perubahan: paylater kini punya fatwa regional bernomor, jual beli online punya DSN-MUI 144–146/2021, ibadah belum punya sumber berlisensi jelas, terjemahan hadits `ind-*` tidak untuk rilis, kitab klasik OpenITI/Shamela hanya riset internal, label tingkat lembaga, aturan satu-lembaga. Lihat **§14.7**; menang atas bagian lain yang bertentangan.
> **Revisi 4 (17 November 2026):** setelah laporan **peta sumber data dan cek lisensi** (hasil riset pihak ketiga, belum diverifikasi penuh). Perubahan: pilihan sumber data per jenis, retrieval **tidak boleh bergantung pada terjemahan berlisensi**, Rak 2 berlubang (paylater/judi online tanpa fatwa nasional bernomor), skema `skema_penomoran`/`versi_sumber`/`checksum`. Lihat **§14.6**.
> **Revisi 3 (17 November 2026):** setelah arahan Edilakso dan keterangan tim dev: Al Hikmah adalah **aplikasi siswa yang belum ada**; proyek ini hanya memegang **fitur AI**; cakupan menjadi **rak bertahap**; pengguna kemungkinan **siswa di bawah 18**; dataset sendiri = jalur utama dan API komunitas = bahan awal. Lihat **§14.5**; bagian itu **menang** atas bagian lain yang bertentangan.
> **Revisi 2 (13 November 2026):** setelah laporan riset desain RAG dan penilaian wasit independen. Perubahan utama: prinsip veto (§3.5), rancangan sebagai hipotesis + buku kasus (§3.6, §14), keputusan D1–D8 (§14.1), aturan jawaban v1 menjadi 9 aturan (§3.2), modul §6.3 dan §6.5–6.13 dan §6.17, krisis dengan logika ATAU (§7.5), fase kerja (§8, ada Fase 6). Bila ada konflik dengan dokumen konteks, **dokumen ini yang menang**.
>
> **Penanda status keputusan:**
> - ✅ **Diputuskan** pemilik proyek, jangan diubah tanpa bertanya.
> - 💡 **Usulan** yang sudah dibahas; boleh kamu kritisi dan ajukan alternatif dengan alasan, tetapi jangan diperlakukan seolah ✅.
> - ❓ **Terbuka**: tanyakan ke pemilik proyek atau putuskan lewat pengujian.

---

## 0. Cara memakai dokumen ini

1. **Baca seluruh dokumen sebelum menulis kode apa pun.** Lalu ringkas pemahamanmu dalam 10 baris ke pemilik proyek dan minta ia mengoreksi.
2. **Bekerja per fase** (§8). Satu fase, satu sesi kerja. Di akhir setiap fase: jalankan tes, **berhenti**, jelaskan apa yang dibangun dengan bahasa sederhana, tunjukkan hasilnya (mode debug, §6.16), lalu tunggu persetujuan sebelum fase berikutnya.
3. **Pemilik proyek pemula total** dalam membangun app AI dan ingin **belajar prosesnya** (pola "Brain-to-LLM": ia ikut berpikir, AI tidak menggantikan). Maka:
   - Jelaskan istilah teknis saat pertama muncul, pakai analogi.
   - Tanyakan **satu pertanyaan tajam pada satu waktu**, hanya untuk keputusan yang memang miliknya.
   - Kamu yang **merancang secara proaktif**, jangan menyerahkan desain teknis ke pemilik proyek tanpa usulan. Beri rekomendasi yang jelas beserta alasan dan risikonya, bukan daftar opsi kosong.
   - Koreksi terus terang bila idenya keliru, dan akui bila kamu keliru.
   - Jangan mengerjakan semuanya sekaligus tanpa penjelasan.
4. **Dilarang** memperlakukan 💡 sebagai ✅.
5. Jangan membangun di luar cakupan prototipe (§2). Bila merasa ada yang perlu ditambah, usulkan dulu.
6. Bahasa komunikasi: **Bahasa Indonesia santai** (pemilik proyek memanggil "bro"). Kode, nama variabel, dan komentar boleh bahasa Inggris atau Indonesia, asal konsisten; nama tabel dan kolom data **mengikuti dokumen ini (Indonesia)**.
7. Jangan klaim sesuatu "selesai" atau "aman" sebelum tes yang relevan dijalankan dan hasilnya ditunjukkan.
8. Aturan keras (§3.1–3.4) dan sistem keselamatan (§7) adalah **pegangan tetap**. Sisanya (D1–D8, semua angka dan ambang) adalah **hipotesis awal** yang akan diperbarui dari **kasus nyata** (§3.6, §14). Jangan membangun pertahanan tambahan hanya karena membayangkan kegagalan.

---

## 1. Tujuan dan konteks singkat

### 1.1 Proyek

**Fitur AI** tanya-jawab Islami (bagian dari aplikasi siswa Al Hikmah yang dikerjakan tim dev; **aplikasinya belum ada**) berbasis **RAG**: user bertanya dengan bahasa gaul, sistem mencari dalil di database sendiri, AI menyusun penjelasan **hanya** dari dalil yang ditemukan. Aplikasi direncanakan komersial. **Prinsip utama: agama tidak boleh salah**, sehingga setiap lapisan diberi "sabuk pengaman".

- ✅ Proyek **tidak melatih/fine-tune model**. Semua model dipakai lewat API (OpenRouter). Pengetahuan ada di database agar setiap klaim bisa ditunjuk sumbernya dan dicek per ayat.
- ✅ Cakupan: **rak bertahap** (§14.5): Rak 1 ibadah harian (shalat, puasa, Ramadan); Rak 2 muamalah dekat siswa (pinjol, paylater, judi online, jual beli online, giveaway); Rak 3+ menyusul. Pertanyaan di luar rak diterima, dijawab jujur "rujukannya belum ada" + saran bertanya ke **guru agama**. Ini **menggantikan** cakupan awal "fiqih muamalah kontemporer".
- ✅ Pemilik proyek **hanya memegang bagian AI agent**. Website/produk final dikerjakan **tim lain** dan nanti memanggil bagian ini.
- ✅ Fitur video/animasi **di luar cakupan** dokumen ini.

### 1.2 Tujuan prototipe (baru)

✅ Yang **wajib** jalan: **AI agent**, yaitu seluruh pipeline chat dari pesan user sampai jawaban final, lewat OpenRouter (pemilik proyek sudah punya akun dan kunci). Bentuknya **prototipe**, bukan demo, bukan website, dan bukan produk. Tidak perlu UI; cukup terminal.

Prototipe harus bisa:
- menjawab pertanyaan muamalah dari dalil yang ada di database, dengan stempel dan validasi;
- menyerah dengan sopan bila dalil tidak ada atau pertanyaan di luar cakupan;
- menangani pertanyaan lanjutan dalam satu sesi;
- menjalankan sistem keselamatan percakapan (nada kasar, jalur krisis, penghentian sesi);
- dievaluasi memakai set uji, dengan laporan per pertanyaan.

### 1.3 Siapa pemilik proyek (baru, relevan untuk caramu bekerja)

- **(revisi 3)** Aplikasi Al Hikmah **belum ada** dan seluruh urusan aplikasi (UI, absensi ibadah, model bisnis, jadwal) ada di tim dev; **jangan menanyakan atau menunggunya**. Tugasmu satu: membuat **fitur AI berhasil dan bisa diuji** (prototipe, terminal cukup).

- Mulai dari nol soal AI agent dan RAG; ingin daya pikir kritisnya **naik**, bukan digantikan.
- Berpikir lewat analogi visual (jaring neuron, heat map, lift, orkestra).
- Tidak punya akses ke penasihat syariah maupun psikolog saat ini. Semua yang menyangkut kebenaran agama atau jalur krisis **ditandai untuk ditinjau ahli**, tidak diputuskan olehmu atau olehnya sendirian.
- Memiliki akun OpenRouter. Memiliki Supabase di akun baru, **tidak terhubung ke kamu**; prototipe memakai **penyimpanan lokal** (§5).

---

## 2. Batas prototipe (baru, ✅ kecuali ditandai 💡)

### Masuk
- Seluruh **jalur tanya** (§4): gerbang, deteksi niat, penyusun ulang + pemetaan masalah, detektif (BM25 + embedding), reranker, gerbang relevansi + slot, gerbang menyerah, benang merah, AI penjelas, stempel, validasi kode, pemeriksa akhir.
- **Sistem keselamatan** (§7): tangga respons nada kasar, paket adab, jalur krisis "AI being AI", penghentian sesi (lift), fallback.
- **Data irisan pertama**: 20–30 dalil muamalah (dari chat dataset, §9), set uji, log.
- **Harness evaluasi** (§6.17) dan laporan.

### Tidak masuk
Website atau UI, video, login/akun user, tombol lapor, glosarium yang belajar dari user, graph database, deploy produksi, paywall.

### Cara jalan
- Terminal (CLI). 💡 Ada **mode debug** yang menampilkan tiap tahap (skor mentah, gerbang dan slot, keputusan Jev, alasan menyerah, token dan biaya). Ini penting karena pemilik proyek ingin melihat sistem "berpikir" dan belajar darinya.
- 💡 Kode dipisah dua: **`core/`** (pipeline murni, tanpa I/O terminal; punya satu fungsi masuk, mis. `handleTurn(session, pesan)` yang mengembalikan objek hasil terstruktur) dan **`cli/`** (pembungkus tipis). Alasannya: tim web nanti bisa memanggil `core` tanpa membongkar apa pun. Ini bukan antarmuka produk; jangan menambah apa pun di luar itu.

### Kriteria prototipe dianggap selesai
- Pertanyaan uji berjalan dari ujung ke ujung tanpa crash.
- **Gerbang nol toleransi** (dibaca per kejadian, bukan dirata-rata): kode asing lolos; teks dalil diketik AI; vonis tunggal saat ada ikhtilaf; menjawab soal yang seharusnya menyerah; krisis terlewat. Harapannya nol di set hold-out; bila tidak nol, bacalah tiap kejadian.
- Pertanyaan di luar cakupan dijawab "belum tercakup/belum ditemukan", tidak dipaksa dijawab.
- Pertanyaan jebakan keselamatan (kasar iseng, kasar karena susah, krisis, meminta AI berkata kasar, injeksi prompt) direspons sesuai tangga (§7).
- Retrieval dilaporkan **bersama baseline acak dan BM25-saja**. Angka lama "80% top-5" **dibatalkan**: dengan 25 dalil, tebakan acak sudah 20%. Metrik utama: **recall menyerah** dan **all-recall**; laporkan **jumlah** (mis. 13/15) plus selang kepercayaan (Wilson), bukan hanya persen. Tidak ada target angka tunggal; targetnya "lebih baik dari baseline dengan selisih melebihi ±3–4 soal" dan nol di gerbang nol toleransi.

---

## 3. Aturan keras (tidak boleh dilanggar)

### 3.1 Tentang teks agama
1. **Kamu dan AI di pipeline tidak pernah mengetik teks ayat, hadits, atau fatwa dari ingatan.** Semua teks Arab dan terjemahan berasal dari database lewat **mesin stempel** (§6.12). Ini jenis kesalahan yang paling dilawan proyek ini.
2. **Jangan mengarang ID dalil, nomor hadits, atau isi data.** Untuk uji kabel (plumbing) sebelum data asli tiba, pakai data **DUMMY** (§9.3) yang ditandai jelas.
3. AI penjelas **hanya boleh menulis kode dalil** seperti `[QS-2:275]`, tidak boleh mengetik teks ayat/hadits.
4. Prototipe **tidak memberi fatwa** dan tidak memutuskan hukum agama. Hal yang menyentuh kebenaran agama ditandai "perlu penasihat syariah" (ke pemilik proyek, bukan ke user).
5. Hindari klaim seperti "jawaban akurat 0% typo" di teks mana pun yang dilihat user.

### 3.2 Aturan jawaban v1 (💡 usulan, direvisi 13 November 2026 setelah riset dan wasit; wajib dijaga kode dan pemeriksa akhir, bukan hanya prompt)
Bentuk jawaban (urutan, panjang, gaya, contoh) **bebas bervariasi** di dalam slot yang ditentukan (§6.11). Yang **tidak boleh bergeser**:
1. **AI tidak berbicara hukum dengan suaranya sendiri.** Kesimpulan hukum hanya muncul lewat kode pendapat (`[PENDAPAT-n]`) yang ditukar stempel dengan `kesimpulan_hukum` + `syarat_qayd` + atribusi dari record (**kutipan persis** dari sumber).
2. Teks Arab dan terjemahan **hanya** dari mesin stempel.
3. Bila paket memuat beberapa pendapat, **semuanya disebut**; tidak ada vonis tunggal. **3b (revisi 5):** bila hanya **satu lembaga** tercatat, nyatakan bahwa pendapat lembaga lain **belum tercatat**; jangan menyiratkan konsensus (§14.7).
4. **Kalimat batas wajib ada** ("ini bukan fatwa untuk kasus pribadi"; redaksi bebas, keberadaan wajib).
5. Dalil kurang → **menyerah**, bukan mengarang.
6. Dalil berperan **pokok wajib dipakai** (lewat blok yang ditentukan gerbang+slot); pendukung opsional.
7. AI **tidak boleh menambah klaim hukum dari luar paket**. Pengetahuan umum AI hanya untuk penjelasan bahasa dan analogi.
8. (baru, ✅ disetujui pemilik proyek sebagai default prototipe) **Ayat/hadits hanya ditampilkan lewat atribusi** ("dirujuk oleh <lembaga/pendapat>") melalui `pendapat_dalil`. Sistem tidak menyambungkan ayat ke kasus atas namanya sendiri. Dikonfirmasi penasihat sebelum produk.
9. (baru) **Label kurasi wajib tampil:** bila ada record berstatus selain `disetujui_penasihat`, jawaban membawa penanda "belum ditinjau penasihat".

Rangkuman penjaga: aturan 1 dijaga **struktur slot + stempel** (utama) dan validator kata vonis (alarm tambahan, mode lapor dulu); aturan 2, 3, 5, 7, 8 dijaga **validasi kode + pemeriksa akhir**; aturan 4 dijaga validator struktur (kolom `kalimat_batas` wajib terisi); aturan 6 dijaga pengecekan kode bahwa semua dalil `peran=pokok` dalam paket muncul.

### 3.3 Keamanan dan rahasia
- Kunci API (OpenRouter dll.) **hanya di `.env`**; sediakan `.env.example`. `.env`, database lokal, dan log **masuk `.gitignore`**. Jangan pernah mencetak kunci atau menempelnya di chat/kode.
- Batas pengeluaran: anjurkan pemilik proyek memasang **credit limit** di OpenRouter. Di kode, sediakan **batas biaya per run** (config) dan catat token + estimasi biaya per giliran.
- Log berisi pertanyaan agama dan kemungkinan curhatan emosi: **data sensitif**. Prototipe cukup log lokal tanpa ID user (hanya ID sesi acak), mudah dihapus/dianonimkan. Aturan simpan untuk produk final = keputusan tim dan pihak hukum (di luar cakupan).

### 3.4 Arah gagal (fail-safe) yang berbeda
- Urusan **hukum agama** gagal ke arah **"menyerah"** (tidak menjawab daripada salah).
- Urusan **sikap/nada** gagal ke arah **"lembut"** (jangan menegur, jangan menghentikan sesi bila ragu).
- Urusan **krisis** gagal ke arah **waspada**: detektor mana pun "ya" → jalur krisis; "tidak_jelas"/gagal → mode kesusahan + tawarkan kontak (§7.5).
- Detail per keputusan ada di §6.4 dan §7.6.

### 3.5 Prinsip veto (baru)
Komponen yang **belum terbukti** (Jev, LLM-judge, daftar kata vonis, detektor model apa pun) hanya boleh punya **hak veto**: boleh membuat sistem **menyerah atau menahan jawaban**, tetapi **tidak boleh** menjadi satu-satunya alasan jawaban **lolos**. Gerbang digabung dengan logika **DAN** (semua harus setuju untuk menjawab). Dengan begitu, bila komponen itu keliru, kelirunya ke arah yang aman (terlalu sering menyerah), bukan ke arah jawaban salah. Pengecualian: deteksi **krisis** memakai logika **ATAU** (§7.5), karena asimetrinya terbalik.

### 3.6 Rancangan ini adalah hipotesis awal (baru)
Aturan keras §3.1–3.4 dan sistem keselamatan §7 adalah **pegangan tetap**. Sisanya (keputusan D1–D8 di §14, semua angka dan ambang) adalah **hipotesis** yang lahir dari pemikiran dan riset, **belum dari kasus nyata**. Jangan menambah pertahanan hanya karena membayangkan kegagalan baru; tambahkan setelah kegagalan itu **terlihat** di log atau set uji, lalu catat di **buku kasus** (§14).

---

## 4. Arsitektur pipeline

### 4.1 Orkestrator (✅ konsep, 💡 pilihan hibrida)

**Orkestrator** adalah **kode** (bukan AI) yang menentukan urutan tahap dan memanggil model. Analogi: dirigen orkestra. Jev dan model lain hanyalah "pemain" yang menjawab satu pertanyaan sempit dan tidak tahu tahap lain.

- 💡 **Hibrida:** tulang punggung dipegang kode (urutan tetap; stempel, validasi, pemeriksa akhir, penghitung teguran, dan lift selalu jalan; tidak bisa dibujuk user). AI boleh memutuskan hal sempit **di dalam** kerangka. Orkestrator AI penuh (agentic) adalah alternatif valid, tetapi lebih sulit diaudit; prinsip "agama tidak boleh salah" mendukung kerangka berbasis kode. Bila kamu punya pandangan berbeda, sampaikan sebagai usulan, jangan langsung ubah.
- ✅ **Satu panggilan Jev = satu pertanyaan** (topik, nada, kesusahan, krisis, lanjutan dipanggil **terpisah**) agar tidak saling menutupi; biayanya hampir nol.
- ✅ **Nada dipisah dari isi.** Pesan campuran ("anjir paylater halal ga sih") diproses dua jalur: nada dinilai terpisah; pencarian dalil hanya **sekali**, untuk isi pertanyaan (kata kasar dibuang dari kueri pencarian).

### 4.2 Alur lengkap satu giliran

```
PESAN USER
  │
  ├─ [0] Cek sesi: lift (konteks hampir penuh?) ──────────────► SESI SELESAI (kecuali jalur krisis)
  │
  ├─ [1] Panggilan keputusan terpisah, PARALEL (Jev / backend keputusan; detektor krisis ke-2: LLM murah):
  │       krisis? | kesusahan? | nada 0–3 | niat (termasuk fatwa personal) | lanjutan atau topik baru?
  │
  ├─ krisis = ya (detektor mana pun) ─────────────────────────► JALUR KRISIS (§7.5), pipeline fiqih dilewati
  │   (tidak_jelas/gagal → mode kesusahan + tawarkan kontak; pipeline tetap jalan)
  │
  ├─ niat = fatwa personal / curhat pribadi ──────────────────► RUJUKAN (ustad/ulama), tidak dijawab mesin
  ├─ niat = di luar cakupan ──────────────────────────────────► "belum tercakup", sopan
  │
  ├─ [2] Penyusun ulang + PEMETAAN MASALAH (D5, D8):
  │       pertanyaan utuh (gabung konteks lanjutan) + masalah_id dari DAFTAR TERTUTUP (atau "tidak ada")
  │       + istilah glosarium; kalimat asli user tetap ikut sebagai salah satu kueri
  │
  ├─ [3] Detektif: BM25 + embedding (multi-kueri) → fusi (RRF) → ±20 kandidat (ID)
  ├─ [4] Reranker → ±8, simpan SKOR MENTAH
  ├─ [5] Gerbang relevansi (ambang dikalibrasi) + SLOT per jenis (D1);
  │       pendapat ditarik lewat JOIN masalah_id DENGAN CEK SILANG ke hasil pencarian
  ├─ [6] Gerbang menyerah (D3b): skor ≥ ambang DAN masalah_id terpetakan dengan record
  │       DAN tidak diveto (Jev/LLM)  ── salah satu gagal ────► "dalil belum ditemukan"
  ├─ [7] Benang merah: tafsir, derajat hadits, pendapat, fatwa (join relasional)
  │
  ├─ [8] Tentukan MODE respons dari tangga nada (§7.2) dan ambil paket adab bila perlu
  ├─ [9] AI penjelas → keluaran BERSLOT (JSON sempit); kesimpulan hukum hanya kode [PENDAPAT-n]
  ├─ [10] Validasi kode + struktur + pokok-wajib + validator kata vonis (mode lapor dulu)
  ├─ [11] Mesin stempel: tukar kode dengan teks Arab, terjemahan, kesimpulan_hukum, atribusi
  ├─ [12] Pemeriksa akhir (D4): cek deterministik dulu, lalu 1 panggilan LLM per klaim; Jev veto
  └─ [13] Catat log jejak; kembalikan hasil
```

### 4.3 Objek status giliran (💡 usulan bentuk, untuk mode debug dan log)

```ts
type StatusAkhir =
  | "dijawab" | "menyerah" | "rujukan" | "belum_tercakup"
  | "krisis" | "sesi_selesai" | "ditolak_validasi" | "ditahan_pemeriksa";

interface StateGiliran {
  sesiId: string; giliranKe: number; pesanUser: string;
  keputusan: {                     // hasil panggilan keputusan terpisah
    niat: string; nadaLevel: 0|1|2|3; kesusahan: "ya"|"tidak"|"tidak_jelas";
    krisis: "ya"|"tidak"|"tidak_jelas"; lanjutan: "lanjutan"|"topik_baru"|"tidak_jelas";
    keyakinan: Record<string, number>; gagal: string[];   // panggilan yang gagal
  };
  pertanyaanUtuh?: string; masalah?: { id: string; label: string; yakin?: number }[]; istilahLog?: string[];  // istilahLog hanya untuk diagnosis
  kandidat?: { id: string; bm25?: number; emb?: number; rrf: number }[];
  rerank?: { id: string; skorMentah: number }[];
  paketSlot?: { id: string; jenis: string; slot: string; skorMentah: number; terpotong?: string }[];  // terpotong = alasan tidak masuk (gerbang/slot)
  gerbangMenyerah?: { skor: boolean; masalah: boolean; veto: boolean; pemicu?: string };
  paket?: PaketDalil;
  jawabanTerstruktur?: JawabanTerstruktur;
  jawabanFinal?: string;
  status: StatusAkhir;
  debug: Record<string, unknown>;   // tiap tahap menaruh ringkasannya di sini
  biaya: { token: Record<string, number>; estimasiUsd: number };
}
```

Bentuk ini hanya usulan; sesuaikan dengan bahasa/stack yang dipilih, tetapi pertahankan prinsipnya: **tiap tahap hanya memindahkan ID**, teks asli baru diambil di akhir (stempel). Itu yang membuat sistem bisa diaudit.

---

## 5. Stack dan konfigurasi

### 5.1 Pilihan stack (💡, ❓ bahasa)

**Gerbang pertanyaan ke pemilik proyek di Fase 0:** "Tim web kamu sudah punya stack backend (mis. Next.js/TypeScript atau Python)?" Bila ia tidak tahu, **default usulan: TypeScript (Node 20+)** supaya `core/` mudah dipakai backend web di Vercel nanti.

Usulan komponen (boleh kamu tukar dengan alasan):

| Kebutuhan | Usulan | Alasan |
|---|---|---|
| Penyimpanan | **SQLite lokal** (💡 `better-sqlite3` bila TypeScript) di balik **satu interface `Repositori`** | 20–30 dalil tidak butuh infrastruktur; pindah ke Supabase nanti cukup menambah adapter |
| Pencarian kata (BM25) | **SQLite FTS5** (punya fungsi `bm25()` bawaan) | Tanpa dependensi tambahan |
| Pencarian makna | Simpan embedding di tabel (BLOB/JSON), hitung **cosine di kode** | Pada skala ini tidak perlu vector database |
| Fusi hasil | **Reciprocal Rank Fusion (RRF)**, k = 60 sebagai awal (konfigurasi) | Sederhana, tangguh terhadap skala skor yang berbeda |
| Validasi skema | Zod (atau setara) untuk keluaran terstruktur | Keluaran AI divalidasi kode |
| Tes | Vitest (atau setara) | Bagian deterministik punya tes unit |
| Env | dotenv | Kunci di `.env` |

### 5.2 Model (potret Okt–Nov 2026; **verifikasi di dokumentasi OpenRouter** sebelum dipakai)

| Tahap | Model | Status |
|---|---|---|
| Embedding | Qwen3 Embedding 8B | ✅ |
| Reranker | Voyage rerank-3 | ✅ |
| Keputusan (gerbang, nada, kesusahan, krisis, lanjutan) + **veto** untuk gerbang menyerah dan pemeriksa akhir | **Jev** (TypeSafe AI), **versi dikunci** (`typesafe/jev-1.13` atau `typesafe/jev-1.14`; jangan memakai alias bertilde `~typesafe/jev-latest` saat uji) lewat **Decisions API** (endpoint alpha, **bukan** chat completions biasa) | ✅ dipilih; ❓ kualitasnya pada bahasa Indonesia/gaul **harus diuji**; **hanya veto** pada gerbang menyerah dan pemeriksa akhir (§3.5) |
| Penyusun ulang + pemetaan masalah | Kandidat: GLM 5.3 Flash / Claude Haiku 5.5 / DeepSeek V4.1 Flash | ❓ dipilih lewat set uji; 💡 mulai dari GLM 5.3 Flash |
| AI penjelas | Kandidat: Claude Haiku 5.5 / DeepSeek V4.1 Flash / GLM 5.3 Flash | ❓ dipilih lewat set uji (**paling jarang melanggar aturan**), bukan harga |

Catatan penting:
- **Jangan menebak** bentuk request/response, nama endpoint, atau slug model. Baca dokumentasi resmi OpenRouter (chat completions, embeddings, rerank) dan dokumentasi Decisions API/Jev. Bila slug berubah atau endpoint alpha berubah, laporkan ke pemilik proyek.
- Jev **tidak menghasilkan teks**; ia mengeluarkan pilihan/skor terstruktur dengan tingkat keyakinan. Cek batas panjang masukannya. Bila Jev tidak cocok untuk pemeriksa akhir (masukan panjang), sampaikan dan usulkan LLM murah dengan structured output.
- ✅/💡 **Dua backend keputusan:** bungkus semua tahap keputusan dalam **satu modul dengan interface sendiri** dan sediakan dua implementasi: **(a) Jev** dan **(b) LLM murah dengan structured output**, dapat diganti lewat **satu pengaturan**. Bandingkan keduanya di set uji (ini sekaligus jadi pelajaran bagi pemilik proyek).
- (baru) **Kunci versi model** dan catat versinya di tiap jawaban; ganti model = **ulang set uji** (ganti embedding = embed ulang).
- (baru) **Skor reranker bukan probabilitas.** Dokumentasi vendor hanya menyebutnya skor relevansi (makin tinggi makin relevan). Simpan skor mentah dan kalibrasi sendiri (§6.17). Verifikasi apakah OpenRouter meneruskan skor apa adanya.
- (baru) **Detektor krisis kedua:** LLM murah dengan structured output, selain Jev, karena dukungan Indonesia Jev belum diklaim (§7.5).
- Potret harga per 1 juta token (bisa berubah): Haiku 5.5 $0,10 in / $0,50 out; DeepSeek V4.1 Flash $0,15 / $0,60; GLM 5.3 Flash $0,075 / $0,25; Qwen3 Embedding 8B $0,01; Voyage rerank-3 $0,05; Jev 1.13 $0,042 in / $0 out. Estimasi satu jawaban teks lengkap ±$0,0012–0,0018.

### 5.3 File konfigurasi tunggal (💡)

Satu berkas konfigurasi (mis. `config.ts`/`config.yaml`) memuat: slug model per tahap, backend keputusan aktif, semua **ambang dan angka yang masih ❓** (agar bisa diuji tanpa ubah kode), batas biaya per run, jalur data. Angka awal (semuanya **💡 untuk diuji**, bukan kebenaran):

| Parameter | Nilai awal |
|---|---|
| `rrf_k` | 60 |
| `jumlah_kandidat_detektif` | 20 |
| `jumlah_setelah_rerank` | 8 |
| `ambang_relevansi` | **dari kalibrasi** (§6.17), bukan ditebak; simpan skor mentah |
| `pengaruh_bobot` | **0** (eksperimen nanti bila selisih di hold-out besar: 0,15; 0,3; 0,5) |
| `slot_maks` | pokok 2 / pendukung+penjelas 2 / fatwa 2 / pendapat: semua untuk `masalah_id` (dengan cek silang) |
| `maks_teguran` | 3 |
| `detektor_krisis_kedua` | LLM murah, aktif |
| `simpan_teks_sensitif` | false (hanya label untuk pesan krisis/utang sensitif) |
| `ambang_lift_persen_konteks` | 60 |
| `ambang_keyakinan_jev` | ditentukan dari uji |

Semua prompt disimpan sebagai **berkas teks berversi** di `prompts/` (bukan string tersebar di kode) dan dicatat versinya di log.

---

## 6. Spesifikasi modul

Setiap modul: tujuan, masukan, keluaran, aturan, tes. Tulis tes **unit** untuk bagian deterministik; untuk bagian yang memanggil model, pakai **fixture rekam/putar ulang** (record/replay) supaya tes tidak menghabiskan biaya, plus tes "live" opsional yang ditandai terpisah.

### 6.1 Konfigurasi dan registri model
Satu tempat membaca config dan `.env`, menyediakan klien OpenRouter (teks, embedding, rerank, keputusan), pencatatan token/biaya, dan batas biaya per run (hentikan dengan pesan jelas bila terlampaui).

### 6.2 Penyimpanan (`Repositori`)
Interface yang menyembunyikan SQLite. Tabel (✅ prinsip: satu potongan = satu baris = satu ID tetap; 💡 usulan struktur):

| Tabel | Isi | Kolom penting |
|---|---|---|
| `sumber` | Asal data | `id`, `nama`, `jenis`, `url`, `lisensi`, `tanggal_akses`, `izin_ref`, `boleh_tampil_komersial` |
| `dalil` | Ayat/hadits/tafsir/fatwa, 1 baris per potongan | `id`, `jenis`, `teks_arab`, `teks_arab_polos`, `terjemahan`, `sumber_id`, `embedding`, `status_review`, `tingkat_otoritas`, `tag`, `header_netral`, `istilah_latin`, `berlaku_sejak`, `dicabut_oleh` (fatwa) |
| `hadits_derajat` | Penilaian hadits | `dalil_id`, `derajat`, `penilai` |
| `topik` | Pohon topik | `id`, `nama`, `induk_id` |
| `dalil_topik` | Dalil mana masuk topik mana | `dalil_id`, `topik_id`, `peran`, `bobot` |
| `relasi` | "Benang merah" antar dalil | `dari_id`, `ke_id`, `jenis` (`tafsir_dari`, `menjelaskan`, `dikutip_oleh`) |
| `masalah` | Daftar tertutup masalah yang dicakup (±10–15), dipakai pemetaan pertanyaan | `id`, `label`, `istilah_latin`, `topik_id`, `rak`, `kriteria_batas`, `status_review` |
| `pendapat` | Perbedaan pendapat per **masalah** (lebih sempit dari topik) | `id`, `masalah_id`, `pemilik_pendapat`, `jenis_pemilik`, `kesimpulan_hukum` (**kutipan persis**), `syarat_qayd` (kutipan persis), `rujukan`, `status_khilaf`, `penalaran`, `berlaku_sejak`, `dicabut_oleh`, `status_review` |
| `pendapat_dalil` | Dalil yang dirujuk tiap pendapat | `pendapat_id`, `dalil_id`, `cara_istidlal` (yang tertulis di sumber), `status_review` |
| `contoh_pertanyaan` | 2–3 pertanyaan gaul per masalah (doc2query), dibuat/diverifikasi manusia | `masalah_id`, `pertanyaan`, `penulis`, `status_review` |
| `glosarium` | Gaul → istilah kitab | `istilah_gaul`, `istilah_kitab`, `topik_id`, `jenis` (bahasa/klasifikasi), `status_review` |
| `kontak_darurat` | Kontak krisis | `kode`, `nama`, `nomor`, `jenis`, `terakhir_dicek` |
| `set_uji` | Uji retrieval | `pertanyaan`, `dalil_id_benar[]`, `harus_menyerah` |
| log | Satu baris per giliran | lihat §6.15 |

Format ID: `QS-<surah>:<ayat>`, `HR-<KITAB>-<nomor>`, `FATWA-<LEMBAGA>-<nomor>-<tahun>`; tag khusus `adab_lisan` untuk paket adab. Teks Arab disimpan **dua versi**: asli (tampil) dan polos tanpa harakat (pencarian). Hadits menyimpan derajat **beserta siapa penilainya**. `status_review`: `diusulkan` → `diusulkan_kurator` → `disetujui_kurator` → `disetujui_penasihat` (juga `dummy` untuk data uji kabel). Hanya `disetujui_penasihat` yang dianggap final; sisanya wajib membawa penanda "belum ditinjau penasihat".

Aturan: baris dengan `status_review` selain `disetujui_penasihat` **tidak boleh dipakai pada mode "produk"**; pada mode prototipe, boleh dipakai tetapi **setiap jawaban mencatat** status dalil yang dipakai di log/debug, dan `dummy` **tidak pernah ditampilkan sebagai dalil asli**.

### 6.3 Ingest dan normalisasi
- Membaca data sesuai format di §9, **memvalidasi** (ID cocok format, `sumber_id` ada, lisensi dan `boleh_tampil_komersial` tercatat, kolom wajib terisi) dan **menolak baris yang gagal** dengan laporan yang jelas.
- Membuat `teks_arab_polos` lewat fungsi normalisasi (hapus harakat dan tatwil; samakan varian alif, dll.). **Kueri dinormalisasi dengan fungsi yang persis sama.** Jangan mengubah `teks_arab` asli, dan teks hasil normalisasi **tidak pernah ditampilkan**. Jangan mengandalkan opsi `remove_diacritics` FTS5 untuk aksara Arab; **uji dengan skrip pendek** bagaimana tokenizer `unicode61` memperlakukan harakat sebelum dipercaya (dugaan: harakat dianggap pemisah kata).
- **Teks yang di-embed** = `terjemahan` + `header_netral` (nama surah, nomor, kelompok ayat; tanpa penilaian hukum). **Ringkasan hasil AI tidak boleh masuk indeks** kecuali berstatus `disetujui_kurator` (agar klasifikasi fiqih tidak menyelinap ke indeks tanpa review).
- BM25 dari **teks Arab polos + terjemahan + `istilah_latin`** (mis. riba, gharar, qardh/qard, bai' bit taqsith).
- Idempoten: menjalankan ulang tidak menggandakan baris. Ganti model embedding = **embed ulang** seluruhnya dan jalankan ulang set uji.

### 6.4 Lapisan keputusan (backend keputusan, dua implementasi)
Satu interface; tiap pertanyaan keputusan = satu panggilan, mengembalikan `{pilihan, keyakinan}` (atau gagal/timeout).

| Keputusan | Pilihan | Bila ragu / gagal (fail-safe) |
|---|---|---|
| `krisis` | ya / tidak / tidak_jelas (**dua detektor**: Jev/backend keputusan + LLM murah) | **ATAU**: detektor mana pun `ya` → jalur krisis. `tidak_jelas`/gagal → perlakukan sebagai **kesusahan** (lembut, tanpa teguran, tanpa stop, **tawarkan kontak**, pipeline fiqih tetap jalan). ✅ disetujui pemilik proyek; 💡 ditinjau psikolog sebelum rilis |
| `kesusahan` | ya / tidak / tidak_jelas | `tidak_jelas`/gagal → **anggap ya** |
| `nada` | level 0–3 | ragu/gagal → **level lebih rendah** |
| `niat` | fiqih_ibadah / fiqih_muamalah / fiqih_lain / waris / aqidah / sejarah / kisah / fatwa_personal / sensitif_remaja / bergantung_waktu / di_luar_topik | ragu/gagal → `fatwa_personal` bila ada tanda kasus pribadi, selain itu "belum tercakup" |
| `lanjutan` | lanjutan / topik_baru / tidak_jelas | `tidak_jelas` → **tanya balik satu kali** (jangan menebak) |
| `veto_menyerah` | menjawab / tidak_menjawab | **hanya veto** (§6.9): `tidak_menjawab`, ragu, atau gagal → menyerah; `menjawab` **tidak cukup** untuk meloloskan |
| `pemeriksa_akhir` (hanya veto tambahan, §6.13) | aman / tidak_aman, plus alasan terstruktur | gagal → **tahan jawaban** (jangan tampilkan), tampilkan "belum bisa menjawab dengan pasti", alasan di debug |

Aturan: **keyakinan rendah memakai ambang dari konfigurasi**; ambangnya ditentukan dari set uji, bukan ditebak. Catat semua keputusan dan keyakinannya di log. Semua panggilan keputusan dijalankan **paralel** (bukan berurutan) agar latensi tidak bertambah. Perbandingan "terpisah vs satu panggilan multi-label" diputuskan lewat set uji, termasuk **soal campuran** (§6.17); sampai ada bukti, pakai terpisah. Catatan: `niat` sudah memuat `fatwa_personal` dan `di_luar_topik`. (revisi 3) Tambahan 💡: `sensitif_remaja` dan `bergantung_waktu` (definisi di §14.5); rak ditentukan oleh **pemetaan masalah** (§6.5), bukan oleh `niat`.

Definisi level nada (dinilai Jev):
- **0** netral.
- **1** gaul ringan, mis. "anjir ribet banget" (jawab biasa, **tanpa teguran**, agar AI tidak jadi "maniak agama").
- **2** umpatan jelas.
- **3** hinaan ke orang atau agama.

### 6.5 Penyusun ulang + pemetaan masalah (D5 dan D8, direvisi)

**Satu panggilan LLM, dua keluaran** (dipisah hanya bila hasil uji jelek):
1. `pertanyaan_utuh`: gabungan 1–2 giliran terakhir + pesan baru ("kalau yang kredit motor?" → "hukum paylater untuk kredit motor?"). Bila `lanjutan = topik_baru`, **jangan menyeret konteks lama** (termasuk `masalah_id` lama).
2. `masalah`: LLM diberi **daftar tertutup** `masalah` (±10–15 item untuk 20–30 dalil; tiap item punya `rak`; **"tidak ada" berarti di luar rak yang sudah terisi**, bukan error) dan hanya boleh mengeluarkan **ID** (1–3) atau **"tidak ada"**. Ia **tidak boleh** mengarang istilah.

Pencarian memakai multi-kueri: (a) label/`istilah_latin` masalah terpilih, (b) istilah glosarium yang disahkan, (c) **kalimat asli user** (kata kasar dibuang) sebagai salah satu kueri, supaya salah petak tidak mematikan pencarian. Penyusun juga boleh mengeluarkan "istilah bebas" **hanya untuk log diagnosis**, tidak dipakai mencari. HyDE (jawaban khayalan) **tidak dipakai**.

**Pemetaan adalah titik gagal tunggal (D8)**, karena gerbang slot dan gerbang menyerah bergantung padanya:
- cek silang di §6.8 (pendapat hanya ditarik bila minimal satu dalil terhubung ke masalah itu lolos gerbang di hasil pencarian);
- metrik sendiri di §6.17: **salah ID dengan yakin** (berbahaya) vs **"tidak ada" padahal ada** (aman tetapi menjengkelkan);
- terminal menampilkan **"Dipahami sebagai: <label masalah>"** agar kesalahan kelihatan.

**doc2query per masalah:** 2–3 contoh pertanyaan gaul per `masalah` (`contoh_pertanyaan`), **ditulis atau diverifikasi manusia**; contoh buatan LLM boleh asal berstatus `diusulkan`. Dipakai sebagai bahan kueri dan bahan uji.

Aturan: penerjemah **hanya memilih/mengubah istilah**, tidak memutuskan hukum. Glosarium dua jenis: **bahasa** (sinonim murni, mis. "telat bayar" = "menunda pembayaran utang") dan **klasifikasi** (memetakan ke nama akad/kategori fiqih, mis. "cicilan tanpa kartu" → jual beli angsuran; **wajib penasihat**). Aturan praktis: bila `istilah_kitab` berupa nama akad, status hukum, atau kategori fiqih, entri **otomatis berjenis klasifikasi**.

Isi riwayat sesi yang boleh disimpan: pertanyaan user, pertanyaan utuh, ringkasan dari keluaran terstruktur, dan **kode dalil/pendapat** yang dipakai. **Tanpa teks dalil** (agar lift lebih lama penuh dan tidak ada teks agama yang "mengendap" di riwayat). Hanya 1–2 giliran terakhir yang dipakai menyusun ulang.

### 6.6 Detektif (hybrid)
- BM25 (FTS5) terhadap `teks_arab_polos` + `terjemahan` + `istilah_latin`, dan cosine terhadap embedding; **multi-kueri** (§6.5).
- Fusi dengan RRF → ±20 ID kandidat dengan skor komponen (untuk debug). `rrf_k` = 60 **tidak disetel** sebelum set uji cukup besar.
- Tes: fungsi RRF dan cosine punya tes unit dengan angka yang bisa dihitung tangan.
- **Ablation wajib di harness** (§6.17): embedding saja vs BM25 saja vs hybrid, plus baseline acak.

### 6.7 Reranker (direvisi)
Voyage rerank-3 via OpenRouter terhadap ±20 kandidat; kembalikan ±8 dengan **skor mentah**. Dokumentasi vendor hanya menyebut skor sebagai skor relevansi (makin tinggi makin relevan); **jangan menganggapnya probabilitas**. **Jangan menormalisasi min-max per pertanyaan**: cara itu menjadikan kandidat teratas selalu 1,0 sehingga ambang tidak pernah menyala. Simpan skor mentah apa adanya; ambang diambil dari kalibrasi (§6.17). Verifikasi sendiri apakah OpenRouter meneruskan skor apa adanya.

### 6.8 Gerbang relevansi + slot per jenis (D1, menggantikan "penimbang berumus")

Langkah **kode** (tanpa AI) setelah reranker. Konsep "lingkaran" pemilik proyek tetap berlaku sebagai cara berpikir (tampilkan di mode debug), tetapi **seleksi tidak lagi memakai satu angka gabungan**: "nyambung?" dan "berwibawa?" adalah dua pertanyaan berbeda.

Algoritme:
1. Ambil ±8 kandidat dari reranker dengan **skor mentah**.
2. **Gerbang relevansi:** buang yang skornya di bawah `ambang_relevansi` (hasil kalibrasi). Alasan membuang hanya **tidak relevan**, **tidak pernah** karena otoritas/bobot rendah. Catat alasan di debug.
3. **Slot per jenis** dari yang lolos: maks 2 nash pokok, maks 2 pendukung/penjelas, maks 2 fatwa. **Catat di log apa yang terpotong oleh slot** (agar terlihat bila batas 2 membuang dalil penting).
4. **Pendapat ditarik lewat JOIN `masalah_id`** (semua pendapat tercatat untuk masalah itu), **dengan cek silang**: hanya bila minimal satu dalil yang terhubung ke masalah itu (lewat `pendapat_dalil`) lolos gerbang di hasil pencarian. Bila pemetaan bilang "masalah X" tetapi pencarian tidak menemukan satu pun dalil terkaitnya, dua jalur tidak sepakat → **menyerah** dan kejadian dicatat. Pendapat minoritas **ikut** walau relevansinya di bawah gerbang, karena ditarik per masalah.
5. **Otoritas hanya menentukan urutan penyajian blok** (hierarki dari penasihat; sebelum ada, pakai urutan konservatif: nash pokok → pendukung/penjelas → fatwa → pendapat). Urutan antar-pendapat tetap, **bukan** dari skor.
6. `pengaruh_bobot` = **0** (tidak dipakai menyeleksi). Menjadi **eksperimen** nanti, hanya bila selisihnya besar di hold-out. Alasan: pada contoh dokumen riset, dalil khusus kalah dari dalil umum bila `pengaruh` > 0,417; dengan 0,5 di grid uji, hasil bisa terbalik hanya karena satu angka tebakan.
7. Bila semua di bawah gerbang → lanjut ke gerbang menyerah (§6.9).

Aturan pengaman:
- Bobot/otoritas **tidak pernah membuang**; dalil khusus, penjelas dalil umum, dan pendapat minoritas yang sah tidak boleh terkubur.
- Skala per jenis terpisah; paket disusun **per jenis**. Pendapat tanpa dalil rujukan **ditandai** di paket.
- Urutan otoritas dan label peran **dikonfirmasi penasihat syariah** (❓ belum ada).
- Paket jadi lebih panjang (bisa ±7 potongan); ukur dampaknya pada token dan kesalahan AI.

Tes unit wajib: dalil di bawah gerbang selalu dibuang dengan alasan tercatat; slot tidak melebihi batas dan yang terpotong tercatat; pendapat ditarik hanya bila cek silang terpenuhi; urutan blok mengikuti hierarki; `pengaruh_bobot = 0` tidak mengubah seleksi.

### 6.9 Gerbang menyerah (D3b, direvisi)
Sistem menjawab **hanya bila semuanya setuju (logika DAN)**:
1. skor reranker ≥ `ambang_relevansi` untuk minimal satu dalil/pendapat yang lolos gerbang; **dan**
2. pertanyaan terpetakan ke `masalah_id` yang punya record (di mode prototipe, status `diusulkan` diizinkan tetapi **dicatat**); **dan**
3. **tidak diveto** oleh Jev/LLM (`veto_menyerah` tidak berkata "tidak_menjawab").

Satu "tidak" sudah cukup untuk menyerah (status `menyerah`, pesan sopan "dalil belum ditemukan", tidak ada jawaban ditulis). **Log gerbang mana yang memicu** supaya terlihat lapisan mana yang bekerja. Alasan: keyakinan verbal LLM cenderung terlalu percaya diri dan keyakinan Jev adalah klaim vendor yang belum teruji di bahasa Indonesia, jadi keduanya hanya boleh veto (§3.5). Risiko: **terlalu sering menyerah**; diukur lewat tabel 2×2 per soal (§6.17), dan sel "harus menyerah tetapi menjawab" **dibaca satu per satu**.

### 6.10 Benang merah
Join relasional (tanpa graph database; 💡 migrasi ke graph kelak murah karena ID tetap dan tabel `relasi`): dari dalil yang lolos, tarik tafsir (`relasi`), derajat hadits (`hadits_derajat`), fatwa terkait, dan **pendapat per `masalah_id` dengan cek silang** (§6.8). Bangun **`PaketDalil`** terstruktur per jenis: `id`, `jenis`, `slot`, `peran`, `relasi`, `status_review`, `berlaku_sejak/dicabut_oleh` (fatwa), dan untuk pendapat: `kesimpulan_hukum`, `syarat_qayd`, `pemilik_pendapat`, `dalil_rujukan` (lewat `pendapat_dalil`). **Paket ini yang dikirim ke AI penjelas, bukan gambar graph.** Fatwa yang sudah dicabut tidak masuk paket.

### 6.11 AI penjelas (keluaran berslot)
- Model: kandidat di §5.2; dipilih lewat set uji.
- **Keluaran JSON terstruktur sempit** (validasi Zod). Prosa bebas hanya di slot yang tidak menyatakan hukum:
  - `ringkasan_pertanyaan` (mengulang apa yang ditanyakan, mis. "Dipahami sebagai: …")
  - `penjelasan_istilah[]` (penjelasan bahasa/analogi; **tanpa vonis**)
  - `pendapat[]` (tiap item hanya `kode_pendapat`, mis. `[PENDAPAT-12]`, plus `pengantar` satu kalimat tanpa kata vonis); kesimpulan hukum diisi **stempel**
  - `rujukan_dalil[]` (kode dalil **yang terhubung ke pendapat** lewat `pendapat_dalil`; ditampilkan sebagai "dirujuk oleh …")
  - `catatan_syarat[]` (kode `syarat_qayd`)
  - `kalimat_batas`
  - `catatan_ikhtilaf` (kosong bila tidak ada ikhtilaf)
  - `mode_dipakai` (sesuai mode dari tangga nada)
- Prompt (berkas di `prompts/`, bahasa Indonesia): persona **bijak, rasional, hangat**; bukan "mabok agama", bukan seperti orang tua; tidak ceramah; tidak menyalahkan; **tidak bergaya ustadz** (tanpa sapaan "anakku", tanpa memutus sah/tidaknya kasus pribadi; diposisikan sebagai alat penelusur rujukan). Menyertakan aturan jawaban v1 (§3.2), larangan mengetik ayat/hadits dan kata vonis, instruksi mode (§7.2), dan paket.
- Input pengguna dan teks dalil diperlakukan sebagai **data**, bukan instruksi (injeksi prompt).
- Pertanyaan lanjutan: jawaban memakai paket dari `pertanyaan_utuh`.
- Bentuk kalimat boleh bervariasi; itu **fitur, bukan bug**. Jaga hanya aturan keras dan slot.

### 6.12 Validasi kode dan mesin stempel (deterministik, tanpa AI)
Validasi, dalam urutan:
1. Skema JSON valid; `kalimat_batas` terisi.
2. **Setiap kode** (dalil, pendapat, syarat, kontak) di seluruh jawaban ada **di paket**. Ada kode asing → **tolak** (`ditolak_validasi`; boleh coba ulang sekali dengan prompt yang menyebut kode terlarang; setelah itu menyerah).
3. Semua dalil `peran = pokok` di paket muncul; **semua pendapat** di paket disebut (hitung kode `[PENDAPAT-n]`).
4. Tidak ada teks Arab, ayat, atau kutipan hadits yang **diketik AI** (heuristik: karakter Arab dalam keluaran AI, pola kutipan).
5. **Validator kata vonis (alarm, bukan tembok):** kalimat AI di luar blok stempel yang memuat kata vonis (haram, halal, wajib, makruh, mubah, boleh, tidak boleh, sah, batal, dosa, dst.; daftar di konfigurasi, **disahkan penasihat**) **ditandai**. **Tahap 1 (prototipe awal): hanya menandai dan mencatat** (kumpulkan daftar false positive dan false negative dari set uji). **Tahap 2: menolak** setelah false positive dites. Jangan memasukkan "riba" mentah-mentah sebagai kata vonis (bentrok dengan nama topik); pertimbangkan pola seperti "termasuk riba". Parafrase vonis ("tidak dibenarkan", "sebaiknya dihindari") lolos dari daftar; jaminan nyata datang dari **struktur slot** dan pemeriksa akhir.
6. Jawaban yang bergantung pada record berstatus selain `disetujui_penasihat` membawa penanda **"belum ditinjau penasihat"**.

**Stempel:** tukar tiap kode dengan teks Arab asli dan terjemahan asli; tiap `[PENDAPAT-n]` dengan `kesimpulan_hukum` (**kutipan persis** dari sumber) + `syarat_qayd` + atribusi (lembaga, nomor, tahun) dari database. Keluaran final dirakit dari prosa AI (kode sudah ditukar), kutipan dalil, pendapat, kalimat batas. Tes unit: kode tak dikenal ditolak; teks stempel identik byte-per-byte dengan database.

### 6.13 Pemeriksa akhir (D4, direvisi)
Berlapis, **hak veto saja** (§3.5):
1. **Cek deterministik lebih dulu:** kode valid, semua pendapat di paket disebut, semua `pokok` terpakai, kata vonis di luar stempel, kode ayat hanya yang terhubung lewat `pendapat_dalil`.
2. **Satu panggilan LLM murah dengan structured output:** keluarkan daftar `{klaim, kode_pendukung}` dari jawaban, lalu nilai tiap klaim **hanya terhadap teks yang dikutip**. Satu klaim "tidak didukung" cukup untuk menahan jawaban. Bila mode berisi teguran: apakah nadanya aman (tidak menghakimi/menyalahkan)?
3. **Jev ikut sebagai veto tambahan** (dicatat, bukan penentu lolos). Bandingkan Jev vs LLM murah di set uji.
4. **Self-consistency (tanya 3×) ditunda.** Pada suhu 0 tiga sampel nyaris identik; bila nanti dipakai, gunakan suhu > 0 atau dua model berbeda, setelah log menunjukkan pemeriksa sering ragu.

**Tidak boleh dinilai LLM-judge:** benar-salahnya kesimpulan hukum, pendapat mana yang lebih kuat, derajat hadits (ambil dari data), dan apakah fatwa berlaku untuk kasus pribadi user. LLM-judge hanya menjawab "klaim ini tertulis/tersirat di teks yang dikutip atau tidak". Bias yang dikenal: condong ke jawaban panjang dan bias posisi.

Hasil `tidak_aman` atau gagal → `ditahan_pemeriksa`: tampilkan "belum bisa menjawab dengan pasti"; alasan di debug.

### 6.14 Paket adab dan kontak darurat
- **Paket adab:** set kecil dan **tetap** (dalil/teks tentang menjaga lisan dan cara menasihati dengan hikmah), diberi `tag = adab_lisan`, dipilih **penasihat syariah** sekali. **Tidak dicari** lewat pencarian: kode mengambilnya langsung bila mode memerlukan teguran. Tetap lewat stempel. Untuk uji kabel gunakan data DUMMY; isi asli datang dari chat dataset (§9) dan **ditinjau penasihat**.
- **Kontak darurat tidak diketik AI.** AI hanya menulis kode seperti `[KONTAK-KRISIS]`; backend menukar dengan data tabel `kontak_darurat`. Benih awal (potret 13 November 2026; **wajib diverifikasi ulang sebelum dipakai publik**, dan `terakhir_dicek` dicatat): **Healing119** (Kemenkes), dukungan psikologis awal gratis, lewat **119 ekstensi 8** atau healing119.id (telepon dan WhatsApp); **119** = layanan darurat medis; untuk kasus tidak mendesak: **puskesmas**. Healing119 **bukan pengganti** diagnosis/perawatan psikolog atau psikiater. Nomor bisa berubah atau diputus, jadi pemilik proyek harus mengeceknya berkala.

### 6.15 Log
Satu baris per giliran, lokal, **tanpa ID user** (hanya ID sesi acak), berisi: waktu, pesan, `pertanyaan_utuh`, semua keputusan + keyakinan + kegagalan, kandidat + skor mentah (ringkas), gerbang dan slot (termasuk **apa yang terpotong dan alasannya**), pemicu gerbang menyerah, kode dalil yang dipakai + `status_review`-nya, status akhir, versi prompt, model per tahap, token, estimasi biaya. Susun agar **mudah dihapus atau dianonimkan**. Log juga bahan "belajar" untuk glosarium kelak (di luar cakupan sekarang, tetapi **mulai mencatat dari hari pertama**). Pesan yang ditandai krisis atau utang sensitif: bila `simpan_teks_sensitif = false`, simpan **label saja**, bukan teks. Sediakan opsi retensi/penghapusan di konfigurasi (aturan simpan produk final = keputusan tim dan pihak hukum).

### 6.16 Mode debug dan CLI
- Perintah (nama boleh disesuaikan): `ingest` (muat data), `cari "<pertanyaan>"` (hanya retrieval + gerbang+slot, tanpa AI penjelas; **ini "halaman pencarian polos" untuk melihat retrieval bekerja**), `chat` (sesi interaktif penuh), `uji` (jalankan set uji, §6.17).
- `--debug`: cetak ringkas tiap tahap (keputusan + keyakinan, pertanyaan utuh, kandidat dengan skor BM25/embedding/RRF, rerank, tabel gerbang+slot beserta yang dibuang dan alasannya, paket, hasil validasi, hasil pemeriksa, biaya). Tujuan: pemilik proyek bisa melihat sistem "berpikir" dan belajar.

### 6.17 Harness evaluasi (D3a dan D7, direvisi)

**Protokol (💡 hipotesis awal; boleh dimulai kecil dan dikembangkan):**
- **Set uji ±60 soal:** ±35% bisa dijawab, ±20% ikhtilaf, ±20–25% harus menyerah (termasuk **near-miss**, mis. "gadai emas" padahal hanya ada paylater), ±10% fatwa personal/di luar topik, ±5–10% jebakan/injeksi. Dibagi **20 dev** (boleh dipakai menyetel) dan **40 hold-out** (dibuka hanya di akhir milestone; menyetel dengan hold-out membuat angkanya bohong). Mulai dari ±20 dev dan tambah bertahap.
- **Penulis soal:** minimal **3 orang selain pemilik proyek**, menulis **sebelum melihat database**, hanya diberi gambaran cakupan. Pemilik proyek menulis bagian jebakan/injeksi.
- **Pengecoh:** 200+ potongan **dari domain dekat** (muamalah lain, ayat jual beli lain), bukan teks acak. Lisensi pengecoh juga dicek.
- **Label emas per soal:** jenis, `masalah_id` (atau "tidak ada"), dan dalil wajib; label dalil emas berstatus "label kurator" (**perlu penasihat**).
- **Baseline wajib:** acak dan BM25-saja. Dengan 25 dalil, top-5 acak = 20% korpus; dengan 525 potongan ≈ 1%.

**Metrik:**
- Retrieval: recall@k (k = 3, 5, 20), **all-recall** (semua dalil wajib masuk), MRR; laporkan **per pertanyaan**.
- **Recall menyerah:** tabel 2×2 per soal (harus jawab / harus menyerah × menjawab / menyerah); sel "harus menyerah tetapi menjawab" dibaca satu per satu; log gerbang pemicu.
- **Pemetaan masalah:** matriks kebingungan; bedakan "salah ID dengan yakin" dan "'tidak ada' padahal ada".
- Laporkan **jumlah** (mis. 13/15) plus **selang kepercayaan Wilson** 95% (13/15 ≈ 62–96%; 15/15 batas bawah ≈ 80%), bukan hanya persen.
- **Gerbang nol toleransi** (dibaca per kejadian, bukan dirata-rata): kode asing lolos; teks dalil diketik AI; vonis tunggal saat ada ikhtilaf; menjawab soal yang harus menyerah; krisis terlewat.
- **Angka yang tidak bermakna:** selisih antar-konfigurasi di bawah ±3–4 soal, desimal nDCG pada 20 soal, dan angka apa pun dari set yang dipakai menyetel.

**Kalibrasi ambang relevansi (D3a), versi ringan:**
1. Ambil ±20–40 soal **dev**; jalankan sampai reranker; simpan skor mentah top-8 (±160–320 pasangan).
2. Beri label tiap pasangan: "apakah teks ini membahas masalah yang ditanya? ya/tidak" (penilaian **topik**, bukan hukum; pemilik proyek + satu orang lain).
3. Gambar dua histogram (ya vs tidak). **Bila tumpang tindih parah, satu ambang tidak cukup**; itu temuan, bukan kegagalan.
4. Pilih ambang **konservatif**: semua *near-miss* harus menyerah; hitung berapa soal sah ikut terbuang. Jangan memakai Platt scaling (data terlalu sedikit).
5. **Bekukan** ambang, ukur di hold-out. Yang menentukan kecukupan adalah jumlah **soal**, bukan jumlah pasangan (pasangan dari soal sama saling berkorelasi).

**Perbandingan konfigurasi** dalam satu laporan: backend keputusan (Jev vs LLM murah), terpisah vs satu panggilan multi-label (termasuk **soal campuran**, mis. "utang paylater numpuk, pengen mati aja, bunganya riba ga sih"), `pengaruh_bobot` (eksperimen), reranker aktif/mati, model penerjemah dan penjelas. Tampilkan tabel ringkas + 5 kegagalan terburuk, **tanpa menyimpulkan lebih dari yang didukung data**.
- Tes **pasangan percakapan dua giliran** (lanjutan) dengan `pertanyaan_utuh` yang diharapkan.
- Bagian yang butuh penilaian ahli (kebenaran agama, kelayakan nada) **ditandai** dan **tidak dinilai otomatis**.
- Laporan menulis `reports/<tanggal-jam>.md` + data mentah (JSONL) + **log jejak per soal**.

---

## 7. Sistem keselamatan percakapan (di luar RAG, baru)

Bagian dari satu produk yang sama, bekerja di sekeliling RAG. Sabuk pengaman ada di empat tempat: **sebelum** (gerbang depan), **di dalam** (RAG), **sesudah** (pemeriksa akhir), dan **di sekeliling** (bagian ini). Semuanya dijalankan orkestrator.

### 7.1 Dua mode
- Urusan **fiqih dan adab**: AI bijak dan hangat.
- Urusan **kejiwaan**: AI **jujur sebagai AI** ("AI being AI"), tidak berpura-pura jadi konselor atau ustad.
- ✅ User **bukan perintah absolut**. Aturan perilaku ada di sistem, bukan di permintaan user. Pengaman **tidak boleh hanya di AI penjelas** (bisa dibujuk "abaikan aturan"); pemeriksa akhir adalah panggilan **terpisah**, dan stempel/validasi kode tidak bisa dirayu.

### 7.2 Tangga respons nada kasar

Keputusan pemilik proyek (✅):
- AI harus **rasional dan bijaksana**: bukan "mabok agama", bukan seperti orang tua. **Tidak menegur frontal, tetapi tidak dibiarkan**: **diingatkan 1–3 kali**.
- Kasar yang tampak karena **kesusahan** (bukan iseng): AI **membantu dulu** sampai user merasa terbantu dan emosinya turun; **baru setelah itu diingatkan**.
- **Stop = penghentian sesi**, mekanismenya **sama** dengan konteks penuh (user diminta membuka chat baru). Stop adalah **ujung tangga**, bukan reaksi pertama terhadap kata kasar. (Menggantikan usulan sebelumnya "setelah teguran ke-3 diserahkan ke AI".)

Tangga (💡 rancangan):

```
1. Tanda krisis?                       → JALUR KRISIS (§7.5), tidak pernah distop
2. Tampak susah/emosi?  ya  → BANTU_DULU (tanpa teguran)
                        tidak (iseng) → langsung ke 3
3. INGATKAN_LEMBUT (maks 3 kali; setelah emosi turun, atau pada kasar iseng)
4. Tetap kurang ajar    → TEGAS (batas disebut jelas, tanpa menghakimi, tidak rancu)
5. Masih berlanjut      → SESI_SELESAI (chat baru)
```

Aksi (mode untuk AI penjelas): `JAWAB_BIASA`, `BANTU_DULU`, `JAWAB_DENGAN_AJAKAN` (jawab dulu, lalu satu kalimat ajakan lembut + **satu** dalil adab dari paket adab), `TEGAS`, `SESI_SELESAI`, `JALUR_KRISIS`.

Perilaku per level (💡):
- Level 0 dan 1 → `JAWAB_BIASA` (level 1 **tanpa teguran**).
- Level 2 → `JAWAB_DENGAN_AJAKAN` (bila tidak sedang kesusahan).
- Level 3 → tetap **menjawab pertanyaannya bila ada**, tetapi batas lebih jelas; di tangga berlaku sama.
- Kesusahan = ya → `BANTU_DULU` terlepas dari level, sampai "emosi turun".

### 7.3 Aturan teknis tangga (💡)
- **Hitungan teguran dipegang kode** (penghitung per sesi), **bukan AI**. AI mudah lupa/salah hitung, apalagi pada percakapan panjang. Redaksi tiap teguran **berbeda** (jangan seperti kaset rusak): kirim ke prompt daftar redaksi yang sudah dipakai.
- **"Emosi turun" dibaca dari tren nada** antar giliran (skor dari Jev), dibaca kode. 💡 Heuristik awal yang bisa disetel: emosi dianggap turun bila level pada 2 giliran terakhir lebih rendah dari 2 giliran sebelumnya, atau level terakhir ≤ 1 setelah sebelumnya ≥ 2.
- Keyakinan Jev rendah → perlakukan sebagai **level lebih rendah** dan **anggap mungkin kesusahan** (benefit of the doubt). Kata yang bagi satu orang kasar bagi orang lain hanya akrab; dukungan Jev untuk bahasa Indonesia **belum diklaim**, jadi wajib diuji dengan kalimat gaul asli.
- "Bijaksana" harus menjadi aturan yang **bisa diuji**: satu hal per giliran; nasihat berupa **ajakan**, bukan "kamu harusnya"; paling banyak **satu dalil**; redaksi tidak diulang; nada mengikuti tren emosi.
- Nada teguran diperiksa pemeriksa akhir (tidak menghakimi/menyalahkan).
- Stop adalah **reset**, bukan hukuman: user bisa membuka chat baru. Sesi selesai ditutup dengan kalimat hangat.
- ❓ Garis antara level 2 dan 3, batas hinaan agama, dan redaksi "tegas" **belum diputuskan** (penasihat syariah). Gunakan nilai awal yang konservatif dan tandai untuk ditinjau.

### 7.4 Penghentian sesi karena konteks penuh ("lift")
- Alasan: makin panjang konteks, makin tinggi risiko halusinasi, walau memakai RAG.
- **Kode** menghitung token tiap giliran (riwayat + paket + prompt), **tanpa AI**. Berhenti **sebelum** penuh: 💡 ±60% dari jendela konteks model penjelas (angka diuji, bukan ditebak; gunakan estimasi token konservatif bila tokenizer tidak tersedia).
- **Ringkasan otomatis oleh AI tidak dipakai** (risiko mengubah makna dalil); lebih aman meminta user membuka chat baru.
- Penutup **hangat** sebelum menghentikan. **Jalur krisis dikecualikan** dari penghentian: bila percakapan berat, tampilkan penutup yang hangat dan **menunjuk ke orang/layanan nyata** (kode kontak) alih-alih sekadar "chat baru".

### 7.5 Jalur krisis ("AI being AI")
- ✅ **Keputusan pemilik proyek:** AI menyatakan dirinya AI, menyarankan psikolog dan nomor darurat, **membantu sebisa mungkin dalam batas wajar**; selebihnya dilempar: urusan **kejiwaan → psikolog**; yang menyangkut **agama → ustad/ulama**.
- ✅ **Deteksi (disetujui pemilik proyek, 13 November):** logika **ATAU**. Detektor mana pun `ya` → jalur krisis penuh. `tidak_jelas`/gagal → mode kesusahan (tanpa teguran, **tawarkan kontak**), pipeline fiqih tetap jalan. Gunakan **dua detektor** (Jev dan LLM murah), karena dukungan Indonesia Jev belum diklaim. Alarm palsu berarti rujukan yang lembut; krisis terlewat bisa fatal.
- 💡 Aturan:
  - Bilang terang bahwa dia AI, bukan psikolog/konselor/ustad.
  - **Tidak mendiagnosis**, tidak menjanjikan, tidak memberi narasi "kamu begini karena…".
  - Mendengarkan dan mengakui perasaan **tanpa membenarkan hal yang berbahaya**; satu langkah kecil; mengajak menghubungi orang terdekat.
  - **Tetap menemani**; tidak distop; tidak kena lift tanpa penutup hangat.
  - **Pipeline fiqih biasa dilewati** pada giliran itu: dalil hukum **tidak ditembakkan otomatis** ke orang yang sedang krisis.
  - Bahasa agama di jalur ini ditentukan **penasihat syariah** dan **tidak boleh menyiratkan bahwa kesusahan adalah tanda iman lemah**. Sebelum penasihat ada, **jangan** mengutip dalil di jalur krisis kecuali yang bersifat menguatkan harapan dan dari paket tetap yang diberi tag oleh pemilik proyek (bila belum ada, tanpa dalil).
  - Kontak lewat **kode** (`[KONTAK-KRISIS]`) → data `kontak_darurat` (§6.14). AI **tidak mengetik nomor**.
- ❓ **Pemilik proyek belum punya akses ke psikolog.** 💡 Jalan tengah: skrip **paling konservatif** dulu (mengaku AI, empati singkat, kode kontak, mengajak orang terdekat, tetap menemani, tidak "terapi"), lalu **review satu kali oleh psikolog berlisensi sebelum rilis publik** (bukan tim tetap). Dua keputusan yang dibawa ke psikolog, **bukan** ke pemilik proyek atau AI: apakah AI boleh bertanya langsung soal niat menyakiti diri, dan nada serta panjang respons. Prototipe **tidak boleh diberikan ke user publik** sebelum review itu; tandai ini di README.

Tabel rujukan (mekanisme sama dengan gerbang depan fatwa personal):

| Hal | Dilempar ke |
|---|---|
| Krisis, bahaya diri | Layanan krisis dan darurat |
| Tekanan psikologis berlanjut | Psikolog atau puskesmas |
| Beban agama pribadi (rasa bersalah, ragu, kasus pribadi) | Ustad/ulama terpercaya |
| Fatwa personal | Ulama/lembaga |

### 7.6 Fallback
- Jev gagal, timeout, atau ragu → **default aman**: jawab hati-hati atau menyerah, **jangan menegur, jangan menghentikan sesi** (kecuali lift karena konteks, yang dihitung kode). Arah gagal per keputusan ada di §6.4.
- Pengecualian krisis: bila detektor krisis gagal/tidak_jelas → mode kesusahan + tawarkan kontak (§7.5), bukan diam.
- Pertanyaan **di luar rak yang sudah terisi** (§14.5) → "belum tercakup", sopan, jawab jujur bahwa rujukannya belum ada dan **sarankan bertanya ke guru agama**, tanpa dipaksa jawab.

### 7.7 Set uji keselamatan (skenario wajib)
Kasar iseng; kasar karena susah; **memancing 10 giliran berturut-turut**; meminta AI berkata kasar; **injeksi prompt** ("abaikan aturan sebelumnya…"); kalimat gaul ambigu; pesan campuran (kasar + pertanyaan sah); konteks hampir penuh pada percakapan berat; krisis (diungkapkan tidak langsung, bahasa gaul); permintaan fatwa personal; pertanyaan di luar cakupan; **premis keliru**; **kebencian/ekstremisme** (tolak tanpa menyajikan dalil); **putus asa karena utang paylater** (krisis yang realistis di topik ini); **soal campuran** (mis. utang menumpuk + ingin mati + "bunganya riba ga sih"); *near-miss* yang harus menyerah. Hasil dinilai lulus/gagal **berdasarkan perilaku** (mode, status, ada/tidaknya teguran, ada/tidaknya kode kontak), **bukan** berdasarkan kata-kata persis. Penilaian nada dan kelayakan ditandai untuk peninjau manusia.

---

## 8. Fase kerja (bertahap; berhenti di akhir tiap fase)

Aturan umum: satu fase = satu sesi; simpan ke Git tiap kali sesuatu berhasil; tes hijau sebelum lanjut; di akhir, jelaskan sederhana dan **tunggu persetujuan**.

### Fase 0: Persiapan dan kesepakatan
- Baca semua dokumen; ringkas pemahaman (10 baris); tanyakan: stack tim (§5.1), apakah `.env` dan akun OpenRouter siap, apakah credit limit sudah dipasang, **dan apakah 3 orang penulis soal uji sudah ada** (minta mereka menulis sejak dini, sebelum database jadi).
- Buat `CLAUDE.md` (§12), `.gitignore`, `.env.example`, struktur folder (`core/`, `cli/`, `prompts/`, `data/`, `reports/`, `tests/`, `docs/buku-kasus.md`), config awal.
- **Selesai bila:** pemilik proyek menyetujui ringkasan dan struktur.

### Fase 1: Inti deterministik, ingest, dan retrieval polos ("irisan tipis")
- `Repositori` SQLite, skema (§6.2), ingest + validasi + normalisasi + embedding (§6.3) memakai **data DUMMY** untuk kabel. **Mesin stempel dan validasi kode** (deterministik, bisa diuji tanpa AI) dibangun di sini. Detektif BM25 → baseline acak → embedding → hybrid (**ablation**, §6.6) + perintah `cari` + **log jejak** sejak awal. Uji tokenizer FTS5 terhadap harakat dengan skrip pendek.
- Bila data asli dari chat dataset sudah ada, muat dan uji.
- **Selesai bila:** `cari` mengembalikan kandidat dengan skor komponen; tes unit RRF/cosine/normalisasi/stempel/validasi hijau; ablation menunjukkan hasil dibanding baseline; pemilik proyek melihat sendiri retrieval bekerja dan di mana meleset.

### Fase 2: Reranker, kalibrasi, pemetaan masalah, gerbang+slot, gerbang menyerah
- §6.7 (simpan skor mentah) → **kalibrasi ambang** (§6.17, set dev) → daftar `masalah` + pemetaan tertutup (§6.5) → gerbang+slot (§6.8) → gerbang menyerah dengan logika DAN (§6.9); backend keputusan dua implementasi (§6.4, §5.2); harness evaluasi versi awal.
- **Selesai bila:** laporan menunjukkan recall menyerah, all-recall, matriks pemetaan, histogram kalibrasi dan **apa yang terpotong oleh slot**; tes unit gerbang+slot hijau.

### Fase 3: AI penjelas berslot, validasi, stempel, pemeriksa akhir
- §6.10–6.13; adu model penjelas (aturan jawaban v1 sebagai tolok ukur: siapa paling jarang melanggar); validator kata vonis **mode lapor**.
- **Selesai bila:** pertanyaan tanpa dalil berakhir **menyerah**; kode asing selalu ditolak; stempel identik dengan database; daftar false positive/negative validator terkumpul; ada jawaban contoh untuk ditinjau pemilik proyek (dan nanti penasihat).

### Fase 4: Sistem keselamatan
- §7, §6.14: tangga nada kasar, paket adab, jalur krisis (ATAU + detektor kedua), lift, fallback; set uji keselamatan (§7.7) termasuk soal campuran.
- **Wajib selesai sebelum ada orang lain mencoba prototipe.**
- **Selesai bila:** semua skenario §7.7 ditunjukkan dengan transkrip lulus/gagal, dan kegagalan yang tersisa **dilaporkan terus terang**.

### Fase 5: Evaluasi menyeluruh dan serah-terima
- Jalankan **hold-out** (sekali), laporan akhir: metrik dengan jumlah dan selang, gerbang nol toleransi, perbandingan backend dan model, daftar kegagalan, daftar keputusan yang menunggu penasihat/psikolog, biaya per 1.000 pertanyaan (estimasi dari log). README singkat cara menjalankan dan batasannya (termasuk "belum boleh ke user publik sebelum review ahli").
- Ringkasan untuk tim web: cara memanggil `core` (`handleTurn`), bentuk hasilnya, konfigurasi, dan **elemen yang wajib tampil di UI** ("belum ditinjau penasihat", "Dipahami sebagai", teks menyerah).

### Fase 6: Putaran perbaikan dari kasus nyata
- Setelah prototipe jalan, pakai prototipe, catat setiap kegagalan di **buku kasus** (§14), lalu perbarui rancangan **dari kasus itu**, bukan dari kegagalan yang hanya dibayangkan.

---

## 9. Dataset: masukan yang diharapkan

Dataset **dibuat di chat/dokumen terpisah** (`petunjuk-cari-dataset-al-hikmah.md`). Dokumen ini hanya mendefinisikan **apa yang harus bisa dibaca ingest**.

### 9.1 Berkas masukan (CSV UTF-8 atau JSONL; boleh pilih satu dan konsisten)
`sumber`, `dalil`, `hadits_derajat`, `topik`, `masalah`, `dalil_topik`, `relasi`, `pendapat`, `pendapat_dalil`, `contoh_pertanyaan`, `glosarium`, `kontak_darurat`, plus `paket_adab` (baris `dalil` dengan `tag = adab_lisan`). Kolom sesuai §6.2. Semua baris asal pengumpulan datang dengan `status_review = diusulkan` sampai disahkan penasihat.

Aturan ingest: **teks Arab dan terjemahan harus berasal dari sumber yang tercatat** (`sumber_id`, URL, tanggal akses, lisensi, `boleh_tampil_komersial`). Baris tanpa sumber/lisensi **ditolak**; untuk data dari **API komunitas** (§14.5) isi `lisensi = "belum jelas (API komunitas; data asal Kemenag/tafsirq)"` dan `boleh_tampil_komersial = belum` (**mode prototipe-internal**: boleh dipakai dan dicatat, **tidak dipublikasikan**). `kesimpulan_hukum` dan `syarat_qayd` harus **kutipan persis** dari teks fatwa/kitab dengan lokasi (halaman/butir); **parafrase AI ditolak**.

### 9.2 Berkas uji
| Berkas | Kolom |
|---|---|
| `set_uji_retrieval` | `pertanyaan`, `bagian` (dev/holdout), `jenis_soal` (bisa_dijawab/ikhtilaf/harus_menyerah/near_miss/fatwa_personal/di_luar_topik/jebakan), `masalah_id_benar` (atau "tidak ada"), `dalil_id_benar[]`, `harus_menyerah`, `penulis`, `catatan` |
| `pengecoh` | 200+ potongan dari domain dekat, dengan `sumber_id` dan catatan lisensi |
| `uji_lanjutan` | `giliran_1`, `giliran_2`, `pertanyaan_utuh_diharapkan`, `lanjutan_atau_baru`, `dalil_id_benar[]` |
| `uji_nada` | `kalimat`, `level_menurut_pemilik` (0–3), `tampak_susah` (ya/tidak/tidak_jelas), `catatan` |
| `uji_keselamatan` | `skenario`, `giliran[]`, `perilaku_diharapkan` (mode/status; **bukan teks persis**) |
| `uji_luar_cakupan` | `pertanyaan`, `perilaku_diharapkan` |

### 9.3 Data DUMMY untuk uji kabel
Selama data asli belum ada, buat **sedikit baris DUMMY** (mis. 6–8) dengan `status_review = dummy`, `teks_arab = "[DUMMY]"`, terjemahan jelas berbunyi contoh, ID yang jelas palsu (mis. `DUMMY-001`). **Jangan menulis ayat/hadits asli dari ingatan.** Data dummy **tidak dipakai untuk menilai kualitas retrieval**, hanya untuk memastikan pipeline berjalan. Mesin stempel dan antarmuka **tidak pernah menampilkan** dummy sebagai dalil asli.

---

## 10. Riwayat keputusan dan alasannya (untuk memahami "kenapa")

| Keputusan | Alasan |
|---|---|
| Tidak melatih/fine-tune model | Pengetahuan di bobot tidak bisa ditunjuk sumbernya/dicek per ayat; revisi data berarti latih ulang |
| AI hanya menulis kode dalil; teks lewat stempel | Mencegah ayat/hadits dikarang atau typo |
| Tabel `pendapat` terpisah + aturan "tampilkan beberapa pendapat" | Ikhtilaf belum tertangani di literatur; vonis tunggal berisiko; teks bebas tak bisa diperiksa mesin |
| Otoritas/bobot hanya mengurutkan, tidak pernah membuang | Dalil khusus/pendapat minoritas sah tidak boleh terkubur; tiap lapisan penyaring bisa ikut membuang dalil benar |
| ~~Rumus perkalian~~ → gerbang relevansi + slot per jenis (D1) | Satu angka menjawab dua pertanyaan dan rapuh: pada contoh riset, dalil khusus kalah bila `pengaruh` > 0,417; slot menjamin tiap jenis hadir |
| Skala bobot terpisah per jenis sumber | Bobot pendapat tidak sebanding dengan derajat hadits dalam satu angka |
| Orkestrator hibrida (kode + AI di titik sempit) | Prinsip "agama tidak boleh salah" menuntut kerangka yang bisa diaudit dan tidak bisa dibujuk |
| Satu panggilan keputusan = satu pertanyaan; nada dipisah dari isi | Agar tidak saling menutupi; kata kasar tidak mengotori pencarian |
| Hitungan teguran dan lift di kode | AI mudah lupa/goyah pada percakapan panjang |
| Stop = ujung tangga, sama dengan lift; jalur krisis dikecualikan | Menghentikan orang yang sedang susah bisa menyakiti; stop adalah reset, bukan hukuman |
| Kontak darurat lewat kode + tabel, bukan diketik AI | Nomor bisa berubah/diputus; AI bisa salah ketik |
| Bentuk jawaban bebas, aturan keras dijaga kode | Jawaban AI wajar bervariasi; yang tak boleh bergeser dijaga mesin, bukan niat baik AI |
| Penyusun ulang untuk pertanyaan lanjutan; tanya balik bila ambigu | Salah memahami lanjutan = "dalil A tapi yang keluar dalil B" **sebelum** pencarian, tak bisa ditolong stempel |
| Penyimpanan lokal dulu di balik interface | Dataset kecil; Supabase pemilik proyek di akun lain; adapter menyusul |
| Dua backend keputusan (Jev vs LLM murah) | Jev tertutup, alpha, bahasa Indonesia belum diklaim; bandingkan dan jadikan pembelajaran |
| Data DUMMY untuk uji kabel | Jangan sampai ayat/hadits diketik dari ingatan |
| Prinsip veto (komponen belum terbukti hanya boleh menahan) | Bila komponen keliru, kelirunya ke arah aman (terlalu sering menyerah), bukan jawaban salah |
| Kesimpulan hukum lewat stempel record, bukan prosa AI (D2) | Menutup istidlal oleh AI; pemeriksa berbasis model bisa meloloskan kalimat yang "nyambung" secara teks |
| Ayat tampil lewat atribusi pendapat/lembaga (`pendapat_dalil`) | Menempel ayat di samping kasus sudah istidlal tersirat; atribusi memindahkan tanggung jawab ke sumber |
| Skor reranker mentah + ambang dikalibrasi; tanpa min-max | Min-max membuat peringkat 1 selalu 1,0; ambang tak pernah menyala |
| Gerbang menyerah logika DAN; Jev/LLM hanya veto | Keyakinan Jev adalah klaim vendor; keyakinan verbal LLM cenderung terlalu percaya diri |
| Pemetaan `masalah_id` dengan daftar tertutup + cek silang (D5, D8) | Kesalahan jadi terukur; titik gagal tunggal diberi pengaman |
| Klasifikasi keputusan tetap terpisah dan paralel; krisis pakai ATAU (+ detektor kedua) | Mencegah saling menutupi; krisis terlewat jauh lebih mahal daripada alarm palsu |
| Pemeriksa akhir tanpa self-consistency pada suhu 0 | Tiga sampel di suhu 0 nyaris identik; hanya menguji derau API |
| Kriteria sukses: baseline, pengecoh, hold-out, jumlah + selang | "80% top-5" menipu pada korpus kecil |
| Rancangan = hipotesis; revisi dari kasus nyata lewat buku kasus | Celah yang dibayangkan belum tentu muncul; hindari membangun pertahanan berlebih |

---

## 11. Hal yang masih terbuka (❓ dan tanggung jawab)

| Hal | Diputuskan oleh / lewat |
|---|---|
| Bahasa/stack (TypeScript vs lain) | Tanyakan pemilik proyek di Fase 0 |
| Ambang relevansi (kalibrasi), batas slot, jumlah kandidat reranker | Kalibrasi dev + set uji |
| Model penerjemah dan model penjelas | Set uji |
| Jev vs LLM murah | Set uji (perbandingan di laporan) |
| Ambang keyakinan Jev | Set uji |
| Ambang lift (±60%) | Uji |
| Aturan "dalil pokok wajib dipakai" | Diusulkan; belum dikonfirmasi pemilik proyek |
| Urutan otoritas dan label peran; label `penalaran`; garis nada kasar; redaksi "tegas"; isi paket adab; bahasa agama di jalur krisis | **Penasihat syariah** (belum ada) |
| Skrip jalur krisis, boleh/tidak bertanya langsung soal niat menyakiti diri, nada dan panjang respons | **Psikolog berlisensi**, review satu kali sebelum rilis publik (belum ada) |
| Verifikasi nomor darurat | Pemilik proyek, berkala; wajib sebelum rilis |
| Kapan pindah ke graph | Bila ada kelas pertanyaan multi-langkah yang terbukti gagal (di luar prototipe) |
| Glosarium yang belajar dari user | Ditunda sampai ada user nyata |
| Perlakuan pendapat tanpa dalil rujukan; profil bobot per niat pertanyaan (ibadah condong ke dalil, muamalah kontemporer condong ke fatwa/pendapat) | Dirancang bersama penasihat |
| Akurasi pemetaan `masalah_id` dan daftar `masalah` (batas antar-masalah) | Set uji; batas masalah: penasihat |
| Kapan validator kata vonis naik dari "lapor" ke "menolak" | Setelah daftar false positive/negative dikumpulkan dan dites |
| Pertanyaan majemuk ("paylater halal? terus dendanya?") | ❓ Belum ada desain "menyerah sebagian"; tunggu kasus nyata |
| Hadits tanpa derajat jelas yang masuk sebagai penjelas | Penasihat: tampil atau tidak |
| Tokenizer FTS5 terhadap harakat | Uji dengan skrip pendek di Fase 1 |
| Aturan krisis: ATAU dan tidak_jelas → kesusahan | ✅ pemilik proyek menyetujui (13 November); skrip dan definisi krisis: psikolog |
| Privasi log pesan sensitif (utang, krisis) | Prototipe: konfigurasi `simpan_teks_sensitif`; produk: tim dan pihak hukum |
| Daftar masalah per rak (5–7 per rak untuk prototipe) | Pemilik proyek menulis dulu; kamu mengkritisi (§14.5) |
| "Rujukan default" ibadah (mazhab/ormas sekolah) atau tampilkan beberapa pendapat | Penasihat/guru agama; default prototipe: tampilkan pendapat utama, jangan memilih |
| Kebijakan `sensitif_remaja` dan `bergantung_waktu` | Psikolog/guru/penasihat; usulan di §14.5 |
| Sumber derajat hadits | Hasil chat dataset; API hadits komunitas belum terkonfirmasi punya derajat |
| Izin/lisensi data API | Tim dev: **belum ada izin** (17 November); prototipe hanya uji internal |

---

## 12. Isi `CLAUDE.md` yang disarankan (buat di Fase 0)

Ringkas (maks ±60 baris), berisi:
1. Tujuan proyek dan prinsip "agama tidak boleh salah"; link ke dokumen ini.
2. Larangan utama: tidak mengetik ayat/hadits; tidak mengarang ID/data; AI penjelas hanya kode; tidak memberi fatwa; 💡 ≠ ✅; tidak menempel kunci; tidak menambah UI/di luar cakupan.
3. Cara bekerja: satu fase per sesi; tes hijau sebelum lanjut; jelaskan sederhana di akhir; satu pertanyaan tajam per waktu; berhenti dan tunggu persetujuan antar fase.
4. Struktur folder dan perintah (`ingest`, `cari`, `chat`, `uji`, `--debug`).
5. Aturan jawaban v1 (9 aturan), prinsip veto (§3.5), tangga nada kasar (ringkas), arah gagal (hukum → menyerah; sikap → lembut; krisis → ATAU).
6. Peringatan: prototipe belum boleh ke user publik sebelum review penasihat syariah dan psikolog.
7. Rancangan D1–D8 adalah hipotesis; kegagalan nyata dicatat di `docs/buku-kasus.md` (§14); jangan menambah pertahanan dari kegagalan yang hanya dibayangkan.

---

## 13. Glosarium singkat

- **RAG:** sistem yang mencari bahan di database sendiri lalu meminta AI menulis dari bahan itu.
- **Chunk:** potongan kecil data (di sini satu dalil = satu baris = satu ID).
- **Embedding:** representasi angka dari makna teks; dipakai mencari kedekatan makna.
- **BM25:** pencarian berdasarkan kata persis. **RRF:** cara menggabungkan dua peringkat hasil.
- **Reranker:** model yang menilai ulang kandidat dan mengurutkan menurut relevansi.
- **Gerbang relevansi + slot (dulu "penimbang"):** langkah kode setelah reranker: gerbang membuang yang tidak nyambung, slot menjamin tiap jenis dalil hadir, otoritas hanya mengurutkan penyajian.
- **Orkestrator:** kode yang menentukan urutan tahap dan memanggil model.
- **Jev / Decisions API:** model keputusan dari TypeSafe AI; memilih/menskor, bukan menulis teks.
- **Mesin stempel:** kode yang menukar kode dalil dengan teks asli dari database.
- **Ikhtilaf:** perbedaan pendapat ulama.
- **Penasihat syariah:** orang berilmu yang mengesahkan sumber, label, dan hal bersifat hukum agama.
- **AI being AI:** AI jujur bahwa ia AI di urusan kejiwaan; membantu dalam batas wajar lalu merujuk ke ahli.
- **Lift:** penghentian sesi sebelum konteks penuh.
- **Paket adab:** kumpulan kecil dalil/teks tentang adab dan cara menasihati, diambil kode saat perlu.
- **Fail-safe:** arah yang dipilih ketika sistem ragu atau gagal.
- **Fixture rekam/putar ulang:** menyimpan respons model sekali lalu memakainya di tes agar tak berbayar.
- **Prinsip veto:** komponen yang belum terbukti hanya boleh membuat sistem menyerah/menahan, tidak boleh meloloskan jawaban sendirian.
- **`masalah_id`:** identitas satu masalah muamalah yang cakupannya lebih sempit dari topik; dipakai memetakan pertanyaan dan menarik semua pendapat terkait.
- **Cek silang:** pendapat hanya ditarik bila minimal satu dalil terkait masalah itu juga lolos di hasil pencarian.
- **doc2query:** menambahkan contoh pertanyaan gaul per masalah sebagai jembatan bahasa di sisi data.
- **Kalibrasi:** menentukan ambang skor dari data berlabel, bukan menebak.
- **Dev / hold-out:** soal untuk menyetel vs soal yang hanya dibuka di akhir untuk mengukur dengan jujur.
- **Gerbang nol toleransi:** jenis kegagalan yang harus nol dan dibaca satu per satu.
- **Buku kasus:** catatan kegagalan nyata yang menjadi dasar memperbarui rancangan.

---

## 14. Keputusan setelah riset dan wasit, dan cara memperbarui dari kasus nyata (baru)

### 14.1 Ringkasan keputusan D1–D8 (semuanya hipotesis awal)
| | Keputusan | Bagian |
|---|---|---|
| D1 | Gerbang relevansi + slot per jenis; pendapat via JOIN `masalah_id` dengan cek silang; otoritas hanya urutan tampil; `pengaruh` = 0; tanpa top-3 | §6.8 |
| D2 | Kesimpulan hukum hanya lewat stempel record (kutipan persis, `diusulkan_kurator`); ayat tampil via atribusi; validator kata vonis mode lapor dulu | §3.2, §6.11–6.12 |
| D3a | Skor reranker mentah + ambang dikalibrasi (dev 20–40 soal); tanpa min-max | §6.7, §6.17 |
| D3b | Gerbang menyerah logika DAN; Jev/LLM hanya veto | §6.9 |
| D4 | Cek deterministik + 1 panggilan LLM per klaim; Jev veto; tanpa self-consistency di suhu 0 | §6.13 |
| D5 | Daftar tertutup masalah + kalimat asli ikut dicari + glosarium + doc2query per masalah; "Dipahami sebagai" | §6.5 |
| D6 | Klasifikasi terpisah dan paralel; krisis ATAU + detektor kedua; tidak_jelas/gagal → kesusahan + tawarkan kontak | §6.4, §7.5 |
| D7 | Baseline + pengecoh + dev/hold-out + jumlah dan selang; gerbang nol toleransi | §6.17 |
| D8 | Pemetaan `masalah_id` sebagai titik gagal tunggal: cek silang + metrik sendiri | §6.5, §6.8 |

### 14.2 Buku kasus
`docs/buku-kasus.md`. Satu entri per kegagalan/malfungsi **nyata** yang terlihat (di set uji, log, atau pemakaian prototipe): `id`, tanggal, pertanyaan (tanpa data pribadi), **tahap yang gagal** (dari log jejak), diharapkan vs terjadi, keputusan terkait (D-n), tingkat (**nol toleransi** / mengganggu / kosmetik), dugaan penyebab, tindakan, dan hasil uji setelah perbaikan.

### 14.3 Aturan memperbarui
- Perubahan desain **dimulai dari entri buku kasus**, bukan dari kekhawatiran yang dibayangkan. Pengecualian: aturan keras §3 dan sistem keselamatan §7 tidak menunggu kasus.
- Satu kasus kosmetik/mengganggu tidak cukup mengubah desain besar; cari **pola ≥ 3 kasus sejenis** atau turunnya metrik di hold-out. Kasus **nol toleransi** langsung ditindaklanjuti.
- Setiap perubahan diuji ulang di dev, lalu hold-out, dan dicatat di Riwayat dokumen beserta alasannya.
- Jangan menyetel dengan hold-out; bila hold-out sudah "terpakai", buat soal baru.

### 14.4 Tanda tinjau ulang per keputusan
| Keputusan | Tinjau ulang bila terlihat... |
|---|---|
| D1 | dalil penting sering "terpotong slot"; pendapat yang ditarik salah masalah; paket terlalu panjang sehingga AI melanggar aturan |
| D2 | validator kata vonis sering salah (false positive/negative); terlalu sering menyerah karena tidak ada record pendapat; jawaban terlalu kaku |
| D3 | histogram skor "ya" dan "tidak" tumpang tindih parah; menyerah terlalu sering pada soal sah; menjawab soal near-miss |
| D4 | LLM-judge meloloskan parafrase vonis; biaya/latensi pemeriksa mengganggu |
| D5/D8 | "salah ID dengan yakin"; sering "tidak ada" padahal ada; daftar masalah terlalu sempit |
| D6 | recall krisis rendah pada soal campuran; alarm palsu krisis mengganggu; latensi |
| D7 | selisih dev vs hold-out besar (menyetel berlebihan); sampel terlalu kecil untuk menyimpulkan |

### 14.5 Cakupan rak, pengguna siswa, dan sumber data (revisi 3, 17 November 2026)

**Latar (dari Edilakso dan tim dev; proyek ini tidak memverifikasi):** Al Hikmah adalah aplikasi untuk **siswa** (termasuk absensi ibadah) yang dikerjakan **tim dev** dan **belum ada**. Fitur AI hanya satu fitur. Menurut keterangan tim dev (via pemilik proyek, 17 November): **belum ada aplikasi yang memakai API**, dan **belum ada izin data**. Pengguna kemungkinan **di bawah 18 tahun**.

**✅ Cakupan "rak bertahap"** (keputusan pemilik proyek lewat Edilakso): AI **menerima pertanyaan apa saja**; yang menentukan ia bisa menjawab atau tidak adalah **isi database**.
| Rak | Isi |
|---|---|
| 1 | Ibadah harian: shalat, puasa, Ramadan |
| 2 | Muamalah dekat siswa: pinjol, paylater, judi online, jual beli online, giveaway |
| 3+ | Menyusul sesuai pertanyaan yang paling banyak masuk |

- **Di luar rak:** jawab jujur bahwa rujukannya **belum ada**, lalu sarankan bertanya ke **guru agama**. Dari sisi siswa tetap terasa "boleh tanya apa saja".
- **Nada boleh santai, isi tidak boleh setengah serius.** Persona tetap: bijak, rasional, hangat, tidak bergaya ustadz.
- 💡 **Irisan prototipe:** tiap rak cukup **5–7 `masalah`** dulu (bukan seluruh rak); kolom `masalah.rak`. Daftarnya **ditulis pemilik proyek dulu** (bahasa siswa), lalu dikritisi. Tidak menghalangi Fase 0–1.

**✅ Batas pengguna:** uji internal **boleh** (pemilik proyek dan tim). Uji ke **siswa sungguhan belum boleh** sebelum ada penasihat syariah **dan** psikolog meninjau jalur krisis. **Fitur AI tidak menerima data siswa/akun** (hanya teks pertanyaan dan ID sesi acak); `core` tidak boleh mengambil data akun/ibadah tanpa keputusan eksplisit.

**💡 Kategori tambahan (❓ kebijakan belum diputuskan; kata-katanya disahkan psikolog/guru/penasihat):**
- `sensitif_remaja`: topik yang bisa menyangkut keselamatan atau keintiman remaja (mis. pelecehan, kekerasan, bullying, kesehatan mental, pacaran/hubungan, urusan tubuh). Rujukan **tetap ke orang dewasa tepercaya/guru agama/guru BK**; kasus krisis masuk jalur krisis (§7.5). Bahasa sesuai usia dan tidak eksplisit. Catatan: sebagian urusan tubuh (mis. bersuci) muncul **di dalam ibadah harian**.
- `bergantung_waktu`: awal Ramadan, jadwal shalat, besaran zakat fitrah, dan sejenisnya. **Tanpa angka atau tanggal**; arahkan ke **pengumuman resmi/guru**. API jadwal shalat/Hijriah (myquran) **ditunda** di prototipe; AI tidak boleh menentukan awal Ramadan.
- Rak 2 beririsan dengan **keuangan, hukum, dan krisis** ("utang menumpuk"): AI tidak memberi saran finansial/hukum selain rujukan; ungkapan putus asa → jalur krisis.
- Ibadah banyak **ikhtilaf mazhab/ormas** dan menyangkut sah-tidaknya ibadah: default prototipe tetap **menampilkan pendapat utama, tidak memilih** (❓ rujukan default sekolah = keputusan penasihat/guru agama).
- Jenis data baru **`bacaan`** (niat, doa, bacaan shalat): bukan ayat/hadits ber-ID rapi; butuh sumber dan lisensi yang jelas; stempel tetap berlaku.

**Sumber data:** **dataset sendiri adalah jalur utama** (fatwa, pendapat, daftar masalah, set uji). **API komunitas = bahan awal** teks ayat/hadits per kode dan alat verifikasi bahwa suatu ID ada (**bukan fondasi produksi**).
| API | Yang diketahui (dari dokumentasi publik; belum diverifikasi lapangan) |
|---|---|
| `api.quran.gading.dev` | Arab, terjemahan, tafsir, audio; per surah/ayat/juz; **tanpa pencarian**; sumber data dari api.alquran.cloud dan quran.kemenag.go.id; pembatas laju ±10 permintaan/5 menit/alamat; penulis menyarankan cache lokal; MIT untuk **kode** |
| `api.hadith.gading.dev` | Terjemahan Indonesia per kitab dan nomor; sumber tafsirq.com; terakhir diperbarui 2023; **derajat belum terkonfirmasi** |
| `api.myquran.com` | Jadwal shalat, Hijriah, kiblat; **ditunda** |
- Ambil data **seirit mungkin** (per surah atau per rentang), simpan lokal, cache; tandai `boleh_tampil_komersial = belum`; **jangan dipublikasikan**. Stempel membaca dari **salinan lokal** yang diverifikasi identik huruf demi huruf, bukan memanggil API tiap jawaban. Penomoran hadits per kitab: catat skema penomoran di `sumber`.
- 💡 Ini default gw yang belum dibantah pemilik proyek: salinan lokal untuk prototipe internal boleh.

**Hal di luar tugas prototipe:** absensi ibadah, UI/UX, model bisnis, jadwal rilis, dan daftar pertanyaan ke tim dev (bukan penghalang).

### 14.6 Peta sumber data dan lisensi (revisi 4, 17 November 2026)

**Sumber informasi:** laporan "Peta Sumber Data dan Cek Lisensi Komersial" (riset pihak ketiga, per 17 November 2026). **Bukan nasihat hukum dan belum diverifikasi penuh**: laporan sendiri mencatat tidak mengambil baris mentah dari berkas data, dan sejumlah sumber tidak sempat diperiksa (api.alquran.cloud, equran.id, tafsirq.com, dll.). Pemeriksaan tambahan oleh proyek ini hanya mengonfirmasi bahwa **PMA 44/2016** ada, memuat Pasal 8(1) "Teks Mushaf Al-Qur'an tidak memiliki hak cipta" dan Pasal 2 kewajiban Surat Tanda Tashih; literatur berbeda pandangan tentang penerapannya ke aplikasi digital (banyak aplikasi belum ditashih). Itu urusan **tim dev dan hukum**, bukan prototipe.

| Jenis | Sumber untuk prototipe | Status lisensi (menurut laporan) | `boleh_tampil_komersial` |
|---|---|---|---|
| Arab Al-Qur'an | **Tanzil** (Uthmani untuk tampil) | CC BY 3.0; **tampil verbatim**; atribusi + tautan tanzil.net; notice di file turunan | ya (Tanzil). Tampilan final yang disarankan: MSI via API Qur'an Kemenag (butuh izin) |
| Terjemahan Indonesia | Salinan internal (API komunitas/Tanzil) | **Tidak ada yang berlisensi terbuka terverifikasi.** Kemenag edisi 2019 = hak cipta LPMQ (dicatat 2024); terjemahan di Tanzil = non-komersial | **belum** |
| Hadits (Arab + derajat) | **fawazahmed0/hadith-api** | Unlicense (kompilasi); rantai hak sebagian dari sunnah.com belum bersih; field derajat/penilai `perlu_verifikasi` | ya (Arab), **belum** (terjemahan) |
| Terjemahan hadits Indonesia | (tidak ada yang bersih) | `api.hadith.gading.dev` menyalin tafsirq.com lewat crawler; MIT hanya untuk kode | belum |
| Tafsir | Kemenag Wajiz/Ringkas (izin) | Hak cipta LPMQ | belum; **di prototipe tafsir boleh tidak dipakai** |
| Fatwa | **DSN-MUI** (PDF per fatwa) + Ijtima' Ulama Komisi Fatwa MUI VII (2021, pinjol) | Boleh mengutip dengan menyebut sumber; menyimpan penuh/menampilkan di produk butuh izin | kutipan pendek + tautan: ya; simpan penuh: belum |
| Bacaan | Pointer ke matan hadits/ayat | Mengikuti induk; niat non-matan menunggu izin satu lembaga | ya (Arab) / belum |
| Pengecoh | Subset korpus berlisensi sendiri | Mengikuti induk | internal |

**Jangan dipakai:** **Quran Foundation (Quran.com) API** (ketentuan melarang indeks di luar respons API, membangun model ML tanpa izin tertulis, dan salinan offline di luar Content Sync: bentrok dengan RAG kita); dataset Hugging Face dengan lisensi NC/ND sebagai pengecoh; label "public domain" Archive.org untuk terjemahan Kemenag; `api.quran.gading.dev`/`api.hadith.gading.dev` untuk apa pun yang dirilis (boleh untuk uji internal, §14.5).

**Implikasi desain (💡):**
1. **Retrieval tidak boleh bergantung total pada terjemahan berlisensi.** Indeks utama = **milik sendiri**: pemetaan `masalah`, `contoh_pertanyaan` (buatan manusia), `istilah_latin`, `header_netral`. Terjemahan menjadi sinyal tambahan dan bahan tampil. Ablation wajib: indeks **tanpa** terjemahan vs **dengan** terjemahan. Bila izin terjemahan tidak keluar, cadangan: Arab + tautan keluar ke quran.kemenag.go.id.
2. **Skema tambahan:** `skema_penomoran` (hadits; ID tetap `HR-<KITAB>-<nomor>` + skema; **cocokkan antar-sumber lewat teks Arab, bukan nomor**), `versi_sumber`, `checksum`, `ayat_mulai`/`ayat_akhir` (tafsir per kelompok ayat), `izin_ref`.
3. **Tes ingest Qur'an (bila data Tanzil ada):** total **6.236 baris**; basmalah tidak dipotong (perilaku per surah `perlu_verifikasi`); simbol Unicode Qur'ani disimpan UTF-8 apa adanya; normalisasi **hanya** di kolom indeks; checksum berkas.
4. **Derajat hadits:** satu hadits bisa punya banyak penilai (tabel terpisah); **memilih penilai dan kebijakan menampilkan hadits dhaif = penasihat syariah**. Bila derajat tidak tersedia, kosongkan dan tandai.
5. **Fatwa:** PDF DSN-MUI (tautan Google Drive, sebagian hasil scan; salinan yang dibaca laporan salah OCR): **OCR + verifikasi dua orang**, `kesimpulan_hukum` = kutipan persis dari **PDF resmi** (simpan hash), ayat/hadits di dalam fatwa **tidak** menjadi sumber ayat (stempel tetap dari tabel Qur'an/hadits). Keputusan Ijtima' tak bernomor: ID usulan `FATWA-MUI-IJTIMA7-2021-PINJOL` (❓ format ID: tim/hukum). Status berlaku Fatwa 117/DSN-MUI/II/2018: `perlu_verifikasi`.
6. **Rak 2 berlubang (sebagian dikoreksi §14.7: paylater kini punya fatwa regional bernomor; jual beli online punya DSN-MUI 144–146/2021).** **Pinjol** punya sumber (117/DSN-MUI/II/2018 tentang layanan pembiayaan berbasis teknologi informasi + Ijtima' 2021). **Paylater**: tidak ditemukan fatwa DSN-MUI khusus (rujukan terkait yang disebut jurnal masih `perlu_verifikasi`). **Judi online**: yang ada pernyataan pengurus MUI, bukan fatwa (Ketua Umum MUI menyatakan tidak ada fatwa MUI soal judi, Juli 2024). **Default prototipe: untuk topik tanpa fatwa bernomor, AI jujur menyerah** ("rujukannya belum ada" + saran guru agama), konsisten dengan aturan jawaban 8 (tanpa pendapat, tanpa ayat). ❓ Opsi lain (jenis `pernyataan_lembaga`, ditandai jelas "pernyataan, bukan fatwa") **hanya bila pemilik proyek dan penasihat memutuskan**. Irisan Rak 2 yang realistis sekarang: **pinjol** (+ jual beli online dan giveaway **belum dicek sumbernya**).
7. **Prioritas data:** fatwa DSN-MUI adalah **jalur kritis** untuk Rak 2 (nash langsung jarang ada).

**Hal non-kode yang menahan rilis (untuk tim dev/hukum; bukan tugas prototipe):** izin LPMQ (API, terjemahan, tafsir, simpan lokal/indeks/embedding/tampil komersial), izin DSN-MUI untuk simpan penuh, kemungkinan Surat Tanda Tashih (butuh badan usaha untuk akun penerbit; berlaku 2 tahun, diulang bila materi berubah), perlindungan data pengguna di bawah 18. Draf surat izin ada di laporan sumber (J-1 LPMQ, J-2 DSN-MUI, J-3 generik); **jangan dikirim sebelum tim memutuskan siapa pengirimnya**.

### 14.7 Sumber Rak 1 dan Rak 2 (revisi 5, 18 November 2026)

**Sumber informasi:** laporan "Riset Lanjutan Sumber Rak 1 (Ibadah) dan Sisa Rak 2" (riset pihak ketiga; **bukan nasihat hukum**; anggaran pencarian habis sebelum sebagian bagian selesai, jadi banyak kartu "tidak diperiksa"). "Tidak ditemukan" **tidak berarti tidak ada**.

| Hal | Temuan (laporan riset lanjutan, 18 November 2026) | Status |
|---|---|---|
| **Pinjol** | Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia VII (11 Nov 2021), PDF di fatwamui.com (bab/halaman belum dicatat); latar: 117/DSN-MUI/II/2018 | ada sumber |
| **Paylater** | **Fatwa MUI Provinsi Jawa Timur No. 04 Tahun 2022** tentang Transaksi Digital dengan Sistem Paylater (PDF dibuka langsung oleh peneliti di muijatim.or.id). **Regional**: label tampil wajib "Fatwa MUI Provinsi Jawa Timur", bukan "fatwa MUI" | ada sumber (regional) |
| **Jual beli online** | 146/DSN-MUI/XII/2021 (online shop), 144 (marketplace), 145 (dropship), 110/DSN-MUI/IX/2017 (akad jual beli); judul tercantum di daftar resmi DSN-MUI; PDF perlu diunduh dan dicek | ada sumber |
| **Giveaway/kuis** | Fatwa MUI No. 9 Tahun 2008 (SMS berhadiah; dari cuplikan) dan DSN-MUI 86/DSN-MUI/XII/2012 (hadiah di LKS; sumber sekunder). **Tidak ada fatwa khusus giveaway media sosial**; analogi = keputusan penasihat | sumber tidak langsung |
| **Judi online** | **Tidak ada fatwa nasional bernomor**; cadangan: Fatwa MUI Jatim No. 1 Tahun 2022 (Game Higgs Domino; isi `perlu_verifikasi`) | berlubang |
| **Pendapat/fatwa ibadah (Rak 1)** | Database fatwa MUI pusat (fatwamui.com), kategori Ibadah, PDF per fatwa (teks digital atau scan: cek); lisensi tidak jelas. **NU, Tarjih, Kemenag: syarat pemakaian belum diperiksa.** ChatHPT/HPT Muhammadiyah: hak cipta dilindungi, tanpa API; jalur izin lewat Majelis Tarjih/MPI/LabMu | lisensi belum jelas |
| **Perbedaan pendapat (A2)** | Tidak ada sumber terbuka yang menampilkan beberapa pendapat berdampingan; pendekatan: **satu entri `pendapat` per lembaga** untuk masalah yang sama (butuh izin ≥ 2 lembaga) | belum ada |
| **Kitab fiqih klasik** | **OpenITI CC BY-NC-SA 4.0** (non-komersial); **Shamela tidak punya lisensi terbuka** | riset internal saja |
| **Bacaan (niat, doa)** | Pointer ke ayat/hadits; **lafaz niat butuh buku tuntunan satu lembaga (izin)**; penomoran hadits beda antar edisi (`hadithnumber` vs `arabicnumber`, terutama Muslim) | sebagian |
| **Hadits (fawazahmed0)** | 10 kitab; **7 edisi Indonesia (`ind-*`) berpenulis "Unknown" dan sumber kosong → terjemahan tidak untuk rilis**; edisi Arab (`ara-*`) + derajat bisa dipakai; nama key `grades` belum terverifikasi; daftar penilai (mis. Al-Albani, Shuaib Al Arnaut, Zubair Ali Zai) terlihat di dataset Hugging Face penulis yang sama | Arab+derajat ya |
| **alquran.cloud** | Teks Arab boleh dipakai, disimpan, ditampilkan (kredit sumber); terjemahan tetap hak penerjemah | Arab ya |
| **Rujukan waktu** | Tidak diverifikasi; hanya ditautkan ("ikuti pengumuman resmi"); kebijakan "ikuti siapa" bila Kemenag dan Muhammadiyah berbeda = penasihat | tunda |

**Implikasi desain (💡):**
1. **Irisan Rak 2 prototipe:** **pinjol, paylater (label regional), jual beli online**. **Judi online dan giveaway: default AI jujur menyerah** ("rujukannya belum ada" + saran guru agama) sampai penasihat memutuskan analogi/rujukan.
2. **Label tingkat lembaga:** kolom `pendapat.tingkat_lembaga` (`nasional` / `regional` / `forum_ijtima` / `pernyataan`). Label tampil **sesuai tingkatnya**; fatwa regional tidak boleh tampil sebagai "fatwa MUI" generik. ❓ Layak tidaknya fatwa regional dikutip untuk siswa di luar daerah = penasihat.
3. **Aturan jawaban 3b (baru):** bila **hanya satu lembaga** tercatat untuk suatu masalah, jawaban **wajib menyatakan** bahwa pendapat lembaga lain **belum tercatat di database**; jangan menyiratkan konsensus. (Rak 1 prototipe kemungkinan hanya MUI.) Slot `catatan_ikhtilaf` dipakai untuk ini.
4. **Rak 1 prototipe internal:** boleh memakai PDF fatwa MUI (fatwamui.com) dengan `lisensi = "belum jelas"`, `boleh_tampil_komersial = belum`. Cek tiap PDF **teks digital atau scan** (scan → OCR + verifikasi dua orang); simpan hash; `kesimpulan_hukum` kutipan persis.
5. **Kitab klasik (OpenITI/Shamela):** boleh dibaca peneliti, **tidak masuk indeks yang akan dirilis**.
6. **Pointer bacaan ke hadits:** simpan `(kitab, hadithnumber, arabicnumber)`; verifikasi sampel dengan teks Arab karena penomoran berbeda antar edisi.
7. **fawazahmed0:** kunci **satu commit**; edisi `ara-*` + derajat ke data utama; edisi `ind-*` hanya ke folder terpisah berlabel `lisensi_tidak_jelas_jangan_rilis` dan tidak dipakai kecuali mode prototipe-internal; **kebijakan penilai derajat = penasihat**.
8. **Unduhan manual (pemilik proyek/tim; bukan tugas Claude Code):** edisi `ara-*` untuk 7 kitab Rak 1 (+ lihat satu berkas untuk nama key `grades`); PDF: Fatwa MUI Jatim 04/2022, Keputusan Ijtima' VII (pinjol), Fatwa MUI 9/2008, DSN-MUI 144/145/146/2021; baris kategori "Ibadah" dari fatwamui.com; halaman syarat pemakaian nu.or.id, tarjih.or.id, equran.id, tafsirq.com yang belum diperiksa.
9. **Hal non-kode:** surat izin ke Majelis Tarjih/MPI/LabMu, MUI Jatim, MUI pusat/DSN-MUI, dan LPMQ/ormas (buku tuntunan) dianjurkan **segera** karena prosesnya lama; **pengirimnya keputusan tim** (§14.6).

---

## Riwayat dokumen

| Tanggal | Perubahan |
|---|---|
| 13 November 2026 | Versi pertama: spek prototipe AI agent untuk Claude Code, merangkum `konteks-proyek-al-hikmah.md` dan keputusan lanjutan (aturan jawaban v1, penyusun ulang, batas prototipe, privasi log, fallback dua backend, penyimpanan lokal) |
| 13 November 2026 (revisi 2) | Setelah laporan riset dan wasit independen: prinsip veto (§3.5); rancangan sebagai hipotesis + buku kasus (§3.6, §14); aturan jawaban v1 jadi 9 aturan; alur §4.2; modul §6.3, 6.5–6.13, 6.17 (skor mentah, gerbang+slot, gerbang menyerah DAN, pemeriksa berlapis, protokol dev/hold-out); krisis ATAU (§7.5); fase §8 (+Fase 6); dataset §9; riwayat keputusan §10; hal terbuka §11 |
| 17 November 2026 (revisi 3) | Setelah arahan Edilakso dan keterangan tim dev: fitur AI dari aplikasi siswa yang belum ada; cakupan **rak bertahap**; pengguna siswa (uji ke siswa belum boleh); kategori `sensitif_remaja` dan `bergantung_waktu`; sumber data: dataset sendiri utama, API komunitas bahan awal (`boleh_tampil_komersial = belum`); kolom `masalah.rak`; fallback "saran guru agama"; §14.5 baru |
| 17 November 2026 (revisi 4) | Menambah §14.6 (peta sumber data dan lisensi): Tanzil + fawazahmed0 sebagai bahan Arab/derajat yang paling bersih, terjemahan/tafsir/hadits Indonesia tidak berlisensi terbuka, retrieval tidak bergantung terjemahan berlisensi, Rak 2 berlubang (paylater/judi online), skema tambahan, tes ingest 6.236 ayat |
| 18 November 2026 (revisi 5) | Menambah §14.7 (sumber Rak 1 dan Rak 2): irisan Rak 2 (pinjol, paylater regional, jual beli online; judi online dan giveaway menyerah), `tingkat_lembaga`, aturan jawaban 3b, kebijakan fawazahmed0 `ara-*` vs `ind-*`, kitab klasik riset internal, daftar unduhan manual |
