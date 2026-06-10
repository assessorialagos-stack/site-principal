import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une classes condicionais (clsx) e resolve conflitos do Tailwind (tailwind-merge).
 * Uso: cn("px-4", isActive && "text-neon", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
