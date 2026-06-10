import { cn } from "@/app/lib/cn";

type Variant = "primary" | "neon" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200";

const sizes: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-[0.95rem]",
};

function variantClasses(variant: Variant): string {
  switch (variant) {
    // Botão PRETO (assinatura cal.com), texto branco
    case "primary":
    case "neon":
      return "bg-ink text-white hover:bg-ink-soft";
    // Contorno claro
    case "outline":
      return "border border-border bg-white text-foreground hover:bg-section";
    // Texto discreto
    case "ghost":
      return "text-foreground hover:bg-section";
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
