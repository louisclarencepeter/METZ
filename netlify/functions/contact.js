const DEFAULT_FROM_ADDRESS = "METZ Website <noreply@metzengineering.co.tz>";
const DEFAULT_TO_ADDRESS = "info@metzengineering.co.tz";
const MAX_FIELD_LENGTH = 5000;

const getEnv = (name) => {
  if (globalThis.Netlify?.env) return globalThis.Netlify.env.get(name);
  return process.env[name];
};

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async (req) => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const service = (payload.service ?? "").trim();
  const message = (payload.message ?? "").trim();
  const honeypot = (payload["bot-field"] ?? "").trim();

  // Silently accept honeypot hits so bots don't learn.
  if (honeypot) return json(200, { ok: true });

  if (!name || !email || !message) {
    return json(400, { error: "Missing required fields" });
  }
  if (!isEmail(email)) {
    return json(400, { error: "Invalid email" });
  }
  if (
    [name, email, phone, service, message].some(
      (v) => v.length > MAX_FIELD_LENGTH,
    )
  ) {
    return json(400, { error: "Field too long" });
  }

  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json(500, { error: "Email service not configured" });
  }

  const fromAddress = getEnv("CONTACT_FROM") || DEFAULT_FROM_ADDRESS;
  const toAddress = getEnv("CONTACT_TO") || DEFAULT_TO_ADDRESS;
  const subject = `New website inquiry — ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    service ? `Service: ${service}` : null,
    "",
    "Message:",
    message,
  ].filter((line) => line !== null);
  const text = lines.join("\n");

  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: toAddress,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend error", response.status, detail);
    return json(502, { error: "Failed to send email" });
  }

  return json(200, { ok: true });
};

export const config = {
  path: "/api/contact",
  method: ["POST"],
};
