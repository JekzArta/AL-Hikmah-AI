/**
 * Adapter memori (Map di RAM) untuk tes: cepat, gratis, tanpa internet.
 * Pencarian kata memakai BM25 di kode (Supabase memakai ts_rank_cd); keduanya hanya
 * dipakai lewat URUTAN oleh RRF.
 */
import { bm25, cosine, urutkan } from "../retrieval/skor.js";
import type {
  Dalil, DalilTopik, Embedding, Hit, Masalah, Pendapat, PendapatDalil, Repositori, Sumber, Topik,
} from "./tipe.js";

export class RepositoriMemori implements Repositori {
  readonly sumber = new Map<string, Sumber>();
  readonly dalil = new Map<string, Dalil>();
  readonly topik = new Map<string, Topik>();
  readonly dalilTopik = new Map<string, DalilTopik>();
  readonly masalah = new Map<string, Masalah>();
  readonly pendapat = new Map<string, Pendapat>();
  readonly pendapatDalil = new Map<string, PendapatDalil>();
  readonly embedding = new Map<string, Embedding>();

  async simpanSumber(b: Sumber[]) { for (const x of b) this.sumber.set(x.id, { ...x }); }
  async simpanDalil(b: Dalil[]) {
    for (const x of b) {
      if (!this.sumber.has(x.sumber_id)) throw new Error(`FK: sumber ${x.sumber_id} tidak ada`);
      this.dalil.set(x.id, { ...x, tag: [...x.tag] });
    }
  }
  async simpanTopik(b: Topik[]) { for (const x of b) this.topik.set(x.id, { ...x }); }
  async simpanDalilTopik(b: DalilTopik[]) { for (const x of b) this.dalilTopik.set(`${x.dalil_id}|${x.topik_id}`, { ...x }); }
  async simpanMasalah(b: Masalah[]) { for (const x of b) this.masalah.set(x.id, { ...x }); }
  async simpanPendapat(b: Pendapat[]) { for (const x of b) this.pendapat.set(x.id, { ...x }); }
  async simpanPendapatDalil(b: PendapatDalil[]) { for (const x of b) this.pendapatDalil.set(`${x.pendapat_id}|${x.dalil_id}`, { ...x }); }
  async simpanEmbedding(id: string, e: Embedding) {
    if (!this.dalil.has(id)) throw new Error(`dalil ${id} tidak ada`);
    this.embedding.set(id, { ...e, vektor: [...e.vektor] });
  }
  async hapusDalil(ids: string[]) {
    for (const id of ids) {
      this.dalil.delete(id);
      this.embedding.delete(id);
      for (const [k, v] of this.dalilTopik) if (v.dalil_id === id) this.dalilTopik.delete(k);
      for (const [k, v] of this.pendapatDalil) if (v.dalil_id === id) this.pendapatDalil.delete(k);
    }
  }

  async idSumberYangAda(ids: string[]) { return new Set(ids.filter((i) => this.sumber.has(i))); }
  async ambilDalil(ids: string[]) {
    return ids.flatMap((i) => { const d = this.dalil.get(i); return d ? [{ ...d, tag: [...d.tag] }] : []; });
  }
  async ambilPendapat(ids: string[]) {
    return ids.flatMap((i) => { const p = this.pendapat.get(i); return p ? [{ ...p }] : []; });
  }
  async ambilSemuaIdDalil() { return [...this.dalil.keys()].sort(); }
  async hashEmbedding(ids: string[]) {
    return new Map(ids.map((i) => [i, this.embedding.get(i)?.hash ?? null] as const));
  }

  async cariTeks(kueriPolos: string, jumlah: number): Promise<Hit[]> {
    const dok = [...this.dalil.values()].map((d) => ({
      id: d.id, teks: `${d.teks_arab_polos} ${d.terjemahan} ${d.istilah_latin}`,
    }));
    return bm25(dok, kueriPolos).slice(0, jumlah);
  }
  async cariEmbedding(vektor: number[], jumlah: number): Promise<Hit[]> {
    const hit = [...this.embedding.entries()].map(([id, e]) => ({ id, skor: cosine(vektor, e.vektor) }));
    return urutkan(hit).slice(0, jumlah);
  }
}
