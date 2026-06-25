"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";

type GradientBlindsProps = {
  className?: string;
  dpr?: number;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
  mixBlendMode?: string;
};

const GradientBlinds = dynamic<GradientBlindsProps>(() => import("../reactbits/GradientBlinds"), {
  ssr: false,
});

/**
 * Fundo "Gradient Blinds" (WebGL/ogl) — substitui o Laser no topo.
 * Carrega imediatamente (sem esperar o IntersectionObserver) e pausa quando
 * sai bem para fora da viewport.
 */
export function GradientBlindsBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "400px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <WebGLBoundary>
        <GradientBlinds
          className="h-full w-full"
          gradientColors={["#05070f", "#0e2257", "#2F6BFF", "#0a1330"]}
          angle={18}
          noise={0.1}
          blindCount={22}
          blindMinWidth={55}
          mouseDampening={0.15}
          spotlightRadius={0.55}
          spotlightSoftness={1.4}
          spotlightOpacity={0.5}
          mixBlendMode="normal"
          paused={paused}
        />
      </WebGLBoundary>
    </div>
  );
}
