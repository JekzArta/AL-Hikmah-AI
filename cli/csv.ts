/** Pembaca CSV kecil (RFC 4180: kutip ganda, koma/baris baru di dalam kutip, "" = "). */
export function bacaCsv(teks: string): Record<string, string>[] {
  const baris: string[][] = [];
  let sel = "";
  let row: string[] = [];
  let kutip = false;
  for (let i = 0; i < teks.length; i++) {
    const c = teks[i]!;
    if (kutip) {
      if (c === '"' && teks[i + 1] === '"') { sel += '"'; i++; }
      else if (c === '"') kutip = false;
      else sel += c;
    } else if (c === '"') kutip = true;
    else if (c === ",") { row.push(sel); sel = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && teks[i + 1] === "\n") i++;
      row.push(sel); sel = "";
      if (row.some((x) => x !== "")) baris.push(row);
      row = [];
    } else sel += c;
  }
  row.push(sel);
  if (row.some((x) => x !== "")) baris.push(row);
  const [kepala, ...isi] = baris;
  if (!kepala) return [];
  return isi.map((r) => Object.fromEntries(kepala.map((k, j) => [k, r[j] ?? ""])));
}
