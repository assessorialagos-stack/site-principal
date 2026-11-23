// Gera as versões dos logos para o site 100% claro.
// (1) Logos de clientes com partes BRANCAS (somem no fundo branco): o branco e o
//     cinza claro sem saturação viram grafite; as cores da marca ficam como estão.
//     Saída em public/logos/light/.
// (2) Logo da Lagos (ondas azuis sobre quadrado preto): o preto vira transparente,
//     com rampa nas bordas. Saída em public/logo-lagos-light.png.
// Rodar da raiz do projeto: node scripts/logos-on-light.mjs
import { Jimp } from "jimp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = join(process.cwd(), "public");
const OUT = join(PUBLIC, "logos", "light");
mkdirSync(OUT, { recursive: true });

const GRAPHITE = [31, 31, 36]; // #1F1F24

for (const f of ["praca-moca.png", "crew-academy.png", "logo3.png"]) {
  const img = await Jimp.read(join(PUBLIC, "logos", "trim", f));
  if (img.bitmap.height > 400) img.resize({ h: 400 });
  const { data } = img.bitmap;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat < 0.18 && max > 150) {
      [data[i], data[i + 1], data[i + 2]] = GRAPHITE;
    }
  }
  await img.write(join(OUT, f));
  console.log("ok", f, `${img.bitmap.width}x${img.bitmap.height}`);
}

{
  const img = await Jimp.read(join(PUBLIC, "logo-lagos.png"));
  img.resize({ w: 256 });
  const { data } = img.bitmap;
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const alpha = max < 18 ? 0 : Math.min(255, Math.round(max * 1.4));
    data[i + 3] = alpha;
    if (alpha > 0) {
      for (let c = 0; c < 3; c++) data[i + c] = Math.min(255, Math.round((data[i + c] * 255) / alpha));
    }
  }
  await img.write(join(PUBLIC, "logo-lagos-light.png"));
  console.log("ok logo-lagos-light.png");
}
