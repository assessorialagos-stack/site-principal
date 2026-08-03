"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";
import { useIsDesktop } from "@/app/lib/useIsDesktop";

type MagicRingsProps = {
  color?: string;
  colorTwo?: string;
  speed?: number;
  ringCount?: number;
  attenuation?: number;
  lineThickness?: number;
  baseRadius?: number;
  radiusStep?: number;
  scaleRate?: number;
  opacity?: number;
  noiseAmount?: number;
  followMouse?: boolean;
  parallax?: number;
  paused?: boolean;
};

const MagicRings = dynamic<MagicRingsProps>(() => import("../reactbits/MagicRings"), { ssr: false });

/** Fundo "Magic Rings" (WebGL) para o CTA. */
export function RingsBackground({
  className = "",
  color = "#2F6BFF",
  colorTwo = "#6FA8FF",
}: {
  className?: string;
  color?: string;
  colorTwo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // PAUSA, não montagem — ver o comentário longo em PillarBackground.tsx.
  // São dois BannerCTA na página, ou seja, dois contextos WebGL que antes
  // nasciam e morriam a cada rolagem.
  const [visible, setVisible] = useState(true);
  // Os anéis WebGL só existem no desktop (seguem o mouse). No mobile viram um
  // glow radial estático — mesmo clima, sem mais um contexto 3D piscando.
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!desktop) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "250px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [desktop]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {desktop ? (
        <WebGLBoundary>
          <MagicRings
            paused={!visible}
            color={color}
            colorTwo={colorTwo}
            speed={1}
            ringCount={7}
            attenuation={9}
            lineThickness={2}
            baseRadius={0.3}
            radiusStep={0.12}
            scaleRate={0.12}
            opacity={0.85}
            noiseAmount={0.06}
            followMouse
            parallax={0.04}
          />
        </WebGLBoundary>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_50%,rgba(47,107,255,0.20),transparent_70%)]" />
      )}
    </div>
  );
}
