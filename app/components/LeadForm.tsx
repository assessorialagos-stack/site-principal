"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Eyebrow } from "./ui/Eyebrow";
import { Backdrop } from "./ui/Backdrop";
import StarBorder from "./reactbits/StarBorder";
import { whatsappLink } from "@/app/lib/contact";

type FormData = {
  nome: string;
  whatsapp: string;
  instagram: string;
  segmento: string;
  cidadeEstado: string;
  faturamento: string;
  investimento: string;
  site: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  pagina_origem: string;
  data_hora: string;
};

const initialFormData: FormData = {
  nome: "",
  whatsapp: "",
  instagram: "",
  segmento: "",
  cidadeEstado: "",
  faturamento: "",
  investimento: "",
  site: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  pagina_origem: "",
  data_hora: "",
};

const inputCls =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30";
const labelCls = "block text-sm font-medium text-foreground";

// Campos obrigatórios (o site é opcional).
const requiredFields: (keyof FormData)[] = [
  "nome",
  "whatsapp",
  "instagram",
  "segmento",
  "cidadeEstado",
  "faturamento",
  "investimento",
];

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Captura UTMs / origem / timestamp no envio (a URL não muda nesta SPA de página única)
  const buildTracking = () => {
    if (typeof window === "undefined") return {};
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_term: urlParams.get("utm_term") || "",
      pagina_origem: window.location.pathname,
      data_hora: new Date().toISOString(),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Máscara do WhatsApp
    if (name === "whatsapp") {
      let v = value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");
      setFormData({ ...formData, [name]: v });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Mensagem que abre no WhatsApp já preenchida com os dados do lead.
  const buildWhatsAppMessage = (d: FormData) => {
    const linhas = [
      "Olá, tudo bem? 👋",
      "Acabei de preencher o formulário de diagnóstico no site da Lagos.",
      "",
      `*Nome:* ${d.nome}`,
      `*WhatsApp:* ${d.whatsapp}`,
      `*Instagram:* ${d.instagram}`,
      `*Segmento:* ${d.segmento}`,
      `*Cidade/Estado:* ${d.cidadeEstado}`,
      `*Faturamento mensal:* ${d.faturamento}`,
      `*Pode investir a partir de R$ 1.500/mês:* ${d.investimento}`,
    ];
    if (d.site) linhas.push(`*Site:* ${d.site}`);
    return linhas.join("\n");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (requiredFields.some((field) => !formData[field])) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    const payload = { ...formData, ...buildTracking() };

    // 1) Envia ao servidor, que dispara o e-mail do lead (best-effort: se falhar,
    //    não trava o redirecionamento — os dados também vão na mensagem do WhatsApp).
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // segue mesmo se falhar
    }

    // 2) Redireciona direto pro WhatsApp com a mensagem pré-preenchida.
    window.location.href = whatsappLink(buildWhatsAppMessage(formData));
  };

  return (
    <section id="formulario" className="theme-light relative isolate overflow-hidden border-t border-border bg-background py-28 text-foreground md:py-36">
      <Backdrop variant="section" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-5 flex justify-center">
            <Eyebrow>Diagnóstico gratuito</Eyebrow>
          </div>
          <h2 className="mb-6 font-heading text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.85rem]">
            Vamos entender o seu <span className="text-gradient">cenário</span>
          </h2>
          <p className="text-lg text-muted">
            Preencha os dados abaixo e, ao enviar, você fala na hora com a nossa equipe no WhatsApp.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="nome" className={labelCls}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={inputCls}
                  placeholder="João da Silva"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="whatsapp" className={labelCls}>
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className={inputCls}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="instagram" className={labelCls}>
                  @ do Instagram da Loja *
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  required
                  className={inputCls}
                  placeholder="@sualoja"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="segmento" className={labelCls}>
                  Segmento de Atuação *
                </label>
                <select
                  id="segmento"
                  name="segmento"
                  value={formData.segmento}
                  onChange={handleChange}
                  required
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Varejo físico">Varejo físico</option>
                  <option value="Varejo físico + e-commerce">Varejo físico + e-commerce</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="cidadeEstado" className={labelCls}>
                  Cidade e Estado *
                </label>
                <input
                  type="text"
                  id="cidadeEstado"
                  name="cidadeEstado"
                  value={formData.cidadeEstado}
                  onChange={handleChange}
                  required
                  className={inputCls}
                  placeholder="Ex: Bauru - SP"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="faturamento" className={labelCls}>
                  Faturamento Mensal Atual *
                </label>
                <select
                  id="faturamento"
                  name="faturamento"
                  value={formData.faturamento}
                  onChange={handleChange}
                  required
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="Projeto novo">Projeto novo (ainda não fatura)</option>
                  <option value="A partir de R$ 50 mil">A partir de R$ 50 mil</option>
                  <option value="A partir de R$ 80 mil">A partir de R$ 80 mil</option>
                  <option value="A partir de R$ 100 mil">A partir de R$ 100 mil</option>
                  <option value="A partir de R$ 150 mil">A partir de R$ 150 mil</option>
                  <option value="A partir de R$ 200 mil">A partir de R$ 200 mil</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className={labelCls}>
                Você tem disponibilidade de investir a partir de R$ 1.500/mês em anúncios (fora a mão
                de obra)? *
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {["Sim", "Não", "Quero entender melhor"].map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border p-4 transition-colors ${
                      formData.investimento === option
                        ? "border-ink bg-light text-ink"
                        : "border-border bg-card text-muted hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="investimento"
                      value={option}
                      checked={formData.investimento === option}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="site" className="flex items-center gap-2 text-sm font-medium text-foreground">
                Site / Link da loja
                <span className="rounded bg-foreground/[0.06] px-2 py-0.5 text-xs font-normal text-muted">
                  Opcional
                </span>
              </label>
              <input
                type="text"
                inputMode="url"
                id="site"
                name="site"
                value={formData.site}
                onChange={handleChange}
                className={inputCls}
                placeholder="https://www.sualoja.com.br"
              />
            </div>

            <div className="flex justify-end pt-4">
              <StarBorder
                as="button"
                type="submit"
                disabled={isSubmitting}
                color="#8FB4FF"
                style={{ padding: "3px" }}
                className="star-btn w-full rounded-[16px] disabled:opacity-70 md:w-auto"
              >
                <span className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-ink px-8 py-4 text-base font-semibold text-background">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Abrindo o WhatsApp...
                    </>
                  ) : (
                    <>
                      Solicitar Análise
                      <CheckCircle size={18} />
                    </>
                  )}
                </span>
              </StarBorder>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
