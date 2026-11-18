/**
 * Normalisasi teks untuk PENCARIAN (spek §6.3). Dipakai untuk dokumen (-> teks_arab_polos)
 * DAN kueri, dengan fungsi yang persis sama. Hasilnya TIDAK PERNAH ditampilkan; teks asli
 * tidak diubah (fungsi ini murni, mengembalikan string baru).
 *
 * Analogi: seperti menyamakan "Jakarta", "JAKARTA", "jakarta" sebelum mencari di kamus.
 * Aturan (semuanya 💡 hipotesis, bisa direvisi dari kasus nyata):
 *  1. NFKC: bentuk presentasi Arab (FB50–FEFF) -> huruf dasar.
 *  2. Hapus harakat & tanda Qur'ani (U+0610–061A, U+064B–065F, U+0670, U+06D6–06ED).
 *  3. Hapus tatwil/kashida (U+0640) dan karakter tak terlihat (ZWJ/ZWNJ/BOM, tanda arah).
 *  4. Samakan varian alif: أ إ آ ٱ -> ا ; ى -> ي ; ة -> ه ; ؤ -> و ; ئ -> ي.
 *  5. Angka Arab-Indik -> 0–9. Huruf Latin -> huruf kecil. Spasi dirapikan.
 */

const HARAKAT = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;
const TATWIL_DAN_TAK_TERLIHAT = /[ـ​-‏‪-‮⁦-⁩﻿]/g;
const PETA_HURUF: Record<string, string> = {
  "أ": "ا", // أ
  "إ": "ا", // إ
  "آ": "ا", // آ
  "ٱ": "ا", // ٱ (alif wasla)
  "ى": "ي", // ى -> ي
  "ة": "ه", // ة -> ه
  "ؤ": "و", // ؤ -> و
  "ئ": "ي", // ئ -> ي
};
const POLA_HURUF = new RegExp(`[${Object.keys(PETA_HURUF).join("")}]`, "g");

export function normalisasi(teks: string): string {
  return teks
    .normalize("NFKC")
    .replace(HARAKAT, "")
    .replace(TATWIL_DAN_TAK_TERLIHAT, "")
    .replace(POLA_HURUF, (c) => PETA_HURUF[c]!)
    .replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0))
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Ada huruf Arab? (dipakai juga validasi: AI tidak boleh mengetik teks Arab). */
export const POLA_ARAB = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
