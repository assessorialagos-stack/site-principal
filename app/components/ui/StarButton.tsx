"use client";

import StarBorder from "../reactbits/StarBorder";
import { cn } from "@/app/lib/cn";

/**
 * CTA primário branco com a borda animada do Star Border (claramente visível).
 */
export function StarButton({
  children,
  icon,
  className,
  innerClassName,
  style,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.ReactNode;
  innerClassName?: string;
}) {
  return (
    <StarBorder
      as="a"
      color="#8FB4FF"
      speed="4s"
      className={cn("star-btn rounded-[16px]", className)}
      style={{ padding: "3px", ...style }}
      {...props}
    >
      <span
        className={cn(
          "flex items-center justify-center gap-2 rounded-[13px] bg-ink px-5 py-3 text-sm font-semibold text-background transition-colors sm:px-8 sm:py-4 sm:text-base",
          innerClassName
        )}
      >
        {children}
        {icon}
      </span>
    </StarBorder>
  );
}
