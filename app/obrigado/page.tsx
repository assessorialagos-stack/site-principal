"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, ArrowRight, Play } from "lucide-react";
import { Backdrop } from "../components/ui/Backdrop";

const steps = [
  {
    step: "Passo 1",
    title: "Análise Inicial",
    text: "Avaliamos seu formulário e presença digital para entender o potencial.",
  },
  {
    step: "Passo 2",
    title: "Call de Estratégia",
    text: "Apresentamos um diagnóstico e o plano de ação desenhado para você.",
  },
  {
    step: "Passo 3",
    title: "Execução",
    text: "Começamos a rodar as campanhas e estruturar o ecossistema de vendas.",
  },
];

export default function ObrigadoPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background pb-28 pt-16 md:pb-36">
      <Backdrop variant="hero" />

      <div className="container relative z-10 mx-auto flex max-w-4xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-16 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-1 font-heading text-2xl font-black tracking-widest text-foreground"
          >
            LAGOS
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-heading text-4xl font-black text-foreground md:text-5xl"
          >
            Recebemos as suas <span className="text-gradient">informações.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 max-w-2xl text-lg text-muted md:text-xl"
          >
            Nossa equipe vai analisar o seu perfil e entrar em contato no WhatsApp em breve. Enquanto
            isso, assista ao vídeo abaixo para entender nossos próximos passos:
          </motion.p>

          {/* VSL Placeholder (16:9) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative mb-16 aspect-video w-full max-w-3xl cursor-pointer overflow-hidden rounded-2xl border border-border bg-light"
          >
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-section via-background to-section opacity-90" />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground transition-transform group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-background text-background" />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 opacity-60">
              <span className="font-heading text-lg font-semibold text-foreground">VSL Lagos Assessoria</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Aperte o play para assistir (placeholder)
              </span>
            </div>
          </motion.div>

          {/* Próximos passos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12 w-full max-w-3xl rounded-2xl border border-border bg-light-2 p-6 text-left shadow-sm md:p-8"
          >
            <h3 className="mb-6 border-b border-border pb-4 font-heading text-xl font-semibold text-foreground">
              Como funciona o nosso processo:
            </h3>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-8">
              {steps.map((s, i) => (
                <div key={s.step} className="flex flex-1 items-start gap-4 md:flex-col md:items-start">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-accent">
                      {s.step}
                    </span>
                    <h4 className="mb-1 font-heading font-semibold text-foreground">{s.title}</h4>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="mb-4 text-muted">Tem pressa? Mande uma mensagem agora mesmo.</p>
            <a
              href="https://wa.me/5514999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-8 py-4 text-base font-semibold text-background transition-colors hover:bg-ink-soft"
            >
              <MessageSquare size={18} />
              Adiantar pelo WhatsApp
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
