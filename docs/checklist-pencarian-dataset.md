# Checklist pencarian dataset untuk tim (v1, 19 Nov 2026)

> Untuk tim pemilik proyek. Dasar: `docs/daftar-masalah.md`, spek §9 dan §14.5–14.7, `docs/referensi/`.
> Sumber yang disebut di sini berasal dari riset pihak ketiga dan **belum diverifikasi penuh**.
> "Tidak ditemukan" belum tentu berarti tidak ada. **Tim tidak memilih pendapat mana yang benar**:
> kumpulkan saja, nanti dipilih penasihat syariah.

## 0. Aturan emas (berlaku untuk SEMUA temuan)

1. **Kutip persis, jangan meringkas.** Salin kalimat kesimpulan dari dokumen aslinya apa adanya (copy-paste atau ketik ulang lalu dicek).
2. **Catat lokasinya**: judul, nomor fatwa, tahun, lembaga, halaman/butir, URL, tanggal unduh.
3. **Simpan berkas aslinya** (PDF), jangan hanya tangkapan layar.
4. **PDF hasil scan** (teksnya tidak bisa diblok/disalin) → tulis "SCAN"; kutipannya diketik ulang dan **dicek orang kedua**.
5. **Satu lembaga = satu baris pendapat.** Bila ketemu dua lembaga dengan pendapat berbeda, catat keduanya.
6. Ayat/hadits yang dikutip di dalam fatwa: cukup **catat nomornya** (mis. QS 2:275, HR Bukhari no. …). Teks ayat/haditsnya diambil dari sumber Qur'an/hadits, bukan dari PDF fatwa.
7. **Jangan pakai**: Quran.com API, terjemahan Kemenag "public domain" di Archive.org, dataset Hugging Face berlisensi NC/ND, situs tanpa nama penulis/lembaga, ceramah/video, jawaban AI.

## 1. Formulir per temuan (salin untuk setiap dokumen)

```
Masalah (ID)        : R1-01 / R2-03 / ...
Lembaga / pemilik   : (mis. Komisi Fatwa MUI, DSN-MUI, MUI Prov. Jawa Timur, Majelis Tarjih, LBM NU)
Tingkat             : nasional / regional / forum_ijtima / pernyataan
Judul + nomor + tahun:
URL                 :
Tanggal unduh       :
Halaman / butir     :
Teks digital / SCAN :
Kutipan kesimpulan  : "…persis…"
Kutipan syarat      : "…persis…" (bila ada)
Ayat/hadits dirujuk : (nomor saja)
Pencari / pengecek  : (nama orang 1) / (nama orang 2)
Catatan             :
```

## 2. Checklist per masalah

### Rak 1 — Ibadah harian
Tempat mencari utama: **fatwamui.com** (kategori Ibadah). Pembanding (cek dulu syarat pemakaian situsnya, belum diperiksa): Majelis Tarjih Muhammadiyah, NU Online/LBM PBNU, Kemenag.

| ✓ | ID | Masalah | Kata kunci pencarian | Sumber kandidat |
|---|---|---|---|---|
| ☐ | R1-01 | Berbicara saat berwudhu | wudhu, berbicara, adab wudhu, sunnah/makruh wudhu | belum ada kandidat terverifikasi |
| ☐ | R1-02 | Pakaian saat shalat (kaos kaki, sweater) | pakaian shalat, aurat dalam shalat | belum ada kandidat terverifikasi |
| ☐ | R1-03a | Masbuq: kapan rakaat terhitung | masbuq, makmum terlambat, mendapat rakaat, rukuk | belum ada kandidat terverifikasi |
| ☐ | R1-03b | Masbuq: bacaan Al-Fatihah | masbuq, al-fatihah makmum | belum ada kandidat terverifikasi |
| ☐ | R1-04 | Terlewat sahur karena tertidur | sahur, tidak sahur, niat puasa | belum ada kandidat terverifikasi |
| ☐ | R1-05 | Shalat yang terlewat waktunya | qadha shalat, shalat terlewat, tertidur | belum ada kandidat terverifikasi |

Catatan Rak 1: riset sebelumnya **belum menemukan** sumber pendapat ibadah berbahasa Indonesia yang lisensinya jelas. Untuk prototipe internal boleh dipakai dengan tanda "lisensi belum jelas".

### Rak 2 — Muamalah dekat siswa

| ✓ | ID | Masalah | Kata kunci | Sumber kandidat (dari riset) |
|---|---|---|---|---|
| ☐ | R2-01 | Pinjol berbunga (peminjam) | pinjaman online, pinjol, riba | **Keputusan Ijtima' Ulama Komisi Fatwa se-Indonesia VII (2021)**, PDF di fatwamui.com (catat bab & halaman); latar: **Fatwa 117/DSN-MUI/II/2018** (dsnmui.or.id) |
| ☐ | R2-02 | Pinjam online pakai nama orang lain | pinjol, identitas orang lain | belum ada kandidat; cek apakah Ijtima' VII 2021 / 117/2018 menyinggung |
| ☐ | R2-03 | Paylater | paylater, transaksi digital | **Fatwa MUI Provinsi Jawa Timur No. 04 Tahun 2022** (muijatim.or.id) — **regional**, catat begitu |
| ☐ | R2-04 | COD | COD, bayar di tempat, online shop | **146/DSN-MUI/XII/2021** (online shop); pembanding **144** (marketplace), **145** (dropship), **110/DSN-MUI/IX/2017** (akad jual beli) |
| ☐ | R2-05a | Beli di warung, bayar nanti | utang, jual beli tidak tunai | belum ada kandidat (cek 110/DSN-MUI/IX/2017 tentang akad jual beli) |
| ☐ | R2-05b | Lupa / tidak melunasi utang | melunasi utang, qardh | belum ada kandidat |
| ☐ | R2-06a | Penyedia pinjol: hukumnya | penyelenggara pinjaman online | **117/DSN-MUI/II/2018**; Ijtima' VII 2021 |
| ☐ | R2-06b | Penyedia pinjol: batasan/syarat | ketentuan penyelenggara | **117/DSN-MUI/II/2018** (bagian ketentuan) |

**Di luar daftar (jangan dicari dulu):** judi online, giveaway — AI sengaja menyerah sampai penasihat memutuskan.

## 3. Bahan pendukung (satu kali unduh, bukan per masalah)

| ✓ | Apa | Dari mana | Catatan |
|---|---|---|---|
| ☐ | Teks Arab Al-Qur'an (Uthmani) | tanzil.net | catat versi & tanggal; jangan diubah sama sekali |
| ☐ | Hadits Arab + derajat | GitHub `fawazahmed0/hadith-api`, edisi **`ara-*`** | catat commit; edisi `ind-*` jangan masuk data utama |

## 4. Per masalah, juga tulis (oleh manusia, bukan disalin)

| ✓ | Apa | Jumlah |
|---|---|---|
| ☐ | Contoh pertanyaan gaya siswa | 2–3 per masalah |
| ☐ | Istilah gaul → istilah kitab (mis. "telat ikut shalat" → "masbuq") | secukupnya |

## 5. Pembagian kerja usulan
- **Orang 1 (pencari):** isi formulir.
- **Orang 2 (pengecek):** cocokkan kutipan dengan PDF asli, huruf demi huruf.
- Simpan semua di satu folder bersama: `PDF/`, `formulir/`. Jangan kirim ke publik (lisensi belum jelas).
- Selesai satu masalah → centang ☐ → kirim ke pemilik proyek → Claude Code memasukkan lewat `ingest`.
