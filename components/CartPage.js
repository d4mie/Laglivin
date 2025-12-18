"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "./CartContext";

function parsePriceToNumber(price) {
  if (typeof price !== "string") return Number(price) || 0;
  const numeric = Number(price.replace(/[^\d.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function formatPriceNaira(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return value;
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
}

export default function CartPage() {
  const { items, updateQuantity, setQuantity } = useCart();

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + parsePriceToNumber(item.price) * item.quantity,
        0
      ),
    [items]
  );

  if (items.length === 0) {
    return (
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16 text-center">
        <div className="space-y-4">
          <p className="text-sm text-white/70">Your cart is empty.</p>
          <Link
            href="/#products"
            className="text-sm font-semibold text-amber-300 underline decoration-amber-300/60 decoration-1 underline-offset-4 hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="h-28 w-28 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-amber-300">
                      {item.price}
                    </p>
                  </div>
                  <button
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white"
                    onClick={() => setQuantity(item.slug, 0)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-lg text-white/80 leading-none"
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="min-w-[28px] text-center text-base">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white text-lg text-black leading-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm font-semibold text-white">
                    {formatPriceNaira(
                      parsePriceToNumber(item.price) * item.quantity
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Subtotal
            </p>
            <p className="text-sm font-semibold text-white">
              {formatPriceNaira(subtotal)}
            </p>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-300"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}


