import { cn } from "@/app/lib/cn";

type BackdropVariant = "hero" | "section" | "banner" | "subtle";

/**
 * Fundo decorativo bem sutil (cal.com): pontilhado leve com máscara radial. Sem brilhos coloridos.
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
      {variant !== "subtle" && (
        <div
          className={cn(
            "absolute inset-0 bg-dots",
            variant === "hero" ? "mask-radial opacity-60" : "mask-radial-center opacity-35"
          )}
        />
      )}
    </div>
  );
}
