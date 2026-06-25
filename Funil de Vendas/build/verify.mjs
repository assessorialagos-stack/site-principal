/* Per-page QA screenshots: one PNG per .page element, for visual inspection. */
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const SITE = process.env.PPTR_BASE || "C:\\Users\\alema\\Downloads\\Trabalho\\Lagos\\Site Principal\\package.json";
const puppeteer = createRequire(SITE)("puppeteer-core");

const HERE = dirname(fileURLToPath(import.meta.url));
const TMP = join(HERE, "tmp");
const OUT = join(TMP, "pages");
mkdirSync(OUT, { recursive: true });
const fileUrl = (p) => "file:///" + p.replace(/\\/g, "/").replace(/ /g, "%20");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const docs = [
  { name: "client", html: join(TMP, "funnel_client.html") },
  { name: "internal", html: join(TMP, "funnel_internal.html") },
];
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--disable-gpu", "--hide-scrollbars"] });
for (const d of docs) {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(fileUrl(d.html), { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluateHandle("document.fonts.ready");
  await new Promise((r) => setTimeout(r, 400));
  const pages = await page.$$(".page");
  let i = 1;
  for (const el of pages) { await el.screenshot({ path: join(OUT, `${d.name}-p${i}.png`) }); i++; }
  console.log(`${d.name}: ${pages.length} page PNGs`);
  await page.close();
}
await browser.close();
