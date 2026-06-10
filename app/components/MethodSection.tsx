"use client";

import { FeatureRow } from "./ui/FeatureRow";

const phases = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Call com especialistas em até 24h para mapear gargalos da operação.",
  },
  {
    number: "02",
    title: "Estratégia & Funil",
    description: "Desenhamos o ecossistema de vendas: o que atrai, o que fideliza e como captar.",
  },
  {
    number: "03",
    title: "Execução",
    description: "Subimos campanhas, ajustamos criativos e direcionamos o conteúdo da loja.",
  },
  {
    number: "04",
    title: "Escala & Otimização",
    description: "Análise semanal: cortamos o que não funciona e dobramos no que dá lucro.",
  },
];

function MethodMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <div className="flex items-center gap-2 border-b border-border bg-section px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
          <span className="rounded-md border border-border bg-white px-3 py-1 font-mono text-[0.68rem] text-muted">
            lagos.com/metodo
          </span>
        </div>
      </div>

      <div className="space-y-2.5 bg-white p-4 md:p-5">
        {phases.map((p) => (
          <div
            key={p.number}
            className="flex items-start gap-4 rounded-xl border border-border bg-section/50 p-3.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground font-mono text-xs font-bold text-background">
              {p.number}
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-0.5 text-[0.8rem] leading-snug text-muted">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MethodSection() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-background py-28 md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeatureRow
          reverse
          eyebrow="Método Maré"
          title="O caminho comprovado para a escala"
          description="Nossa estrutura em 4 fases garante que você nunca fique no escuro sobre o que está sendo feito ou sobre os resultados alcançados."
          bullets={[
            "Mês 1: captar dados e estruturar o funil.",
            "Mês 2: testar público, oferta e criativo.",
            "Mês 3: escalar investimento no que deu ROI.",
          ]}
          media={<MethodMock />}
        />
      </div>
    </section>
  );
}
