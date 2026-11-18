/**
 * `npm run cari -- "<pertanyaan>" [--debug] [--mode=hybrid|bm25|embedding|acak] [--n=5]`
 * "Halaman pencarian polos": hanya retrieval (tanpa AI penjelas, tanpa gerbang — gerbang di Fase 2).
 */
import "dotenv/config";
import { konfigurasi } from "../config/config.js";
import { PencatatBiaya } from "../core/klien/biaya.js";
import { KlienOpenRouter } from "../core/klien/openrouter.js";
import { RepositoriSupabase } from "../core/repositori/supabase.js";
import { cari, type ModeCari } from "../core/retrieval/detektif.js";
import { catatGiliran, sesiBaru } from "../core/log/jejak.js";
import { labelDalil } from "../core/jawaban/stempel.js";

const arg = process.argv.slice(2);
const debug = arg.includes("--debug");
const mode = (arg.find((a) => a.startsWith("--mode="))?.split("=")[1] ?? "hybrid") as ModeCari;
const nTampil = Number(arg.find((a) => a.startsWith("--n="))?.split("=")[1] ?? 5);
const pertanyaan = arg.filter((a) => !a.startsWith("--")).join(" ").trim();
if (!pertanyaan || !["hybrid", "bm25", "embedding", "acak"].includes(mode)) {
  console.error('Pakai: npm run cari -- "<pertanyaan>" [--debug] [--mode=hybrid|bm25|embedding|acak] [--n=5]');
  process.exit(1);
}

const repo = RepositoriSupabase.dariEnv();
const biaya = new PencatatBiaya(konfigurasi.biaya.batas_usd_per_run);
const klien = new KlienOpenRouter({ kunci: process.env.OPENROUTER_API_KEY ?? "", biaya });
const r = konfigurasi.retrieval;

const h = await cari(pertanyaan, mode, {
  repo, klien, modelEmbedding: konfigurasi.model.embedding!, dimensi: konfigurasi.model.dimensi_embedding,
  rrfK: r.rrf_k, jumlah: r.jumlah_kandidat_detektif,
});

const tampil = h.kandidat.slice(0, nTampil);
const dalil = new Map((await repo.ambilDalil(tampil.map((k) => k.id))).map((d) => [d.id, d]));

console.log(`\nPertanyaan: "${pertanyaan}"   (mode: ${mode})`);
if (debug) {
  console.log(`[1] normalisasi -> kueri polos: "${h.kueriPolos}"`);
  console.log(`[2] jalur: ${Object.entries(h.jalur).map(([k, v]) => `${k}=${v.length} hasil`).join(" | ")}   rrf_k=${r.rrf_k}`);
  console.log("[3] kandidat (peringkat/skor mentah per jalur; '-' = tidak ditemukan jalur itu):");
  console.log("    #  id          bm25 (rank/skor)    emb (rank/cosine)    rrf");
  h.kandidat.forEach((k, i) => {
    const f = (c?: { peringkat: number; skor: number }, d = 4) => (c ? `${String(c.peringkat).padStart(2)}/${c.skor.toFixed(d)}` : "    -    ");
    console.log(`   ${String(i + 1).padStart(2)}  ${k.id.padEnd(10)}  ${f(k.komponen.bm25).padEnd(18)}  ${f(k.komponen.emb).padEnd(18)}  ${k.rrf.toFixed(5)}`);
  });
}

console.log(`\nTop ${tampil.length}:`);
tampil.forEach((k, i) => {
  const d = dalil.get(k.id);
  const isi = d ? d.terjemahan.slice(0, 110) + (d.terjemahan.length > 110 ? "…" : "") : "(tidak ditemukan)";
  console.log(` ${i + 1}. ${k.id}  ${d ? labelDalil(d) : ""}\n    ${isi}`);
});
if (tampil.length === 0) console.log(" (tidak ada kandidat)");

const sesi = sesiBaru();
const jalurLog = catatGiliran({
  sesiId: sesi, giliranKe: 1, perintah: "cari", pesanUser: pertanyaan, sensitif: false,
  status: "cari_saja", mode, kueriPolos: h.kueriPolos,
  kandidat: h.kandidat.map((k) => ({ id: k.id, bm25: k.komponen.bm25?.skor, emb: k.komponen.emb?.skor, rrf: k.rrf })),
  statusDalil: Object.fromEntries([...dalil.values()].map((d) => [d.id, d.status_review])),
  model: { embedding: konfigurasi.model.embedding },
  biaya: { token: biaya.totalToken, estimasiUsd: biaya.totalUsd },
}, konfigurasi.log);
console.log(`\nbiaya: ${biaya.ringkas()}${debug ? `\nlog: ${jalurLog}` : ""}`);
