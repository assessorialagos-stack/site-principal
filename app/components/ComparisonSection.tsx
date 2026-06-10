"use client";

import { motion } from "framer-motion";
import { XCircle, Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

const generic = [
  "Foca apenas em likes, curtidas e métricas de vaidade.",
  'Acha que o problema de vendas se resolve só com "mais tráfego".',
  "Não entende de estoque, margem de lucro, DRE ou markup.",
  "Atendimento robótico e relatórios difíceis de entender.",
];

const lagos = [
  "Foco absoluto em ROAS real, LTV e dinheiro no caixa.",
  "Diagnóstico do ecossistema: produto, oferta, time comercial e tráfego.",
  "Especialistas com vivência real no dia a dia do varejo.",
  "Transparência total, acompanhamento próximo e foco no lucro.",
];

export function ComparisonSection() {
  return (
    <section className="relative overflow-hidden bg-section py-28 md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Comparativo"
          title={
            <>
              Por que a Lagos é <span className="text-gradient">diferente?</span>
            </>
          }
          className="mb-16"
        />

        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:gap-8">
          {/* VS badge */}
          <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card font-heading text-sm font-bold text-foreground shadow-sm">
              VS
            </span>
          </div>

          {/* Agência genérica */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8"
          >
            <h3 className="mb-8 border-b border-border pb-4 font-heading text-xl font-bold text-muted">
              Agência Genérica
            </h3>
            <ul className="space-y-6">
              {generic.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-muted">
                    <XCircle className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <span className="text-muted line-through decoration-border">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lagos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex-1 overflow-hidden rounded-3xl border border-foreground/20 bg-card p-7 shadow-md md:p-8"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 select-none font-heading text-[10rem] font-bold leading-none text-foreground/[0.04]">
              L
            </div>
            <h3 className="relative z-10 mb-8 flex items-center gap-2 border-b border-border pb-4 font-heading text-xl font-bold text-foreground">
              <span className="h-2 w-2 rounded-full bg-ink" />
              Lagos Assessoria
            </h3>
            <ul className="relative z-10 space-y-6">
              {lagos.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
