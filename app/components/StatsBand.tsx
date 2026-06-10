"use client";

import { motion } from "framer-motion";
import { Store, TrendingUp, Target, BadgeCheck, Rocket } from "lucide-react";
import { StatCounter } from "./ui/StatCounter";

// Números ILUSTRATIVOS — troque pelos reais aqui.
const stats = [
  { icon: Store, value: 120, prefix: "+", suffix: "", decimals: 0, label: "Lojas escaladas" },
  { icon: TrendingUp, value: 18, prefix: "R$ ", suffix: "M+", decimals: 0, label: "Em tráfego gerido" },
  { icon: Target, value: 4.2, prefix: "", suffix: "x", decimals: 1, label: "ROAS médio" },
  { icon: Rocket, value: 5, prefix: "", suffix: "+", decimals: 0, label: "Anos no varejo" },
];

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-section py-28 text-foreground md:py-36">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col items-center justify-center gap-3 bg-white px-6 py-14 text-center transition-colors md:px-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={20} />
                </span>
                <span className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  <StatCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </span>
                <span className="text-sm text-muted">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-white px-5 py-2.5">
            <BadgeCheck size={18} className="text-accent" />
            <span className="text-sm text-foreground">
              <span className="font-bold">Especialistas</span> em varejo e e-commerce
            </span>
          </div>
          <p className="text-xs text-muted">
            *números ilustrativos (edite em StatsBand.tsx)
          </p>
        </div>
      </div>
    </section>
  );
}
