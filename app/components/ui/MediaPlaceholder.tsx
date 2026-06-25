import { ImageIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

/**
 * Slot de imagem/foto claramente marcado.
 * Troque por <img>/<Image> com o asset real.
 * `tone="dark"` para uso sobre as seções pretas.
 */
export function MediaPlaceholder({
  label = "Adicione a imagem aqui",
  icon,
  className,
  tone = "light",
}: {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-dashed text-center",
        dark ? "border-dark-border bg-white/[0.03]" : "border-border bg-section",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark ? "bg-dots-white opacity-40" : "bg-dots opacity-50"
        )}
      />
      <span
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-xl border",
          dark
            ? "border-dark-border bg-white/[0.06] text-white/70"
            : "border-border bg-card text-muted shadow-sm"
        )}
      >
        {icon ?? <ImageIcon size={20} />}
      </span>
      <span className={cn("relative px-4 text-xs font-medium", dark ? "text-white/65" : "text-muted")}>
        {label}
      </span>
    </div>
  );
}
