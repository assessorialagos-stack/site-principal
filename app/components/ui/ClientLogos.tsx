"use client";

import { useMemo } from "react";
import LogoLoop from "../reactbits/LogoLoop";
import { cn } from "@/app/lib/cn";

// Logos reais dos clientes (versões recortadas/normalizadas em public/logos/trim,
// geradas por scripts/trim-logos.mjs). Os que tinham partes brancas usam a versão
// para fundo claro de public/logos/light (scripts/logos-on-light.mjs).
const logos = [
  { src: "/logos/trim/sique.png", alt: "Sique Móveis" },
  { src: "/logos/light/praca-moca.png", alt: "Praça da Moça Café" },
  { src: "/logos/trim/roney-films.png", alt: "Roney Films" },
  { src: "/logos/light/crew-academy.png", alt: "Seaman Náutica · Crew Academy" },
  { src: "/logos/light/logo3.png", alt: "Elite Portas e Janelas" },
  { src: "/logos/trim/logo-final.png", alt: "VidaJá Saúde" },
];

type Size = "sm" | "md";

const tileSize: Record<Size, { tile: string; img: string }> = {
  md: { tile: "h-24 w-60", img: "max-h-[60px] max-w-[200px]" },
  sm: { tile: "h-16 w-44", img: "max-h-[40px] max-w-[140px]" },
};

function LogoTile({ src, alt, size }: { src: string; alt: string; size: Size }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-2xl border border-border bg-card px-4",
        tileSize[size].tile
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className={cn(
          "w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100",
          tileSize[size].img
        )}
      />
    </span>
  );
}

const toItems = (list: typeof logos, size: Size) =>
  list.map((l) => ({ node: <LogoTile src={l.src} alt={l.alt} size={size} />, title: l.alt, ariaLabel: l.alt }));

/**
 * Carrossel de logos. Com 2 fileiras, a de cima rola p/ a esquerda e a de baixo
 * p/ a direita; `rows={1}` e `size="sm"` dão a faixa fina logo abaixo do hero.
 */
export function ClientLogos({
  className = "",
  rows = 2,
  size = "md",
}: {
  className?: string;
  rows?: 1 | 2;
  size?: Size;
}) {
  // Memoizado: sem isso as listas viravam arrays novos a cada render do pai, o
  // LogoLoop (memo) re-renderizava à toa e seus ResizeObservers se
  // desmontavam/remontavam junto.
  const row1 = useMemo(() => toItems(logos, size), [size]);
  const row2 = useMemo(() => toItems([...logos].reverse(), size), [size]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <LogoLoop
        logos={row1}
        speed={55}
        direction="left"
        gap={size === "sm" ? 20 : 28}
        fadeOut
        fadeOutColor="#FFFFFF"
        pauseOnHover
        ariaLabel="Logos de clientes da Lagos (fileira 1)"
      />
      {rows === 2 && (
        <LogoLoop
          logos={row2}
          speed={55}
          direction="right"
          gap={28}
          fadeOut
          fadeOutColor="#FFFFFF"
          pauseOnHover
          ariaLabel="Logos de clientes da Lagos (fileira 2)"
        />
      )}
    </div>
  );
}
