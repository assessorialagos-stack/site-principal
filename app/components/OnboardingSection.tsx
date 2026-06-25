"use client";

import { Check } from "lucide-react";
import { FeatureRow } from "./ui/FeatureRow";

const steps = [
  "Levantamento do histórico da marca e dados comerciais",
  "Análise do público-alvo e objeções de compra",
  "Mapeamento da concorrência",
  "Alinhamento da identidade visual e tom de voz",
  "Definição do produto 'carro-chefe'",
  "Roteiros para captação de conteúdo (fotos/vídeos)",
  "Ritmo e formato de relatórios semanais",
];

function OnboardingMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <div className="flex items-center gap-2 border-b border-border bg-section px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
          <span className="rounded-md border border-border bg-card px-3 py-1 font-mono text-[0.68rem] text-muted">
            lagos.com/onboarding
          </span>
        </div>
      </div>

      <div className="bg-card p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-heading text-sm font-semibold text-foreground">Onboarding</span>
          <span className="rounded-full border border-border bg-section px-2.5 py-0.5 text-[0.7rem] text-muted">
            7 etapas
          </span>
        </div>
        <ul className="space-y-2">
          {steps.map((step) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-lg border border-border bg-section/50 px-3 py-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[0.82rem] font-medium text-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OnboardingSection() {
  return (
    <section className="theme-light relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeatureRow
          reverse
          eyebrow="Onboarding"
          title={
            <>
              O que acontece quando você <span className="text-accent">vira cliente</span>
            </>
          }
          description="O nosso processo de entrada é desenhado para não perder tempo. Entramos na sua operação, entendemos a sua realidade e preparamos toda a estrutura para rodar desde o primeiro dia."
          bullets={[
            "Diagnóstico completo da marca, público e concorrência.",
            "Estrutura de conteúdo, oferta e relatórios definida com você.",
          ]}
          cta={{ label: "Falar com um consultor", href: "#formulario" }}
          media={<OnboardingMock />}
        />
      </div>
    </section>
  );
}
