"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Check, Megaphone, Search, MessageCircle, Gift } from "lucide-react";
import BlurText from "./reactbits/BlurText";
import { StarButton } from "./ui/StarButton";
import { ActionButton } from "./ui/ActionButton";
import { Eyebrow } from "./ui/Eyebrow";
import { Snowfall } from "./ui/Snowfall";
import { smoothScrollTo } from "@/app/lib/scroll";
import { whatsappLink } from "@/app/lib/contact";
import { PROMO_NATAL } from "@/app/lib/promo";

const proof = ["+120 negócios escalados", "Atendimento para todo o Brasil", "Painel de resultados ao vivo"];

// Selos que flutuam em volta da foto (formato dos badges da referência).
const badges = [
  {
    icon: Megaphone,
    title: "Meta Ads",
    text: "Campanhas no ar",
    className: "-left-4 top-[12%] lg:-left-14",
    delay: 1.1,
  },
  {
    icon: Search,
    title: "Google Ads",
    text: "Visibilidade na busca",
    className: "-right-4 top-[46%] xl:-right-12",
    delay: 1.3,
  },
  {
    icon: MessageCircle,
    title: "Novo lead",
    text: "Chegou no WhatsApp",
    className: "-left-4 bottom-[10%] lg:-left-10",
    delay: 1.5,
  },
];

export function HeroSection() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("#formulario");
  };

  const revealRest = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("lagos-hero-revealed"));
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Fundo calmo: luz azul atrás da foto + grade fina (sem WebGL) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_48%,rgba(21,94,239,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-70" />
      {PROMO_NATAL.ativa && <Snowfall />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-8 lg:pb-24">
        {/* Texto (min-w-0: o selo da promo encurta com "…" em vez de alargar a coluna) */}
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="sr-only">Marketing que vira lucro de verdade.</h1>

          <div className="flex justify-center lg:justify-start">
            {PROMO_NATAL.ativa ? (
              <a
                href="#formulario"
                onClick={scrollToForm}
                className="group inline-flex max-w-full items-center gap-2 rounded-full border border-[#B91C1C]/20 bg-[#B91C1C]/[0.06] py-1 pl-1 pr-3.5 text-xs font-medium text-[#991B1B] transition-colors hover:bg-[#B91C1C]/10 sm:text-sm"
              >
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#B91C1C] px-2.5 py-1 font-semibold text-white">
                  <Gift size={13} />
                  {PROMO_NATAL.selo}
                </span>
                <span className="min-w-0 truncate">{PROMO_NATAL.chamada}</span>
                <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : (
              <Eyebrow icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}>
                Assessoria de marketing para donos de negócio
              </Eyebrow>
            )}
          </div>

          <BlurText
            text="Marketing que vira lucro de verdade."
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.4}
            onAnimationComplete={revealRest}
            className="mt-6 justify-center font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:justify-start lg:text-[4.1rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl lg:mx-0"
          >
            A Assessoria que cuida de ponta a ponta do seu Marketing. Tráfego, conteúdo, design e estratégia
            operando como um só ecossistema, focado em LTV e lucro líquido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <StarButton href="#formulario" onClick={scrollToForm} icon={<ArrowRight size={18} />}>
              Quero escalar meu negócio
            </StarButton>
            <ActionButton
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={<MessageSquare size={18} />}
              className="rounded-2xl px-7 py-4 sm:text-base"
            >
              Falar no WhatsApp
            </ActionButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-2.5 text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
          >
            {proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Check size={15} className="text-accent" strokeWidth={3} />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Foto + selos flutuantes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px]"
        >
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(21,94,239,0.16),transparent)]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-section shadow-[0_40px_80px_-40px_rgba(15,23,42,0.45)]">
            <Image
              src="/hero-foto.jpg"
              alt="Especialista da Lagos trabalhando no notebook"
              fill
              preload
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 420px, 360px"
              className="object-cover object-[50%_35%]"
            />
          </div>

          {/* Etiqueta de presente (tema de Natal) */}
          {PROMO_NATAL.ativa && (
            <motion.div
              initial={{ opacity: 0, rotate: -14, y: -8 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="absolute -top-4 right-6 z-20 flex items-center gap-2 rounded-xl bg-[#B91C1C] px-3.5 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(185,28,28,0.7)]"
            >
              <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#CA8A04] bg-background" />
              <Gift size={16} />
              {PROMO_NATAL.etiqueta}
            </motion.div>
          )}

          {badges.map(({ icon: Icon, title, text, className, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay }}
              className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-border bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] sm:flex ${className}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={17} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">{title}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
