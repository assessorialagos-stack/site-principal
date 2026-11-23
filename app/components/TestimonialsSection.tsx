"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Video } from "lucide-react";
import { Eyebrow } from "./ui/Eyebrow";
import { ActionButton } from "./ui/ActionButton";

// Vídeos de depoimento já editados (topo cortado + números borrados), em public/depoimentos/videos.
const videos = [
  "/depoimentos/videos/dep-1.mp4",
  "/depoimentos/videos/dep-2.mp4",
  "/depoimentos/videos/dep-3.mp4",
];

// Prints reais de conversas/feedback de clientes (em public/depoimentos)
const depoimentos = [
  "/depoimentos/testemunho-1.jpg",
  "/depoimentos/testemunho-2.jpg",
  "/depoimentos/testemunho-3.jpg",
  "/depoimentos/testemunho-4.jpg",
  "/depoimentos/testemunho-5.jpg",
  "/depoimentos/testemunho-6.jpg",
  "/depoimentos/testemunho-7.jpg",
  "/depoimentos/testemunho-8.png",
];

// Números reais dos painéis dos clientes (os mesmos da seção de resultados).
const highlights = ["ROAS 14,2x em 30 dias", "R$ 35 mil em 1 semana", "R$ 0,97 por conversa"];

/**
 * Depoimentos no formato da referência: texto + CTA de um lado (parado no
 * desktop) e a prova do outro. Abaixo, os prints reais das conversas.
 */
export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative isolate overflow-hidden bg-dark py-20 text-white md:py-28">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="dark">Prova social</Eyebrow>
            <h2 className="mt-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.85rem]">
              O que nossos clientes dizem
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Resultados, bastidores e a comunidade de empresários que crescem com a gente.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/85"
                >
                  <Star size={13} className="fill-accent text-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <ActionButton href="#formulario" icon={<ArrowRight size={18} />} className="mt-9">
              Falar com um especialista
            </ActionButton>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2">
              <Video size={17} className="text-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                Depoimentos em vídeo
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {videos.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-dark-border bg-black"
                >
                  <video
                    src={src}
                    controls
                    preload="metadata"
                    playsInline
                    className="mx-auto block max-h-[520px] w-full bg-black object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Prints reais de conversas */}
        <div className="mb-8 mt-20 flex items-center justify-center gap-2">
          <MessageCircle size={17} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">Conversas reais</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {depoimentos.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-[10/19] overflow-hidden rounded-2xl border border-dark-border bg-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Conversa real com cliente da Lagos ${index + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
