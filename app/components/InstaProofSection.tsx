"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Video } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Backdrop } from "./ui/Backdrop";
import LogoLoop from "./reactbits/LogoLoop";
import { ClientLogos } from "./ui/ClientLogos";

// Vídeos de depoimento já editados (topo cortado + números borrados), em public/depoimentos/videos.
const videos = [
  "/depoimentos/videos/dep-1.mp4",
  "/depoimentos/videos/dep-2.mp4",
  "/depoimentos/videos/dep-3.mp4",
];

// Prints reais de conversas/feedback de clientes (em public/depoimentos)
const depoimentos = [
  "/depoimentos/Screenshot_20260619_180511_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_181207_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_181825_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_182032_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_182151_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_183055_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260619_141402_WhatsAppBusiness.jpg",
  "/depoimentos/Screenshot_20260127_123011_WhatsAppBusiness.jpg",
];

// Resultados reais (números dos painéis dos clientes) em mural rolante.
function ProofChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-md">
      <Star size={13} className="fill-accent text-accent" />
      {children}
    </span>
  );
}

const proofItems = [
  "ROAS 14,2x em 30 dias",
  "R$ 35 mil em 1 semana",
  "R$ 0,97 por conversa",
  "Ticket médio R$ 1.524",
  "97 vendas em 30 dias",
  "8.381 visitas/semana",
].map((t) => ({ node: <ProofChip>{t}</ProofChip>, title: t, ariaLabel: t }));

export function InstaProofSection() {
  return (
    <section className="relative isolate grain overflow-hidden bg-dark py-28 md:py-36">
      <Backdrop variant="dark-section" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Prova social"
          title="Quem confia na Lagos"
          subtitle="Resultados, bastidores e a comunidade de lojistas que crescem com a gente."
          className="mb-12"
        />

        {/* Mural de resultados (rolante) */}
        <div className="mb-20">
          <LogoLoop
            logos={proofItems}
            speed={55}
            direction="left"
            logoHeight={44}
            gap={20}
            fadeOut
            fadeOutColor="#08080A"
            pauseOnHover
            ariaLabel="Resultados de clientes da Lagos"
          />
        </div>

        {/* Depoimentos em vídeo */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <Video size={18} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            Depoimentos em vídeo
          </span>
        </div>
        <div className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Prints reais de conversas */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <MessageCircle size={18} className="text-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              Conversas reais
            </span>
          </div>
          <h3 className="mx-auto max-w-2xl font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
            Veja o que os nossos clientes falam de nós.
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {depoimentos.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-dark-border bg-white/[0.02]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Conversa real com cliente da Lagos ${index + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ aspectRatio: "4 / 5" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logos reais dos clientes — 2 fileiras (sentidos opostos) */}
      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/45">
          Marcas que crescem com a Lagos
        </p>
        <ClientLogos />
      </div>
    </section>
  );
}
