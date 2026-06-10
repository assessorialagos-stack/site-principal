"use client";

import { motion } from "framer-motion";
import { Quote, Star, Heart, MessageCircle, User } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { GlowCard } from "./ui/GlowCard";
import { MediaPlaceholder } from "./ui/MediaPlaceholder";
import { Marquee } from "./Marquee";
import { InstagramIcon } from "./ui/SocialIcons";

// Depoimentos ILUSTRATIVOS — troque por foto, nome e negócio reais.
const testimonials = [
  {
    quote:
      "A Lagos conseguiu traduzir a nossa loja física para o digital. Estávamos queimando dinheiro no Meta Ads, e em dois meses a estratégia de LTV já se pagou.",
    author: "Cliente Exemplo 1",
    role: "E-commerce de Moda",
    result: "ROAS 4.8x",
  },
  {
    quote:
      "Eles entendem de margem. Não é só sobre gerar boleto, mas sobre focar nos produtos que deixam dinheiro no caixa. Recomendo para qualquer varejista sério.",
    author: "Cliente Exemplo 2",
    role: "Rede de Varejo",
    result: "+R$ 420k/mês",
  },
  {
    quote:
      "Pela primeira vez sinto que o marketing não é uma despesa, e sim um braço de vendas de verdade operando junto com o meu time.",
    author: "Cliente Exemplo 3",
    role: "Lojista de Eletrônicos",
    result: "CAC −41%",
  },
];

const instaHandles = ["@cliente.um", "@cliente.dois", "@cliente.tres", "@cliente.quatro", "@cliente.cinco", "@cliente.seis"];

const logos = [
  { id: 1, name: "LOGO 6" },
  { id: 2, name: "LOGO 7" },
  { id: 3, name: "LOGO 8" },
  { id: 4, name: "LOGO 9" },
  { id: 5, name: "LOGO 10" },
];

export function InstaProofSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-28 md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Prova social"
          title="Quem confia na Lagos"
          subtitle="Depoimentos, bastidores e a comunidade de lojistas que crescem com a gente."
          className="mb-16"
        />

        {/* Depoimentos com foto */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard className="flex h-full flex-col p-7 md:p-8">
                <Quote className="absolute right-6 top-6 h-9 w-9 text-foreground/[0.06]" />
                <div className="mb-4 flex gap-0.5 text-accent">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="mb-6 flex-1 leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground">
                    <User size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground">{t.author}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                  <span className="rounded-full border border-border bg-section px-3 py-1 text-xs font-semibold text-foreground">
                    {t.result}
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Grade estilo Instagram */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <InstagramIcon size={18} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Direto do nosso Instagram
          </span>
        </div>
        <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instaHandles.map((handle, index) => (
            <motion.div
              key={handle}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <MediaPlaceholder label="Post" className="h-full w-full rounded-2xl" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-[0.65rem] text-white">{handle}</span>
                <div className="mt-1 flex items-center gap-3 text-white/80">
                  <span className="inline-flex items-center gap-1 text-xs">
                    <Heart size={12} className="fill-current" /> 1,2k
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs">
                    <MessageCircle size={12} /> 86
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logos dos clientes */}
      <Marquee logos={logos} speed="slow" direction="right" />

      <p className="mt-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted/50">
        *conteúdo ilustrativo (adicione posts, fotos e logos reais)
      </p>
    </section>
  );
}
