import { sql } from "@vercel/postgres";

// Neon/Vercel integrations often provide DATABASE_URL; @vercel/postgres expects POSTGRES_URL.
if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_URL = process.env.DATABASE_URL;
}

export async function upsertOrder(reference, patch) {
  if (!reference) throw new Error("upsertOrder: reference required");
  const data = patch || {};

  await sql`
    INSERT INTO orders (
      reference,
      status,
      email,
      amount_kobo,
      currency,
      metadata,
      paystack,
      created_at,
      verified_at,
      webhook_last_event,
      webhook_last_received_at
    ) VALUES (
      ${reference},
      ${data.status || null},
      ${data.email || null},
      ${data.amountKobo ?? null},
      ${data.currency || null},
      ${data.metadata ? JSON.stringify(data.metadata) : null}::jsonb,
      ${data.paystack ? JSON.stringify(data.paystack) : null}::jsonb,
      ${data.createdAt || null},
      ${data.verifiedAt || null},
      ${data.webhookLastEvent || null},
      ${data.webhookLastReceivedAt || null}
    )
    ON CONFLICT (reference) DO UPDATE SET
      status = COALESCE(EXCLUDED.status, orders.status),
      email = COALESCE(EXCLUDED.email, orders.email),
      amount_kobo = COALESCE(EXCLUDED.amount_kobo, orders.amount_kobo),
      currency = COALESCE(EXCLUDED.currency, orders.currency),
      metadata = COALESCE(EXCLUDED.metadata, orders.metadata),
      paystack = COALESCE(EXCLUDED.paystack, orders.paystack),
      created_at = COALESCE(EXCLUDED.created_at, orders.created_at),
      verified_at = COALESCE(EXCLUDED.verified_at, orders.verified_at),
      webhook_last_event = COALESCE(EXCLUDED.webhook_last_event, orders.webhook_last_event),
      webhook_last_received_at = COALESCE(EXCLUDED.webhook_last_received_at, orders.webhook_last_received_at)
  `;
}

export async function listOrders({ limit = 200 } = {}) {
  const lim = Math.max(1, Math.min(1000, Number(limit) || 200));
  const { rows } = await sql`
    SELECT
      reference,
      status,
      email,
      amount_kobo,
      currency,
      metadata,
      paystack,
      created_at,
      verified_at,
      webhook_last_event,
      webhook_last_received_at
    FROM orders
    ORDER BY COALESCE(created_at, verified_at) DESC NULLS LAST
    LIMIT ${lim}
  `;
  return rows;
}

export async function getOrder(reference) {
  const { rows } = await sql`
    SELECT
      reference,
      status,
      email,
      amount_kobo,
      currency,
      metadata,
      paystack,
      created_at,
      verified_at,
      webhook_last_event,
      webhook_last_received_at
    FROM orders
    WHERE reference = ${reference}
    LIMIT 1
  `;
  return rows[0] || null;
}


