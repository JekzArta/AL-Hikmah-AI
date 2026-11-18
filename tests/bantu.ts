import type { Dalil, Sumber } from "../core/repositori/tipe.js";

export const sumberUji: Sumber = {
  id: "DUMMY-SUMBER", nama: "Sumber DUMMY uji", jenis: "dummy", url: null,
  lisensi: "dummy (uji kabel)", tanggal_akses: null, izin_ref: null, boleh_tampil_komersial: "tidak",
};

export function dalilUji(id: string, terjemahan: string, ubah: Partial<Dalil> = {}): Dalil {
  return {
    id, jenis: "teks", teks_arab: "[DUMMY]", teks_arab_polos: "dummy", terjemahan,
    sumber_id: sumberUji.id, header_netral: "", istilah_latin: "", tag: [], status_review: "dummy",
    tingkat_otoritas: null, berlaku_sejak: null, dicabut_oleh: null, ...ubah,
  };
}
