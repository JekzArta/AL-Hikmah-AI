/**
 * `npm run uji-parser` — bagaimana parser `simple` di SUPABASE memecah teks Arab berharakat.
 * (Pengganti uji tokenizer FTS5 di spek §6.3; lihat keputusan-pemilik.md.)
 */
import "dotenv/config";
import { RepositoriSupabase } from "../core/repositori/supabase.js";
import { normalisasi } from "../core/retrieval/normalisasi.js";

const repo = RepositoriSupabase.dariEnv();
// kata umum, bukan ayat/hadits: مدرسة = sekolah
for (const [label, teks] of [
  ["berharakat", "مَدْرَسَةٌ"],
  ["polos", "مدرسة"],
  ["tatwil", "مدرســة"],
  ["dinormalisasi", normalisasi("مَدْرَسَةٌ")],
] as const) {
  console.log(`${label.padEnd(14)} ${teks.padEnd(12)} -> ${await repo.ujiParser(teks)}`);
}
