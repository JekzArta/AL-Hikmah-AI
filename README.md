# Al Hikmah AI — prototipe AI agent (internal)

> ⚠️ **Prototipe internal. BELUM boleh dicoba user publik/siswa** sebelum ditinjau penasihat syariah dan psikolog.
> Jawaban sistem **bukan fatwa**.

Fitur AI tanya-jawab Islami berbasis RAG untuk aplikasi siswa Al Hikmah (aplikasinya dibangun tim dev).
Sistem mencari dalil di database sendiri; AI hanya menulis kode dalil, teks asli ditempel oleh mesin stempel.

## Status
Fase 0 (fondasi). Belum ada logika pipeline.

## Persiapan
1. Node 20+.
2. `npm install`
3. Isi rahasia (lihat `.env.example`): lokal di `.env`, atau environment variable di sesi cloud.
4. `npm run cek` → harus berakhir dengan `CEK HIJAU`.

## Perintah
| Perintah | Fungsi | Status |
|---|---|---|
| `npm run cek` | Cek Node, kunci (tanpa dicetak), koneksi OpenRouter & Supabase | ada |
| `npm test` | Tes unit | ada |
| `npm run typecheck` | Cek tipe TypeScript | ada |
| `ingest`, `cari`, `chat`, `uji` | Pipeline | menyusul (Fase 1+) |

## Struktur
```
config/   konfigurasi tunggal (model, ambang, slot, batas biaya)
prompts/  prompt berversi
core/     pipeline murni (handleTurn), tanpa I/O terminal
cli/      pembungkus tipis
data/     berkas masukan lokal (gitignored)
reports/  laporan evaluasi
tests/    tes unit + fixture rekam/putar ulang
docs/     spek, panduan fase, konteks, referensi, catatan API, buku kasus
```

## Dokumen
- `docs/spek-prototipe-agent-al-hikmah.md` — desain & alasan (menang bila konflik)
- `docs/PANDUAN-FASE-CLAUDE-CODE.md` — peta kerja per fase
- `docs/keputusan-pemilik.md` — keputusan yang lebih baru dari spek
- `docs/catatan-api.md` — bentuk API yang sebenarnya (hasil baca dokumentasi resmi)
- `docs/buku-kasus.md` — catatan kegagalan nyata
