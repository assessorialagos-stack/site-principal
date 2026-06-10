import { ImageIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

/**
 * Slot de imagem/foto claramente marcado (tema claro cal.com).
 * Troque por <img>/<Image> com o asset real.
 */
export function MediaPlaceholder({
  label = "Adicione a imagem aqui",
  icon,
  className,
}: {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-border bg-section text-center",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-muted shadow-sm">
        {icon ?? <ImageIcon size={20} />}
      </span>
      <span className="relative px-4 text-xs font-medium text-muted">{label}</span>
    </div>
  );
}
