"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";
import { useIsDesktop } from "@/app/lib/useIsDesktop";

type LightPillarProps = {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: string;
  pillarRotation?: number;
  quality?: "low" | "medium" | "high";
  paused?: boolean;
};

const LightPillar = dynamic<LightPillarProps>(() => import("../reactbits/LightPillar"), {
  ssr: false,
});

/**
 * Fundo "Light Pillar" (WebGL/three) para o topo do site.
 * Carrega só no cliente e apenas quando está perto da viewport (economia de GPU).
 */
export function PillarBackground({
  className = "",
  rotation = 0,
}: {
  className?: string;
  /** ângulo do pilar em graus (ex.: 35 = diagonal) */
  rotation?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // IMPORTANTE: isto controla PAUSA, não montagem. Antes o componente era
  // desmontado ao sair da viewport, e o three.js respondia com dispose() +
  // forceContextLoss(); ao voltar, recriava o contexto e recompilava os shaders.
  // Rolando a página isso acontecia sem parar — era ~13% da CPU e travadas de
  // mais de 1 segundo. Agora o canvas nasce uma vez e só para de desenhar.
  const [visible, setVisible] = useState(true);
  // Só roda o pilar WebGL no desktop; no mobile o card já tem glows próprios e
  // dispensa o canvas (evita um segundo contexto 3D que faz a tela piscar).
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!desktop) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "300px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [desktop]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {desktop && (
        <WebGLBoundary>
          <LightPillar
            paused={!visible}
            className="h-full w-full"
            topColor="#6FA8FF"
            bottomColor="#1E3A8A"
            intensity={1.0}
            rotationSpeed={0.22}
            pillarWidth={3.2}
            pillarHeight={0.4}
            glowAmount={0.0052}
            noiseIntensity={0.5}
            mixBlendMode="screen"
            pillarRotation={rotation}
            // "medium" = 40 iterações de raymarching em vez de 80. É um brilho
            // difuso atrás do dashboard, a 65% de opacidade: o olho não vê a
            // diferença, a GPU vê. Volte para "high" se quiser o máximo.
            quality="medium"
          />
        </WebGLBoundary>
      )}
    </div>
  );
}
