# Keputusan pemilik proyek yang mengubah/menambah spek

> Spek (`spek-prototipe-agent-al-hikmah.md`) tetap rujukan utama. Berkas ini mencatat keputusan pemilik proyek
> yang **lebih baru** dari spek, supaya Claude Code di sesi berikutnya tidak bingung. Pemilik proyek bisa
> memindahkannya ke spek (Riwayat dokumen) kapan saja.

| Tanggal | Keputusan | Status | Menggeser spek | Catatan Claude Code |
|---|---|---|---|---|
| 18 Nov 2026 | Stack **TypeScript (Node 20+)**; tim dev menyesuaikan | ✅ | §5.1 (❓ → ✅) | — |
| 18 Nov 2026 | Penyimpanan pakai **Supabase** (akun gratis terpisah), "biar kerasa pengembangannya" | ✅ | §5.1 (SQLite lokal), §1.3 | Lihat rancangan di bawah |
| 18 Nov 2026 | **UI basic boleh**, tidak rumit (yang membangun UI sungguhan tim dev) | ✅ arah; 💡 waktunya | §2 "Tidak masuk: UI" | Usulan: dibuat setelah pipeline bisa menjawab (setelah Fase 3), hanya untuk uji internal |
| 18 Nov 2026 | Repo: `github.com/JekzArta/AL-Hikmah-AI` | ✅ | — | — |

## Rancangan penyimpanan dengan Supabase (💡 usulan Claude Code)

- Pipeline hanya kenal **interface `Repositori`** (spek §6.2). Dua adapter:
  - **Supabase** (utama): dipakai `ingest`, `cari`, `chat`, `uji`.
  - **Memori** (Map di RAM): untuk tes unit, supaya tes cepat, gratis, dan tidak bergantung internet.
- Supabase = Postgres. Penggantinya di spek:
  - BM25 FTS5 → **full-text search Postgres** (`tsvector`, konfigurasi `simple`, `ts_rank_cd`). Ini bukan BM25 persis;
    karena RRF hanya memakai **urutan**, dampaknya diukur lewat ablation, bukan diasumsikan.
  - Cosine di kode → **pgvector** (atau tetap di kode; diputuskan di Fase 1 sesuai dimensi embedding).
  - Normalisasi Arab tetap di **kode kita** (fungsi yang sama untuk dokumen dan kueri). Uji tokenizer FTS5 diganti
    uji parser Postgres `simple` terhadap harakat.
- Akses lewat **HTTPS** (supabase-js / REST + fungsi SQL `rpc`), bukan koneksi Postgres langsung (port 5432
  biasanya tidak tembus dari container cloud).
- Migrasi = berkas SQL di repo (`supabase/migrations/`). Dijalankan pemilik proyek di **SQL Editor** Supabase
  (sekalian belajar), atau cara lain bila disepakati.
- Keamanan: **RLS aktif di semua tabel tanpa policy publik** (kunci anon tidak bisa membaca apa pun); CLI memakai
  kunci server dari environment variable.
- **Log percakapan tetap lokal** (spek §3.3: data sensitif), tidak dikirim ke Supabase, kecuali diputuskan lain.
- Catatan free tier (perlu dicek di dokumentasi Supabase saat Fase 1): proyek gratis bisa di-pause bila lama tidak
  aktif; `cek` memberi petunjuk bila Supabase tidak menjawab.
