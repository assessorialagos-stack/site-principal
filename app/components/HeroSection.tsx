"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, MessageSquare, Check, Megaphone, Search, MessageCircle } from "lucide-react";
import BlurText from "./reactbits/BlurText";
import { StarButton } from "./ui/StarButton";
import { GlassButton } from "./ui/GlassButton";
import { Eyebrow } from "./ui/Eyebrow";
import { smoothScrollTo } from "@/app/lib/scroll";
import { whatsappLink } from "@/app/lib/contact";

const HeroDashboard = dynamic(() => import("./ui/HeroDashboard"), { ssr: false });

const proof = ["+120 negócios escalados", "Atendimento para todo o Brasil", "Painel de resultados ao vivo"];

// Selos que flutuam sobre os painéis (formato dos badges da referência).
const badges = [
  {
    icon: Megaphone,
    title: "Meta Ads",
    text: "Campanhas no ar",
    className: "left-0 top-[6%] lg:-left-6",
    delay: 1.1,
  },
  {
    icon: Search,
    title: "Google Ads",
    text: "Visibilidade na busca",
    className: "right-0 top-[38%] lg:-right-2",
    delay: 1.3,
  },
  {
    icon: MessageCircle,
    title: "Novo lead",
    text: "Chegou no WhatsApp",
    className: "bottom-[4%] left-[6%]",
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
    <section className="relative isolate overflow-hidden bg-dark">
      {/* Fundo calmo: luz azul atrás dos painéis + grade fina (sem WebGL) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_48%,rgba(47,107,255,0.20),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-white mask-radial opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-dark" />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:pb-24">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <h1 className="sr-only">Marketing que vira lucro de verdade.</h1>

          <div className="flex justify-center lg:justify-start">
            <Eyebrow tone="dark" icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}>
              Assessoria de marketing para donos de negócio
            </Eyebrow>
          </div>

          <BlurText
            text="Marketing que vira lucro de verdade."
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.4}
            onAnimationComplete={revealRest}
            className="mt-6 justify-center font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:justify-start lg:text-[4.1rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl lg:mx-0"
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
            <GlassButton
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              icon={<MessageSquare size={18} />}
            >
              Falar no WhatsApp
            </GlassButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-2.5 text-sm text-white/60 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
          >
            {proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Check size={15} className="text-accent" strokeWidth={3} />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Painéis reais + selos flutuantes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative h-[330px] w-full sm:h-[420px] lg:h-[480px]"
        >
          {/* As cartas do CardSwap empilham para cima e para a direita; o recuo
              evita que encostem no menu e na borda da tela. */}
          <div className="absolute inset-0 translate-y-4 lg:-translate-x-10 lg:translate-y-10">
            <HeroDashboard />
          </div>

          {badges.map(({ icon: Icon, title, text, className, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay }}
              className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-white/12 bg-[#0e0e15]/90 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:flex ${className}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon size={17} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="block text-xs text-white/55">{text}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
