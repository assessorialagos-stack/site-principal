"use client";

import { useState, useEffect } from "react";

/**
 * true apenas em telas grandes com ponteiro fino (desktop com mouse).
 * Começa false (SSR/mobile) e ativa no mount — evita rodar efeitos pesados no celular.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
