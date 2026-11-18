/**
 * `npm run cek` — cek lingkungan (Fase 0, panduan tugas 4).
 * 1. Versi Node  2. Kunci terbaca (tanpa dicetak)  3. Satu panggilan murah ke OpenRouter
 * 4. (opsional, wajib mulai Fase 1) Supabase bisa dihubungi.
 * Tidak ada logika pipeline di sini.
 */
import { existsSync } from "node:fs";
import "dotenv/config";
import { konfigurasi } from "../config/config.js";
import { urlDasarSupabase } from "../core/repositori/supabase.js";
import { cekVariabel, cekVersiNode, formatHasil, ringkasInfoKunci, sensor, type HasilCek } from "./cek-lib.js";

const TIMEOUT_MS = 15_000;
const kunciOR = process.env.OPENROUTER_API_KEY;
const urlSupabase = process.env.SUPABASE_URL;
const kunciSupabase = process.env.SUPABASE_SERVICE_ROLE_KEY;
const rahasia = [kunciOR, kunciSupabase];

function pesanJaringan(host: string, err: unknown): string {
  const teks = sensor(err instanceof Error ? `${err.message} ${String((err as { cause?: unknown }).cause ?? "")}` : String(err), rahasia);
  return `tidak bisa menghubungi ${host} (${teks.trim()}). Di sesi cloud: tambahkan ${host} ke Allowed domains di pengaturan Network access.`;
}

async function cekOpenRouter(): Promise<HasilCek> {
  const nama = "Panggilan OpenRouter (GET /api/v1/key)";
  if (!kunciOR) return { nama, status: "GAGAL", pesan: "dilewati karena OPENROUTER_API_KEY kosong" };
  try {
    const res = await fetch("https://openrouter.ai/api/v1/key", {
      headers: { Authorization: `Bearer ${kunciOR}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 401) return { nama, status: "GAGAL", pesan: "401 — kunci ditolak (salah/dicabut?)" };
    if (!res.ok) return { nama, status: "GAGAL", pesan: `HTTP ${res.status}` };
    return { nama, status: "OK", pesan: ringkasInfoKunci(await res.json()) };
  } catch (err) {
    return { nama, status: "GAGAL", pesan: pesanJaringan("openrouter.ai", err) };
  }
}

async function cekSupabase(): Promise<HasilCek> {
  const nama = "Supabase (REST)";
  if (!urlSupabase || !kunciSupabase) {
    return { nama, status: "PERINGATAN", pesan: "dilewati — SUPABASE_URL/kunci belum diisi (baru wajib di Fase 1)" };
  }
  let host = "<project>.supabase.co";
  try {
    const u = new URL(urlSupabase);
    host = u.host;
    const catatanPath = u.pathname.replace(/\/+$/, "") ? ` (catatan: SUPABASE_URL berisi path "${u.pathname}"; cukup https://${host} — kode memakai origin saja)` : "";
    // Uji sungguhan: baca 1 baris tabel `sumber` (bukan sekadar "server menjawab").
    const res = await fetch(`${urlDasarSupabase(urlSupabase)}/rest/v1/sumber?select=id&limit=1`, {
      headers: { apikey: kunciSupabase, Authorization: `Bearer ${kunciSupabase}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 401 || res.status === 403) return { nama, status: "GAGAL", pesan: `HTTP ${res.status} — kunci ditolak` };
    if (res.status >= 500) return { nama, status: "GAGAL", pesan: `HTTP ${res.status} — proyek mungkin sedang di-pause (free tier)` };
    if (res.status === 200) return { nama, status: "OK", pesan: `terhubung ke ${host}, tabel terbaca${catatanPath}` };
    const isi = await res.text();
    if (/PGRST205|Could not find the table/i.test(isi)) {
      return { nama, status: "PERINGATAN", pesan: `terhubung ke ${host}, tapi tabel belum ada — jalankan supabase/migrations/ di SQL Editor${catatanPath}` };
    }
    return { nama, status: "GAGAL", pesan: `HTTP ${res.status} dari ${host}${catatanPath}` };
  } catch (err) {
    return { nama, status: "GAGAL", pesan: pesanJaringan(host, err) };
  }
}

async function main(): Promise<void> {
  const hasil: HasilCek[] = [
    cekVersiNode(process.version),
    {
      nama: "Sumber rahasia",
      status: "OK",
      pesan: existsSync(".env") ? "berkas .env ditemukan" : "tanpa .env — memakai environment variable",
    },
    { nama: "Konfigurasi", status: "OK", pesan: `mode=${konfigurasi.mode}, penyimpanan=${konfigurasi.penyimpanan.backend}, backend_keputusan=${konfigurasi.backend_keputusan}` },
    cekVariabel("OPENROUTER_API_KEY", kunciOR, true),
    cekVariabel("SUPABASE_URL", urlSupabase, false, "baru wajib di Fase 1"),
    cekVariabel("SUPABASE_SERVICE_ROLE_KEY", kunciSupabase, false, "baru wajib di Fase 1"),
  ];
  hasil.push(...(await Promise.all([cekOpenRouter(), cekSupabase()])));

  console.log(sensor(formatHasil(hasil), rahasia));
  const gagal = hasil.filter((h) => h.status === "GAGAL").length;
  console.log(gagal === 0 ? "\nCEK HIJAU" : `\nCEK MERAH: ${gagal} gagal`);
  process.exitCode = gagal === 0 ? 0 : 1;
}

void main();
