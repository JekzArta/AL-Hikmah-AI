/**
 * Stempel + validasi (spek §6.12, Lampiran E). Record uji dibuat di memori.
 * Teks Arab yang dipakai = kata umum (قَلَمٌ "pena", كِتَابٌ "buku"), BUKAN ayat/hadits.
 */
import { describe, expect, it } from "vitest";
import { ambilBahan, KodeTidakDikenal, LABEL_BELUM_DITINJAU, LABEL_DUMMY, rakit, stempelProsa, tukarKode } from "../core/jawaban/stempel.js";
import type { JawabanTerstruktur, PaketDalil } from "../core/jawaban/tipe.js";
import { validasiJawaban, type KonteksValidasi } from "../core/jawaban/validasi.js";
import { RepositoriMemori } from "../core/repositori/memori.js";
import type { Pendapat } from "../core/repositori/tipe.js";
import { dalilUji, sumberUji } from "./bantu.js";

const ARAB_UJI = "قَلَمٌ، كِتَابٌ"; // harakat + koma Arab: harus tersalin byte-per-byte

function pendapatUji(id: string, pemilik: string, syarat: string | null): Pendapat {
  return {
    id, masalah_id: "DUMMY-M-01", pemilik_pendapat: pemilik, jenis_pemilik: "dummy",
    kesimpulan_hukum: `[DUMMY] kesimpulan contoh ${pemilik}`, syarat_qayd: syarat, rujukan: "DUMMY hlm. 1",
    status_khilaf: null, penalaran: null, berlaku_sejak: null, dicabut_oleh: null, status_review: "dummy",
  };
}

async function siapkan() {
  const repo = new RepositoriMemori();
  await repo.simpanSumber([sumberUji]);
  await repo.simpanDalil([
    dalilUji("DUMMY-901", "[DUMMY] terjemahan contoh: pena dan buku.", { teks_arab: ARAB_UJI }),
    dalilUji("DUMMY-902", "[DUMMY] terjemahan contoh kedua [DUMMY-901] berkurung."),
  ]);
  await repo.simpanPendapat([pendapatUji("DUMMY-P-01", "Lembaga DUMMY A", "[DUMMY] syarat A"), pendapatUji("DUMMY-P-02", "Lembaga DUMMY B", null)]);
  const paket: PaketDalil = {
    dalil: [{ id: "DUMMY-901", peran: "pokok", dirujuk_oleh: ["DUMMY-P-01"] }, { id: "DUMMY-902", peran: "pendukung" }],
    pendapat: [{ kode: "PENDAPAT-1", id: "DUMMY-P-01" }, { kode: "PENDAPAT-2", id: "DUMMY-P-02" }],
  };
  const konteks: KonteksValidasi = {
    paket,
    statusRecord: { "DUMMY-901": "dummy", "DUMMY-902": "dummy", "DUMMY-P-01": "dummy", "DUMMY-P-02": "dummy" },
    pendapatBersyarat: ["PENDAPAT-1"],
  };
  return { repo, paket, konteks, bahan: await ambilBahan(repo, paket) };
}

const jawabanBaik = (): JawabanTerstruktur => ({
  ringkasan_pertanyaan: "pertanyaan contoh tentang pinjaman",
  penjelasan_istilah: ["Istilah contoh dijelaskan dengan analogi."],
  pendapat: [{ kode_pendapat: "[PENDAPAT-1]", pengantar: "Satu lembaga mencatat:" }, { kode_pendapat: "PENDAPAT-2", pengantar: "Lembaga lain mencatat:" }],
  rujukan_dalil: ["[DUMMY-901]"],
  catatan_syarat: ["[SYARAT-1]"],
  kalimat_batas: "Ini bukan fatwa untuk kasus pribadi.",
  catatan_ikhtilaf: "",
  mode_dipakai: "normal",
});

describe("validasi jawaban", () => {
  it("jawaban yang taat aturan lolos; label belum ditinjau wajib karena record dummy", async () => {
    const { konteks } = await siapkan();
    const h = validasiJawaban(jawabanBaik(), konteks);
    expect(h.alasan).toEqual([]);
    expect(h.lolos).toBe(true);
    expect(h.perluLabelBelumDitinjau).toBe(true);
  });

  it("label belum ditinjau TIDAK muncul bila semua record disetujui_penasihat", async () => {
    const { konteks } = await siapkan();
    const semuaOk = { ...konteks, statusRecord: Object.fromEntries(Object.keys(konteks.statusRecord).map((k) => [k, "disetujui_penasihat" as const])) };
    expect(validasiJawaban(jawabanBaik(), semuaOk).perluLabelBelumDitinjau).toBe(false);
  });

  it("skema rusak / kalimat_batas kosong -> ditolak", async () => {
    const { konteks } = await siapkan();
    expect(validasiJawaban({ halo: 1 }, konteks).lolos).toBe(false);
    const h = validasiJawaban({ ...jawabanBaik(), kalimat_batas: "  " }, konteks);
    expect(h.alasan.join()).toMatch(/kalimat_batas/);
  });

  it("kode asing di mana pun -> ditolak (termasuk di prosa dan salah ketik huruf kecil)", async () => {
    const { konteks } = await siapkan();
    for (const ubah of [
      { rujukan_dalil: ["[DUMMY-901]", "[QS-2:275]"] },
      { penjelasan_istilah: ["lihat [HR-BUKHARI-1]"] },
      { pendapat: [...jawabanBaik().pendapat, { kode_pendapat: "[PENDAPAT-3]", pengantar: "x" }] },
      { catatan_syarat: ["[SYARAT-2]"] }, // pendapat 2 tidak punya syarat
      { ringkasan_pertanyaan: "soal [dummy-901]" },
    ]) {
      const h = validasiJawaban({ ...jawabanBaik(), ...ubah }, konteks);
      expect(h.lolos, JSON.stringify(ubah)).toBe(false);
      expect(h.kodeAsing.length, JSON.stringify(ubah)).toBeGreaterThan(0);
    }
  });

  it("dalil pokok tidak dipakai -> ditolak; dalil pendukung boleh tidak dipakai", async () => {
    const { konteks } = await siapkan();
    const h = validasiJawaban({ ...jawabanBaik(), rujukan_dalil: [] }, konteks);
    expect(h.alasan.join()).toMatch(/pokok.*DUMMY-901/);
  });

  it("tidak semua pendapat disebut -> ditolak", async () => {
    const { konteks } = await siapkan();
    const h = validasiJawaban({ ...jawabanBaik(), pendapat: [jawabanBaik().pendapat[0]!] }, konteks);
    expect(h.alasan.join()).toMatch(/PENDAPAT-2/);
  });

  it("huruf Arab atau pola kutipan firman/sabda yang diketik AI -> ditolak", async () => {
    const { konteks } = await siapkan();
    expect(validasiJawaban({ ...jawabanBaik(), penjelasan_istilah: ["kata قلم artinya pena"] }, konteks).lolos).toBe(false);
    expect(validasiJawaban({ ...jawabanBaik(), penjelasan_istilah: ['Nabi bersabda: "contoh"'] }, konteks).lolos).toBe(false);
  });
});

describe("stempel", () => {
  it("teks stempel identik byte-per-byte dengan database", async () => {
    const { repo, bahan } = await siapkan();
    const [db] = await repo.ambilDalil(["DUMMY-901"]);
    const hasil = tukarKode("[DUMMY-901]", bahan);
    expect(hasil).toContain(LABEL_DUMMY);
    const baris = hasil.split("\n");
    expect(Buffer.from(baris[1]!)).toEqual(Buffer.from(db!.teks_arab));
    expect(Buffer.from(baris[2]!)).toEqual(Buffer.from(db!.terjemahan));
    expect(baris[1]).toBe(ARAB_UJI); // tidak dinormalisasi: harakat tetap ada
    expect(hasil).toContain("dirujuk oleh: Lembaga DUMMY A");
  });

  it("[PENDAPAT-n] terisi kesimpulan_hukum (kutipan persis) + atribusi; [SYARAT-n] dari syarat_qayd", async () => {
    const { bahan } = await siapkan();
    expect(tukarKode("PENDAPAT-2", bahan)).toBe(`Lembaga DUMMY B (DUMMY hlm. 1): ${LABEL_DUMMY}\n"[DUMMY] kesimpulan contoh Lembaga DUMMY B"`);
    expect(tukarKode("[SYARAT-1]", bahan)).toBe('Syarat menurut Lembaga DUMMY A: "[DUMMY] syarat A"');
  });

  it("kode asing ditolak stempel (pertahanan lapis kedua)", async () => {
    const { bahan } = await siapkan();
    expect(() => tukarKode("[QS-2:275]", bahan)).toThrow(KodeTidakDikenal);
    expect(() => stempelProsa("lihat [PENDAPAT-9]", bahan)).toThrow(KodeTidakDikenal);
  });

  it("teks database yang memuat [..] tidak ikut ditukar (satu lintasan)", async () => {
    const { bahan } = await siapkan();
    const hasil = stempelProsa("A [DUMMY-902] B [DUMMY-901]", bahan);
    expect(hasil).toContain("[DUMMY] terjemahan contoh kedua [DUMMY-901] berkurung.");
  });

  it("rakit: semua bagian + kalimat batas + label belum ditinjau", async () => {
    const { bahan, konteks } = await siapkan();
    const v = validasiJawaban(jawabanBaik(), konteks);
    const final = rakit(v.jawaban!, bahan, v.perluLabelBelumDitinjau);
    expect(final).toContain(ARAB_UJI);
    expect(final).toContain("Ini bukan fatwa untuk kasus pribadi.");
    expect(final).toContain('"[DUMMY] kesimpulan contoh Lembaga DUMMY A"');
    expect(final).toContain('"[DUMMY] kesimpulan contoh Lembaga DUMMY B"');
    expect(final.endsWith(LABEL_BELUM_DITINJAU)).toBe(true);
  });
});
