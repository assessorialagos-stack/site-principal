"use client";

import { useRef } from "react";
import VariableProximity from "../reactbits/VariableProximity";
import { cn } from "@/app/lib/cn";

/**
 * Texto de destaque com efeito Variable Proximity: o peso de cada letra
 * reage à proximidade do cursor (usa a fonte variável Inter Tight).
 */
export function ProximityText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className={cn("inline", className)}>
      <VariableProximity
        label={children}
        containerRef={ref}
        radius={110}
        falloff="gaussian"
        fromFontVariationSettings="'wght' 500"
        toFontVariationSettings="'wght' 900"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      />
    </span>
  );
}
