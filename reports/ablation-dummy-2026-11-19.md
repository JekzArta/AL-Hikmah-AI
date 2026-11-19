# Ablation mini — dummy (2026-11-19)

> ⚠️ **DATA DUMMY.** Hanya membuktikan kabel tersambung. **Tidak menilai kualitas retrieval.**

Set uji: `data/dummy/set_uji_dummy.csv` (7 soal) · dalil di database: 8 · rrf_k=60 · kandidat=20 · embedding: qwen/qwen3-embedding-8b
Baseline acak dirata-rata atas 20 seed tetap.

| Mode | Hit@1 | Hit@3 | MRR |
|---|---|---|---|
| acak | 12% | 35% | 0.330 |
| bm25 | 71% | 86% | 0.786 |
| embedding | 100% | 100% | 1.000 |
| hybrid | 100% | 100% | 1.000 |

Hit@k = proporsi soal yang dalil benarnya ada di k teratas. MRR = rata-rata 1/peringkat. Biaya run: 102 token, ≈ $0.000001 (batas run $0.5).
