# Catatan API (Fase 0)

## ✅ Terverifikasi langsung (18 Nov 2026, `GET /api/v1/models?output_modalities=all`)

Bagian ini **menang** atas bagian [R] di bawahnya.

| Peran | Slug | Konteks | Harga in / out per 1M | Catatan |
|---|---|---|---|---|
| Embedding | `qwen/qwen3-embedding-8b` | 40.960 | $0,01 / – | modalitas `embeddings` |
| Reranker | `mongodb/rerank-3` | 32.000 | listing menulis `0` / `0` | **bukan `voyageai/`**; Voyage kini di bawah MongoDB. Cara penagihan rerank **[TV]**, cek `usage.cost` di panggilan pertama |
| Keputusan | `typesafe/jev-1.14` | 262.144 | $0,042 / $0 | modalitas `decisions`; juga ada `typesafe/jev-1.13`, `~typesafe/jev-latest` (jangan saat uji) |
| Kandidat teks | `anthropic/claude-haiku-5.5` | 1.000.000 | $0,10 / $0,50 | mendukung `structured_outputs` |
| Kandidat teks | `deepseek/deepseek-v4.1-flash` | 1.048.576 | $0,051 / $0,567 | juga snapshot `deepseek/deepseek-v4.1-flash-1017` ($0,036 / $0,50) |
| Kandidat teks | `z-ai/glm-5.3-flash` | 1.048.576 | **$0,15 / $0,50** | **lebih mahal dari spek** ($0,075/$0,25) |

Catatan: semua kandidat teks mencantumkan `structured_outputs`. Daftar model biasa (`/api/v1/models` tanpa filter) **tidak**
memuat reranker dan Jev; harus pakai `?output_modalities=all`. Endpoint rerank/decisions sendiri belum dipanggil:
bentuk request/response direkam sebagai fixture saat Fase 1/2.

---

> **Status bagian di bawah: SEMENTARA.** Ditulis 18 Nov 2026. Dari container sesi ini, openrouter.ai dan docs.typesafe.ai **diblokir
> kebijakan jaringan**, jadi semua isi di bawah berasal dari **ringkasan hasil pencarian web** atas halaman resmi
> openrouter.ai, **bukan bacaan langsung** halamannya. Wajib diverifikasi ulang begitu `openrouter.ai` diizinkan:
> panggil `GET /api/v1/models` dan rekam satu request/response nyata per endpoint sebagai fixture.
> Slug di `config/config.ts` sengaja masih `null` sampai verifikasi itu.
>
> Penanda: **[R]** = muncul di ringkasan halaman resmi (belum dibaca langsung) · **[TV]** = tidak terverifikasi.

## 1. Chat completions
- `POST https://openrouter.ai/api/v1/chat/completions`, header `Authorization: Bearer <key>`; body `model`, `messages`. [R] https://openrouter.ai/docs/quickstart
- Header atribusi opsional: `HTTP-Referer`, `X-OpenRouter-Title` (`X-Title` lama masih diterima). [R]
- **Structured output:** `response_format: {type: "json_schema", json_schema: {name, strict: true, schema}}`. Dukungan **per provider**, bukan per model → kirim `provider: {require_parameters: true}` agar tidak dirutekan ke provider yang diam-diam mengabaikannya. Keluaran tetap divalidasi Zod. [R] https://openrouter.ai/docs/guides/features/structured-outputs
- **Biaya:** `usage` selalu ada: `prompt_tokens`, `completion_tokens`, `cost`. Parameter `usage: {include: true}` **deprecated, jangan dipakai**. Alternatif: `GET /api/v1/generation?id=<id>` → `total_cost`. [R] https://openrouter.ai/docs/guides/administration/usage-accounting
- Contoh JSON verbatim: [TV].

## 2. Embeddings
- `POST https://openrouter.ai/api/v1/embeddings`; body `model`, `input` (string/array), opsional `dimensions`, `encoding_format`, `input_type`, `provider`; respons `data[].embedding`. [R] https://openrouter.ai/docs/api_reference/embeddings
- `qwen/qwen3-embedding-8b`, $0,01/1M. [R] Dimensi default 4096 hanya disebut di blog [TV]; konteks (32K vs 40.960) [TV]. Bentuk `usage` embeddings [TV].
- Dampak desain: 4096 dimensi melebihi batas indeks pgvector biasa (HNSW/IVFFlat ±2000 dimensi), **[TV]**. Pada skala 20–30 dalil, indeks tidak perlu: cosine di kode atau scan penuh cukup. Opsi `dimensions` bisa memperkecil; diputuskan di Fase 1.

## 3. Rerank
- `POST https://openrouter.ai/api/v1/rerank`; body `{model, query, documents[], top_n?}`; respons `results[]{index, relevance_score, document}` + `usage`. Jadi **skor mentah dikembalikan**. Apakah persis sama dengan skor Voyage asli tetap dicek di Fase 2 (spek §6.7). [R] https://openrouter.ai/docs/api/api-reference/rerank/submit-a-rerank-request
- Voyage rerank-3: $0,05/1M, maks 32K token per pasangan. **Namespace slug ambigu** (`voyageai/rerank-3` vs `mongodb/rerank-3`) [TV]. Ada juga `rerank-2.5` ($0,05) dan `rerank-3-lite` ($0,02).

## 4. Model teks (kandidat penyusun ulang / penjelas)
| Slug [R] | Konteks | Harga in/out per 1M | Catatan |
|---|---|---|---|
| `anthropic/claude-haiku-5.5` | 1M | $0,10 / $0,50 | cocok dengan spek |
| `deepseek/deepseek-v4.1-flash` | 1M | **[TV]**: $0,0507/$0,2028 (diskon) vs $0,15/$0,60 (slug bertanggal `-20260910`) | spek pakai angka kedua |
| `z-ai/glm-5.3-flash` | 1M | **[TV]**: beberapa angka ($0,0399/$0,0784; $0,075/$0,25) | ada varian `:free`, `:batch` |

Prinsip: **kunci slug bertanggal** bila tersedia (spek: kunci versi model).

## 5. Jev (TypeSafe AI) — Decisions API
- Model keputusan, **tidak menghasilkan teks**; mengembalikan probabilitas atas pilihan yang ditentukan. [R] https://openrouter.ai/docs/guides/community/jev
- Slug: `typesafe/jev-1.14`, `typesafe/jev-1.13`, alias `~typesafe/jev-latest` (**jangan dipakai saat uji**), `typesafe/jev-router`. [R]
- Endpoint: `POST https://openrouter.ai/api/alpha/decisions` (**alpha**), memakai **kunci OpenRouter biasa**. [R] https://openrouter.ai/docs/guides/features/decisions
- Request: `{model, state: {...}, questions: {...}}`; tipe pertanyaan `noul` (ya/tidak), `choice`, `score`, `box` (box hanya 1.14; 1.13 → HTTP 400). [R]
- Respons (choice): `choice`, `probabilities` per opsi, `confidence`. `confidence`/`probabilities` **opsional di skema** → kode harus menangani nilai hilang (= gagal → fail-safe spek §6.4). [R]
- Konteks 262.144 token; harga 1.13 = 1.14 = $0,042/1M input, $0 output. [R] https://openrouter.ai/typesafe/jev-1.14
- **Bahasa Indonesia/gaul: [TV]**, cuma ada klaim umum "multilingual". Sesuai spek, harus diuji.
- Satu panggilan bisa memuat beberapa `questions`. Spek ✅ tetap **satu pertanyaan per panggilan** sampai uji membuktikan lain.

## 6. Credit limit
- Tiap key bisa diberi `limit` dan `limit_reset` (daily/weekly/monthly/null) lewat dashboard. Key yang habis → 402 (sebagian sumber: 403) dengan `limit_source: "openrouter_key_limit"`. Tangani lewat `limit_source`, jangan hanya status code. [R] https://openrouter.ai/docs/api_reference/limits

## 7. Cek kunci (dipakai `npm run cek`)
- `GET https://openrouter.ai/api/v1/key` + Bearer → `{data: {limit, limit_remaining, limit_reset, usage, usage_daily, ...}}`. [R] https://openrouter.ai/docs/api/api-reference/api-keys/get-current-api-key

## Berbeda dari / menambah spek
1. Rerank-3 ada, tapi namespace slug ambigu; ada `rerank-2.5` dengan harga sama. Pilihan = verifikasi lewat `/api/v1/models`.
2. Harga DeepSeek V4.1 Flash dan GLM 5.3 Flash di spek tidak pasti berlaku. Ini tidak mengubah keputusan, karena model penjelas dipilih dari **pelanggaran paling sedikit**, bukan harga.
3. Jangan kirim `usage: {include: true}` (deprecated); `usage.cost` sudah selalu ada. Ini bagus untuk pencatatan biaya per giliran.
4. Structured output wajib `provider.require_parameters: true`.
5. Embedding Qwen3 8B kemungkinan 4096 dimensi, relevan untuk pilihan pgvector di Supabase (lihat `keputusan-pemilik.md`).

## Jaringan sesi cloud (fakta dari sesi ini)
- Diblokir saat ini: `openrouter.ai`, `supabase.com` (dan proyek `<ref>.supabase.co` kemungkinan juga). Perlu ditambahkan di Allowed domains.
- Node `fetch` bawaan tidak membaca `HTTPS_PROXY`; skrip memakai `NODE_USE_ENV_PROXY=1` (Node ≥ 22.21). Di komputer lokal tidak berpengaruh.
