import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the received lead data (for debugging purposes)
    console.log("Novo Lead Recebido:", data);

    // TODO: Integrar com CRM, Planilha do Google, ou ferramenta de E-mail Marketing aqui
    // Exemplo: await fetch('WEBHOOK_URL', { method: 'POST', body: JSON.stringify(data) })

    // Simulate a slight network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For now, we just return success so the frontend can redirect to /obrigado
    return NextResponse.json({ success: true, message: "Lead recebido com sucesso." }, { status: 200 });

  } catch (error) {
    console.error("Erro ao processar lead:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao processar a requisição." },
      { status: 500 }
    );
  }
}
