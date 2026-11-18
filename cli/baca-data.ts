/** Membaca folder data (JSONL per tabel, spek §9.1) jadi BarisMentah. Baris JSON rusak dilaporkan. */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BarisMentah, DataMasuk } from "../core/ingest/validasi.js";

const TABEL = ["sumber", "dalil", "topik", "dalil_topik", "masalah", "pendapat", "pendapat_dalil"] as const;

export function bacaFolder(folder: string): { data: DataMasuk; rusak: string[] } {
  const data: DataMasuk = {};
  const rusak: string[] = [];
  for (const t of TABEL) {
    const jalur = join(folder, `${t}.jsonl`);
    if (!existsSync(jalur)) continue;
    const baris: BarisMentah[] = [];
    readFileSync(jalur, "utf8").split("\n").forEach((isi, i) => {
      if (!isi.trim()) return;
      try {
        baris.push({ berkas: `${t}.jsonl`, baris: i + 1, isi: JSON.parse(isi) });
      } catch {
        rusak.push(`${t}.jsonl:${i + 1} bukan JSON yang sah`);
      }
    });
    data[t] = baris;
  }
  return { data, rusak };
}
