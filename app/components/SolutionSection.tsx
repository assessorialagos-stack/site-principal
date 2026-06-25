"use client";

import { ShoppingCart, Store, TrendingUp } from "lucide-react";
import { FeatureRow } from "./ui/FeatureRow";

function SolutionMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <div className="flex items-center gap-2 border-b border-border bg-section px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
          <span className="rounded-md border border-border bg-card px-3 py-1 font-mono text-[0.68rem] text-muted">
            lagos.com/receita
          </span>
        </div>
      </div>

      <div className="bg-card p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-heading text-sm font-semibold text-foreground">Receita por canal</span>
          <span className="rounded-full border border-border bg-section px-3 py-1 text-xs text-muted">
            Este mês
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-section/60 p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <ShoppingCart size={16} />
            </div>
            <p className="text-xs text-muted">E-commerce</p>
            <p className="font-heading text-xl font-bold text-foreground">R$ 312k</p>
          </div>
          <div className="rounded-xl border border-border bg-section/60 p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Store size={16} />
            </div>
            <p className="text-xs text-muted">Loja física</p>
            <p className="font-heading text-xl font-bold text-foreground">R$ 459k</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-foreground px-4 py-3 text-background">
          <span className="text-sm">Receita total</span>
          <span className="inline-flex items-center gap-2 font-heading text-lg font-bold">
            R$ 771k
            <span className="inline-flex items-center gap-0.5 rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium">
              <TrendingUp size={11} /> +24%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function SolutionSection() {
  return (
    <section className="theme-light relative overflow-hidden bg-section py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeatureRow
          eyebrow="A solução"
          title={
            <>
              A única assessoria que une{" "}
              <span className="text-accent">e-commerce e varejo físico.</span>
            </>
          }
          description="Diferente de agências que só olham para a campanha, nós olhamos para a empresa. Nossa estratégia considera o seu estoque parado, sua margem de lucro e a realidade da sua operação. Operamos como um verdadeiro braço de vendas do seu negócio."
          bullets={[
            "Orientado ao estoque e margem: escalamos pelo que dá lucro, não pelo que é fácil de anunciar.",
            "Omnichannel verdadeiro: a loja física conectada ao tráfego do e-commerce, gerando visitas e conversões.",
          ]}
          media={<SolutionMock />}
        />
      </div>
    </section>
  );
}
