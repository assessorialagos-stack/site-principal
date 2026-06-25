"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { smoothScrollTo } from "@/app/lib/scroll";
import { RingsBackground } from "./ui/RingsBackground";
import { StarButton } from "./ui/StarButton";

export function BannerCTA({
  eyebrow,
  title,
  subtitle,
  ctaText = "Quero uma análise gratuita",
  ctaHref = "#formulario",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  /** varia levemente a inclinação dos feixes entre os dois banners */
  tone?: "dark" | "light";
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(ctaHref);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-dark py-28 md:py-36">
      {/* Fundo Magic Rings (WebGL) */}
      <RingsBackground color={tone === "dark" ? "#2F6BFF" : "#4F86FF"} colorTwo="#7FB0FF" />

      {/* Scrim para legibilidade + fades nas bordas */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_62%_at_50%_50%,rgba(8,8,10,0.55),rgba(8,8,10,0.12))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-dark to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-dark to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="container relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        {eyebrow && (
          <span className="mb-5 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-white backdrop-blur-sm">
            {eyebrow}
          </span>
        )}

        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-black leading-tight tracking-tight text-white text-balance md:text-5xl [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
          {title}
        </h2>

        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{subtitle}</p>}

        <div className="mt-10 flex justify-center">
          <StarButton href={ctaHref} onClick={handleClick} icon={<ArrowRight size={20} />}>
            {ctaText}
          </StarButton>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/70 sm:flex-row sm:gap-8">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} /> Diagnóstico sem compromisso
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={16} /> Resposta em menos de 5h
          </span>
        </div>
      </motion.div>
    </section>
  );
}
