/* ============================================================
   FUNIL LAGOS — assembler. Single content source (funnel.json)
   -> client PDF html, internal PDF html, web index.html/styles/script.
   Modular blocks = the render* functions; arrangements compose them.
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "src");
const TMP = join(HERE, "tmp");
const CLIENT_ASSETS = join(HERE, "..", "client_assets");

const data = JSON.parse(readFileSync(join(SRC, "data", "funnel.json"), "utf8"));
const css = (f) => readFileSync(join(SRC, "css", f), "utf8");
const tokens = css("tokens.css"), printCss = css("print.css"), webCss = css("web.css");
const fontsRaw = readFileSync(join(CLIENT_ASSETS, "fonts", "fonts.css"), "utf8");

// font css with ABSOLUTE file:// urls for PDF rendering (no path fragility)
const fontsAbsBase = "file:///" + join(CLIENT_ASSETS, "fonts").replace(/\\/g, "/");
const fontsAbs = fontsRaw.replace(/url\(\.\/([^)]+)\)/g, (_, f) => `url(${encodeURI(fontsAbsBase + "/" + f)})`);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- inline wave logo (brand mark, redrawn as SVG) ---------- */
let _uid = 0;
const uid = () => "u" + _uid++;
function logo(wordClass = "logo__word", word = "LAGOS") {
  const g = uid();
  return `<span class="logo"><svg width="46" height="30" viewBox="0 0 72 44" aria-label="Lagos" role="img">
<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#6FA8FF"/><stop offset="1" stop-color="#1257D6"/></linearGradient></defs>
<path d="M4 17 C 18 6, 30 6, 40 14 C 50 22, 60 22, 68 14" fill="none" stroke="url(#${g})" stroke-width="6" stroke-linecap="round"/>
<path d="M4 32 C 18 21, 30 21, 40 29 C 50 37, 60 37, 68 29" fill="none" stroke="url(#${g})" stroke-width="6" stroke-linecap="round"/>
</svg><span class="${wordClass}">${word}</span></span>`;
}

/* ============================================================
   THE FUNNEL VISUAL (§7) — one scalable SVG.
   OFFER block -> 3 narrowing trapezoids -> RECOMPRA reopens wider
   -> loop arc rises back to the top. Loop = the key element.
   ============================================================ */
function funnelSVG(stages, { animate = false } = {}) {
  const by = Object.fromEntries(stages.map((s) => [s.id, s]));
  const nm = (id, fb) => esc((by[id] && by[id].name) || fb);
  const G = uid(), Gr = uid(), AR = uid(), ARd = uid();
  const loopClass = animate ? "loop-path" : "";
  return `<svg class="funnel-svg" viewBox="0 0 600 770" preserveAspectRatio="xMidYMid meet" role="img"
 aria-label="Funil Lagos: Oferta, Descoberta, Desejo, Decisão e Recompra reabrindo em loop">
<defs>
 <linearGradient id="${G}" x1="0" y1="134" x2="0" y2="582" gradientUnits="userSpaceOnUse">
   <stop offset="0" stop-color="#5E9CFF"/><stop offset="0.55" stop-color="#2D7DFF"/><stop offset="1" stop-color="#1257D6"/>
 </linearGradient>
 <radialGradient id="${Gr}" cx="0.35" cy="0.3" r="0.8">
   <stop offset="0" stop-color="#5E9CFF"/><stop offset="1" stop-color="#1257D6"/>
 </radialGradient>
 <marker id="${AR}" viewBox="0 0 12 12" refX="6" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
   <path d="M1 1 L11 6 L1 11 z" fill="#6FA8FF"/></marker>
 <marker id="${ARd}" viewBox="0 0 12 12" refX="6" refY="6" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
   <path d="M1 1 L11 6 L1 11 z" fill="#A9C6EE"/></marker>
</defs>

<!-- faint ripple decor -->
<g opacity="0.5" stroke="#2D7DFF" fill="none">
 <circle cx="300" cy="360" r="250" stroke-opacity="0.06"/>
 <circle cx="300" cy="360" r="330" stroke-opacity="0.045"/>
 <circle cx="300" cy="360" r="410" stroke-opacity="0.03"/>
</g>

<!-- OFFER foundation block -->
<rect x="150" y="16" width="300" height="66" rx="14" fill="#0C2750" stroke="#2D7DFF" stroke-width="2"/>
<text x="300" y="44" text-anchor="middle" style="font-family:var(--font-display);font-weight:880;font-stretch:114%" font-size="23" fill="#F0F6FF">${nm("oferta","OFERTA")}</text>
<text x="300" y="64" text-anchor="middle" style="font-family:var(--font-mono);letter-spacing:1.4px" font-size="10.5" fill="#6FA8FF">O ALICERCE · TUDO COMEÇA NA OFERTA</text>
<line x1="300" y1="84" x2="300" y2="126" stroke="#A9C6EE" stroke-width="2.5" marker-end="url(#${ARd})"/>

<!-- 3 narrowing trapezoids -->
<polygon points="65,134 505,134 450,298 120,298" fill="url(#${G})" stroke="#0A1B33" stroke-width="1.5"/>
<polygon points="120,300 450,300 400,448 170,448" fill="url(#${G})" stroke="#0A1B33" stroke-width="1.5"/>
<polygon points="170,450 400,450 349,582 221,582" fill="url(#${G})" stroke="#0A1B33" stroke-width="1.5"/>
<!-- subtle top sheen on each band -->
<g fill="#FFFFFF" opacity="0.10"><rect x="65" y="134" width="440" height="3"/><rect x="120" y="300" width="330" height="3"/><rect x="170" y="450" width="230" height="3"/></g>

<!-- band labels -->
<g text-anchor="middle" fill="#FFFFFF">
 <text x="300" y="210" style="font-family:var(--font-display);font-weight:850;font-stretch:112%" font-size="27">1 · ${nm("descoberta","DESCOBERTA")}</text>
 <text x="300" y="231" style="font-family:var(--font-mono);letter-spacing:2px" font-size="11" fill="#DCEAFF">TOPO</text>
 <text x="300" y="368" style="font-family:var(--font-display);font-weight:850;font-stretch:112%" font-size="24">2 · ${nm("desejo","DESEJO")}</text>
 <text x="300" y="388" style="font-family:var(--font-mono);letter-spacing:2px" font-size="10.5" fill="#EAF2FF">MEIO</text>
 <text x="300" y="523" style="font-family:var(--font-display);font-weight:850;font-stretch:112%" font-size="21">3 · ${nm("decisao","DECISÃO")}</text>
 <text x="300" y="541" style="font-family:var(--font-mono);letter-spacing:2px" font-size="9.5" fill="#EAF2FF">FUNDO</text>
</g>

<line x1="300" y1="584" x2="300" y2="612" stroke="#A9C6EE" stroke-width="2.5" marker-end="url(#${ARd})"/>

<!-- RECOMPRA reopens — wider, light, outlined -->
<rect x="50" y="616" width="500" height="100" rx="20" fill="#EEF4FC" stroke="#2D7DFF" stroke-width="3"/>
<text x="300" y="654" text-anchor="middle" style="font-family:var(--font-display);font-weight:870;font-stretch:114%" font-size="25" fill="#0B1B33">4 · ${nm("recompra","RECOMPRA")}</text>
<text x="300" y="680" text-anchor="middle" style="font-family:var(--font-mono);letter-spacing:1.6px" font-size="11" fill="#1257D6">O LUCRO QUE VOLTA</text>
<text x="300" y="701" text-anchor="middle" style="font-family:var(--font-body);font-style:italic" font-size="11" fill="#48608A">o funil não termina aqui — ele reabre</text>

<!-- THE LOOP (key element): from RECOMPRA out-right, up, back into OFFER -->
<path class="${loopClass}" d="M 550 666 C 600 600, 596 150, 452 60" fill="none"
   stroke="#6FA8FF" stroke-width="9" stroke-opacity="0.18" stroke-linecap="round"/>
<path class="${loopClass}" d="M 550 666 C 600 600, 596 150, 452 60" fill="none"
   stroke="#6FA8FF" stroke-width="3.5" stroke-linecap="round" marker-end="url(#${AR})"/>
<g transform="translate(566,372)">
 <circle r="17" fill="#0A1B33" stroke="#6FA8FF" stroke-width="2"/>
 <text x="0" y="6" text-anchor="middle" style="font-family:var(--font-mono)" font-size="19" fill="#6FA8FF">↺</text>
</g>
</svg>`;
}

/* ============================================================
   CLIENT BLOCKS
   ============================================================ */
function clientStageCard(s) {
  const kindCls = s.kind === "offer" ? " scard--offer" : s.kind === "loop" ? " scard--repurchase" : "";
  return `<article class="scard${kindCls}">
 <div class="scard__head">
   <span class="node">${esc(s.num)}</span>
   <div><div class="scard__name">${esc(s.name)}</div><div class="scard__tier">${esc(s.tier)}</div></div>
 </div>
 <p class="scard__does">${esc(s.does)}</p>
 <span class="scard__consumer"><span class="consumer-label">Para o seu consumidor →</span> <b>${esc(s.consumer)}</b></span>
</article>`;
}

/* ============================================================
   TEAM BLOCKS
   ============================================================ */
function teamField(f) {
  if (f.type === "amber") {
    return `<div class="amber-box"><div class="k">${esc(f.k)} — a preencher</div>
<p>${esc(f.v)}</p><span class="who-fill">[ GESTORA — A PREENCHER ]</span></div>`;
  }
  const cls = f.type === "signal" ? "field signal"
    : f.type === "who" ? "field who"
    : f.type === "accent" ? "field field--accent"
    : f.type === "diferencial" ? "field field--accent"
    : "field";
  return `<div class="${cls}"><div class="field__k">${esc(f.k)}</div><p class="field__v">${esc(f.v)}</p></div>`;
}

function teamStagePage(s, pageNo, total) {
  const kindCls = s.kind === "offer" ? " scard--offer" : "";
  return `<section class="page page--light stagepage">
 ${runheadInternal()}
 <div class="stage-hero">
   <span class="node"${kindCls ? ' style="background:linear-gradient(180deg,#0c2750,#08172e)"' : ""}>${esc(s.num)}</span>
   <div class="num-meta">
     <div class="k">${esc(s.tier)}</div>
     <h1>${esc(s.name)}</h1>
     <div class="role">${esc(s.role)}</div>
   </div>
 </div>
 ${s.fields.map(teamField).join("\n")}
 ${runfootInternal(pageNo, total)}
</section>`;
}

/* ---------- shared running header/footer (internal) ---------- */
function runheadInternal() {
  return `<div class="runhead">
   <span class="brandline">${logo("logo__word--ink", "LAGOS")} · FUNIL DE VENDAS</span>
   <span class="confidential-chip"><span class="dot"></span>${esc(data.brand.confidential)}</span>
 </div>`;
}
function runfootInternal(pageNo, total) {
  return `<div class="runfoot">
   <span>${esc(data.brand.confidentialFoot)}</span>
   <span>FUNIL LAGOS · VERSÃO EQUIPE · pág ${pageNo}/${total}</span>
 </div>`;
}

/* ============================================================
   DOCUMENT SHELLS
   ============================================================ */
function htmlDoc({ title, inlineCss, bodyClass, body, headExtra = "", scriptSrc = "", htmlClass = "" }) {
  return `<!DOCTYPE html>
<html lang="pt-BR"${htmlClass ? ` class="${htmlClass}"` : ""}>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)}</title>
${inlineCss ? `<style>\n${inlineCss}\n</style>` : ""}
${headExtra}
</head>
<body class="${bodyClass}">
${body}
${scriptSrc ? `<script src="${scriptSrc}" defer></script>` : ""}
</body>
</html>`;
}

/* ---------- CLIENT one-pager (PDF) ---------- */
function buildClientPDF() {
  const c = data.client;
  const body = `<section class="page client">
 <div class="bg-layer"><div class="glow-top"></div><div class="glow-corner tl"></div><div class="glow-corner br"></div></div>

 <div class="runhead">${logo("logo__word","LAGOS")}
   <span class="pill"><span class="pill-dot"></span>${esc(data.brand.rodape)}</span></div>

 <header class="hero">
   <div class="hero__top">
     <div>
       <span class="eyebrow hero__eyebrow">${esc(c.hero.eyebrow)}</span>
       <h1 class="gtitle">${esc(c.hero.title)}</h1>
     </div>
   </div>
   <p class="hero__sub lede">${esc(c.hero.sub)}</p>
 </header>

 <section class="tese">
   <span class="eyebrow">${esc(c.tese.eyebrow)}</span>
   <h2>${esc(c.tese.title)}</h2>
   <p>${esc(c.tese.text)}</p>
 </section>

 <div class="main">
   <div class="funnel-wrap">
     ${funnelSVG(c.stages)}
     <div class="funnel-caption">Quem compra de novo reentra no topo já aquecido —<br/>e custa muito menos que um cliente novo.</div>
   </div>
   <div class="stage-list">
     ${c.stages.map(clientStageCard).join("\n")}
   </div>
 </div>

 <section class="fechamento">
   <span class="eyebrow">${esc(c.fechamento.eyebrow)}</span>
   <p>${esc(c.fechamento.text)}</p>
 </section>
</section>`;
  return htmlDoc({
    title: "Funil da Lagos — Versão Cliente",
    inlineCss: fontsAbs + "\n" + tokens + "\n" + printCss,
    bodyClass: "doc-print",
    body,
  });
}

/* ---------- INTERNAL multi-page (PDF) ---------- */
function buildInternalPDF() {
  const t = data.team;
  const stagePages = t.stages.length;          // 5
  const total = 1 + stagePages + 1;            // cover + stages + transversal = 7

  const cover = `<section class="page cover">
 ${runheadInternal()}
 <div class="cover__top">
   <div>
     <span class="eyebrow">${esc(t.howto.eyebrow)}</span>
     <h1 class="dtitle">${esc(t.howto.title)}</h1>
     <p class="cover__lead">${esc(t.howto.lead)}</p>
   </div>
   <div class="funnel-wrap cover__funnel">${funnelSVG(t.stages)}</div>
 </div>
 <div class="minigrid">
   ${t.howto.minicards.map((m) => `<div class="minicard"><div class="k">${esc(m.k)}</div><div class="t">${esc(m.t)}</div><p>${esc(m.p)}</p></div>`).join("\n")}
 </div>
 <div class="rule-highlight"><div class="k">${esc(t.howto.rule.k)}</div><p>${esc(t.howto.rule.p)}</p></div>
 ${runfootInternal(1, total)}
</section>`;

  const stages = t.stages.map((s, i) => teamStagePage(s, 2 + i, total)).join("\n");

  const tv = t.transversal;
  const transversal = `<section class="page">
 ${runheadInternal()}
 <span class="eyebrow">${esc(tv.eyebrow)}</span>
 <h1 class="dtitle" style="font-size:24pt;margin:2mm 0 5mm">${esc(tv.title)}</h1>
 <div class="tcol">
   ${tv.blocks.map((b) => `<div class="tblock${b.warn ? " tblock--warn" : ""}">
     <h3>${esc(b.h)}</h3><div class="sub">${esc(b.sub)}</div><p>${esc(b.p)}</p>
     ${b.amber ? `<div class="amber-box"><div class="k">Placeholder gestora — a preencher</div><p>${esc(b.amber)}</p><span class="who-fill">[ GESTORA — A PREENCHER ]</span></div>` : ""}
     ${b.extra ? `<p>${esc(b.extra)}</p>` : ""}
   </div>`).join("\n")}
 </div>
 <div class="note-socios"><div class="k">${esc(tv.nota.k)}</div><p>${esc(tv.nota.p)}</p></div>
 ${runfootInternal(total, total)}
</section>`;

  return htmlDoc({
    title: "Funil da Lagos — Versão Equipe (CONFIDENCIAL)",
    inlineCss: fontsAbs + "\n" + tokens + "\n" + printCss,
    bodyClass: "doc-print doc-internal",
    body: cover + "\n" + stages + "\n" + transversal,
  });
}

/* ---------- WEB landing (index.html) ---------- */
function webStageCard(s) {
  const kindCls = s.kind === "offer" ? " scard--offer" : s.kind === "loop" ? " scard--repurchase" : "";
  return `<article class="scard${kindCls} reveal">
 <div class="scard__head"><span class="node">${esc(s.num)}</span>
   <div><div class="scard__name">${esc(s.name)}</div><div class="scard__tier">${esc(s.tier)}</div></div></div>
 <p class="scard__does">${esc(s.does)}</p>
 <span class="scard__consumer"><span class="consumer-label">Para o seu consumidor →</span> <b>${esc(s.consumer)}</b></span>
</article>`;
}
function webStageSection(s) {
  return `<section class="stage-sec" id="etapa-${esc(s.id)}">
 <div class="wrap">
   <div class="big-node reveal"><span class="node">${esc(s.num)}</span><span class="tier">${esc(s.tier)}</span></div>
   <div>
     <h3 class="reveal">${esc(s.name)}</h3>
     <p class="does reveal">${esc(s.does)}</p>
     <div class="consumer-row reveal"><span class="consumer-label">Para o seu consumidor</span>
       <span class="val">→ ${esc(s.consumer)}</span></div>
   </div>
 </div>
</section>`;
}
function buildWeb() {
  const c = data.client;
  const body = `<div class="site-bg" aria-hidden="true"></div>

<header class="topbar"><div class="wrap">
  ${logo("logo__word", "LAGOS")}
  <a class="cta" href="#contato">Falar com a Lagos</a>
</div></header>

<main>
<section class="hero-sec"><div class="wrap">
  <span class="eyebrow">${esc(c.hero.eyebrow)}</span>
  <h1 class="gtitle">${esc(c.hero.title)}</h1>
  <p class="hero__sub">${esc(c.hero.sub)}</p>
  <div class="hero-cta">
    <a class="btn btn--primary" href="#funil">Ver o funil ↓</a>
    <a class="btn btn--ghost" href="#contato">Quero esse caminho na minha loja</a>
  </div>
  <div class="rodape">${esc(data.brand.rodape)}</div>
</div></section>

<section class="sec sec--alt" id="tese"><div class="wrap">
  <div class="tese-web reveal">
    <span class="eyebrow sec__eyebrow">${esc(c.tese.eyebrow)}</span>
    <h2>${esc(c.tese.title)}</h2>
    <p class="sec__lead">${esc(c.tese.text)}</p>
  </div>
</div></section>

<section class="sec funnel-sec" id="funil"><div class="wrap">
  <span class="eyebrow sec__eyebrow reveal">O CAMINHO INTEIRO</span>
  <h2 class="reveal" style="margin-bottom:8px">Da oferta à recompra — e de volta ao topo.</h2>
  <div class="funnel-grid">
    <div class="funnel-wrap reveal">
      ${funnelSVG(c.stages, { animate: true })}
      <div class="funnel-caption-web">Quem compra de novo reentra no topo já aquecido — e custa muito menos que um cliente novo.</div>
    </div>
    <div class="cards-web">
      ${c.stages.map(webStageCard).join("\n")}
    </div>
  </div>
</div></section>

${c.stages.map(webStageSection).join("\n")}

<section class="sec" id="fechamento"><div class="wrap">
  <div class="fechamento-web reveal">
    <span class="eyebrow eyebrow--plain sec__eyebrow" style="justify-content:center;display:flex">${esc(c.fechamento.eyebrow)}</span>
    <p>${esc(c.fechamento.text)}</p>
  </div>
</div></section>

<section class="final-cta" id="contato"><div class="wrap">
  <a class="btn btn--primary" href="#" style="font-size:1.05rem">Quero esse funil na minha loja</a>
</div></section>
</main>

<footer class="site-foot"><div class="wrap">
  <span>${logo("logo__word","LAGOS")}</span>
  <span>${esc(data.brand.rodape)}</span>
</div></footer>`;

  return htmlDoc({
    title: "O Funil da Lagos",
    htmlClass: "no-js",
    bodyClass: "",
    body,
    // swap no-js -> js before first paint (prevents flash); CSS shows content for no-js users.
    headExtra: `<script>document.documentElement.className="js";</script>
<link rel="stylesheet" href="styles.css"/>`,
    scriptSrc: "script.js",
  });
}

const webStyles = `/* O Funil da Lagos — web bundle. Self-hosted fonts; no external requests. */
@import url("fonts/fonts.css");
${tokens}
${webCss}`;

const webScript = `/* O Funil da Lagos — progressive enhancement only (zero dependencies). */
(function () {
  document.documentElement.classList.remove("no-js");
  document.body.classList.remove("no-js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal-on-scroll
  var items = [].slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // Draw the loop arc when the funnel enters view
  var loop = [].slice.call(document.querySelectorAll(".loop-path"));
  if (reduce) { loop.forEach(function (p) { p.classList.add("drawn"); }); }
  else if ("IntersectionObserver" in window && loop.length) {
    var lo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loop.forEach(function (p) { p.classList.add("drawn"); }); lo.disconnect(); } });
    }, { threshold: 0.3 });
    lo.observe(loop[0].ownerSVGElement || loop[0]);
  } else { loop.forEach(function (p) { p.classList.add("drawn"); }); }
})();`;

/* ============================================================
   GUARDRAIL: no back-end content may reach client/web files (§3)
   ============================================================ */
function assertNoLeak(name, html) {
  // Only the VISIBLE text matters — strip shared CSS/JS boilerplate (its class names
  // legitimately mention "placeholder"/"gestora" even in the client doc, where they go unused).
  const visible = html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "");
  // Truly back-end-only terms (none appear in the approved §5 client copy; note "remarketing"
  // DOES appear in §5 RECOMPRA, so it is intentionally NOT forbidden).
  const forbidden = [
    "USO INTERNO", "CONFIDENCIAL", "Sinal de passagem",
    "Diagnóstico em Cadeia", "Escada de Alavancas", "Trava de margem", "markup",
    "A PREENCHER", "GESTORA", "A mecânica", "mês 1", "Demitir cliente", "RAFAEL", "DAVID",
    "lookalike", "CRM", "CTR", "Omnichannel", "upsell",
  ];
  // Whole-token match using Unicode-letter boundaries (so "CTR" does NOT match
  // "preserveAspe[ctR]atio", and accented terms still anchor correctly).
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const leak = (w) => new RegExp(`(^|[^\\p{L}])${reEsc(w)}([^\\p{L}]|$)`, "iu").test(visible);
  const hits = forbidden.filter(leak);
  if (hits.length) {
    const ctx = hits.map((w) => { const i = low.indexOf(w.toLowerCase()); return `${w} @ "...${visible.slice(Math.max(0, i - 40), i + w.length + 25).replace(/\s+/g, " ")}..."`; });
    throw new Error(`LEAK in ${name}: back-end token(s) present ->\n  ${ctx.join("\n  ")}`);
  }
}

/* ============================================================
   EMIT
   ============================================================ */
const clientPDF = buildClientPDF();
const internalPDF = buildInternalPDF();
const webHTML = buildWeb();

assertNoLeak("funnel_client.html", clientPDF);
assertNoLeak("index.html", webHTML);
// sanity: internal MUST carry the confidential mark on every page
const pageCount = (internalPDF.match(/class="page/g) || []).length;
const confCount = (internalPDF.match(/CONFIDENCIAL · USO INTERNO/g) || []).length;
if (confCount < pageCount) throw new Error(`Internal: CONFIDENCIAL chip on ${confCount}/${pageCount} pages`);

writeFileSync(join(TMP, "funnel_client.html"), clientPDF);
writeFileSync(join(TMP, "funnel_internal.html"), internalPDF);
writeFileSync(join(CLIENT_ASSETS, "index.html"), webHTML);
writeFileSync(join(CLIENT_ASSETS, "styles.css"), webStyles);
writeFileSync(join(CLIENT_ASSETS, "script.js"), webScript);

console.log("BUILD OK");
console.log(` client one-pager : tmp/funnel_client.html`);
console.log(` internal ${pageCount} pages : tmp/funnel_internal.html  (CONFIDENCIAL x${confCount})`);
console.log(` web bundle        : client_assets/index.html + styles.css + script.js`);
console.log(` leak check        : PASS (client & web free of back-end tokens)`);
