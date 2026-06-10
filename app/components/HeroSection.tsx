"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Activity } from "lucide-react";
import { Backdrop } from "./ui/Backdrop";
import { NeonButton } from "./ui/NeonButton";
import { Eyebrow } from "./ui/Eyebrow";
import { smoothScrollTo } from "@/app/lib/scroll";

const logos = ["LOGO 1", "LOGO 2", "LOGO 3", "LOGO 4", "LOGO 5", "LOGO 6"];

const kpis = [
  { label: "Investido", value: "R$ 184k" },
  { label: "Receita", value: "R$ 771k" },
  { label: "ROAS", value: "4.19x" },
  { label: "Pedidos", value: "2.847" },
];

function DashboardMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-5xl">
      {/* Barra de janela */}
      <div className="flex items-center gap-2 border-b border-border bg-section px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
          <span className="rounded-md border border-border bg-white px-3 py-1 font-mono text-[0.7rem] text-muted">
            app.lagos.com/dashboard
          </span>
        </div>
      </div>

      {/* Conteúdo do painel */}
      <div className="bg-white p-5 md:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Activity size={16} />
            </span>
            <span className="font-heading text-sm font-semibold text-foreground">
              Painel de Performance
            </span>
          </div>
          <span className="rounded-full border border-border bg-section px-3 py-1 text-xs text-muted">
            Últimos 30 dias
          </span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-section/60 p-3">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">{k.label}</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border bg-section/40 p-3 md:h-56">
          <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(21,94,239,0.18)" />
                <stop offset="100%" stopColor="rgba(21,94,239,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,135 C40,120 60,118 100,108 C140,98 160,82 200,74 C240,66 270,52 320,36 C355,25 380,18 400,12"
              fill="none"
              stroke="#155EEF"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,135 C40,120 60,118 100,108 C140,98 160,82 200,74 C240,66 270,52 320,36 C355,25 380,18 400,12 L400,160 L0,160 Z"
              fill="url(#heroFill)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </svg>
        </div>
        <p className="mt-3 text-right text-[0.65rem] text-muted/70">*dados ilustrativos</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("#formulario");
  };

  return (
    <section className="relative overflow-hidden bg-background pt-36 pb-20 md:pt-40">
      <Backdrop variant="hero" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}>
              Assessoria de marketing para varejo & e-commerce
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-7 font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-[4.25rem]"
          >
            Marketing que vira lucro de verdade.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            A assessoria de quem entende de loja de verdade. Tráfego, conteúdo, design e estratégia
            operando como um só ecossistema, focado em LTV e lucro líquido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <NeonButton href="#formulario" onClick={scrollToForm} variant="primary" icon={<ArrowRight size={18} />}>
              Quero escalar minha loja
            </NeonButton>
            <NeonButton
              href="https://wa.me/5514999999999"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={<MessageSquare size={18} />}
            >
              Falar no WhatsApp
            </NeonButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-sm text-muted"
          >
            +120 lojas escaladas · Atendimento para todo o Brasil
          </motion.p>
        </div>

        {/* Print emoldurado (estilo cal.com) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
          className="mt-16 md:mt-20"
        >
          <DashboardMock />
        </motion.div>

        {/* Faixa de logos */}
        <div className="mt-16 md:mt-20">
          <p className="text-center text-sm text-muted">Marcas que confiam na Lagos</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60">
            {logos.map((logo) => (
              <span key={logo} className="font-heading text-lg font-semibold tracking-wide text-foreground/40">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
