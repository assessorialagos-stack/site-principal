import { cn } from "@/app/lib/cn";

/**
 * Wrapper com borda em gradiente cônico girando (arco neon viajando ao redor).
 */
export function AnimatedGradientBorder({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-px",
        className
      )}
      style={{ background: "rgba(255,255,255,0.07)" }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, var(--color-neon) 270deg, var(--color-primary) 320deg, transparent 360deg)",
        }}
      />
      <div className={cn("relative rounded-[calc(1.5rem-1px)] bg-section", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
