"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { SectionHeading } from "./ui/SectionHeading";

const faqs = [
  {
    question: "Qual o investimento mínimo para ser cliente?",
    answer:
      "Trabalhamos com planos de assessoria a partir de R$ 1.500 mensais. Além do valor do nosso serviço, recomendamos um investimento em anúncios no Meta/Google compatível com a sua meta de faturamento, que será definido em conjunto durante nosso diagnóstico inicial.",
  },
  {
    question: "Em quanto tempo começo a ver resultados?",
    answer:
      "Nenhuma estratégia sustentável se consolida em 3 dias. Nosso método foca em estruturação no Mês 1, testes de público e oferta no Mês 2, e escala a partir do Mês 3. Embora vitórias rápidas costumem ocorrer nas primeiras semanas, o alvo é construir um fluxo de caixa previsível no médio/longo prazo.",
  },
  {
    question: "Vocês dão garantia de resultado?",
    answer:
      "Nós garantimos a execução do melhor método disponível no mercado, processos claros, entrega pontual e transparência absoluta. Desconfie de quem promete 'triplicar suas vendas em 30 dias'. Resultado em varejo é uma consequência de produto bom, atendimento eficiente e marketing agressivo. Nós garantimos a melhor estratégia do lado de cá.",
  },
  {
    question: "O que está incluso na assessoria?",
    answer:
      "Gestão completa de tráfego pago (Meta, Google e TikTok Ads), design para campanhas, estratégias de conteúdo orgânico/vídeo e aconselhamento comercial (Growth/CRM), todos operando como um ecossistema.",
  },
  {
    question: "Já tenho uma equipe interna de marketing, vocês atendem mesmo assim?",
    answer:
      "Sim. Em muitos casos, nós entramos não para substituir, mas para potencializar o time interno com a nossa inteligência de tráfego, processos validados e olhar cirúrgico sobre a métrica de vendas.",
  },
  {
    question: "Como funciona o acompanhamento e relatórios?",
    answer:
      "Temos um dashboard atualizado para você acompanhar os números macro. Além disso, nosso time entra em contato periodicamente via WhatsApp para alinhar campanhas e fazemos calls de estratégia para planejar as ações do próximo ciclo.",
  },
  {
    question: "Tem contrato de fidelidade?",
    answer:
      "Trabalhamos com contratos iniciais que refletem o tempo necessário para implementar o Método Maré com maestria (geralmente ciclos de 6 meses). O cancelamento pode ser conversado com aviso prévio, tudo feito de forma transparente e profissional.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleOpen = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="theme-light relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dúvidas"
          title={
            <>
              Perguntas <span className="text-gradient">Frequentes</span>
            </>
          }
          subtitle="Sem meias palavras. Respostas diretas sobre como operamos."
          className="mb-16"
        />

        <div className="space-y-4 md:space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-border-strong bg-card shadow-sm"
                    : "border-border bg-card hover:border-border-strong"
                )}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none md:px-8 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen ? "bg-foreground text-background" : "bg-foreground/[0.06] text-muted"
                    )}
                  >
                    <ChevronDown
                      className={cn("h-5 w-5 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 md:px-8 md:pb-8">
                        <div className="mb-4 glow-divider opacity-40" />
                        <p className="leading-relaxed text-muted">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
