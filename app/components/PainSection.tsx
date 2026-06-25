"use client";

import { motion, Variants } from "framer-motion";
import { TrendingDown, AlertCircle, Users } from "lucide-react";
import { GlowCard } from "./ui/GlowCard";
import { Eyebrow } from "./ui/Eyebrow";
import { ProximityText } from "./ui/ProximityText";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function PainSection() {
  return (
    <section className="theme-light relative overflow-hidden border-y border-border bg-background py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <Eyebrow icon={<AlertCircle size={13} />}>
              O diagnóstico
            </Eyebrow>
          </div>
          <h2 className="mb-6 font-heading text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.85rem] text-balance">
            O marketing que só foca em vaidade{" "}
            <span className="text-accent">
              <ProximityText>está matando seu lucro.</ProximityText>
            </span>
          </h2>
          <p className="text-lg font-light text-muted">
            Não dá mais para brincar de fazer anúncio. Curtidas e seguidores não pagam o seu
            estoque parado e nem a folha da equipe.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {/* Card grande */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlowCard className="h-full p-7 md:p-8">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:scale-110">
                <TrendingDown className="h-5 w-5" />
              </div>
              <h3 className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Sua operação vende, mas o caixa não sente o impacto.
              </h3>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-muted">
                Seu faturamento estagnou. Você bate no teto de vendas todos os meses, mas o lucro
                real não aparece porque as margens são devoradas por falta de previsibilidade e CAC
                (Custo de Aquisição) fora de controle.
              </p>
            </GlowCard>
          </motion.div>

          {/* Card menor */}
          <motion.div variants={itemVariants}>
            <GlowCard className="h-full p-7 md:p-8">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:scale-110">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Dinheiro queimado</h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                Movimento fraco e o investimento indo embora em campanhas que não convertem,
                trazendo curiosos em vez de compradores.
              </p>
            </GlowCard>
          </motion.div>

          {/* Card largo */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <GlowCard className="flex h-full flex-col items-center gap-6 p-7 md:flex-row md:gap-8 md:p-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:scale-110">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="mb-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                  Cansado de agências que não entendem de loja?
                </h3>
                <p className="font-light leading-relaxed text-muted">
                  O mercado está cheio de pessoas que nunca entenderam o que é markup, DRE e o dia a
                  dia do varejo. Focam em entregar relatório bonitinho de alcance e esquecem do que
                  importa: <span className="font-medium text-accent">Vendas.</span>
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
