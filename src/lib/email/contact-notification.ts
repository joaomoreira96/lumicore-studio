const CONTACT_SUBJECT = "LUMICORE-STUDIO : PEDIDO DE CONTACTO";

type ContactPayload = {
  name: string;
  email: string;
  company: string | null;
  message: string;
};

function formatContactBody({ name, email, company, message }: ContactPayload): string {
  const lines = [`Nome: ${name}`, `Email: ${email}`];
  if (company) lines.push(`Empresa: ${company}`);
  lines.push("", "Mensagem:", message);
  return lines.join("\n");
}

export async function sendContactNotification(
  to: string,
  payload: ContactPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const from =
    process.env.RESEND_FROM?.trim() || "Lumicore Studio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: CONTACT_SUBJECT,
      text: formatContactBody(payload),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      ok: false,
      error: `Resend ${response.status}: ${body || response.statusText}`,
    };
  }

  return { ok: true };
}
