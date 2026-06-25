"use client";

import LogoLoop from "../reactbits/LogoLoop";
import { cn } from "@/app/lib/cn";

// Logos reais dos clientes (versões recortadas/normalizadas em public/logos/trim,
// geradas por scripts/trim-logos.mjs — sem padding, todas no mesmo tamanho visual).
const logos = [
  { src: "/logos/trim/sique.png", alt: "Sique Móveis" },
  { src: "/logos/trim/praca-moca.png", alt: "Praça da Moça Café" },
  { src: "/logos/trim/roney-films.png", alt: "Roney Films" },
  { src: "/logos/trim/crew-academy.png", alt: "Seaman Náutica · Crew Academy" },
  { src: "/logos/trim/logo3.png", alt: "Elite Portas e Janelas" },
  { src: "/logos/trim/logo-final.png", alt: "VidaJá Saúde" },
];

function LogoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="flex h-24 w-60 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="max-h-[60px] w-auto max-w-[200px] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </span>
  );
}

const toItems = (list: typeof logos) =>
  list.map((l) => ({ node: <LogoTile src={l.src} alt={l.alt} />, title: l.alt, ariaLabel: l.alt }));

/** Carrossel de logos em 2 fileiras: a de cima rola p/ a esquerda, a de baixo p/ a direita. */
export function ClientLogos({ className = "" }: { className?: string }) {
  const row1 = toItems(logos);
  const row2 = toItems([...logos].reverse());

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <LogoLoop
        logos={row1}
        speed={55}
        direction="left"
        gap={28}
        fadeOut
        fadeOutColor="#08080A"
        pauseOnHover
        ariaLabel="Logos de clientes da Lagos (fileira 1)"
      />
      <LogoLoop
        logos={row2}
        speed={55}
        direction="right"
        gap={28}
        fadeOut
        fadeOutColor="#08080A"
        pauseOnHover
        ariaLabel="Logos de clientes da Lagos (fileira 2)"
      />
    </div>
  );
}
