import { Snowflake } from "lucide-react";
import { cn } from "@/app/lib/cn";

// Posições fixas (calculadas pelo índice), para o HTML do servidor e o do
// navegador saírem iguais: nada de Math.random() no render.
const flakes = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 95,
  size: 10 + ((i * 7) % 4) * 4,
  duration: 14 + ((i * 5) % 9),
  delay: -((i * 13) % 20),
  opacity: 0.25 + ((i * 3) % 5) * 0.08,
}));

/**
 * Neve discreta caindo ao fundo (tema de Natal). Só CSS: com "reduzir
 * animações" ligado, os flocos ficam parados e espalhados (posição --y).
 */
export function Snowfall({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {flakes.map((f, i) => (
        <Snowflake
          key={i}
          className="snowflake absolute -top-6 text-[#8DA4D4]"
          style={{
            ["--y" as string]: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
