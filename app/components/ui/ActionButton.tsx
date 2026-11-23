"use client";

import { cn } from "@/app/lib/cn";
import { smoothScrollTo } from "@/app/lib/scroll";

const variants = {
  // Preto sobre o branco, como o CTA do header.
  primary: "bg-ink text-background hover:bg-ink-soft",
  // Verde escuro o bastante para o texto branco ter contraste.
  whatsapp: "bg-[#15803d] text-white hover:bg-[#166534]",
  outline: "border border-border-strong bg-card text-foreground hover:bg-section",
};

/**
 * Botão sólido das seções: um CTA claro em cada bloco, como na referência
 * (bluefy.com.br). Âncoras internas (#...) rolam suavemente; links externos
 * seguem normais.
 */
export function ActionButton({
  href,
  children,
  icon,
  variant = "primary",
  className,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  icon?: React.ReactNode;
  variant?: keyof typeof variants;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };

  return (
    <a
      href={href}
      {...props}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors sm:text-[0.95rem]",
        variants[variant],
        className
      )}
    >
      {children}
      {icon}
    </a>
  );
}
