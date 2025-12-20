-- Run this once in Vercel Postgres (Storage → Postgres → Query)
-- Creates an orders table to store Paystack checkout metadata + status.

CREATE TABLE IF NOT EXISTS orders (
  reference TEXT PRIMARY KEY,
  status TEXT,
  email TEXT,
  amount_kobo BIGINT,
  currency TEXT,
  metadata JSONB,
  paystack JSONB,
  created_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  webhook_last_event TEXT,
  webhook_last_received_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_verified_at_idx ON orders (verified_at DESC);

