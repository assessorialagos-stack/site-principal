"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { ActionButton } from "./ui/ActionButton";
import { WhatsAppIcon } from "./ui/SocialIcons";
import { PromoTag } from "./ui/PromoTag";
import { Snowfall } from "./ui/Snowfall";
import { PROMO_NATAL } from "@/app/lib/promo";
import { whatsappLink } from "@/app/lib/contact";

/**
 * Faixas de chamada entre as seções, no formato da referência (bluefy.com.br):
 * - "default": banda de largura total, texto de um lado e botão do outro;
 * - "whatsapp": bloco centralizado com o botão verde do WhatsApp;
 * - "final": cartão de fechamento, com selos de confiança e o preço de entrada.
 * Substitui o antigo BannerCTA, que usava anéis em WebGL no fundo.
 */
export function CTAStrip({
  title,
  subtitle,
  ctaText = "Quero meu diagnóstico gratuito",
  ctaHref = "#formulario",
  variant = "default",
}: {
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: "default" | "whatsapp" | "final";
}) {
  if (variant === "whatsapp") {
    return (
      <section className="border-y border-border bg-section py-14 text-foreground md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="container mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon size={26} />
          </span>
          <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
          <ActionButton
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            icon={<WhatsAppIcon size={18} />}
            className="mt-7"
          >
            {ctaText}
          </ActionButton>
        </motion.div>
      </section>
    );
  }

  if (variant === "final") {
    return (
      <section className="bg-background py-20 text-foreground md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative isolate overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 lg:p-14"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_90%_at_100%_0%,var(--color-accent-soft),transparent_70%)]" />
            {PROMO_NATAL.ativa && <Snowfall className="-z-10" />}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <PromoTag className="mb-4">Presente de Natal: condições especiais</PromoTag>
                <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-balance md:text-[2.6rem]">
                  {title}
                </h2>
                {subtitle && <p className="mt-4 text-lg text-muted">{subtitle}</p>}
                <div className="mt-6 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:gap-8">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} className="text-accent" /> Diagnóstico sem compromisso
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-accent" /> Resposta em menos de 5h
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <span className="inline-flex items-baseline gap-1 rounded-full border border-border bg-section px-4 py-1.5 text-sm">
                  <span className="text-muted">Planos a partir de</span>
                  <span className="ml-1 font-heading text-lg font-bold">R$ 1.500</span>
                  <span className="text-muted">/mês</span>
                </span>
                <ActionButton href={ctaHref} icon={<ArrowRight size={18} />}>
                  {ctaText}
                </ActionButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-section py-12 text-foreground md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
      >
        <div className="max-w-2xl">
          <PromoTag className="mb-3" />
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-muted md:text-lg">{subtitle}</p>}
        </div>
        <ActionButton href={ctaHref} icon={<ArrowRight size={18} />} className="shrink-0">
          {ctaText}
        </ActionButton>
      </motion.div>
    </section>
  );
}
