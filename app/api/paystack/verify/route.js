import { NextResponse } from "next/server";
import { upsertOrder } from "../../../../lib/ordersRepo";

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

  let res;
  try {
    res = await fetch(
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
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to reach Paystack to verify this payment. Try again in a moment.",
        details: `${e?.message || e}`,
      },
      { status: 502 }
    );
  }

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
  try {
    await upsertOrder(reference, {
      reference,
      status: json.data?.status || "verified",
      verifiedAt: new Date().toISOString(),
      paystack: json.data,
    });
  } catch (e) {
    // Don't block verification if persistence fails (DB/env not configured yet).
    console.error("Order persistence failed during verify:", e);
  }

  return NextResponse.json({ ok: true, data: json.data });
}


