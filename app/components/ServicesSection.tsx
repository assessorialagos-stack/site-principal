"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Smartphone,
  PenTool,
  Video,
  LineChart,
  PieChart,
  Users,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { GlowCard } from "./ui/GlowCard";
import { smoothScrollTo } from "@/app/lib/scroll";

const services = [
  { title: "Social Media", description: "Conteúdo que não é só bonito: retém a atenção e converte.", icon: Smartphone },
  { title: "Design", description: "Identidade premium e peças que elevam a percepção de valor.", icon: PenTool },
  { title: "Edição de Vídeo", description: "Edição dinâmica para Reels e TikTok com foco em retenção.", icon: Video },
  { title: "Estratégia e Growth", description: "Modelagem de negócios e alavancas de crescimento rápido.", icon: LineChart },
  { title: "Dashboard e Relatórios", description: "Transparência total com dashboards ao vivo dos seus números.", icon: PieChart },
  { title: "Comercial e CRM", description: "Reativação e fluxos para a equipe de vendas no WhatsApp.", icon: Users },
];

const bars = [40, 62, 50, 78, 68, 92, 84];

export function ServicesSection() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("#formulario");
  };

  return (
    <section id="servicos" className="relative overflow-hidden border-y border-border bg-background py-28 md:py-36">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="A entrega"
          title="Um time completo operando o seu negócio"
          subtitle="Você não contrata um serviço isolado. Você adiciona ao seu time especialistas de alto nível, sem os custos de uma equipe interna CLT."
          className="mb-16"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Card grande — Gestão de Tráfego */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2"
          >
            <GlowCard className="flex h-full flex-col gap-6 p-7 md:flex-row md:items-center md:p-8">
              <div className="flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Megaphone className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Gestão de Tráfego</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Meta Ads, Google Ads e TikTok Ads com foco em ROAS real e LTV — o motor de aquisição
                  da sua loja.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Meta Ads", "Google Ads", "TikTok Ads"].map((t) => (
                    <span key={t} className="rounded-full border border-border bg-section px-3 py-1 text-xs font-medium text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full rounded-2xl border border-border bg-section/60 p-4 md:w-56">
                <p className="mb-3 text-xs text-muted">ROAS por semana</p>
                <div className="flex h-24 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
                      className="flex-1 rounded-t bg-accent/80"
                    />
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Cards normais */}
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              >
                <GlowCard className="h-full p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}

          {/* Célula de destaque */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col justify-center rounded-2xl bg-foreground p-7 text-background"
          >
            <p className="font-heading text-4xl font-black">7+</p>
            <p className="mt-1.5 text-sm text-background/80">
              frentes integradas operando como um só ecossistema.
            </p>
          </motion.div>
        </div>

        {/* Âncora de preço */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-section p-10 text-center md:p-14"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Tenha esse ecossistema trabalhando para você
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            A estrutura completa de marketing por uma fração do que custaria montar uma equipe interna
            equivalente.
          </p>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="inline-flex items-baseline gap-1 rounded-full border border-border bg-white px-5 py-2">
              <span className="text-sm font-medium text-foreground">Planos a partir de</span>
              <span className="ml-1 font-heading text-xl font-bold text-foreground">R$ 2.100</span>
              <span className="text-sm text-muted">/mês</span>
            </div>
            <a
              href="#formulario"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-ink-soft"
            >
              Descubra o valor ideal para sua operação
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
