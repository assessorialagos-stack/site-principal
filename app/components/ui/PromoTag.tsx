import { Gift } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { PROMO_NATAL } from "@/app/lib/promo";

/** Selo vermelho da promoção de Natal. Some sozinho com a promo desligada. */
export function PromoTag({ children, className }: { children?: React.ReactNode; className?: string }) {
  if (!PROMO_NATAL.ativa) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-[#B91C1C] px-3 py-1 text-xs font-semibold text-white shadow-[0_6px_16px_-8px_rgba(185,28,28,0.8)]",
        className
      )}
    >
      <Gift size={13} />
      {children ?? PROMO_NATAL.selo}
    </span>
  );
}
