"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/app/lib/cn";
import { smoothScrollTo } from "@/app/lib/scroll";

const navLinks = [
  { name: "Método", href: "#metodo" },
  { name: "Serviços", href: "#servicos" },
  { name: "Cases", href: "#cases" },
  { name: "Time", href: "#time" },
  { name: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: marca o link da seção visível
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo("#formulario");
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "glass-neon py-3" : "bg-transparent py-5"
      )}
    >
      {/* Barra de progresso de scroll */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-ink"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-1 font-heading text-2xl font-black tracking-widest text-ink"
          >
            LAGOS
            <span className="h-1.5 w-1.5 rounded-full bg-ink transition-transform group-hover:scale-150" />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = activeId === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    active ? "text-accent" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300",
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a
              href="#formulario"
              onClick={scrollToForm}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-ink-soft"
            >
              Quero uma análise
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Botão menu mobile */}
          <button
            className="rounded-lg p-2 text-ink transition-colors hover:bg-light md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-border glass-neon md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="py-2 text-base font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-2 border-t border-border pt-4">
                <a
                  href="#formulario"
                  onClick={scrollToForm}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-ink-soft"
                >
                  Quero uma análise
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
