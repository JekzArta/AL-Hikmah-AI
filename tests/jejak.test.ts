import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  bangunBaris, catatGiliran, hapusLogLama, hapusSesi, sesiBaru, TEKS_DISEMBUNYIKAN, type EntriGiliran,
} from "../core/log/jejak.js";

const entri = (ubah: Partial<EntriGiliran> = {}): EntriGiliran => ({
  sesiId: "s-1", giliranKe: 1, perintah: "cari", pesanUser: "wudhu batal ga?", sensitif: false,
  status: "cari_saja", kueriPolos: "wudhu batal ga?", biaya: { token: 3, estimasiUsd: 0 }, ...ubah,
});
const folderUji = () => mkdtempSync(join(tmpdir(), "jejak-"));

describe("log jejak", () => {
  it("ID sesi acak (UUID), berbeda tiap sesi", () => {
    const a = sesiBaru();
    expect(a).toMatch(/^[0-9a-f-]{36}$/);
    expect(sesiBaru()).not.toBe(a);
  });

  it("tidak ada field ID user di baris log", () => {
    const b = bangunBaris(entri(), { simpan_teks_sensitif: false });
    expect(Object.keys(b).some((k) => /user_?id|akun|email|nama_siswa/i.test(k))).toBe(false);
  });

  it("pesan sensitif: hanya label bila simpan_teks_sensitif = false", () => {
    const b = bangunBaris(entri({ sensitif: true, labelSensitif: "krisis", pertanyaanUtuh: "x" }), { simpan_teks_sensitif: false });
    expect(b.pesanUser).toBe(TEKS_DISEMBUNYIKAN);
    expect(b.kueriPolos).toBe(TEKS_DISEMBUNYIKAN);
    expect(b.pertanyaanUtuh).toBe(TEKS_DISEMBUNYIKAN);
    expect(b.labelSensitif).toBe("krisis");
    expect(JSON.stringify(b)).not.toContain("wudhu batal");
  });

  it("pesan sensitif tetap tersimpan bila simpan_teks_sensitif = true; non-sensitif selalu tersimpan", () => {
    expect(bangunBaris(entri({ sensitif: true }), { simpan_teks_sensitif: true }).pesanUser).toBe("wudhu batal ga?");
    expect(bangunBaris(entri(), { simpan_teks_sensitif: false }).pesanUser).toBe("wudhu batal ga?");
  });

  it("satu baris JSON per giliran, satu berkas per hari", () => {
    const folder = folderUji();
    const k = { simpan_teks_sensitif: false, folder, retensi_hari: 30 };
    const t = new Date("2026-11-18T10:00:00Z");
    catatGiliran(entri(), k, t);
    catatGiliran(entri({ giliranKe: 2 }), k, t);
    const isi = readFileSync(join(folder, "jejak-2026-11-18.jsonl"), "utf8").trim().split("\n");
    expect(isi).toHaveLength(2);
    expect(JSON.parse(isi[1]!).giliranKe).toBe(2);
  });

  it("retensi: hanya berkas jejak yang lebih tua dari retensi_hari yang dihapus", () => {
    const folder = folderUji();
    const k = { simpan_teks_sensitif: false, folder, retensi_hari: 30 };
    catatGiliran(entri(), k, new Date("2026-09-01T10:00:00Z"));
    catatGiliran(entri(), k, new Date("2026-11-10T10:00:00Z"));
    writeFileSync(join(folder, "catatan-lain.txt"), "jangan dihapus");
    expect(hapusLogLama(k, new Date("2026-11-18T00:00:00Z"))).toEqual(["jejak-2026-09-01.jsonl"]);
    expect(readdirSync(folder).sort()).toEqual(["catatan-lain.txt", "jejak-2026-11-10.jsonl"]);
  });

  it("hapusSesi membuang semua baris satu sesi saja", () => {
    const folder = folderUji();
    const k = { simpan_teks_sensitif: false, folder, retensi_hari: 30 };
    const t = new Date("2026-11-18T10:00:00Z");
    catatGiliran(entri({ sesiId: "a" }), k, t);
    catatGiliran(entri({ sesiId: "b" }), k, t);
    catatGiliran(entri({ sesiId: "a" }), k, t);
    expect(hapusSesi(k, "a")).toBe(2);
    const sisa = readFileSync(join(folder, "jejak-2026-11-18.jsonl"), "utf8").trim().split("\n");
    expect(sisa.map((b) => JSON.parse(b).sesiId)).toEqual(["b"]);
  });
});
