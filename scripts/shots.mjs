// Harness de verificação visual: viewport com a altura total da página
// (todos os whileInView disparam no load), espera as animações assentarem,
// captura e coleta erros de console/página. Uso: node scripts/shots.mjs
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = process.env.SHOT_DIR || join(process.env.TEMP, "lagos-shots");
const BASE = process.env.BASE_URL || "http://localhost:3001";
mkdirSync(OUT, { recursive: true });

const targets = [
  { name: "v2-desktop", url: "/", width: 1440 },
  { name: "v2-mobile", url: "/", width: 390 },
  { name: "v2-obrigado", url: "/obrigado", width: 1440 },
];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: [
    "--hide-scrollbars",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--ignore-gpu-blocklist",
    "--enable-webgl",
  ],
});

const report = [];
for (const t of targets) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => errors.push(`requestfailed: ${r.url()} (${r.failure()?.errorText})`));

  await page.setViewport({ width: t.width, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1500));
  const fullH = await page.evaluate(() => document.body.scrollHeight);
  const capH = Math.min(fullH, 16384);
  await page.setViewport({ width: t.width, height: capH, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 3500));
  await page.screenshot({ path: join(OUT, `${t.name}.png`) });
  report.push({ name: t.name, url: t.url, fullHeight: fullH, captured: capH, errors });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
