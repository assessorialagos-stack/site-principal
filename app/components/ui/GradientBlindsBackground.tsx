"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";
import { useIsDesktop } from "@/app/lib/useIsDesktop";

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
  // No celular/tablet (sem mouse) NÃO montamos o canvas WebGL: vários contextos
  // 3D no mobile estouram o limite do navegador e a tela pisca preto. Em vez disso
  // mostramos um gradiente estático equivalente (mesmo visual, custo zero de GPU).
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!desktop) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "400px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [desktop]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {desktop ? (
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
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_12%,rgba(47,107,255,0.30),transparent_60%),linear-gradient(160deg,#070b1a_0%,#0a1330_55%,#05070f_100%)]" />
      )}
    </div>
  );
}
