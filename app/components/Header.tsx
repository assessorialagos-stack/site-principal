"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/app/lib/cn";
import { smoothScrollTo } from "@/app/lib/scroll";
import { whatsappLink } from "@/app/lib/contact";
import { ThemeToggle } from "./ui/ThemeToggle";

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
  { name: "Método", href: "#metodo" },
  { name: "Serviços", href: "#servicos" },
  { name: "Cases", href: "#cases" },
  { name: "FAQ", href: "#faq" },
];

function LagosLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Lagos Assessoria">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-lagos.png"
        alt="Lagos Assessoria"
        width={28}
        height={28}
        className="h-7 w-7 rounded-lg object-contain [mix-blend-mode:screen]"
      />
      <span className="font-heading text-base font-black tracking-widest text-white">LAGOS</span>
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
      <div className="mx-auto hidden max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0c0c12]/80 px-4 py-2 backdrop-blur-xl md:flex [box-shadow:inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_-14px_rgba(0,0,0,0.7)]">
        <LagosLogo />

        <nav className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle className="h-10 w-10" />
          <a
            href="#formulario"
            onClick={scrollToForm}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-white/90"
          >
            Quero uma análise
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Mobile: logo + toggle de tema à esquerda (o botão do menu fica à direita,
          renderizado pelo Staggered Menu — evita sobreposição) */}
      <div
        className={cn(
          "mx-3 flex items-center gap-3 rounded-full px-4 py-2 transition-all md:hidden",
          isScrolled ? "border border-white/10 bg-[#0c0c12]/85 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <LagosLogo />
        <ThemeToggle className="h-10 w-10" />
      </div>

      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          colors={["#0e1f4d", "#2F6BFF"]}
          accentColor="#2F6BFF"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          displayItemNumbering
          isFixed
          items={[
            { label: "Método", ariaLabel: "Ir para o Método", link: "#metodo" },
            { label: "Serviços", ariaLabel: "Ver os serviços", link: "#servicos" },
            { label: "Cases", ariaLabel: "Ver os cases", link: "#cases" },
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
