type Env = {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_EMAIL_API_TOKEN?: string;
  QUOTE_FROM_EMAIL?: string;
  QUOTE_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type QuotePayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  comments?: unknown;
  company?: unknown;
  "cf-turnstile-response"?: unknown;
};

const projectTypes = new Set([
  "Barndominium or home",
  "Shop or garage",
  "Farm or ag building",
  "Commercial building",
  "Storage or horse barn",
  "Not sure yet",
]);

// Human-friendly quote reference: MMDDYYYY-NNNN (e.g. 07092026-2342).
// Date for at-a-glance sorting, four random digits to keep it unique.
export function generateReference(now: Date = new Date()): string {
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const yyyy = now.getFullYear();
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `${mm}${dd}${yyyy}-${random}`;
}

// QUOTE_TO_EMAIL may be a single address or a comma-separated list. Returns a
// clean array of recipients, falling back to the default if none are set.
// NOTE: on the routing-only (free) setup, every recipient must be a verified
// destination address in Email Routing, or the send fails.
export function parseRecipients(value: string | undefined, fallback: string): string[] {
  const recipients = (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  return recipients.length > 0 ? recipients : [fallback];
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const payload = (await context.request.json()) as QuotePayload;

    if (asString(payload.company)) {
      return json({ ok: true });
    }

    const quote = validateQuote(payload);
    const turnstile = asString(payload["cf-turnstile-response"]);

    if (context.env.TURNSTILE_SECRET_KEY) {
      const verified = await verifyTurnstile(
        context.env.TURNSTILE_SECRET_KEY,
        turnstile,
        context.request.headers.get("CF-Connecting-IP") || undefined,
      );

      if (!verified) {
        return json({ error: "Bot verification failed. Please try again." }, 400);
      }
    }

    const reference = generateReference();
    await sendQuoteEmail(context.env, quote, reference);
    return json({ ok: true, reference });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send quote request.";
    const status = message.startsWith("Missing") || message.startsWith("Invalid") ? 400 : 500;
    return json({ error: message }, status);
  }
}

export function onRequest(): Response {
  return json({ error: "Method not allowed." }, 405, {
    Allow: "POST",
  });
}

function validateQuote(payload: QuotePayload) {
  const name = requiredString(payload.name, "name", 120);
  const email = requiredString(payload.email, "email", 180);
  const phone = requiredString(payload.phone, "phone", 60);
  const projectType = requiredString(payload.projectType, "project type", 80);
  const comments = optionalString(payload.comments, 2000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  if (!projectTypes.has(projectType)) {
    throw new Error("Invalid project type.");
  }

  return { name, email, phone, projectType, comments };
}

async function verifyTurnstile(secret: string, token: string, remoteIp?: string) {
  if (!token) return false;

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

async function sendQuoteEmail(
  env: Env,
  quote: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    comments: string;
  },
  reference: string,
) {
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_API_TOKEN;
  const to = parseRecipients(env.QUOTE_TO_EMAIL, "chrisgrossconstruction@gmail.com");
  const from = env.QUOTE_FROM_EMAIL;

  if (!accountId || !token || !from) {
    throw new Error("Quote email is not configured.");
  }

  const subject = `Quote ${reference} from ${quote.name}`;
  const text = [
    "New quote request from chrisgrossconstruction.com",
    `Quote #: ${reference}`,
    "",
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone}`,
    `Project type: ${quote.projectType}`,
    "",
    "Comments:",
    quote.comments || "(none provided)",
  ].join("\n");

  const html = `
    <h2>New quote request — ${escapeHtml(reference)}</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      ${row("Quote #", reference)}
      ${row("Name", quote.name)}
      ${row("Email", quote.email)}
      ${row("Phone", quote.phone)}
      ${row("Project type", quote.projectType)}
    </table>
    <h3>Comments</h3>
    <p>${escapeHtml(quote.comments || "(none provided)").replace(/\n/g, "<br>")}</p>
  `;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        from,
        reply_to: quote.email,
        subject,
        text,
        html,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to send quote request.");
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <th align="left" style="border-bottom:1px solid #ddd">${escapeHtml(label)}</th>
      <td style="border-bottom:1px solid #ddd">${escapeHtml(value)}</td>
    </tr>
  `;
}

function requiredString(value: unknown, label: string, maxLength: number) {
  const result = asString(value).trim();
  if (!result) throw new Error(`Missing ${label}.`);
  if (result.length > maxLength) throw new Error(`Invalid ${label}.`);
  return result;
}

function optionalString(value: unknown, maxLength: number) {
  const result = asString(value).trim();
  if (result.length > maxLength) throw new Error("Invalid comments.");
  return result;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers,
  });
}
