# Funil de Vendas — Lagos Assessoria

Material visual do **Funil de Vendas** da Lagos (a "casca de venda" que o comercial mostra ao
lojista). Duas versões do mesmo funil, em arquivos **separados** (front-end ≠ back-end, conforme o
guardrail do brief), mais uma landing page estática embutível.

> Construído a partir do *Brief de Produção — Funil de Vendas Lagos · v1.0*. Conteúdo das seções 5
> (cliente) e 6 (equipe), design system da seção 4, peça central da seção 7, guardrails da seção 3.

---

## O que tem nesta pasta

```
Funil de Vendas/
├─ funnel_client.pdf        ← VERSÃO CLIENTE (front-end). 1 página A4, escura, persuasiva.
├─ funnel_internal.pdf      ← VERSÃO EQUIPE (back-end). 7 páginas A4, CONFIDENCIAL, operacional.
├─ README.md                ← este arquivo
├─ client_assets/           ← landing page do cliente (replica o PDF cliente; embutível no site)
│  ├─ index.html
│  ├─ styles.css
│  ├─ script.js             ← só progressive enhancement (reveal no scroll); zero dependências
│  ├─ fonts/                ← Archivo / Inter / IBM Plex Mono auto-hospedadas (woff2) + fonts.css
│  └─ assets/logo-lagos.png ← logo de referência (a marca também é desenhada em SVG inline)
└─ build/                   ← fonte única + scripts de geração (reprodutível)
   ├─ src/data/funnel.json  ← TODO o conteúdo (cliente + equipe), fonte única de verdade
   ├─ src/css/{tokens,print,web}.css
   ├─ build.mjs             ← monta os 3 HTML a partir do funnel.json + checagem anti-vazamento
   ├─ render.mjs            ← gera os 2 PDFs (Edge headless) + PNGs de QA + auditoria de rede
   ├─ fetch-fonts.mjs       ← baixa as fontes open-source uma vez
   ├─ verify.mjs / shot-static.mjs ← capturas de QA por página
   └─ tmp/                  ← HTML intermediário dos PDFs + PNGs de QA (descartável)
```

### As duas versões

| | **funnel_client.pdf** (cliente) | **funnel_internal.pdf** (equipe) |
|---|---|---|
| Público | Lojista, na reunião comercial | Gestora, social, comercial |
| Tom | Cru, persuasivo, sem mecânica | Detalhado, operacional |
| Conteúdo | Hero · Tese · Funil · 5 etapas (frase + "para o seu consumidor") · Fechamento | Como ler · 5 etapas (o que fazemos / mecânica / sinal de passagem / quem toca / diferencial) · Escala-Ritual-Freios · Nota aos sócios |
| Formato | 1 página A4 retrato (arranjo 1 do brief) | 7 páginas A4 |
| Marca | — | `CONFIDENCIAL · USO INTERNO` em **todas** as páginas + "não circula fora da equipe" no rodapé |

---

## Como foi gerado

1. **HTML/CSS** montados por `build/build.mjs` a partir de `build/src/data/funnel.json` (conteúdo) e
   `build/src/css/*` (design system da seção 4). Blocos modulares (hero, tese, funil, etapa×5,
   transversal, fechamento) são funções de render compostas em cada arranjo — o mesmo conteúdo vira
   1 página (cliente), N páginas (equipe) ou scroll (web) sem reescrever texto.
2. **PDF** via **Microsoft Edge (Chromium) headless**, dirigido por `puppeteer-core`
   (`page.pdf({ printBackground:true, preferCSSPageSize:true })`, A4 via `@page`). Espera
   `document.fonts.ready` antes de imprimir para as fontes carregarem.
3. **Fontes auto-hospedadas** (`build/fetch-fonts.mjs`): Archivo (variável, eixos peso **e** largura),
   Inter e IBM Plex Mono — todas **SIL OFL** (livres para hospedar/redistribuir). Ficam em
   `client_assets/fonts/` e servem tanto os PDFs quanto a web → nenhuma dependência externa.

### Regenerar do zero

```bash
cd "Funil de Vendas/build"
node fetch-fonts.mjs     # 1x — baixa as fontes (precisa de internet só aqui)
node build.mjs           # monta os HTML + checagens de guardrail
node render.mjs          # gera os 2 PDFs + PNGs de QA + auditoria de rede
```

`puppeteer-core` é resolvido a partir de `../../Site Principal/node_modules` (o site da Lagos já o
tinha instalado) — **nada é alterado naquela pasta**. Se o site mudar de lugar, ajuste o caminho em
`render.mjs` ou exporte `PPTR_BASE` apontando para um `package.json` que enxergue `puppeteer-core`.

---

## Publicar a landing page no site

A pasta `client_assets/` é **estática** e funciona sem servidor (abra `index.html` direto). Opções:

- **Mais simples:** suba a pasta `client_assets/` como uma rota (ex.: `/funil`) e/ou embuta via
  `<iframe src="/funil/index.html">`.
- **Inline:** copie o conteúdo de `<main>` do `index.html` para a sua página, inclua `styles.css` e
  `script.js`, e leve a pasta `fonts/`. (O CSS usa seletores globais como `body`/`section`; se for
  embutir dentro de uma página existente, convém isolá-lo num container ou via iframe.)
- Auditoria confirmada: **zero requisições externas** (fontes, scripts e imagens são locais) — seguro
  sob CSP estrita e offline.

---

## Guardrails respeitados (seção 3 do brief)

- ✔ Sem contagem de clientes / portfólio.
- ✔ Sem restrição regional — só "ATENDIMENTO PARA TODO O BRASIL". (`BAURU/SP` aparece apenas como
  endereço da agência, como no próprio brief.)
- ✔ Back-end **não vaza** no front-end: `build.mjs` roda uma checagem automática que **falha** se a
  versão cliente ou a web contiverem termos internos (sinal de passagem, Diagnóstico em Cadeia,
  Escada de Alavancas, Trava de margem, markup, GESTORA, nomes dos sócios etc.).
- ✔ Sem promessa de número de retorno na versão cliente.
- ✔ Versão equipe marcada `CONFIDENCIAL · USO INTERNO` em todas as páginas (verificado: 7/7).
- ✔ Só fontes open-source e a marca da própria Lagos.
- ✔ Títulos com efeito de gradiente feitos com **cor sólida + glow** (`#7FB2FF` + `text-shadow`),
  não `background-clip:text` — que sairia invisível no PDF do Chromium (nota técnica do brief).
- ✔ Funil com a **Recompra reabrindo em loop** (seção 7): bloco-alicerce Oferta → 3 trapézios que
  afunilam → Recompra mais larga → alça/arco (↺) voltando ao topo.
- ✔ Blocos modulares (montáveis em 1 ou N páginas / scroll).

---

## Placeholders inseridos (réguas da gestora — seção 9)

Renderizados como **caixa âmbar tracejada `[ GESTORA — A PREENCHER ]`**. O material funciona sem os
números; preenchidos, vira v1.1.

| Onde (versão equipe) | O que falta preencher |
|---|---|
| Etapa **DESCOBERTA** | Verba mínima por criativo/conjunto · estrutura de público (aberto × interesse × lookalike) · dias de teste antes de matar criativo |
| Página transversal — **ESCALA** | % por subida · cadência entre subidas · sinais de fadiga de criativo (frequência, CTR caindo) |

---

## Suposições registradas

- **Idioma:** Português (BR) — público é o lojista brasileiro.
- **Logo:** o brief cita `logo_clean.png`, que não existe na pasta. Usei `Lagos Empresa/Logo Lagos.png`
  como referência (copiado para `client_assets/assets/`) e desenhei a marca de duas ondas como **SVG
  inline** (escala em qualquer fundo, sem peso de imagem, sem licença de terceiros).
- **Design system:** segui a **seção 4 do brief** (Archivo/Inter/IBM Plex Mono, paleta `--tide`,
  fundo escuro). O CSS atual do site (`Site Principal`) está num tema claro diferente (Inter/cal.com);
  o brief é a fonte autoritativa e foi o que reproduzi. As ondas decorativas usam a geometria real do
  site (`Backdrop.tsx`), recolorida para `--tide`.
- **Nomes das etapas** são dados em `funnel.json` (seção 9: são "proposta"); renomear um nome não
  quebra o layout — atualiza cartões e funil automaticamente.
- **Arranjos escolhidos:** cliente = "tudo em 1 página A4"; web = landing com scroll. Os blocos estão
  prontos para outros arranjos (uma landing por etapa, etc.) sem reescrever conteúdo.

### Nota de negócio (do brief, para o David)
Ao mostrar **Recompra** ao cliente, a Lagos passa a **prometer retenção** — o que exige que a operação
realmente entregue retenção. Não é só um slide; é escopo. (Registrado aqui conforme o brief; o David
já está ciente.)
