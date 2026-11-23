import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PageReveal } from "./components/ui/PageReveal";
import { LogoStrip } from "./components/LogoStrip";
import { LeadForm } from "./components/LeadForm";
import { PositioningSection } from "./components/PositioningSection";
import { CTAStrip } from "./components/CTAStrip";
import { ServicesSection } from "./components/ServicesSection";
import { FunnelSection } from "./components/FunnelSection";
import { CasesSection } from "./components/CasesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";

// Estrutura de página inspirada em bluefy.com.br: hero, faixa de logos,
// posicionamento, faixas de chamada entre os blocos, serviços em zigue-zague,
// resultados em linha do tempo, depoimentos, WhatsApp, FAQ e fechamento.
// O formulário segue logo depois do hero (pedido do cliente).
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PageReveal>
          <LogoStrip />
          <LeadForm />
          <PositioningSection />
          <CTAStrip
            title="Seu negócio está pronto para escalar. Falta a estratégia certa."
            subtitle="Agende um diagnóstico gratuito e descubra onde está o dinheiro que sua operação está deixando na mesa."
          />
          <ServicesSection />
          <FunnelSection />
          <CasesSection />
          <TestimonialsSection />
          <CTAStrip
            variant="whatsapp"
            title="Prefere falar com a gente pelo WhatsApp?"
            subtitle="Clique no botão abaixo e fale agora com um especialista da Lagos."
            ctaText="Falar pelo WhatsApp"
          />
          <FAQSection />
          <CTAStrip
            variant="final"
            title={
              <>
                Vamos transformar seu marketing em uma <span className="text-accent">máquina de lucro.</span>
              </>
            }
            subtitle="Sem promessas mágicas. Só método, execução e foco no que importa: vendas."
            ctaText="Quero uma análise do meu negócio"
          />
        </PageReveal>
      </main>
      <Footer />
    </>
  );
}
