/* ============================================================
   FUNIL LAGOS — render. Edge (Chromium) headless via puppeteer-core.
   Adapted from Site Principal/scripts/shots.mjs.
   Resolve puppeteer-core through NODE_PATH = Site Principal/node_modules.
     node:  $env:NODE_PATH=...; node render.mjs
   Produces the two A4 PDFs, QA PNGs, and a web external-request audit.
   ============================================================ */
import { mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// Resolve puppeteer-core (and its deps) from the existing Site Principal install
// without touching it. createRequire uses CJS resolution, which walks node_modules
// (ESM import + NODE_PATH would not). Override with PPTR_BASE if the site moves.
const SITE = process.env.PPTR_BASE ||
  "C:\\Users\\alema\\Downloads\\Trabalho\\Lagos\\Site Principal\\package.json";
const require = createRequire(SITE);
const puppeteer = require("puppeteer-core");

const HERE = dirname(fileURLToPath(import.meta.url));
const TMP = join(HERE, "tmp");
const SHOTS = join(TMP, "shots");
const DEST = join(HERE, "..");                       // Funil de Vendas/
const CLIENT_ASSETS = join(HERE, "..", "client_assets");
mkdirSync(SHOTS, { recursive: true });

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EXE = existsSync(EDGE) ? EDGE : CHROME;
const fileUrl = (p) => "file:///" + p.replace(/\\/g, "/").replace(/ /g, "%20");

const PDF_JOBS = [
  { name: "funnel_client", html: join(TMP, "funnel_client.html"), out: join(DEST, "funnel_client.pdf") },
  { name: "funnel_internal", html: join(TMP, "funnel_internal.html"), out: join(DEST, "funnel_internal.pdf") },
];

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: true,
  args: ["--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none", "--force-color-profile=srgb"],
});

async function settle(page) {
  await page.evaluateHandle("document.fonts.ready");
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await new Promise((r) => setTimeout(r, 450));
}

const report = [];

// ---- 1) PDFs (+ a QA PNG of each source) ----
for (const j of PDF_JOBS) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => errors.push(`requestfailed: ${r.url()} (${r.failure()?.errorText})`));

  await page.goto(fileUrl(j.html), { waitUntil: "networkidle0", timeout: 60000 });
  await settle(page);

  await page.pdf({
    path: j.out,
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });

  // QA PNG at A4 width (210mm ≈ 794px @96dpi), crisp
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: join(SHOTS, `${j.name}.png`), fullPage: true });

  const size = existsSync(j.out) ? statSync(j.out).size : 0;
  report.push({ job: j.name, pdf: j.out, bytes: size, errors });
  await page.close();
}

// ---- 2) Web bundle: render PNG + audit ALL external requests ----
{
  const page = await browser.newPage();
  const external = [];
  const failed = [];
  page.on("request", (r) => {
    const u = r.url();
    if (!u.startsWith("file://") && !u.startsWith("data:")) external.push(u);
  });
  page.on("requestfailed", (r) => failed.push(`${r.url()} (${r.failure()?.errorText})`));

  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto(fileUrl(join(CLIENT_ASSETS, "index.html")), { waitUntil: "networkidle0", timeout: 60000 });
  await settle(page);
  await page.screenshot({ path: join(SHOTS, "web-desktop.png"), fullPage: true });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(fileUrl(join(CLIENT_ASSETS, "index.html")), { waitUntil: "networkidle0", timeout: 60000 });
  await settle(page);
  await page.screenshot({ path: join(SHOTS, "web-mobile.png"), fullPage: true });

  report.push({ job: "web/index.html", externalRequests: external, failed });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ engine: EXE, report }, null, 2));
