import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite-pgvector";
import { describe, expect, it } from "vitest";
import { normalisasi } from "../core/retrieval/normalisasi.js";

// Kata Arab umum (bukan ayat/hadits): مدرسة sekolah, كتاب buku, قلم pena.
describe("normalisasi Arab", () => {
  it("menghapus harakat", () => {
    expect(normalisasi("مَدْرَسَةٌ")).toBe(normalisasi("مدرسة"));
    expect(normalisasi("كِتَابٌ")).toBe("كتاب");
  });
  it("menghapus tatwil (kashida)", () => {
    expect(normalisasi("كـــتاب")).toBe("كتاب");
  });
  it("menyamakan varian alif, alif maqsura, ta marbuta, hamzah", () => {
    expect(normalisasi("أ إ آ ٱ")).toBe("ا ا ا ا");
    expect(normalisasi("ى")).toBe("ي");
    expect(normalisasi("مدرسة")).toBe("مدرسه");
    expect(normalisasi("ؤ ئ")).toBe("و ي");
  });
  it("bentuk presentasi Arab (FExx) jadi huruf dasar", () => {
    expect(normalisasi("ﺗﻠﻤ")).toBe(normalisasi("تلم")); // ﺗﻠﻤ
  });
  it("angka Arab-Indik jadi angka biasa; Latin huruf kecil; spasi dirapikan", () => {
    expect(normalisasi("٢٧٥")).toBe("275");
    expect(normalisasi("  Wudhu   BATAL ")).toBe("wudhu batal");
  });
  it("menghapus karakter tak terlihat", () => {
    expect(normalisasi("كت‌اب﻿")).toBe("كتاب");
  });
  it("teks asli tidak berubah (fungsi murni)", () => {
    const asli = "قَلَمٌ";
    const salinan = asli.slice();
    normalisasi(asli);
    expect(asli).toBe(salinan);
  });
  it("kueri dan dokumen bertemu walau harakat beda", () => {
    expect(normalisasi("قَلَمٌ")).toBe(normalisasi("قلم"));
  });
});

describe("uji parser Postgres `simple` terhadap harakat (PGlite; Supabase diuji terpisah)", () => {
  it("mencatat perilaku parser (dicetak untuk laporan)", async () => {
    const db = new PGlite({ extensions: { vector } });
    const q = async (t: string) =>
      (await db.query<{ v: string }>(`select to_tsvector('simple'::regconfig, $1)::text as v`, [t])).rows[0]!.v;
    const berharakat = await q("مَدْرَسَةٌ");
    const polos = await q("مدرسة");
    const hasilNormalisasi = await q(normalisasi("مَدْرَسَةٌ"));
    console.log(`[uji-parser PGlite] berharakat: ${berharakat} | polos: ${polos} | dinormalisasi: ${hasilNormalisasi}`);
    // Yang PASTI kita butuhkan: setelah normalisasi, satu kata = satu token utuh.
    expect(hasilNormalisasi).toBe(`'مدرسه':1`);
  });
});
