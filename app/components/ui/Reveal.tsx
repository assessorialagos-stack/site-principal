"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsDesktop } from "@/app/lib/useIsDesktop";
import { cn } from "@/app/lib/cn";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

/**
 * Revela o conteúdo ao entrar na viewport: fade + deslize + leve desfoque.
 * Respeita prefers-reduced-motion (renderiza sem animação).
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  // No mobile o filter:blur anima a tela inteira a cada elemento que entra na
  // viewport e provoca flicker. Lá usamos só opacity + deslize (barato e fluido);
  // o desfoque fica reservado pro desktop.
  const heavy = useIsDesktop();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial={
        heavy
          ? { opacity: 0, filter: "blur(8px)", ...offset[direction] }
          : { opacity: 0, ...offset[direction] }
      }
      whileInView={
        heavy
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
