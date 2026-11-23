"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { SectionHeading } from "./ui/SectionHeading";
import { ActionButton } from "./ui/ActionButton";

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

/**
 * Resultados em linha do tempo vertical (formato da referência): o texto e o
 * print do painel trocam de lado a cada case. No celular a linha fica à
 * esquerda e tudo empilha.
 */
export function CasesSection() {
  return (
    <section id="cases" className="relative isolate overflow-hidden bg-section py-20 text-foreground md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_55%_80%_at_50%_0%,rgba(21,94,239,0.08),transparent_65%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resultados"
          title="Resultados que falam por si"
          subtitle="Operações reais que escalamos com a Lagos. Os números abaixo são de painéis dos próprios clientes."
          className="mb-16 md:mb-20"
        />

        <div className="relative">
          {/* Linha do tempo */}
          <div className="pointer-events-none absolute bottom-6 left-[11px] top-2 w-px bg-border-strong md:left-1/2" />

          <div className="space-y-16 md:space-y-24">
            {cases.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={c.segment}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55 }}
                  className="relative grid items-center gap-8 pl-10 md:grid-cols-2 md:gap-20 md:pl-0"
                >
                  {/* Marcador na linha */}
                  <span className="absolute left-[11px] top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-accent shadow-[0_0_0_6px_#F6F7F9] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

                  {/* Texto */}
                  <div className={cn(flip ? "md:order-2" : "md:text-right")}>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      {c.segment} · {c.context}
                    </p>
                    <p className="mt-3 font-heading text-5xl font-bold tracking-tight md:text-6xl">{c.metric}</p>
                    <p
                      className={cn(
                        "mt-2 inline-flex items-center gap-1.5 text-sm text-muted",
                        !flip && "md:flex-row-reverse"
                      )}
                    >
                      <TrendingUp size={15} className="text-accent" />
                      {c.metricLabel}
                    </p>
                    <p className="mt-5 leading-relaxed text-muted">{c.description}</p>
                    <div className={cn("mt-5 flex flex-wrap gap-2", !flip && "md:justify-end")}>
                      {c.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Print do painel */}
                  <div className={cn(flip && "md:order-1")}>
                    <div className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]">
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
                        className="mx-auto max-h-[340px] w-full rounded-lg object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <ActionButton href="#formulario" icon={<ArrowRight size={18} />}>
            Quero resultados assim
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
