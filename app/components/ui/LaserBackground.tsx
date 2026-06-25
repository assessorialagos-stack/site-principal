"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";

type LaserFlowProps = {
  className?: string;
  color?: string;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  fogIntensity?: number;
  wispIntensity?: number;
  flowStrength?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
};

const LaserFlow = dynamic<LaserFlowProps>(() => import("../reactbits/LaserFlow"), { ssr: false });

/** Fundo "Laser Flow" (WebGL) para o topo do site. */
export function LaserBackground({
  className = "",
  color = "#5E7CFF",
}: {
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Carrega imediatamente (o hero está sempre no topo); o observer só pausa
  // quando a seção sai bem para fora da viewport.
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      rootMargin: "600px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {show && (
        <WebGLBoundary>
          <LaserFlow
            className="h-full w-full"
            color={color}
            horizontalBeamOffset={0.0}
            verticalBeamOffset={-0.05}
            fogIntensity={0.5}
            wispIntensity={4.5}
            flowStrength={0.3}
            verticalSizing={2.2}
            horizontalSizing={0.6}
          />
        </WebGLBoundary>
      )}
    </div>
  );
}
