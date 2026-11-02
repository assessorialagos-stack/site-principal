import { createHash } from "node:crypto";
import { META_PIXEL_ID } from "@/app/lib/metaPixel";

// ── API de Conversões da Meta (servidor) ─────────────────────────────────────
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   META_CAPI_TOKEN       — token de acesso gerado no Gerenciador de Eventos.
//                           Segredo: nunca usar prefixo NEXT_PUBLIC_.
//   META_TEST_EVENT_CODE  — opcional. Código da aba "Eventos de teste" do
//                           Gerenciador de Eventos. Remover depois de testar.

const GRAPH_VERSION = "v23.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** Telefone no formato da Meta: só dígitos, com DDI 55. */
function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") && digits.length >= 12 ? digits : `55${digits}`;
}

function readCookie(header: string | null, name: string) {
  const match = header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

type LeadInput = {
  eventId: string;
  nome?: string;
  whatsapp?: string;
  sourceUrl?: string;
};

/** Envia o evento Lead para a Meta. Nunca lança erro: falha só vai para o log. */
export async function sendLeadToMeta(request: Request, lead: LeadInput) {
  const token = process.env.META_CAPI_TOKEN?.trim();
  if (!token || !META_PIXEL_ID) return { sent: false, reason: "META_CAPI_TOKEN ausente" };

  // Só o que o formulário realmente coleta: nome e WhatsApp.
  const [first, ...rest] = (lead.nome || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const last = rest.at(-1);
  const phone = normalizePhone(lead.whatsapp || "");

  const cookies = request.headers.get("cookie");
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const user_data: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: request.headers.get("user-agent") || undefined,
    fbp: readCookie(cookies, "_fbp"),
    fbc: readCookie(cookies, "_fbc"),
    ...(phone ? { ph: [sha256(phone)] } : {}),
    ...(first ? { fn: [sha256(first)] } : {}),
    ...(last ? { ln: [sha256(last)] } : {}),
    country: [sha256("br")],
  };

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.sourceUrl,
        user_data,
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );
    const text = await res.text();
    if (!res.ok) {
      console.error("API de Conversões recusou o Lead:", res.status, text.slice(0, 500));
      return { sent: false, reason: text.slice(0, 300) };
    }
    return { sent: true };
  } catch (err) {
    console.error("Falha ao falar com a API de Conversões:", err);
    return { sent: false, reason: String(err) };
  }
}
