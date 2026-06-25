// Corta o topo (status bar: hora/bateria/wifi) e o rodapé (barra de navegação do
// Android) dos prints de WhatsApp. Faz backup antes. Mantém a redação dos telefones.
import { Jimp } from "jimp";
import { mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "c:/Users/alema/Downloads/Trabalho/Lagos/Site Principal/public/depoimentos";
const BK = join(process.env.TEMP, "lagos-prints-backup");
mkdirSync(BK, { recursive: true });

const files = [
  "Screenshot_20260619_180511_WhatsAppBusiness.jpg",
  "Screenshot_20260619_181207_WhatsAppBusiness.jpg",
  "Screenshot_20260619_181825_WhatsAppBusiness.jpg",
  "Screenshot_20260619_182032_WhatsAppBusiness.jpg",
  "Screenshot_20260619_182151_WhatsAppBusiness.jpg",
  "Screenshot_20260619_183055_WhatsAppBusiness.jpg",
  "Screenshot_20260619_141402_WhatsAppBusiness.jpg",
  "Screenshot_20260127_123011_WhatsAppBusiness.jpg",
];

for (const f of files) {
  const src = join(DIR, f);
  copyFileSync(src, join(BK, f)); // backup
  const img = await Jimp.read(src);
  const W = img.bitmap.width, H = img.bitmap.height;
  const top = Math.round(H * 0.039);    // ~status bar
  const bottom = Math.round(H * 0.038); // ~barra de navegação
  img.crop({ x: 0, y: top, w: W, h: H - top - bottom });
  await img.write(src);
  console.log(`${f.padEnd(48)} ${W}x${H} -> ${img.bitmap.width}x${img.bitmap.height}`);
}
console.log("Backup em:", BK);
