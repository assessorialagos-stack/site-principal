"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WebGLBoundary } from "./WebGLBoundary";

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      rootMargin: "250px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {show && (
        <WebGLBoundary>
          <MagicRings
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
      )}
    </div>
  );
}
