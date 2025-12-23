import Link from "next/link";
import { headers } from "next/headers";

async function verify(reference) {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || "http";
  const baseUrl =
    host
      ? `${proto}://${host}`
      : process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";

  try {
    const res = await fetch(
      `${baseUrl}/api/paystack/verify?reference=${encodeURIComponent(
        reference
      )}`,
      { cache: "no-store" }
    );
    const json = await res.json().catch(() => null);
    return json || { ok: false, error: "Unable to read verification response." };
  } catch (e) {
    return {
      ok: false,
      error: "Unable to call verification endpoint.",
      details: `${e?.message || e}`,
    };
  }
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const reference = searchParams?.reference;

  if (!reference) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-white">
        <h1 className="text-2xl font-semibold">Payment status</h1>
        <p className="mt-2 text-white/70">Missing Paystack reference.</p>
        <Link
          href="/checkout"
          className="mt-6 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
        >
          Back to checkout
        </Link>
      </main>
    );
  }

  const result = await verify(reference);
  const status = result?.data?.status;

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-white">
      <h1 className="text-2xl font-semibold">Payment status</h1>
      <p className="mt-2 text-white/70">
        Reference: <span className="text-white">{reference}</span>
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-white/70">Status</p>
        <p className="mt-1 text-lg font-semibold text-white">
          {status || (result?.ok ? "unknown" : "error")}
        </p>
        {!result?.ok ? (
          <p className="mt-3 text-sm text-red-300">
            {result?.error || "Unable to verify payment right now."}
          </p>
        ) : null}
      </div>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
        >
          Home
        </Link>
        <Link
          href="/checkout"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to checkout
        </Link>
      </div>
    </main>
  );
}


