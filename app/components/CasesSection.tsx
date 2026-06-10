"use client";

import { motion } from "framer-motion";
import { TrendingUp, Camera } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { GlowCard } from "./ui/GlowCard";
import { MediaPlaceholder } from "./ui/MediaPlaceholder";

// Cases ILUSTRATIVOS — substitua prints, números e nomes pelos reais.
const cases = [
  {
    segment: "E-commerce de Moda",
    metric: "+312%",
    metricLabel: "Faturamento em 90 dias",
    chips: ["ROAS 4.8x", "CAC −38%"],
    description:
      "Reestruturamos o funil de aquisição e a oferta carro-chefe. Em 3 meses, a operação triplicou o faturamento mantendo a margem saudável.",
    client: "Cliente Exemplo 1",
  },
  {
    segment: "Rede de Varejo Físico",
    metric: "4.6x",
    metricLabel: "ROAS médio omnichannel",
    chips: ["+R$ 420k/mês", "5 lojas"],
    description:
      "Integramos o tráfego digital ao fluxo das lojas físicas, gerando visitas presenciais rastreáveis e vendas online simultâneas.",
    client: "Cliente Exemplo 2",
  },
  {
    segment: "Loja de Eletrônicos",
    metric: "−41%",
    metricLabel: "Custo de Aquisição (CAC)",
    chips: ["ROAS 5.2x", "LTV +27%"],
    description:
      "Otimização agressiva de campanhas e reativação via CRM derrubaram o CAC e aumentaram o valor de cada cliente ao longo do tempo.",
    client: "Cliente Exemplo 3",
  },
];

export function CasesSection() {
  return (
    <section id="cases" className="relative overflow-hidden bg-section py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Cases"
          title="Resultados que falam por si"
          subtitle="Nossa operação é baseada em dados reais e lucros consistentes. Veja o tipo de transformação que entregamos."
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
                <div className="relative">
                  <MediaPlaceholder
                    tone="light"
                    label="Print do resultado (Meta/Google)"
                    icon={<Camera size={20} />}
                    className="aspect-[4/3] rounded-b-none border-x-0 border-t-0"
                  />
                  <div className="absolute bottom-3 left-3 rounded-lg bg-ink px-3 py-1.5">
                    <span className="text-xs font-medium tracking-wide text-white">
                      {c.segment}
                    </span>
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

                  <div className="flex items-center gap-3 border-t border-border pt-5">
                    <span className="h-9 w-9 rounded-full bg-foreground/[0.06]" />
                    <span className="text-sm font-medium text-foreground">{c.client}</span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted/70">
          *cases ilustrativos (substitua prints, números e nomes em CasesSection.tsx)
        </p>
      </div>
    </section>
  );
}
