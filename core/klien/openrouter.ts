/**
 * Klien OpenRouter (spek §6.1). Bentuk request/response mengikuti REKAMAN ASLI
 * (tests/fixtures/rekaman/, docs/catatan-api.md), bukan tebakan.
 * Kunci API tidak pernah dicetak; pesan error disensor.
 */
import { z } from "zod";
import type { PencatatBiaya } from "./biaya.js";

const URL_DASAR = "https://openrouter.ai/api/v1";

const SkemaEmbeddings = z.object({
  data: z.array(z.object({ embedding: z.array(z.number()), index: z.number().int() })),
  model: z.string().optional(),
  provider: z.string().optional(),
  usage: z
    .object({
      prompt_tokens: z.number().optional(),
      total_tokens: z.number().optional(),
      cost: z.number().optional(),
    })
    .optional(),
});

export type Fetch = typeof fetch;

export interface OpsiKlien {
  kunci: string;
  biaya: PencatatBiaya;
  fetch?: Fetch;
}

export interface HasilEmbed {
  vektor: number[][];
  provider: string | null;
  token: number;
  usd: number;
}

export class KlienOpenRouter {
  private readonly f: Fetch;
  constructor(private readonly o: OpsiKlien) {
    this.f = o.fetch ?? fetch;
  }

  private async post(jalur: string, body: unknown): Promise<unknown> {
    const res = await this.f(`${URL_DASAR}${jalur}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.o.kunci}`,
        "Content-Type": "application/json",
        "X-OpenRouter-Title": "Al Hikmah prototipe",
      },
      body: JSON.stringify(body),
    });
    const teks = await res.text();
    if (!res.ok) {
      const aman = teks.split(this.o.kunci).join("[DISENSOR]").slice(0, 300);
      const petunjuk = res.status === 402 || /limit/i.test(aman) ? " (credit limit OpenRouter habis? cek `npm run cek`)" : "";
      throw new Error(`OpenRouter ${jalur} HTTP ${res.status}${petunjuk}: ${aman}`);
    }
    return JSON.parse(teks);
  }

  /**
   * Embedding beberapa teks sekaligus. `dimensi` = panjang vektor yang diharapkan;
   * panjang beda -> error (jangan campur vektor beda ukuran/model).
   */
  async embed(teks: string[], model: string, dimensi: number, tahap = "embedding"): Promise<HasilEmbed> {
    this.o.biaya.pastikanMasihBoleh(tahap);
    const json = SkemaEmbeddings.parse(await this.post("/embeddings", { model, input: teks }));
    const urut = [...json.data].sort((a, b) => a.index - b.index);
    if (urut.length !== teks.length) throw new Error(`embedding: minta ${teks.length}, dapat ${urut.length}`);
    for (const d of urut) {
      if (d.embedding.length !== dimensi) throw new Error(`embedding: panjang ${d.embedding.length}, harusnya ${dimensi}`);
    }
    const token = json.usage?.total_tokens ?? json.usage?.prompt_tokens ?? 0;
    const usd = json.usage?.cost ?? 0;
    this.o.biaya.tambah({ tahap, model, token, usd, provider: json.provider });
    return { vektor: urut.map((d) => d.embedding), provider: json.provider ?? null, token, usd };
  }
}
