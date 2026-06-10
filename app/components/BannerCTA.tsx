"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { smoothScrollTo } from "@/app/lib/scroll";

export function BannerCTA({
  eyebrow,
  title,
  subtitle,
  ctaText = "Quero uma análise gratuita",
  ctaHref = "#formulario",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(ctaHref);
    }
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center md:px-16 md:py-24"
        >
          {/* Padrão sutil sobre o fundo preto */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "3.5rem 3.5rem",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
            }}
          />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            {eyebrow && (
              <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-white">
                {eyebrow}
              </span>
            )}

            <h2 className="mx-auto max-w-3xl font-heading text-3xl font-black leading-tight tracking-tight text-white md:text-5xl text-balance">
              {title}
            </h2>

            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{subtitle}</p>
            )}

            <div className="mt-10 flex justify-center">
              <a
                href={ctaHref}
                onClick={handleClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-background transition-colors hover:bg-white/90"
              >
                {ctaText}
                <ArrowRight size={20} />
              </a>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/70 sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} /> Diagnóstico sem compromisso
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} /> Resposta em até 24h
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
