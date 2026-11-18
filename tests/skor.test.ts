/** Angka di sini dihitung tangan (rumus ditulis di komentar) supaya bisa dicek manusia. */
import { describe, expect, it } from "vitest";
import { bm25, cosine, rrf, tokenisasi } from "../core/retrieval/skor.js";

describe("cosine", () => {
  it("tegak lurus = 0, searah = 1, berlawanan = -1", () => {
    expect(cosine([1, 0], [0, 1])).toBe(0);
    expect(cosine([1, 1], [2, 2])).toBeCloseTo(1, 12);
    expect(cosine([1, 0], [-3, 0])).toBe(-1);
  });
  it("[1,2,3]·[4,5,6] = 32 ; |a|=√14, |b|=√77 -> 32/√1078 = 0.974631846", () => {
    expect(cosine([1, 2, 3], [4, 5, 6])).toBeCloseTo(0.974631846, 9);
  });
  it("vektor nol -> 0; panjang beda -> error", () => {
    expect(cosine([0, 0], [1, 1])).toBe(0);
    expect(() => cosine([1], [1, 2])).toThrow();
  });
});

describe("RRF (k = 60)", () => {
  it("A=[x,y], B=[y,z] -> y = 1/62 + 1/61, x = 1/61, z = 1/62", () => {
    const h = rrf(
      { A: [{ id: "x", skor: 9 }, { id: "y", skor: 5 }], B: [{ id: "y", skor: 0.9 }, { id: "z", skor: 0.1 }] },
      60,
    );
    expect(h.map((c) => c.id)).toEqual(["y", "x", "z"]);
    expect(h[0]!.rrf).toBeCloseTo(1 / 62 + 1 / 61, 12); // 0.032522474
    expect(h[1]!.rrf).toBeCloseTo(1 / 61, 12); // 0.016393443
    expect(h[2]!.rrf).toBeCloseTo(1 / 62, 12); // 0.016129032
    expect(h[0]!.komponen).toEqual({ A: { peringkat: 2, skor: 5 }, B: { peringkat: 1, skor: 0.9 } });
    expect(h[1]!.komponen.B).toBeUndefined();
  });
  it("hanya urutan yang dipakai: skala skor beda jauh tidak mengubah hasil", () => {
    const a = rrf({ A: [{ id: "p", skor: 1000 }, { id: "q", skor: 1 }] }, 60);
    const b = rrf({ A: [{ id: "p", skor: 0.02 }, { id: "q", skor: 0.01 }] }, 60);
    expect(a.map((c) => [c.id, c.rrf])).toEqual(b.map((c) => [c.id, c.rrf]));
  });
  it("seri dipecah dengan ID (deterministik)", () => {
    const h = rrf({ A: [{ id: "b", skor: 1 }], B: [{ id: "a", skor: 1 }] }, 60);
    expect(h.map((c) => c.id)).toEqual(["a", "b"]);
  });
});

describe("BM25 (k1 = 1.2, b = 0.75)", () => {
  // d1 = "a b" (2 kata), d2 = "a a c" (3 kata); N = 2, avgdl = 2.5
  const dok = [{ id: "d1", teks: "a b" }, { id: "d2", teks: "a a c" }];
  it('kueri "c": df=1 -> idf = ln(1 + 1.5/1.5) = ln 2; skor d2 = ln2·2.2 / (1 + 1.2·(0.25 + 0.75·3/2.5)) = 0.640724', () => {
    const h = bm25(dok, "c");
    expect(h.map((x) => x.id)).toEqual(["d2"]);
    expect(h[0]!.skor).toBeCloseTo((Math.LN2 * 2.2) / 2.38, 9);
    expect(h[0]!.skor).toBeCloseTo(0.640724, 6);
  });
  it('kueri "a": df=2 -> idf = ln(1 + 0.5/2.5) = ln 1.2; tf lebih banyak menang', () => {
    const h = bm25(dok, "a");
    const idf = Math.log(1.2);
    const d1 = (idf * 1 * 2.2) / (1 + 1.2 * (0.25 + (0.75 * 2) / 2.5)); // = idf·2.2/1.72
    const d2 = (idf * 2 * 2.2) / (2 + 1.2 * (0.25 + (0.75 * 3) / 2.5)); // = idf·4.4/3.38
    expect(h.map((x) => x.id)).toEqual(["d2", "d1"]);
    expect(h[0]!.skor).toBeCloseTo(d2, 12);
    expect(h[1]!.skor).toBeCloseTo(d1, 12);
  });
  it("kata yang tidak ada -> tidak ada hasil; kata kueri ganda dihitung sekali", () => {
    expect(bm25(dok, "zzz")).toEqual([]);
    expect(bm25(dok, "c c")).toEqual(bm25(dok, "c"));
  });
});

describe("tokenisasi (meniru parser simple)", () => {
  it("huruf kecil, pisah di tanda baca", () => {
    expect(tokenisasi("Wudhu, BATAL?! bro")).toEqual(["wudhu", "batal", "bro"]);
  });
});
