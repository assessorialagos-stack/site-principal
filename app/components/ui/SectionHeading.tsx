"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/cn";
import { Eyebrow } from "./Eyebrow";

/**
 * Cabeçalho de seção estilo cal.com: badge + título grande + subtítulo.
 * Centralizado, com bastante respiro. `tone="dark"` inverte para as seções pretas.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  subtitle,
  align = "center",
  className,
  tone = "light",
}: {
  eyebrow?: React.ReactNode;
  number?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  tone?: "dark" | "light";
}) {
  const isCenter = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", isCenter ? "mx-auto text-center" : "text-left", className)}>
      {(eyebrow || number) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn("mb-5 flex items-center gap-3", isCenter && "justify-center")}
        >
          {number && (
            <span className={cn("font-mono text-sm font-medium", dark ? "text-white/50" : "text-muted")}>
              {number}
            </span>
          )}
          {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={cn(
          "font-heading text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.85rem]",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-muted",
            isCenter && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
