import { cn } from "@/app/lib/cn";

type BackdropVariant = "hero" | "section" | "banner" | "subtle" | "dark-hero" | "dark-section";

/** Ondulações concêntricas — referência à água (Lagos / Método Maré). */
function Ripples({ className }: { className?: string }) {
  const radii = [150, 255, 370, 495, 630];
  return (
    <svg className={className} viewBox="0 0 1400 1400" fill="none" aria-hidden>
      {radii.map((r, i) => (
        <circle
          key={r}
          cx="700"
          cy="700"
          r={r}
          stroke="#FFFFFF"
          strokeOpacity={0.075 - i * 0.011}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/** Linhas de maré — curvas horizontais suaves, em branco translúcido. */
function TideLines({ className }: { className?: string }) {
  const paths = [
    "M0 60 C 260 20, 520 110, 760 70 S 1200 10, 1440 60",
    "M0 150 C 240 110, 500 190, 740 150 S 1190 110, 1440 150",
    "M0 240 C 280 200, 520 290, 760 245 S 1210 200, 1440 240",
    "M0 330 C 250 290, 510 380, 750 335 S 1200 290, 1440 330",
    "M0 415 C 270 375, 520 455, 760 415 S 1210 375, 1440 415",
  ];
  return (
    <svg
      className={className}
      viewBox="0 0 1440 440"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="#FFFFFF" strokeOpacity={0.06 - i * 0.008} strokeWidth="1.2" />
      ))}
    </svg>
  );
}

/**
 * Fundo decorativo. Variantes claras: pontilhado leve com máscara radial (cal.com).
 * Variantes escuras: luz de topo + grade fina + ondulações/maré, sempre em P&B.
 */
export function Backdrop({
  variant = "section",
  className,
}: {
  variant?: BackdropVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {(variant === "hero" || variant === "section" || variant === "banner") && (
        <div
          className={cn(
            "absolute inset-0 bg-dots",
            variant === "hero" ? "mask-radial opacity-60" : "mask-radial-center opacity-35"
          )}
        />
      )}

      {variant === "dark-hero" && (
        <>
          {/* Luz cenográfica vinda do topo */}
          <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(ellipse_62%_90%_at_50%_-12%,rgba(255,255,255,0.10),transparent_64%)]" />
          {/* Grade fina */}
          <div className="absolute inset-0 bg-grid-white mask-radial opacity-60" />
          {/* Ondulações atrás do título */}
          <Ripples className="absolute left-1/2 top-[-23rem] w-[88rem] max-w-none -translate-x-1/2" />
          {/* Volumes laterais para profundidade */}
          <div className="absolute -left-44 top-1/3 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute -right-44 top-2/3 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
        </>
      )}

      {variant === "dark-section" && (
        <>
          {/* Claridade discreta no topo da seção */}
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_55%_100%_at_50%_-30%,rgba(255,255,255,0.07),transparent_70%)]" />
          <div className="absolute inset-0 bg-dots-white mask-radial-center opacity-30" />
          {/* Maré no rodapé da seção */}
          <TideLines className="absolute inset-x-0 bottom-0 h-56 w-full md:h-72" />
        </>
      )}
    </div>
  );
}
