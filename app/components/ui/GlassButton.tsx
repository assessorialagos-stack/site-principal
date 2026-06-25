"use client";

import GlassSurface from "../reactbits/GlassSurface";
import { cn } from "@/app/lib/cn";

/**
 * Botão secundário com o efeito Glass Surface (vidro).
 * Usado em "Falar no WhatsApp" e "Quero uma análise".
 */
export function GlassButton({
  children,
  icon,
  className,
  height = 46,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.ReactNode;
  height?: number;
}) {
  return (
    <a {...props} className={cn("inline-block", className)}>
      <GlassSurface width="auto" height={height} borderRadius={999} className="glass-btn">
        <span className="flex items-center gap-1.5 whitespace-nowrap px-5 text-sm font-semibold text-white sm:px-6">
          {children}
          {icon}
        </span>
      </GlassSurface>
    </a>
  );
}
