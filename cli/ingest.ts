/**
 * `npm run ingest -- <folder>` — muat data (JSONL per tabel) ke Supabase, lalu embed.
 * Contoh: npm run ingest -- data/dummy
 */
import "dotenv/config";
import { konfigurasi } from "../config/config.js";
import { embedDalil } from "../core/ingest/embed.js";
import { formatPenolakan, muat } from "../core/ingest/muat.js";
import { PencatatBiaya } from "../core/klien/biaya.js";
import { KlienOpenRouter } from "../core/klien/openrouter.js";
import { RepositoriSupabase } from "../core/repositori/supabase.js";
import { bacaFolder } from "./baca-data.js";

const folder = process.argv[2];
if (!folder) {
  console.error("Pakai: npm run ingest -- <folder>   (contoh: npm run ingest -- data/dummy)");
  process.exit(1);
}

const { data, rusak } = bacaFolder(folder);
if (rusak.length) console.log(`Baris JSON rusak (dilewati):\n  - ${rusak.join("\n  - ")}`);

const repo = RepositoriSupabase.dariEnv();
const h = await muat(repo, data);
console.log("Tersimpan (upsert):", h.jumlah);
console.log(formatPenolakan(h.ditolak));

const model = konfigurasi.model.embedding;
if (!model) throw new Error("config.model.embedding belum diisi");
const biaya = new PencatatBiaya(konfigurasi.biaya.batas_usd_per_run);
const klien = new KlienOpenRouter({ kunci: process.env.OPENROUTER_API_KEY ?? "", biaya });
const e = await embedDalil(repo, klien, model, konfigurasi.model.dimensi_embedding);
console.log(`Embedding: ${e.diembed.length} baru/berubah, ${e.dilewati.length} dilewati (cache).`);
const provider = [...new Set(biaya.catatan.map((c) => c.provider).filter(Boolean))];
console.log(`Biaya run: ${biaya.ringkas()}${provider.length ? ` | provider: ${provider.join(", ")}` : ""}`);
