import { NextResponse } from "next/server";
import { LEAD_EMAIL, SITE_URL } from "@/app/lib/contact";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Novo Lead Recebido:", data);

    // Origem real do site (para o FormSubmit aceitar a requisição do servidor).
    const reqUrl = new URL(request.url);
    const origin = request.headers.get("origin") || `${reqUrl.protocol}//${reqUrl.host}`;
    const referer = origin.includes("localhost") ? SITE_URL : origin;

    // 1) E-mail do lead via FormSubmit (server-side, sem CORS).
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(LEAD_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: referer,
          Origin: referer,
        },
        body: JSON.stringify({
          _subject: `Novo lead do site: ${data.nome || "sem nome"}`,
          _template: "table",
          Nome: data.nome || "",
          WhatsApp: data.whatsapp || "",
          Instagram: data.instagram || "",
          Segmento: data.segmento || "",
          "Cidade/Estado": data.cidadeEstado || "",
          "Faturamento mensal": data.faturamento || "",
          "Pode investir a partir de R$ 1.500/mês": data.investimento || "",
          Site: data.site || "(não informado)",
          utm_source: data.utm_source || "",
          utm_campaign: data.utm_campaign || "",
          pagina_origem: data.pagina_origem || "",
          data_hora: data.data_hora || "",
        }),
      });
    } catch (err) {
      console.error("Falha ao enviar o e-mail do lead:", err);
    }

    // 2) Webhook opcional (planilha/CRM) se LEAD_WEBHOOK_URL estiver definida.
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

    return NextResponse.json({ success: true, message: "Lead recebido com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar lead:", error);
    return NextResponse.json({ success: false, error: "Erro ao processar a requisição." }, { status: 500 });
  }
}
