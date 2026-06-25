// Normaliza os logos: (1) se houver fundo OPACO dominante nas bordas (ex.: preto do
// Roney, mesmo com cantos arredondados), "vaza" esse fundo p/ transparente com rampa;
// (2) recorta pela bounding box do conteúdo (alpha real). Saída em public/logos/trim/.
import { Jimp } from "jimp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "c:/Users/alema/Downloads/Trabalho/Lagos/Site Principal/public/logos";
const OUT = join(DIR, "trim");
mkdirSync(OUT, { recursive: true });

const files = ["sique.png", "praca-moca.png", "roney-films.png", "crew-academy.png", "logo3.png", "logo-final.png"];
const dist = (r, g, b, R, G, B) => Math.sqrt((r - R) ** 2 + (g - G) ** 2 + (b - B) ** 2);

for (const f of files) {
  const img = await Jimp.read(join(DIR, f));
  const { data, width: W, height: H } = img.bitmap;
  const before = `${W}x${H}`;

  // 1) Cor de fundo = cor OPACA dominante nas bordas (lida com cantos arredondados).
  const counts = new Map();
  const sample = (x, y) => {
    const i = (y * W + x) * 4;
    if (data[i + 3] > 240) {
      const k = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  };
  for (let x = 0; x < W; x++) { sample(x, 0); sample(x, H - 1); }
  for (let y = 0; y < H; y++) { sample(0, y); sample(W - 1, y); }
  let bgKey = -1, bgCount = 0;
  for (const [k, c] of counts) if (c > bgCount) { bgCount = c; bgKey = k; }
  const opaqueBg = bgKey >= 0 && bgCount / (2 * W + 2 * H) > 0.3;

  if (opaqueBg) {
    // Flood-fill a partir das bordas: remove só o fundo CONECTADO às bordas,
    // preservando áreas fechadas da mesma cor (ex.: o "V" branco dentro do coração).
    const bgR = (bgKey >> 16) & 255, bgG = (bgKey >> 8) & 255, bgB = bgKey & 255;
    const lo = 26, hi = 90; // rampa anti-aliasing
    const visited = new Uint8Array(W * H);
    const queue = [];
    const push = (x, y) => { const p = y * W + x; if (!visited[p]) { visited[p] = 1; queue.push(p); } };
    for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
    for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
    for (let head = 0; head < queue.length; head++) {
      const p = queue[head], i = p * 4;
      const d = dist(data[i], data[i + 1], data[i + 2], bgR, bgG, bgB);
      if (d >= hi) continue; // borda do conteúdo: para de espalhar
      const a = d <= lo ? 0 : Math.round(((d - lo) / (hi - lo)) * 255);
      if (a < data[i + 3]) data[i + 3] = a;
      const x = p % W, y = (p / W) | 0;
      if (x > 0) push(x - 1, y);
      if (x < W - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < H - 1) push(x, y + 1);
    }
  }

  // 2) Bounding box do conteúdo (alpha significativo).
  const AT = 30;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > AT) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX >= minX && maxY >= minY) img.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });

  await img.write(join(OUT, f));
  const ar = (img.bitmap.width / img.bitmap.height).toFixed(2);
  console.log(`${f.padEnd(18)} ${before.padStart(11)} -> ${`${img.bitmap.width}x${img.bitmap.height}`.padStart(11)}  (aspect ${ar})${opaqueBg ? "  [fundo vazado]" : ""}`);
}
console.log("OK ->", OUT);
