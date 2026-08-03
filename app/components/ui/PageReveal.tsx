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

  // `transition-all` fazia o navegador vigiar TODAS as propriedades animáveis de
  // um elemento que embrulha o site inteiro. E manter um `transform` aqui obriga
  // a página toda a virar uma única camada gigante de composição. Por isso a
  // transição é explícita e o transform some assim que a revelação termina.
  return (
    <div
      className="transition-[opacity,transform] duration-700 ease-out"
      style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)" }}
    >
      {children}
    </div>
  );
}
