import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PageReveal } from "./components/ui/PageReveal";
import { PainSection } from "./components/PainSection";
import { SolutionSection } from "./components/SolutionSection";
import { FunnelSection } from "./components/FunnelSection";
import { BannerCTA } from "./components/BannerCTA";
import { OnboardingSection } from "./components/OnboardingSection";
import { ServicesSection } from "./components/ServicesSection";
import { CasesSection } from "./components/CasesSection";
import { InstaProofSection } from "./components/InstaProofSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { FAQSection } from "./components/FAQSection";
import { LeadForm } from "./components/LeadForm";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PageReveal>
          <PainSection />
          <SolutionSection />
          <FunnelSection />
          <BannerCTA
            tone="dark"
            eyebrow="Pronto pra começar?"
            title={
              <>
                Sua loja está pronta para escalar. <br className="hidden md:block" />
                Falta a <span className="underline decoration-white/40 underline-offset-[6px]">estratégia certa.</span>
              </>
            }
            subtitle="Agende um diagnóstico gratuito e descubra onde está o dinheiro que sua operação está deixando na mesa."
            ctaText="Quero meu diagnóstico gratuito"
          />
          <OnboardingSection />
          <ServicesSection />
          <CasesSection />
          <InstaProofSection />
          <ComparisonSection />
          <FAQSection />
          <BannerCTA
            eyebrow="Última chamada"
            title={
              <>
                Vamos transformar seu marketing em uma{" "}
                <span className="underline decoration-white/40 underline-offset-[6px]">máquina de lucro.</span>
              </>
            }
            subtitle="Sem promessas mágicas. Só método, execução e foco no que importa: vendas."
            ctaText="Quero uma análise da minha loja"
          />
          <LeadForm />
        </PageReveal>
      </main>
      <Footer />
    </>
  );
}
