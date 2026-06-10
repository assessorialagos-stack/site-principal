"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsDesktop } from "@/app/lib/useIsDesktop";
import { cn } from "@/app/lib/cn";

/**
 * Move o conteúdo em parallax conforme a seção cruza a viewport (apenas desktop).
 * `strength` em px: deslocamento total de cima/baixo. Positivo = sobe ao rolar.
 */
export function Parallax({
  children,
  strength = 60,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const active = desktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [active ? strength : 0, active ? -strength : 0]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
