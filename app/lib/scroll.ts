type LenisLike = { scrollTo: (target: Element | string | number, opts?: { offset?: number }) => void };

/**
 * Rola suavemente até o seletor. Usa o Lenis (smooth scroll) se estiver ativo;
 * senão, cai no scrollIntoview nativo.
 */
export function smoothScrollTo(selector: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(selector);
  if (!el) return;
  const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
