/**
 * `npm run ablation -- [berkas_set_uji.csv] [--label=dummy]`
 * Ablation mini (spek §6.6, §6.17): acak vs BM25-saja vs embedding-saja vs hybrid.
 * Kolom CSV minimal: pertanyaan, dalil_id_benar (pisah ; bila lebih dari satu).
 * Laporan -> reports/ablation-<label>-<tanggal>.md (+ .jsonl data mentah).
 * DATA DUMMY TIDAK MENILAI KUALITAS; label laporan wajib menyebut sumber datanya.
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { konfigurasi } from "../config/config.js";
import { PencatatBiaya } from "../core/klien/biaya.js";
import { KlienOpenRouter } from "../core/klien/openrouter.js";
import { RepositoriSupabase } from "../core/repositori/supabase.js";
import { acakBerseed, cari, type ModeCari } from "../core/retrieval/detektif.js";
import { peringkatBenar, ringkas } from "../core/retrieval/metrik.js";
import { bacaCsv } from "./csv.js";

const arg = process.argv.slice(2);
const berkas = arg.find((a) => !a.startsWith("--")) ?? "data/dummy/set_uji_dummy.csv";
const label = arg.find((a) => a.startsWith("--label="))?.split("=")[1] ?? (berkas.includes("dummy") ? "dummy" : "data");
const SEED_ACAK = 20; // baseline acak dirata-rata atas 20 seed tetap

const soal = bacaCsv(readFileSync(berkas, "utf8"))
  .map((r) => ({ pertanyaan: r.pertanyaan ?? "", benar: (r.dalil_id_benar ?? "").split(";").map((s) => s.trim()).filter(Boolean) }))
  .filter((s) => s.pertanyaan && s.benar.length);
if (soal.length === 0) throw new Error(`Tidak ada soal dengan dalil_id_benar di ${berkas}`);

const repo = RepositoriSupabase.dariEnv();
const biaya = new PencatatBiaya(konfigurasi.biaya.batas_usd_per_run);
const klien = new KlienOpenRouter({ kunci: process.env.OPENROUTER_API_KEY ?? "", biaya });
const cacheKueri = new Map<string, number[]>();
const r = konfigurasi.retrieval;
const dasar = {
  repo, klien, cacheKueri, modelEmbedding: konfigurasi.model.embedding!,
  dimensi: konfigurasi.model.dimensi_embedding, rrfK: r.rrf_k, jumlah: r.jumlah_kandidat_detektif,
};
const totalDalil = (await repo.ambilSemuaIdDalil()).length;

const mentah: object[] = [];
const hasil: Record<string, ReturnType<typeof ringkas>> = {};
for (const mode of ["acak", "bm25", "embedding", "hybrid"] as ModeCari[]) {
  const semua: (number | null)[] = [];
  const ulang = mode === "acak" ? SEED_ACAK : 1;
  for (let seed = 1; seed <= ulang; seed++) {
    for (const s of soal) {
      const h = await cari(s.pertanyaan, mode, { ...dasar, acak: acakBerseed(seed) });
      const p = peringkatBenar(h.kandidat.map((k) => k.id), s.benar);
      semua.push(p);
      if (mode !== "acak" || seed === 1) {
        mentah.push({ mode, seed: mode === "acak" ? seed : undefined, pertanyaan: s.pertanyaan, benar: s.benar, peringkat: p, top3: h.kandidat.slice(0, 3).map((k) => k.id) });
      }
    }
  }
  hasil[mode] = ringkas(semua);
}

const tgl = new Date().toISOString().slice(0, 10);
const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
const md = [
  `# Ablation mini — ${label} (${tgl})`,
  "",
  label === "dummy"
    ? "> ⚠️ **DATA DUMMY.** Hanya membuktikan kabel tersambung. **Tidak menilai kualitas retrieval.**"
    : "> Data: lihat label.",
  "",
  `Set uji: \`${berkas}\` (${soal.length} soal) · dalil di database: ${totalDalil} · rrf_k=${r.rrf_k} · kandidat=${r.jumlah_kandidat_detektif} · embedding: ${konfigurasi.model.embedding}`,
  `Baseline acak dirata-rata atas ${SEED_ACAK} seed tetap.`,
  "",
  "| Mode | Hit@1 | Hit@3 | MRR |",
  "|---|---|---|---|",
  ...Object.entries(hasil).map(([m, x]) => `| ${m} | ${pct(x.hit1)} | ${pct(x.hit3)} | ${x.mrr.toFixed(3)} |`),
  "",
  `Hit@k = proporsi soal yang dalil benarnya ada di k teratas. MRR = rata-rata 1/peringkat. Biaya run: ${biaya.ringkas()}.`,
  "",
].join("\n");

mkdirSync("reports", { recursive: true });
const dasarNama = `reports/ablation-${label}-${tgl}`;
writeFileSync(`${dasarNama}.md`, md);
writeFileSync(`${dasarNama}.jsonl`, mentah.map((m) => JSON.stringify(m)).join("\n") + "\n");
console.log(md);
console.log(`Tersimpan: ${dasarNama}.md (+ .jsonl)`);
