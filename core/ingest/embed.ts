/**
 * Embed dalil (spek §6.3). Teks yang di-embed = terjemahan + header_netral
 * (BUKAN ringkasan AI). Cache: hash(model|dimensi|teks) disimpan; bila sama -> dilewati.
 */
import { createHash } from "node:crypto";
import type { KlienOpenRouter } from "../klien/openrouter.js";
import type { Dalil, Repositori } from "../repositori/tipe.js";

export function teksUntukEmbed(d: Pick<Dalil, "terjemahan" | "header_netral">): string {
  return d.header_netral ? `${d.terjemahan}\n${d.header_netral}` : d.terjemahan;
}

export function hashEmbed(model: string, dimensi: number, teks: string): string {
  return createHash("sha256").update(`${model}|${dimensi}|${teks}`).digest("hex");
}

export interface HasilEmbedDalil {
  diembed: string[];
  dilewati: string[];
}

export async function embedDalil(
  repo: Repositori,
  klien: KlienOpenRouter,
  model: string,
  dimensi: number,
  ukuranBatch = 32,
): Promise<HasilEmbedDalil> {
  const ids = await repo.ambilSemuaIdDalil();
  const dalil = await repo.ambilDalil(ids);
  const hashLama = await repo.hashEmbedding(ids);
  const perlu = dalil
    .map((d) => {
      const teks = teksUntukEmbed(d);
      return { d, teks, hash: hashEmbed(model, dimensi, teks) };
    })
    .filter((x) => hashLama.get(x.d.id) !== x.hash);
  const idPerlu = new Set(perlu.map((p) => p.d.id));

  for (let i = 0; i < perlu.length; i += ukuranBatch) {
    const batch = perlu.slice(i, i + ukuranBatch);
    const h = await klien.embed(batch.map((b) => b.teks), model, dimensi, "embedding_dokumen");
    for (const [j, b] of batch.entries()) {
      await repo.simpanEmbedding(b.d.id, { vektor: h.vektor[j]!, model, hash: b.hash });
    }
  }
  return { diembed: [...idPerlu], dilewati: ids.filter((i) => !idPerlu.has(i)) };
}
