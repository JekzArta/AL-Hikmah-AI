/**
 * Fungsi murni untuk `npm run cek` (dipisah supaya bisa dites tanpa jaringan).
 * Aturan: nilai kunci TIDAK PERNAH dicetak, termasuk di pesan error.
 */

export type StatusCek = "OK" | "PERINGATAN" | "GAGAL";

export interface HasilCek {
  nama: string;
  status: StatusCek;
  pesan: string;
}

/** Node 20+ wajib (spek §5.1). */
export function cekVersiNode(versi: string): HasilCek {
  const mayor = Number(versi.replace(/^v/, "").split(".")[0]);
  if (Number.isFinite(mayor) && mayor >= 20) {
    return { nama: "Versi Node", status: "OK", pesan: `${versi} (butuh >= 20)` };
  }
  return { nama: "Versi Node", status: "GAGAL", pesan: `${versi} — butuh Node 20 atau lebih baru` };
}

/** Melaporkan ada/tidaknya variabel rahasia tanpa membocorkan isinya. */
export function cekVariabel(
  nama: string,
  nilai: string | undefined,
  wajibSekarang: boolean,
  catatanBelumWajib = "",
): HasilCek {
  if (nilai && nilai.trim().length > 0) {
    return { nama, status: "OK", pesan: "terbaca (nilai tidak dicetak)" };
  }
  return wajibSekarang
    ? { nama, status: "GAGAL", pesan: "kosong — isi di .env atau environment variable (lihat .env.example)" }
    : { nama, status: "PERINGATAN", pesan: `kosong${catatanBelumWajib ? ` — ${catatanBelumWajib}` : ""}` };
}

/** Hapus semua kemunculan rahasia dari teks sebelum dicetak. */
export function sensor(teks: string, rahasia: Array<string | undefined>): string {
  let hasil = teks;
  for (const r of rahasia) {
    if (r && r.length >= 4) hasil = hasil.split(r).join("[DISENSOR]");
  }
  return hasil;
}

/** Ringkas info kunci OpenRouter (GET /api/v1/key) tanpa mencetak kunci. */
export function ringkasInfoKunci(json: unknown): string {
  const data = (json as { data?: Record<string, unknown> } | null)?.data;
  if (!data || typeof data !== "object") return "respons tanpa field `data` (bentuk tidak dikenal; cek docs/catatan-api.md)";
  const limit = data["limit"];
  const sisa = data["limit_remaining"];
  const terpakai = data["usage"];
  const bagian: string[] = [];
  if (limit === null || limit === undefined) {
    bagian.push("credit limit BELUM dipasang (disarankan pasang, spek §3.3)");
  } else {
    bagian.push(`credit limit: ${String(limit)}`);
    if (sisa !== undefined && sisa !== null) bagian.push(`sisa: ${String(sisa)}`);
  }
  if (typeof terpakai === "number") bagian.push(`terpakai: ${terpakai}`);
  return bagian.join(" | ");
}

export function formatHasil(hasil: HasilCek[]): string {
  const ikon: Record<StatusCek, string> = { OK: "✔", PERINGATAN: "!", GAGAL: "✘" };
  return hasil.map((h) => `${ikon[h.status]} [${h.status}] ${h.nama}: ${h.pesan}`).join("\n");
}
