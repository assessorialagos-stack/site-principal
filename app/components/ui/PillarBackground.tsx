"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      rootMargin: "300px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {show && (
        <WebGLBoundary>
          <LightPillar
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
            quality="high"
          />
        </WebGLBoundary>
      )}
    </div>
  );
}
