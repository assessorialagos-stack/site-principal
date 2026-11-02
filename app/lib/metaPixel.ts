// ID do pixel da Meta. É público (aparece no código da página), então pode
// ficar aqui. O token da API de Conversões NÃO: ele fica só na Vercel
// (META_CAPI_TOKEN) e é lido apenas no servidor, em app/lib/metaCapi.ts.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "2236261557301574";

type Fbq = (...args: unknown[]) => void;

/** Dispara um evento do pixel no navegador, com eventID para deduplicar com o servidor. */
export function trackPixel(event: string, eventId: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params, { eventID: eventId });
}

/** Identificador único do evento, compartilhado entre navegador e servidor. */
export function newEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
