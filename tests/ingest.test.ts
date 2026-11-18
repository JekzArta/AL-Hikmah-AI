import { describe, expect, it } from "vitest";
import { muat } from "../core/ingest/muat.js";
import { validasi, type BarisMentah } from "../core/ingest/validasi.js";
import { RepositoriMemori } from "../core/repositori/memori.js";
import { bacaFolder } from "../cli/baca-data.js";

const b = (isi: object, baris = 1, berkas = "dalil.jsonl"): BarisMentah => ({ berkas, baris, isi });
const sumber = b({ id: "S1", nama: "s", jenis: "x", lisensi: "CC-BY", boleh_tampil_komersial: "ya" }, 1, "sumber.jsonl");
const dalil = (ubah: object) => b({
  id: "QS-2:1", jenis: "ayat", teks_arab: "قَلَمٌ", terjemahan: "t", sumber_id: "S1", status_review: "diusulkan", ...ubah,
});

describe("validasi ingest", () => {
  it("menerima baris sah dan membuat teks_arab_polos (asli tidak diubah)", () => {
    const { sah, ditolak } = validasi({ sumber: [sumber], dalil: [dalil({})] });
    expect(ditolak).toEqual([]);
    expect(sah.dalil[0]!.teks_arab).toBe("قَلَمٌ");
    expect(sah.dalil[0]!.teks_arab_polos).toBe("قلم");
  });

  it("menolak dalil tanpa sumber yang tercatat", () => {
    const { sah, ditolak } = validasi({ dalil: [dalil({ sumber_id: "TIDAK-ADA" })] });
    expect(sah.dalil).toEqual([]);
    expect(ditolak[0]!.alasan).toMatch(/sumber_id/);
  });

  it("menolak sumber tanpa lisensi / boleh_tampil_komersial", () => {
    const { ditolak } = validasi({
      sumber: [b({ id: "S2", nama: "s", jenis: "x", lisensi: "", boleh_tampil_komersial: "ya" }, 1, "sumber.jsonl"),
               b({ id: "S3", nama: "s", jenis: "x", lisensi: "L" }, 2, "sumber.jsonl")],
    });
    expect(ditolak.map((d) => d.id)).toEqual(["S2", "S3"]);
  });

  it("data API komunitas wajib boleh_tampil_komersial = belum", () => {
    const { ditolak } = validasi({ sumber: [b({ id: "S4", nama: "s", jenis: "x",
      lisensi: "belum jelas (API komunitas; data asal Kemenag/tafsirq)", boleh_tampil_komersial: "ya" }, 1, "sumber.jsonl")] });
    expect(ditolak[0]!.alasan).toMatch(/belum/);
  });

  it("menolak ID yang tidak sesuai format", () => {
    const { ditolak } = validasi({ sumber: [sumber], dalil: [
      dalil({ id: "QS-2-275" }),
      dalil({ id: "QS-115:1" }),
      dalil({ id: "HR-bukhari-1", jenis: "hadits" }),
      dalil({ id: "FATWA-DSN-117", jenis: "fatwa" }),
      dalil({ id: "TAFSIR-X-1", jenis: "tafsir" }),
    ] });
    expect(ditolak).toHaveLength(5);
  });

  it("DUMMY wajib konsisten dan bertanda jelas", () => {
    const { ditolak } = validasi({ sumber: [sumber], dalil: [
      dalil({ id: "DUMMY-001", status_review: "diusulkan" }),                  // dummy menyamar asli
      dalil({ id: "QS-2:2", status_review: "dummy" }),                          // asli ditandai dummy
      dalil({ id: "DUMMY-002", status_review: "dummy", terjemahan: "[DUMMY] x" }), // teks_arab bukan [DUMMY]
      dalil({ id: "DUMMY-003", status_review: "dummy", teks_arab: "[DUMMY]", terjemahan: "x" }),
    ] });
    expect(ditolak).toHaveLength(4);
  });

  it("menolak ID ganda di berkas yang sama (baris pertama tetap masuk)", () => {
    const { sah, ditolak } = validasi({ sumber: [sumber], dalil: [dalil({}), dalil({ terjemahan: "lain" })] });
    expect(sah.dalil).toHaveLength(1);
    expect(ditolak[0]!.alasan).toMatch(/ganda/);
  });

  it("pendapat wajib punya rujukan (lokasi kutipan persis)", () => {
    const { ditolak } = validasi({
      masalah: [b({ id: "M1", label: "l", rak: 2, status_review: "diusulkan" }, 1, "masalah.jsonl")],
      pendapat: [b({ id: "P1", masalah_id: "M1", pemilik_pendapat: "x", jenis_pemilik: "lembaga",
        kesimpulan_hukum: "k", rujukan: "", status_review: "diusulkan" }, 1, "pendapat.jsonl")],
    });
    expect(ditolak[0]!.alasan).toMatch(/rujukan/);
  });
});

describe("muat ke Repositori", () => {
  it("data DUMMY di data/dummy termuat utuh tanpa penolakan", async () => {
    const { data, rusak } = bacaFolder("data/dummy");
    expect(rusak).toEqual([]);
    const repo = new RepositoriMemori();
    const h = await muat(repo, data);
    expect(h.ditolak).toEqual([]);
    expect(h.jumlah).toMatchObject({ sumber: 1, dalil: 8, masalah: 1, pendapat: 2, pendapat_dalil: 2 });
    const semua = await repo.ambilDalil(await repo.ambilSemuaIdDalil());
    expect(semua.every((d) => d.status_review === "dummy" && d.teks_arab === "[DUMMY]")).toBe(true);
  });

  it("idempoten: dua kali muat, jumlah baris sama", async () => {
    const { data } = bacaFolder("data/dummy");
    const repo = new RepositoriMemori();
    await muat(repo, data);
    await muat(repo, data);
    expect(await repo.ambilSemuaIdDalil()).toHaveLength(8);
    expect(repo.pendapatDalil.size).toBe(2);
  });

  it("run kedua boleh merujuk sumber yang sudah ada di database", async () => {
    const repo = new RepositoriMemori();
    await muat(repo, { sumber: [sumber] });
    const h = await muat(repo, { dalil: [dalil({})] });
    expect(h.ditolak).toEqual([]);
  });
});
