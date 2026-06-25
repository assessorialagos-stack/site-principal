"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Eyebrow } from "./ui/Eyebrow";

// Trapézios do funil (níveis que afunilam) — o subtítulo é o processo interno.
const traps = [
  { label: "DESCOBERTA", tier: "Alcance", w: "100%", from: "#5B8BFF", to: "#3B6BFF" },
  { label: "DESEJO", tier: "Aquecimento", w: "80%", from: "#3B6BFF", to: "#2A52CC" },
  { label: "DECISÃO", tier: "Compra", w: "60%", from: "#2A52CC", to: "#1B3A8F" },
];

// Blocos de explicação (seção própria, abaixo do funil)
const explain = [
  {
    num: "1",
    name: "DESCOBERTA",
    process: "Alcance",
    does: "Colocamos o seu produto na frente das pessoas certas e testamos o que realmente reage.",
    consumer: "conhecer a sua marca no momento certo.",
  },
  {
    num: "2",
    name: "DESEJO",
    process: "Aquecimento",
    does: "Aquecemos quem demonstrou interesse: conteúdo, prova e quebra de objeção viram vontade.",
    consumer: "confiança para dar o próximo passo.",
  },
  {
    num: "3",
    name: "DECISÃO",
    process: "Compra",
    does: "A hora da compra: a oferta certa na frente da pessoa certa e o atendimento conduzindo até o sim.",
    consumer: "uma compra fácil, sem fricção.",
  },
  {
    num: "4",
    name: "RECOMPRA",
    process: "Pós-venda · Recorrência · Expansão",
    does: "Fazemos quem já comprou voltar a comprar. É o cliente mais barato e lucrativo que existe.",
    consumer: "motivos para continuar comprando de você.",
  },
];

// Variantes 3D: cada peça entra em cascata quando o funil aparece (e fica).
const pieceVariants = {
  hidden: { opacity: 0, y: 45, rotateX: -55 },
  show: { opacity: 1, y: 0, rotateX: 0 },
};

/** Uma peça do funil que entra em 3D (cascata via stagger do container). */
function Piece({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={pieceVariants}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Bloco de explicação (seção própria — empilhado no mobile, em linha no desktop). */
function ExplainCard({ stage, index }: { stage: (typeof explain)[number]; index: number }) {
  const loop = stage.num === "4";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={
        "flex flex-col rounded-2xl border p-5 backdrop-blur-sm md:p-6 " +
        (loop ? "border-white/25 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]")
      }
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className={
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-lg font-black " +
            (loop ? "border-2 border-white/70 bg-white/10 text-white" : "bg-accent text-white")
          }
        >
          {stage.num}
        </span>
        <div className="min-w-0">
          <h4 className="font-heading text-lg font-bold leading-tight tracking-tight text-white">{stage.name}</h4>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">{stage.process}</span>
        </div>
      </div>
      <p className="text-[0.92rem] leading-relaxed text-white/65">{stage.does}</p>
      <p className="mt-4 border-t border-dashed border-white/10 pt-3 text-[0.88rem] leading-snug text-white/80">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">Consumidor → </span>
        {stage.consumer}
      </p>
    </motion.div>
  );
}

export function FunnelSection() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-dark text-white">
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_55%_80%_at_50%_4%,rgba(47,107,255,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-white mask-radial opacity-15" />

      <div className="relative z-10 px-4 pt-24 pb-6 text-center sm:px-6 sm:pt-28">
        <div className="flex justify-center">
          <Eyebrow tone="dark">Como vendemos o seu produto</Eyebrow>
        </div>
        <h2 className="mt-3 font-heading text-[1.85rem] font-bold tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl">
          O Funil da <span className="text-accent">Lagos</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.85rem] leading-snug text-white/55 sm:max-w-2xl sm:text-base">
          O caminho que leva o seu consumidor de “nunca ouvi falar” até “comprei de novo”.
        </p>

        {/* Funil 3D — cada peça entra em cascata ao aparecer */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.16 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px -18% 0px" }}
          className="mx-auto mt-10 w-[86vw] max-w-[360px] [perspective:1300px] sm:max-w-[460px]"
        >
          <div className="relative [transform-style:preserve-3d]">
            <div className="[transform-style:preserve-3d]">
              {/* Oferta — alicerce */}
              <Piece className="relative z-10 rounded-2xl border border-accent/40 bg-gradient-to-b from-[#13275e] to-[#0c1a40] px-4 py-3 text-center shadow-[0_0_40px_-12px_rgba(59,107,255,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-5 sm:py-4">
                <p className="font-heading text-sm font-black tracking-wide text-white sm:text-base">OFERTA</p>
                <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#9FC0FF] sm:text-[0.6rem] sm:tracking-[0.18em]">
                  O alicerce · Estruturação
                </p>
              </Piece>

              {/* Níveis que afunilam */}
              <div className="mt-1 flex flex-col items-center gap-1 [transform-style:preserve-3d] sm:mt-1.5 sm:gap-1.5">
                {traps.map((t, i) => (
                  <Piece
                    key={t.label}
                    className="flex h-[56px] items-center justify-center text-center shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] sm:h-[72px]"
                    style={{
                      width: t.w,
                      clipPath: "polygon(8% 0, 92% 0, 80% 100%, 20% 100%)",
                      background: `linear-gradient(180deg, ${t.from}, ${t.to})`,
                    }}
                  >
                    <div>
                      <p className="font-heading text-[0.82rem] font-bold tracking-wide text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] sm:text-[0.95rem]">
                        {i + 1} · {t.label}
                      </p>
                      <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/75 sm:text-[0.55rem] sm:tracking-[0.22em]">
                        {t.tier}
                      </p>
                    </div>
                  </Piece>
                ))}
              </div>

              {/* Recompra — o loop */}
              <Piece className="relative z-10 mx-auto mt-1 w-[88%] rounded-2xl border-2 border-white/80 bg-white/[0.08] px-4 py-3 text-center shadow-[0_0_46px_-12px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] sm:mt-1.5 sm:w-[86%] sm:px-5 sm:py-4">
                <p className="font-heading text-sm font-black tracking-wide text-white sm:text-base">4 · RECOMPRA</p>
                <p className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/75 sm:text-[0.58rem] sm:tracking-[0.12em]">
                  Pós-venda · Recorrência · Expansão
                </p>
              </Piece>
            </div>

            {/* Alça do loop voltando ao topo */}
            <motion.svg
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pointer-events-none absolute -right-5 top-12 h-[78%] w-12"
              viewBox="0 0 48 320"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 300 C 44 300, 44 250, 44 160 C 44 70, 44 20, 8 20"
                stroke="url(#loopGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 5"
              />
              <path d="M8 20 l 9 -5 m -9 5 l 9 5" stroke="#9FC0FF" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="loopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9FC0FF" />
                  <stop offset="100%" stopColor="#3B6BFF" />
                </linearGradient>
              </defs>
            </motion.svg>
            <motion.span
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -right-1 top-[46%] flex h-7 w-7 items-center justify-center rounded-full border border-accent/50 bg-[#0c1a40] text-[#9FC0FF] shadow-[0_0_18px_-4px_rgba(59,107,255,0.8)]"
            >
              <RefreshCw size={13} />
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* 4 blocos de explicação — seção própria (empilhada no mobile, em linha no desktop) */}
      <div id="funil-etapas" className="relative z-10 px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow tone="dark">As 4 etapas, na prática</Eyebrow>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {explain.map((s, i) => (
            <ExplainCard key={s.num} stage={s} index={i} />
          ))}
        </div>
      </div>

      {/* Em uma frase */}
      <div className="container relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl rounded-2xl border border-accent/25 bg-accent/[0.06] p-7 text-center backdrop-blur-sm md:p-9"
        >
          <Eyebrow tone="dark">Em uma frase</Eyebrow>
          <p className="mx-auto mt-4 max-w-3xl font-heading text-xl font-bold leading-snug text-white md:text-2xl">
            A maioria das agências te traz cliente novo e para por aí. A Lagos constrói a oferta, atrai a
            pessoa certa, conduz a venda e faz ela voltar. O funil inteiro, da primeira impressão à
            recompra.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
