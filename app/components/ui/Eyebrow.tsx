import { cn } from "@/app/lib/cn";

/**
 * Badge/pílula estilo cal.com: hairline, branco, texto cinza, sombra bem leve.
 * `tone="dark"` para uso sobre as seções pretas.
 */
export function Eyebrow({
  children,
  icon,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        // Estética "Glass Surface" adaptável (claro/escuro via tokens)
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/[0.05] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur-md",
        tone === "dark" && "border-white/15 bg-white/[0.07] text-white/80 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.14)]",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
