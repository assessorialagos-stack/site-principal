"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { ActionButton } from "./ActionButton";

/**
 * Linha de feature: texto (eyebrow + título + descrição + bullets + botão) de um
 * lado e um mockup/print emoldurado do outro. `reverse` alterna os lados, para
 * montar o zigue-zague das seções.
 * `tone="dark"` inverte a tipografia para as seções pretas.
 */
export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  media,
  reverse = false,
  cta,
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  bullets?: string[];
  media: React.ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={cn(reverse && "lg:order-2")}
      >
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2
          className={cn(
            "font-heading text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.6rem]",
            dark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}>
            {description}
          </p>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    dark ? "bg-white text-background" : "bg-foreground text-background"
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className={cn("text-[0.975rem]", dark ? "text-white/85" : "text-foreground/90")}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <ActionButton
            href={cta.href}
            icon={<ArrowRight size={16} />}
            className="mt-9"
          >
            {cta.label}
          </ActionButton>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={cn(reverse && "lg:order-1")}
      >
        {media}
      </motion.div>
    </div>
  );
}
