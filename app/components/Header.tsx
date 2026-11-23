"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/app/lib/cn";
import { smoothScrollTo } from "@/app/lib/scroll";
import { whatsappLink } from "@/app/lib/contact";

type StaggeredMenuProps = {
  items: { label: string; ariaLabel?: string; link: string }[];
  socialItems?: { label: string; link: string }[];
  displayItemNumbering?: boolean;
  position?: "left" | "right";
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  isFixed?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

const StaggeredMenu = dynamic<StaggeredMenuProps>(() => import("./reactbits/StaggeredMenu"), {
  ssr: false,
});

const navLinks = [
  { name: "Serviços", href: "#servicos" },
  { name: "Método", href: "#metodo" },
  { name: "Resultados", href: "#cases" },
  { name: "FAQ", href: "#faq" },
];

function LagosLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Lagos Assessoria">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-lagos-light.png"
        alt="Lagos Assessoria"
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
      <span className="font-heading text-base font-black tracking-widest text-foreground">LAGOS</span>
    </Link>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("#formulario");
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      {/* Barra de progresso de scroll */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
      />

      {/* Desktop: barra slim única (estilo React Bits) */}
      <div className="mx-auto hidden max-w-5xl items-center justify-between gap-4 rounded-full border border-border bg-white/85 px-4 py-2 backdrop-blur-xl md:flex shadow-[0_10px_30px_-14px_rgba(15,23,42,0.25)]">
        <LagosLogo />

        <nav className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#formulario"
            onClick={scrollToForm}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Quero uma análise
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Mobile: logo à esquerda (o botão do menu fica à direita,
          renderizado pelo Staggered Menu — evita sobreposição) */}
      <div
        className={cn(
          "mx-3 flex items-center gap-3 rounded-full px-4 py-2 transition-colors md:hidden",
          // Fundo sólido (sem backdrop-blur) no mobile: alternar blur a cada pixel
          // de scroll forçava recomposição de camada e fazia o header piscar.
          isScrolled ? "border border-border bg-white/95 shadow-sm" : "bg-transparent"
        )}
      >
        <LagosLogo />
      </div>

      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          colors={["#DCE6FD", "#155EEF"]}
          accentColor="#155EEF"
          menuButtonColor="#0F0F12"
          openMenuButtonColor="#0F0F12"
          displayItemNumbering
          isFixed
          items={[
            { label: "Serviços", ariaLabel: "Ver os serviços", link: "#servicos" },
            { label: "Método", ariaLabel: "Ir para o Método", link: "#metodo" },
            { label: "Resultados", ariaLabel: "Ver os resultados", link: "#cases" },
            { label: "FAQ", ariaLabel: "Ver as dúvidas", link: "#faq" },
            { label: "Quero uma análise", ariaLabel: "Falar com a Lagos", link: "#formulario" },
          ]}
          socialItems={[
            { label: "Instagram", link: "https://instagram.com" },
            { label: "WhatsApp", link: whatsappLink() },
          ]}
        />
      </div>
    </header>
  );
}
