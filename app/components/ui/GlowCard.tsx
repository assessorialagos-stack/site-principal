"use client";

import { cn } from "@/app/lib/cn";
import MagicBentoCard from "../reactbits/MagicBentoCard";

/**
 * Card com efeitos Magic Bento (tilt + magnetismo + partículas + glow no cursor),
 * sobre o hairline/anel-base do .glow-border. `tone="dark"` para superfícies escuras.
 */
export function GlowCard({
  children,
  className,
  tone = "light",
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  // mantidos por compatibilidade
  spotlight?: boolean;
  tilt?: boolean;
  tone?: "dark" | "light";
  glow?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "group glow-border relative h-full rounded-2xl border transition-[box-shadow,border-color] duration-200",
        tone === "dark"
          ? "border-dark-border bg-white/[0.04] hover:border-dark-border-strong"
          : "border-border bg-card hover:border-border-strong",
        className
      )}
    >
      {children}
    </div>
  );

  if (!glow) return inner;

  return (
    <MagicBentoCard
      className="h-full rounded-2xl"
      glowColor={tone === "dark" ? "130,165,255" : "47,107,255"}
      particleCount={6}
    >
      {inner}
    </MagicBentoCard>
  );
}
