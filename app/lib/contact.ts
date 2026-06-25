// ── Contato da Lagos ────────────────────────────────────────────────────────
// FONTE ÚNICA do número de WhatsApp. Troque AQUI (um lugar só) e o número muda
// no site inteiro: botão flutuante, header, footer, hero, formulário, etc.
//
// Formato internacional, SÓ DÍGITOS: 55 (Brasil) + DDD + número.
// Ex.: (14) 99123-4567  ->  "5514991234567"
//
// Número real da Lagos (DDD 41).
export const WHATSAPP_NUMBER = "5541996409408";

// Como o número aparece escrito na tela (ex.: no rodapé).
export const WHATSAPP_DISPLAY = "(41) 99640-9408";

/** Monta um link wa.me, opcionalmente com uma mensagem pré-preenchida. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// ── Recebimento dos leads por e-mail ─────────────────────────────────────────
// Os formulários chegam neste e-mail (enviados pelo servidor via FormSubmit).
export const LEAD_EMAIL = "suporte@assessorialagos.com.br";

// URL pública do site (fallback usado pelo servidor ao falar com o FormSubmit).
export const SITE_URL = "https://lagos-site.vercel.app";
