/* Capture the web landing with reveals forced visible (reduced-motion) for QA. */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const SITE = process.env.PPTR_BASE || "C:\\Users\\alema\\Downloads\\Trabalho\\Lagos\\Site Principal\\package.json";
const puppeteer = createRequire(SITE)("puppeteer-core");
const HERE = dirname(fileURLToPath(import.meta.url));
const fileUrl = (p) => "file:///" + p.replace(/\\/g, "/").replace(/ /g, "%20");
const idx = fileUrl(join(HERE, "..", "client_assets", "index.html"));
const out = join(HERE, "tmp", "shots");

const browser = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: true, args: ["--disable-gpu", "--hide-scrollbars"] });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto(idx, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluateHandle("document.fonts.ready");
await new Promise((r) => setTimeout(r, 500));
const h = await page.evaluate(() => document.body.scrollHeight);
await page.screenshot({ path: join(out, "web-desktop-static.png"), fullPage: true });
console.log("captured, full height =", h);
await browser.close();
