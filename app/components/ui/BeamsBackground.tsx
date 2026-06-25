"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";

type BeamsProps = {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
};

const Beams = dynamic<BeamsProps>(() => import("../reactbits/Beams"), { ssr: false });

/**
 * Fundo "Beams" (WebGL/three) para as seções de CTA.
 * Carrega só no cliente e apenas quando entra na viewport — evita
 * manter vários contextos WebGL ativos ao mesmo tempo.
 */
export function BeamsBackground({
  className = "",
  rotation = 30,
  lightColor = "#3B6BFF",
}: {
  className?: string;
  rotation?: number;
  lightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      rootMargin: "200px",
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
          <Beams
            beamWidth={2.4}
            beamHeight={18}
            beamNumber={14}
            lightColor={lightColor}
            speed={2.2}
            noiseIntensity={1.6}
            scale={0.18}
            rotation={rotation}
          />
        </WebGLBoundary>
      )}
    </div>
  );
}
