"use client";

import { motion } from "framer-motion";
import { TrendingDown, AlertCircle, Users, XCircle, Check } from "lucide-react";
import { FeatureRow } from "./ui/FeatureRow";

// Comparativo (antiga seção "Por que a Lagos é diferente?"), agora como o
// quadro ao lado do texto de posicionamento.
const generic = [
  "Foca apenas em likes, curtidas e métricas de vaidade.",
  'Acha que o problema de vendas se resolve só com "mais tráfego".',
  "Não entende de margem de lucro, DRE ou caixa.",
  "Atendimento robótico e relatórios difíceis de entender.",
];

const lagos = [
  "Foco absoluto em ROAS real, LTV e dinheiro no caixa.",
  "Diagnóstico do ecossistema: produto, oferta, time comercial e tráfego.",
  "Especialistas com vivência real no dia a dia de quem empreende.",
  "Transparência total, acompanhamento próximo e foco no lucro.",
];

// Dores (antiga seção "O diagnóstico"), em versão compacta.
const pains = [
  {
    icon: TrendingDown,
    title: "O caixa não sente o impacto",
    text: "Você bate no teto de vendas todo mês, mas o lucro some com margem apertada e custo de aquisição fora de controle.",
  },
  {
    icon: AlertCircle,
    title: "Dinheiro queimado",
    text: "Investimento indo embora em campanhas que não convertem, trazendo curiosos em vez de clientes.",
  },
  {
    icon: Users,
    title: "Agência que não entende de negócio",
    text: "Relatório bonitinho de alcance e nada sobre o que importa: vendas.",
  },
];

function ComparisonCard() {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">
      <div className="border-b border-border p-6 md:p-7">
        <h3 className="mb-5 font-heading text-base font-bold text-muted">Agência genérica</h3>
        <ul className="space-y-3.5">
          {generic.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={2.25} />
              <span className="text-muted line-through decoration-border">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative bg-section p-6 md:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,var(--color-accent-soft),transparent_70%)]" />
        <h3 className="relative mb-5 flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Lagos Assessoria
        </h3>
        <ul className="relative space-y-3.5">
          {lagos.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PositioningSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-border bg-section py-20 text-foreground md:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeatureRow
          eyebrow="O parceiro certo para o seu negócio"
          title={
            <>
              O marketing que só foca em aparência{" "}
              <span className="text-accent">está matando seu lucro.</span>
            </>
          }
          description="Curtidas e seguidores não pagam a folha da equipe. Diferente de agências que só olham para a campanha, nós olhamos para a empresa: a sua margem, a sua oferta e a realidade da sua operação. Do comércio ao prestador de serviço, operamos como um verdadeiro braço de vendas do seu negócio."
          bullets={[
            "Orientado à margem: escalamos o que dá lucro, não o que é fácil de anunciar.",
            "Tráfego, conteúdo, estratégia e comercial operando como um só ecossistema.",
          ]}
          cta={{ label: "Falar com um especialista", href: "#formulario" }}
          media={<ComparisonCard />}
        />

        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3">
          {pains.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
