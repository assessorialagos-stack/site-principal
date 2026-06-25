"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, MessageSquare, Store, MapPin } from "lucide-react";
import BlurText from "./reactbits/BlurText";
import { StarButton } from "./ui/StarButton";
import { GlassButton } from "./ui/GlassButton";
import { Eyebrow } from "./ui/Eyebrow";
import { GradientBlindsBackground } from "./ui/GradientBlindsBackground";
import { PillarBackground } from "./ui/PillarBackground";
import { ClientLogos } from "./ui/ClientLogos";
import { smoothScrollTo } from "@/app/lib/scroll";
import { whatsappLink } from "@/app/lib/contact";

const HeroDashboard = dynamic(() => import("./ui/HeroDashboard"), { ssr: false });

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
    <section className="relative isolate grain overflow-hidden bg-dark">
      {/* Fundo Gradient Blinds (WebGL/ogl) */}
      <GradientBlindsBackground className="opacity-90" />

      {/* Scrims para legibilidade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-64 bg-gradient-to-b from-dark via-dark/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(62%_44%_at_50%_34%,rgba(8,8,10,0.62),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-dark" />

      {/* Tela 1 — título */}
      <div className="container relative z-10 mx-auto flex min-h-[88vh] max-w-4xl flex-col justify-center px-4 pt-40 pb-10 text-center sm:px-6 lg:px-8">
        <h1 className="sr-only">Marketing que vira lucro de verdade.</h1>

        <div className="flex justify-center">
          <Eyebrow tone="dark" icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}>
            Assessoria de marketing para varejo & e-commerce
          </Eyebrow>
        </div>

        <BlurText
          text="Marketing que vira lucro de verdade."
          animateBy="words"
          direction="top"
          delay={120}
          stepDuration={0.4}
          onAnimationComplete={revealRest}
          className="mt-7 justify-center font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-[4.25rem] [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
        >
          A assessoria de quem entende de loja de verdade. Tráfego, conteúdo, design e estratégia
          operando como um só ecossistema, focado em LTV e lucro líquido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <StarButton href="#formulario" onClick={scrollToForm} icon={<ArrowRight size={18} />}>
            Quero escalar minha loja
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-7 text-sm text-white/55"
        >
          +120 lojas escaladas · Atendimento para todo o Brasil
        </motion.p>
      </div>

      {/* Carrossel de logos dos clientes — 2 fileiras (sentidos opostos), no começo do site */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="container relative z-10 mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8"
      >
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/45">
          Marcas que confiam na Lagos
        </p>
        <ClientLogos />
      </motion.div>

      {/* Quadro onde o feixe pousa — a "segunda parte" (dashboard) aparece aqui */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="relative">
          {/* feixe descendo até o quadro */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/40 to-accent/80" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090910]"
          >
            {/* "pouso" do feixe no topo do quadro */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-44 w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[70px]" />

            {/* Fundo Light Pillar na diagonal */}
            <PillarBackground rotation={35} className="opacity-65" />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(75%_70%_at_50%_40%,rgba(9,9,16,0.55),rgba(9,9,16,0.86))]" />

            <div className="relative z-10 grid items-center gap-8 p-5 sm:p-8 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
              {/* Texto à esquerda */}
              <div>
                <Eyebrow tone="dark" icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}>
                  Painel ao vivo
                </Eyebrow>
                <h2 className="mt-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
                  Seus números, <span className="text-accent">em tempo real.</span>
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                  Transparência total: você acompanha investimento, receita e ROAS num painel ao vivo,
                  sem planilha bagunçada e sem achismo.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-accent">
                      <Store size={18} />
                    </span>
                    <span className="text-[0.975rem] text-white/85">
                      <span className="font-heading font-bold text-white">+120 lojas</span> escaladas com o
                      Método Maré.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-accent">
                      <MapPin size={18} />
                    </span>
                    <span className="text-[0.975rem] text-white/85">
                      <span className="font-heading font-bold text-white">Atendimento</span> para todo o
                      Brasil, presencial e online.
                    </span>
                  </div>
                </div>

                <div className="mt-9">
                  <StarButton href="#formulario" onClick={scrollToForm} icon={<ArrowRight size={18} />}>
                    Quero esse painel na minha loja
                  </StarButton>
                </div>
              </div>

              {/* Card Swap à direita */}
              <div className="relative h-[360px] w-full sm:h-[440px] lg:h-[500px]">
                <HeroDashboard />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
