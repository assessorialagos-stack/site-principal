import { cn } from "@/app/lib/cn";

/**
 * Badge/pílula estilo cal.com: hairline, branco, texto cinza, sombra bem leve.
 */
export function Eyebrow({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  // mantido por compatibilidade; não é usado
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted shadow-[0_1px_2px_rgba(15,15,17,0.04)]",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
