import { NextResponse } from "next/server";

export const runtime = "nodejs";

function badRequest(message) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function GET(req) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing PAYSTACK_SECRET_KEY" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const reference = (searchParams.get("reference") || "").trim();
  if (!reference) return badRequest("reference is required");

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(
      reference
    )}`,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
      cache: "no-store",
    }
  );

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.status) {
    return NextResponse.json(
      {
        ok: false,
        error:
          json?.message || `Paystack verify failed (HTTP ${res.status})`,
        details: json,
      },
      { status: 502 }
    );
  }

  // Paystack: data.status can be 'success', 'failed', 'abandoned'
  return NextResponse.json({ ok: true, data: json.data });
}


