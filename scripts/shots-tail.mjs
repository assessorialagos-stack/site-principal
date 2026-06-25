// Captura o trecho final da página mobile (form + rodapé).
// Com prefers-reduced-motion o site desativa o Lenis e o scroll programático funciona.
import puppeteer from "puppeteer-core";
import { join } from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = process.env.SHOT_DIR || join(process.env.TEMP, "lagos-shots");
const BASE = process.env.BASE_URL || "http://localhost:3001";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--disable-gpu", "--hide-scrollbars", "--force-prefers-reduced-motion"],
});

const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(e.message));

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y <= total; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
});
await new Promise((r) => setTimeout(r, 1500));
const h = await page.evaluate(() => document.body.scrollHeight);
const tailH = 6200;
await page.evaluate((y) => window.scrollTo(0, y), h - tailH);
await new Promise((r) => setTimeout(r, 800));
await page.setViewport({ width: 390, height: tailH, deviceScaleFactor: 1 });
await page.evaluate((y) => window.scrollTo(0, y), h);
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: join(OUT, "vm-tail.png") });
console.log(JSON.stringify({ pageHeight: h, errors }));
await browser.close();
