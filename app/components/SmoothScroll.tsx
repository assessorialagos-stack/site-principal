"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll (rolagem suave com leve inércia) estilo cal.com, via Lenis.
 * Desligado para quem prefere menos movimento. Expõe a instância em window.lenis
 * e trata âncoras (#) nativas com rolagem suave.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No celular/tablet (toque) o Lenis briga com o scroll nativo e provoca
    // tremor/flicker ao rolar. Lá deixamos o scroll nativo, que é mais fluido.
    if (window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as unknown as { lenis?: unknown }).lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Âncoras nativas (#) que não têm handler próprio → rolagem suave
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const anchor = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { lenis?: unknown }).lenis = undefined;
    };
  }, []);

  return null;
}
