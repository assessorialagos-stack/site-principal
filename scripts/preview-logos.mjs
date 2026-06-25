// Mostra como os logos recortados ficam sobre o fundo ESCURO do site (revela
// se a transparência quebrou algo, ex.: o "V" branco do VidaJá).
import { Jimp } from "jimp";
import { join } from "node:path";

const DIR = "c:/Users/alema/Downloads/Trabalho/Lagos/Site Principal/public/logos/trim";
const files = ["sique.png", "praca-moca.png", "roney-films.png", "crew-academy.png", "logo3.png", "logo-final.png"];

const TILE_W = 300, TILE_H = 150, LOGO_H = 80, COLS = 3;
const rows = Math.ceil(files.length / COLS);
const canvas = new Jimp({ width: TILE_W * COLS, height: TILE_H * rows, color: 0x0c0c12ff });

for (let i = 0; i < files.length; i++) {
  const logo = await Jimp.read(join(DIR, files[i]));
  const scale = LOGO_H / logo.bitmap.height;
  const w = Math.round(logo.bitmap.width * scale);
  logo.resize({ w, h: LOGO_H });
  const cx = (i % COLS) * TILE_W + (TILE_W - w) / 2;
  const cy = Math.floor(i / COLS) * TILE_H + (TILE_H - LOGO_H) / 2;
  // moldura da "tile"
  canvas.composite(logo, Math.round(cx), Math.round(cy));
}

const out = "c:/Users/alema/AppData/Local/Temp/lagos-shots/logos-on-dark.png";
await canvas.write(out);
console.log("OK ->", out);
