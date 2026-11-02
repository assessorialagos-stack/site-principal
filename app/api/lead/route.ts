import { NextResponse } from "next/server";
import { LEAD_EMAIL, SITE_URL } from "@/app/lib/contact";
import { sendLeadToMeta } from "@/app/lib/metaCapi";

// ── Envio dos leads por e-mail (FormSubmit) ──────────────────────────────────
// Docs: https://formsubmit.co/documentation  •  https://formsubmit.co/ajax-documentation
//
// O que a documentação exige e faltava aqui:
//
//  1. ATIVAÇÃO — o 1º envio dispara um e-mail com o botão "Activate Form".
//     Enquanto ninguém clica, o FormSubmit responde {"success":"false"} e NÃO
//     entrega nada. Antes a gente jogava a resposta fora, então esse erro ficou
//     invisível. Agora a resposta é lida, logada e devolvida ao navegador.
//
//  2. _captcha=false — sem isso o reCAPTCHA barra envios feitos por AJAX/API
//     (o formulário só passaria se o usuário resolvesse o desafio na tela).
//
//  3. _url — os navegadores modernos usam "strict-origin-when-cross-origin" e
//     não mandam mais a URL completa. O FAQ manda enviar a URL do formulário
//     neste campo (também é o que resolve o erro "Unable to submit form").
//
//  4. _template=table — e-mail em tabela, legível.
//
// Variáveis de ambiente opcionais (Vercel → Settings → Environment Variables):
//   FORMSUBMIT_ID    — a "random string" que vem no e-mail de ativação.
//                      Usar ela esconde o endereço de e-mail ("Invisible emails").
//   LEAD_CC          — e-mail(s) que recebem cópia (separados por vírgula).
//   LEAD_WEBHOOK_URL — encaminha o lead cru para planilha/CRM.

const FORMSUBMIT_ENDPOINT = process.env.FORMSUBMIT_ID?.trim() || LEAD_EMAIL;
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_ENDPOINT)}`;

type FormSubmitReply = { success?: string | boolean; message?: string };

type Attempt = {
  encoding: "json" | "form";
  ok: boolean;
  status: number;
  message: string;
};

/** Faz um POST no FormSubmit e INTERPRETA a resposta (que antes era ignorada). */
async function postToFormSubmit(
  fields: Record<string, string>,
  encoding: "json" | "form",
  referer: string,
): Promise<Attempt> {
  // O FormSubmit identifica o formulário pela origem. Como quem envia aqui é o
  // servidor (e não o navegador do visitante), declaramos a origem real do site.
  const headers: Record<string, string> = {
    Accept: "application/json",
    Origin: referer,
    Referer: `${referer}/`,
  };

  let body: string;
  if (encoding === "json") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(fields);
  } else {
    // Mesmo formato que um <form> HTML comum manda — plano B quando o JSON falha.
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(fields).toString();
  }

  try {
    const res = await fetch(FORMSUBMIT_URL, { method: "POST", headers, body, cache: "no-store" });
    const text = await res.text();

    let reply: FormSubmitReply | null = null;
    try {
      reply = JSON.parse(text) as FormSubmitReply;
    } catch {
      // Veio HTML (página de erro / desafio de captcha) em vez de JSON.
    }

    const ok = res.ok && String(reply?.success) === "true";
    const message = reply?.message ?? text.slice(0, 300);
    return { encoding, ok, status: res.status, message };
  } catch (err) {
    return { encoding, ok: false, status: 0, message: String(err) };
  }
}

function formatarDataHora(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return iso || "";
  return d.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido." }, { status: 400 });
  }

  // Honeypot (_honey na documentação): campo escondido que só um bot preenche.
  if (data._honey) {
    return NextResponse.json({ success: true, emailSent: false, skipped: "honeypot" });
  }

  // Fica registrado no log da Vercel mesmo que o e-mail falhe — nenhum lead se perde.
  console.log("Novo lead recebido:", JSON.stringify(data));

  // Origem real do site (em dev cai para o domínio de produção).
  const reqUrl = new URL(request.url);
  const origin = request.headers.get("origin") || `${reqUrl.protocol}//${reqUrl.host}`;
  const referer = origin.includes("localhost") ? SITE_URL : origin.replace(/\/$/, "");

  const fields: Record<string, string> = {
    // Campos especiais do FormSubmit (todos documentados).
    _subject: `Novo lead do site: ${data.nome || "sem nome"}`,
    _template: "table",
    _captcha: "false",
    _url: data.pagina_url || `${referer}/#formulario`,
    ...(process.env.LEAD_CC ? { _cc: process.env.LEAD_CC } : {}),

    // Dados do lead (o que aparece na tabela do e-mail).
    Nome: data.nome || "",
    WhatsApp: data.whatsapp || "",
    Instagram: data.instagram || "",
    Segmento: data.segmento || "",
    "Cidade/Estado": data.cidadeEstado || "",
    "Faturamento mensal": data.faturamento || "",
    "Pode investir a partir de R$ 1.500/mês": data.investimento || "",
    Site: data.site || "(não informado)",
    "Data/hora": formatarDataHora(data.data_hora),
    Origem: data.pagina_origem || "/",
    utm_source: data.utm_source || "",
    utm_medium: data.utm_medium || "",
    utm_campaign: data.utm_campaign || "",
    utm_content: data.utm_content || "",
    utm_term: data.utm_term || "",
  };

  // Lead para a Meta pelo servidor (API de Conversões), em paralelo ao e-mail.
  // Mesmo event_id do pixel no navegador, para a Meta contar uma vez só.
  const metaPromise = data.event_id
    ? sendLeadToMeta(request, {
        eventId: data.event_id,
        nome: data.nome,
        whatsapp: data.whatsapp,
        sourceUrl: data.pagina_url,
      })
    : Promise.resolve({ sent: false, reason: "sem event_id" });

  // 1ª tentativa em JSON (formato do /ajax-documentation); se falhar, repete no
  // formato de formulário HTML antes de desistir.
  const attempts: Attempt[] = [];
  let attempt = await postToFormSubmit(fields, "json", referer);
  attempts.push(attempt);
  if (!attempt.ok) {
    attempt = await postToFormSubmit(fields, "form", referer);
    attempts.push(attempt);
  }

  const emailSent = attempts.some((a) => a.ok);
  if (!emailSent) {
    // Erro típico: "This form needs Activation. We've sent you an email
    // containing an 'Activate Form' link." → abrir o e-mail e clicar no botão.
    console.error("FormSubmit não aceitou o lead:", JSON.stringify(attempts));
  }

  // Webhook opcional (planilha/CRM).
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Falha ao encaminhar o lead para o webhook:", err);
    }
  }

  const meta = await metaPromise;

  return NextResponse.json({
    success: true,
    emailSent,
    metaSent: meta.sent,
    formsubmit: attempts[attempts.length - 1]?.message ?? "",
  });
}
