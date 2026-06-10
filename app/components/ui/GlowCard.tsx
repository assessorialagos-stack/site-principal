import { cn } from "@/app/lib/cn";

/**
 * Card estilo cal.com: branco, borda hairline, sombra bem suave e hover discreto.
 * Calmo e estático (sem tilt/spotlight) — o "group" é mantido para hovers internos.
 */
export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  // mantidos por compatibilidade; não usados
  spotlight?: boolean;
  tilt?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,15,17,0.04)] transition-shadow duration-200 hover:shadow-[0_16px_40px_-20px_rgba(15,15,17,0.20)]",
        className
      )}
    >
      {children}
    </div>
  );
}
