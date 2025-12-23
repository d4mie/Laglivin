import { NextResponse } from "next/server";
import { upsertOrder } from "../../../../lib/ordersRepo";

export const runtime = "nodejs";

function badRequest(message) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

function normalizeSiteUrl(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  // If user provided host without scheme, guess based on localhost vs public host.
  if (value.includes("localhost") || value.includes("127.0.0.1")) {
    return `http://${value}`;
  }
  return `https://${value}`;
}

export async function POST(req) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing PAYSTACK_SECRET_KEY" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const amountKobo = Number(body?.amountKobo);
  const metadata = body?.metadata ?? {};

  if (!email || !email.includes("@")) return badRequest("Email is required");
  if (!Number.isFinite(amountKobo) || amountKobo < 100)
    return badRequest("amountKobo must be a number >= 100");

  const originRaw =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || req.headers.get("origin") || "";
  const origin = normalizeSiteUrl(originRaw) || "http://localhost:3000";
  const callback_url = `${origin.replace(/\/+$/, "")}/checkout/success`;

  // Paystack live payments should use a real public https URL (not localhost).
  if (
    secret.startsWith("sk_live") &&
    (callback_url.startsWith("http://") ||
      callback_url.includes("localhost") ||
      callback_url.includes("127.0.0.1"))
  ) {
    return badRequest(
      "You are using a LIVE Paystack key on a non-https/localhost callback URL. Use a TEST key for local dev, or set NEXT_PUBLIC_SITE_URL to your live https domain (e.g. https://laglivin.com)."
    );
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amountKobo),
      currency: "NGN",
      callback_url,
      metadata,
    }),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.status) {
    return NextResponse.json(
      {
        ok: false,
        error:
          json?.message ||
          `Paystack initialize failed (HTTP ${res.status})`,
        details: json,
      },
      { status: 502 }
    );
  }

  const reference = json.data?.reference;
  if (reference) {
    await upsertOrder(reference, {
      reference,
      status: "initialized",
      createdAt: new Date().toISOString(),
      email,
      amountKobo: Math.round(amountKobo),
      currency: "NGN",
      metadata,
    });
  }

  return NextResponse.json({
    ok: true,
    authorization_url: json.data?.authorization_url,
    access_code: json.data?.access_code,
    reference,
  });
}


