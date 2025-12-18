"use client";

import { useMemo } from "react";
import { useCart } from "./CartContext";
import Watermark from "./Watermark";
import Link from "next/link";

function formatPriceNaira(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return value;
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
}

function parsePriceToNumber(price) {
  if (typeof price !== "string") return Number(price) || 0;
  const numeric = Number(price.replace(/[^\d.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    setQuantity,
  } = useCart();

  const isEmpty = items.length === 0;

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + parsePriceToNumber(item.price) * item.quantity,
        0
      ),
    [items]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <div className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-hidden bg-black text-white shadow-2xl ring-1 ring-white/10">
        <Watermark className="opacity-15" />
        <div
          className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4"
        >
          <Link
            href="/cart"
            onClick={closeCart}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 hover:text-white"
          >
            View Full Cart
          </Link>
          <button
            onClick={closeCart}
            aria-label="Close cart drawer"
            className="text-xl leading-none text-white/70 hover:text-white"
          >
            ×
          </button>
        </div>

        {isEmpty ? (
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 text-center text-sm text-white/70">
            <div className="space-y-3">
              <p>Your cart is empty.</p>
              <Link
                href="/#products"
                onClick={closeCart}
                className="text-amber-300 underline decoration-amber-300/60 decoration-1 underline-offset-4 hover:text-white"
              >
                Return to shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="h-24 w-24 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {item.title}
                      </p>
                      <p className="text-sm font-semibold text-amber-300">
                        {item.price}
                      </p>
                    </div>
                    <button
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white"
                      onClick={() => setQuantity(item.slug, 0)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="relative z-10 border-t border-white/10 bg-white/5 px-6 py-4"
        >
          <div
            className="flex items-center justify-between text-sm font-semibold text-white"
          >
            <span>Subtotal</span>
            <span>{formatPriceNaira(subtotal)}</span>
          </div>
          {isEmpty ? (
            <button
              className="mt-4 w-full cursor-not-allowed rounded-full bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60"
              type="button"
              disabled
            >
              Cart is empty
            </button>
          ) : (
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 block w-full rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-300"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


