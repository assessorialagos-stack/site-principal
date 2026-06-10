import { cn } from "@/app/lib/cn";
import { Backdrop } from "./Backdrop";

/**
 * Wrapper padrão de seção: espaçamento vertical, fundo claro alternável,
 * backdrop decorativo opcional e bordas horizontais opcionais.
 */
export function Section({
  id,
  children,
  className,
  bg = "background",
  backdrop = "none",
  bordered = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: "background" | "section";
  backdrop?: "none" | "hero" | "section" | "banner" | "subtle";
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24",
        bg === "section" ? "bg-section" : "bg-background",
        bordered && "border-y border-border",
        className
      )}
    >
      {backdrop !== "none" && <Backdrop variant={backdrop} />}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
