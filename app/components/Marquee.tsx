"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/app/lib/cn";

interface MarqueeProps {
  logos: { id: number; name: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  title?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

// Mantém v entre min e max (loop infinito sem emendas)
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export function Marquee({
  logos,
  direction = "left",
  speed = "normal",
  title,
  className,
  tone = "light",
}: MarqueeProps) {
  const dark = tone === "dark";
  const reduce = useReducedMotion();
  const baseSpeed = { fast: 3, normal: 2, slow: 1.2 }[speed];
  const baseVelocity = (direction === "left" ? -1 : 1) * baseSpeed;

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // a rolagem acelera o marquee e pode inverter o sentido
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={cn("w-full overflow-hidden py-10", className)}>
      {title && (
        <p
          className={cn(
            "mb-8 text-center font-mono text-xs uppercase tracking-[0.25em]",
            dark ? "text-white/50" : "text-muted"
          )}
        >
          {title}
        </p>
      )}
      <div className="relative flex w-full items-center">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r to-transparent md:w-48",
            dark ? "from-dark" : "from-background"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l to-transparent md:w-48",
            dark ? "from-dark" : "from-background"
          )}
        />

        <motion.div style={{ x }} className="flex w-max items-center gap-6 md:gap-10">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className={cn(
                "group flex h-16 w-32 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 md:h-20 md:w-44",
                dark
                  ? "border-dark-border bg-white/[0.03] hover:border-dark-border-strong"
                  : "border-border bg-card text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "font-heading text-base font-semibold tracking-wide transition-colors md:text-lg",
                  dark
                    ? "text-white/50 group-hover:text-white"
                    : "text-muted group-hover:text-foreground"
                )}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
