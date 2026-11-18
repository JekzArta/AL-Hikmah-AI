/**
 * Pencatat token & biaya per run (spek §3.3, §6.1). Analogi: argo taksi dengan rem otomatis.
 * Sebelum tiap panggilan berbayar dicek; bila total sudah >= batas, panggilan DITOLAK
 * dengan pesan jelas (bukan diam-diam lanjut).
 */
export class BatasBiayaTerlampaui extends Error {}

export interface CatatanBiaya {
  tahap: string;
  model: string;
  token: number;
  usd: number;
  provider?: string;
}

export class PencatatBiaya {
  readonly catatan: CatatanBiaya[] = [];
  constructor(readonly batasUsd: number) {}

  get totalUsd(): number {
    return this.catatan.reduce((s, c) => s + c.usd, 0);
  }
  get totalToken(): number {
    return this.catatan.reduce((s, c) => s + c.token, 0);
  }

  /** Panggil SEBELUM tiap panggilan berbayar. */
  pastikanMasihBoleh(tahap: string): void {
    if (this.totalUsd >= this.batasUsd) {
      throw new BatasBiayaTerlampaui(
        `Batas biaya per run ($${this.batasUsd}) tercapai sebelum tahap "${tahap}" ` +
          `(terpakai ≈ $${this.totalUsd.toFixed(6)}). Naikkan biaya.batas_usd_per_run di config bila memang perlu.`,
      );
    }
  }

  tambah(c: CatatanBiaya): void {
    this.catatan.push(c);
  }

  ringkas(): string {
    return `${this.totalToken} token, ≈ $${this.totalUsd.toFixed(6)} (batas run $${this.batasUsd})`;
  }
}
