"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsDesktop } from "@/app/lib/useIsDesktop";

/**
 * Anel que segue o cursor com leve atraso (mola) e cresce sobre elementos interativos.
 * Aditivo: NÃO esconde o cursor nativo. Só desktop com mouse.
 */
export function CursorRing() {
  const desktop = useIsDesktop();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.5 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.5 });

  useEffect(() => {
    if (!desktop) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [role='button'], input, select, label")));
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerout", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
    };
  }, [desktop, x, y]);

  if (!desktop) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[60] -ml-4 -mt-4 h-8 w-8"
      animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 1.8 : 1 }}
      transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
    >
      <div className="h-full w-full rounded-full border border-accent/50 bg-accent/5" />
    </motion.div>
  );
}
