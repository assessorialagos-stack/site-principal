"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Eyebrow } from "./Eyebrow";

/**
 * Linha de feature estilo cal.com: texto (eyebrow + título + descrição + bullets + link)
 * de um lado e um mockup/print emoldurado do outro. `reverse` alterna os lados.
 */
export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  media,
  reverse = false,
  cta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  bullets?: string[];
  media: React.ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={cn(reverse && "lg:order-2")}
      >
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h2 className="font-heading text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.6rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[0.975rem] text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <a
            href={cta.href}
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            {cta.label}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
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
