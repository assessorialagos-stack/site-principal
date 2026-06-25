"use client";

import { useEffect, useState } from "react";

/**
 * Mantém o conteúdo abaixo do hero oculto até a frase de destaque (Blur Text)
 * terminar de aparecer — então o restante do site surge suavemente.
 * Há um fallback por tempo para garantir que sempre apareça.
 */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reveal = () => setShown(true);
    window.addEventListener("lagos-hero-revealed", reveal);
    const fallback = window.setTimeout(reveal, 2800);
    return () => {
      window.removeEventListener("lagos-hero-revealed", reveal);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(24px)" }}
    >
      {children}
    </div>
  );
}
