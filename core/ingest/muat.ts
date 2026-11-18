/**
 * Menyimpan data yang SUDAH lolos validasi, urut sesuai ketergantungan (sumber dulu, dst.).
 * Semua operasi upsert -> idempoten (dijalankan ulang tidak menggandakan baris).
 */
import type { Repositori } from "../repositori/tipe.js";
import { validasi, type DataMasuk, type Penolakan } from "./validasi.js";

export interface HasilMuat {
  jumlah: Record<string, number>;
  ditolak: Penolakan[];
}

export async function muat(repo: Repositori, masuk: DataMasuk): Promise<HasilMuat> {
  const idSumberDalil = (masuk.dalil ?? []).map((b) => String((b.isi as { sumber_id?: unknown })?.sumber_id ?? ""));
  const sudahAdaSumber = await repo.idSumberYangAda([...new Set(idSumberDalil)].filter(Boolean));
  const sudahAdaDalil = new Set(await repo.ambilSemuaIdDalil());

  const { sah, ditolak } = validasi(masuk, { sumber: sudahAdaSumber, dalil: sudahAdaDalil });

  await repo.simpanSumber(sah.sumber);
  await repo.simpanDalil(sah.dalil);
  await repo.simpanTopik(sah.topik);
  await repo.simpanDalilTopik(sah.dalil_topik);
  await repo.simpanMasalah(sah.masalah);
  await repo.simpanPendapat(sah.pendapat);
  await repo.simpanPendapatDalil(sah.pendapat_dalil);

  return {
    jumlah: Object.fromEntries(Object.entries(sah).map(([k, v]) => [k, v.length])),
    ditolak,
  };
}

export function formatPenolakan(ditolak: Penolakan[]): string {
  if (ditolak.length === 0) return "Tidak ada baris yang ditolak.";
  return [
    `${ditolak.length} baris DITOLAK:`,
    ...ditolak.map((d) => `  - ${d.berkas}:${d.baris} [${d.id}] ${d.alasan}`),
  ].join("\n");
}
