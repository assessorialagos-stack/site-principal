import { cn } from "@/app/lib/cn";

type Variant = "primary" | "neon" | "outline" | "ghost" | "inverse" | "outline-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200";

const sizes: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-[0.95rem]",
};

function variantClasses(variant: Variant): string {
  switch (variant) {
    // Botão BRANCO (assinatura cal.com no escuro), texto preto
    case "primary":
    case "neon":
    case "inverse":
      return "bg-ink text-background hover:bg-ink-soft";
    // Contorno em vidro escuro
    case "outline":
      return "border border-border bg-white/[0.04] text-foreground hover:bg-white/[0.08]";
    // Texto discreto
    case "ghost":
      return "text-foreground hover:bg-white/[0.06]";
    // Contorno claro sobre seção preta
    case "outline-dark":
      return "border border-white/20 text-white hover:bg-white/10";
  }
}

/**
 * CTA polimórfico (renderiza <a>). Estilo cal.com: limpo, chapado, cantos arredondados.
 */
export function NeonButton({
  children,
  variant = "primary",
  size = "lg",
  icon,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
}) {
  return (
    <a className={cn(base, sizes[size], variantClasses(variant), className)} {...props}>
      {children}
      {icon}
    </a>
  );
}
