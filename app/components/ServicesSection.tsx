"use client";

import { Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { FeatureRow } from "./ui/FeatureRow";

const cta = { label: "Falar com um especialista", href: "#formulario" };

/** Cabeçalho de "janela de navegador" dos mockups. */
function FrameBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-section px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-foreground/15" />
      <span className="h-3 w-3 rounded-full bg-foreground/15" />
      <span className="h-3 w-3 rounded-full bg-foreground/15" />
      <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
        <span className="rounded-md border border-border bg-card px-3 py-1 font-mono text-[0.68rem] text-muted">
          {url}
        </span>
      </div>
    </div>
  );
}

const onboardingSteps = [
  "Levantamento do histórico da marca e dados comerciais",
  "Análise do público-alvo e objeções de compra",
  "Mapeamento da concorrência",
  "Alinhamento da identidade visual e tom de voz",
  "Definição do produto ou serviço 'carro-chefe'",
  "Roteiros para captação de conteúdo (fotos/vídeos)",
  "Ritmo e formato de relatórios semanais",
];

function OnboardingMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <FrameBar url="lagos.com/onboarding" />
      <div className="bg-card p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-heading text-sm font-semibold text-foreground">Onboarding</span>
          <span className="rounded-full border border-border bg-section px-2.5 py-0.5 text-[0.7rem] text-muted">
            7 etapas
          </span>
        </div>
        <ul className="space-y-2">
          {onboardingSteps.map((step) => (
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

const platforms = [
  { name: "Meta Ads", where: "Facebook e Instagram" },
  { name: "Google Ads", where: "Pesquisa, Display e YouTube" },
  { name: "TikTok Ads", where: "Vídeos curtos" },
  { name: "WhatsApp", where: "Campanhas de mensagem" },
];

const bars = [40, 62, 50, 78, 68, 92, 84];

function TrafficMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <FrameBar url="lagos.com/trafego" />
      <div className="bg-card p-4 md:p-5">
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-section/60 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-heading text-sm font-bold text-foreground">{p.name}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{p.where}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-border bg-section/60 p-4">
          <p className="mb-3 text-xs text-muted">ROAS por semana</p>
          <div className="flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-accent/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const calendar = [
  { day: "Seg", format: "Reels", theme: "Bastidores da operação", status: "Aprovado" },
  { day: "Qua", format: "Carrossel", theme: "Quebra de objeção", status: "Em design" },
  { day: "Sex", format: "Reels", theme: "Prova social de cliente", status: "Em edição" },
  { day: "Dom", format: "Stories", theme: "Oferta da semana", status: "Roteiro" },
];

function ContentMock() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <FrameBar url="lagos.com/conteudo" />
      <div className="bg-card p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-heading text-sm font-semibold text-foreground">Calendário de conteúdo</span>
          <span className="rounded-full border border-border bg-section px-2.5 py-0.5 text-[0.7rem] text-muted">
            Esta semana
          </span>
        </div>
        <ul className="space-y-2">
          {calendar.map((c) => (
            <li
              key={c.day}
              className="flex items-center gap-3 rounded-lg border border-border bg-section/50 px-3 py-3"
            >
              <span className="w-9 shrink-0 font-mono text-xs font-medium text-muted">{c.day}</span>
              <span className="shrink-0 rounded-md bg-accent-soft px-2 py-0.5 text-[0.7rem] font-semibold text-accent">
                {c.format}
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.82rem] font-medium text-foreground">{c.theme}</span>
              <span className="hidden shrink-0 text-[0.7rem] text-muted sm:inline">{c.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DashboardShot() {
  return (
    <div className="browser-frame mx-auto w-full max-w-xl">
      <FrameBar url="app.lagos.com · Geração de Leads" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dashboards/dashboard_geracao_leads.png"
        alt="Dashboard ao vivo da Lagos: geração de leads"
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block w-full bg-card"
      />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden border-t border-border bg-background py-20 text-foreground md:py-28"
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="A entrega"
          title="Um time completo operando o seu negócio"
          subtitle="Você não contrata um serviço isolado. Você adiciona ao seu time especialistas de alto nível, sem os custos de uma equipe interna CLT."
          className="mb-16 md:mb-24"
        />

        <div className="space-y-24 md:space-y-32">
          <FeatureRow
            eyebrow="Assessoria de ponta a ponta"
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
            cta={cta}
            media={<OnboardingMock />}
          />

          <FeatureRow
            reverse
            eyebrow="Aquisição"
            title={
              <>
                Gestão de <span className="text-accent">Tráfego Pago</span>
              </>
            }
            description="Meta Ads, Google Ads e TikTok Ads com foco em ROAS real e LTV. É o motor de aquisição do seu negócio: colocamos a sua oferta na frente das pessoas certas e escalamos o que dá lucro."
            bullets={[
              "Campanhas de venda, de mensagem no WhatsApp e de geração de leads.",
              "Testes de público e oferta antes de escalar o investimento.",
            ]}
            cta={cta}
            media={<TrafficMock />}
          />

          <FeatureRow
            eyebrow="Conteúdo"
            title={
              <>
                Conteúdo que não é só bonito: <span className="text-accent">ele vende.</span>
              </>
            }
            description="Social media, design e vídeo trabalhando juntos para reter a atenção, quebrar objeções e levar a pessoa até a compra."
            bullets={[
              "Social Media: conteúdo que retém a atenção e converte.",
              "Design: identidade premium e peças que elevam a percepção de valor.",
              "Edição de vídeo: Reels e TikTok dinâmicos, com foco em retenção.",
            ]}
            cta={cta}
            media={<ContentMock />}
          />

          <FeatureRow
            reverse
            eyebrow="Estratégia e comercial"
            title={
              <>
                Seus números, <span className="text-accent">em tempo real.</span>
              </>
            }
            description="Transparência total: você acompanha investimento, receita e ROAS num painel ao vivo, sem planilha bagunçada e sem achismo."
            bullets={[
              "Estratégia e Growth: modelagem de negócios e alavancas de crescimento rápido.",
              "Dashboard e relatórios: os seus números ao vivo, sempre à mão.",
              "Comercial e CRM: reativação e fluxos para a equipe de vendas no WhatsApp.",
            ]}
            cta={cta}
            media={<DashboardShot />}
          />
        </div>
      </div>
    </section>
  );
}
