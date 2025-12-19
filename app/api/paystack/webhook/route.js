import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing PAYSTACK_SECRET_KEY" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("x-paystack-signature") || "";
  const rawBody = await req.text();
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");

  if (!signature || signature !== hash) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // IMPORTANT: In a real app, persist this event to your DB and fulfill idempotently.
  const event = JSON.parse(rawBody);
  console.log("Paystack webhook:", event?.event, event?.data?.reference);

  return NextResponse.json({ ok: true });
}


