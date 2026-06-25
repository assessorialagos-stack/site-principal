"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { GlowCard } from "./ui/GlowCard";

// Cases reais. As imagens (prints dos painéis) ficam em /public/cases.
// Coloque os 3 screenshots como case-1.png, case-2.png e case-3.png.
const cases = [
  {
    segment: "Semijoias",
    img: "/cases/case-1.png",
    metric: "R$ 0,97",
    metricLabel: "por conversa no WhatsApp",
    chips: ["345 conversas", "71% abaixo do mercado"],
    description:
      "Primeiro mês de teste de uma loja de semijoias. Estruturamos a campanha de mensagens e geramos 345 conversas qualificadas a R$ 0,97 cada — 71% mais barato que a média da concorrência.",
    context: "1º mês de teste",
  },
  {
    segment: "Loja de computadores",
    img: "/cases/case-2.png",
    metric: "R$ 35 mil",
    metricLabel: "em vendas numa única semana",
    chips: ["Ticket médio R$ 1.524", "8.381 visitas"],
    description:
      "Operação validada de uma loja de computadores. Em apenas uma semana, R$ 35 mil em vendas, com ticket médio de R$ 1.524 e mais de 8 mil visitas qualificadas na loja.",
    context: "1 semana de operação",
  },
  {
    segment: "Roupas de grife",
    img: "/cases/case-3.png",
    metric: "14,2x",
    metricLabel: "de ROAS em 30 dias",
    chips: ["97 vendas", "Conversão direto no site"],
    description:
      "Loja de roupas de grife com conversão direto no site. Em 30 dias, ROAS de 14,2x — cada real investido voltou multiplicado, com 97 vendas atribuídas à operação.",
    context: "Últimos 30 dias",
  },
];

export function CasesSection() {
  return (
    <section id="cases" className="theme-light relative overflow-hidden bg-section py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Cases"
          title="Resultados que falam por si"
          subtitle="Operações reais que escalamos com a Lagos. Os números abaixo são de painéis dos próprios clientes."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {cases.map((c, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <GlowCard tone="light" className="flex h-full flex-col">
                {/* Print do painel (degradê de marca como fundo, caso a imagem ainda não esteja) */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-[inherit] bg-gradient-to-br from-section via-card to-background">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={`Painel de resultados — ${c.segment}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    className="relative h-full w-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-ink px-3 py-1.5">
                    <span className="text-xs font-medium tracking-wide text-background">{c.segment}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="mb-5 flex items-end gap-3">
                    <span className="font-heading text-4xl font-bold text-foreground">{c.metric}</span>
                    <span className="mb-1.5 inline-flex items-center gap-1 text-xs text-muted">
                      <TrendingUp size={14} className="text-accent" />
                      {c.metricLabel}
                    </span>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-border bg-section px-3 py-1 text-[0.7rem] font-medium text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>

                  <div className="flex items-center gap-2 border-t border-border pt-5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">{c.context}</span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
