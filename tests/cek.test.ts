import { describe, expect, it } from "vitest";
import { cekVariabel, cekVersiNode, ringkasInfoKunci, sensor } from "../cli/cek-lib.js";
import { konfigurasi } from "../config/config.js";

describe("cekVersiNode", () => {
  it("menerima Node 20+", () => {
    expect(cekVersiNode("v20.0.0").status).toBe("OK");
    expect(cekVersiNode("v22.23.5").status).toBe("OK");
  });
  it("menolak Node < 20", () => {
    expect(cekVersiNode("v18.19.0").status).toBe("GAGAL");
  });
});

describe("cekVariabel tidak membocorkan nilai", () => {
  it("melaporkan ada tanpa mencetak isi", () => {
    const h = cekVariabel("OPENROUTER_API_KEY", "sk-or-rahasia-123", true);
    expect(h.status).toBe("OK");
    expect(h.pesan).not.toContain("rahasia");
  });
  it("kosong + wajib = GAGAL, kosong + belum wajib = PERINGATAN", () => {
    expect(cekVariabel("X", undefined, true).status).toBe("GAGAL");
    expect(cekVariabel("X", "  ", false).status).toBe("PERINGATAN");
  });
});

describe("sensor", () => {
  it("mengganti semua kemunculan rahasia", () => {
    expect(sensor("a sk-or-xyz b sk-or-xyz", ["sk-or-xyz"])).toBe("a [DISENSOR] b [DISENSOR]");
  });
  it("mengabaikan rahasia kosong/pendek", () => {
    expect(sensor("abc", [undefined, "", "ab"])).toBe("abc");
  });
});

describe("ringkasInfoKunci", () => {
  it("memberi tahu bila credit limit belum dipasang", () => {
    expect(ringkasInfoKunci({ data: { limit: null, usage: 0 } })).toContain("BELUM dipasang");
  });
  it("menampilkan limit dan sisa bila ada", () => {
    const r = ringkasInfoKunci({ data: { limit: 5, limit_remaining: 4.5, usage: 0.5 } });
    expect(r).toContain("credit limit: 5");
    expect(r).toContain("sisa: 4.5");
  });
  it("tidak crash pada bentuk tak dikenal", () => {
    expect(ringkasInfoKunci(null)).toContain("tidak dikenal");
  });
});

describe("konfigurasi awal (spek §5.3)", () => {
  it("memakai angka awal spek dan belum mengarang ambang", () => {
    expect(konfigurasi.retrieval.rrf_k).toBe(60);
    expect(konfigurasi.retrieval.pengaruh_bobot).toBe(0);
    expect(konfigurasi.retrieval.ambang_relevansi).toBeNull();
    expect(konfigurasi.log.simpan_teks_sensitif).toBe(false);
    expect(konfigurasi.keselamatan.maks_teguran).toBe(3);
  });
});
