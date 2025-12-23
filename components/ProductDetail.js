"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const inc = () => setQuantity((q) => Math.min(99, q + 1));
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    addItem(product, quantity);
  };

  const description =
    product.description ||
    "Laglivin Volume 2: In the Making is a visual story of Lagos and the creators who define its edge.";
  const descriptionMore = product.descriptionMore || "";

  const details =
    product.details ||
    "160 pages of curated visuals, selected cover-star edition, printed on premium stock.";

  return (
    <div className="relative z-10 mx-auto flex-1 w-full max-w-6xl px-6 pb-12 pt-28 lg:grid lg:grid-cols-[1.15fr_1fr_1.05fr] lg:gap-10">
      {/* Left: Info */}
      <div className="space-y-6 border-b border-white/10 pb-8 lg:border-b-0 lg:pb-0">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
            Get Laglivin
          </p>
          <h1 className="text-2xl font-semibold uppercase tracking-[0.12em]">
            {product.title}
          </h1>
          <p className="text-lg font-semibold text-amber-300">{product.price}</p>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-white/80">
          <p>{description}</p>
          {isExpanded && descriptionMore ? (
            <p>{descriptionMore}</p>
          ) : null}
          {descriptionMore ? (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 underline decoration-white/30 decoration-1 underline-offset-4 hover:text-white"
            >
              {isExpanded ? "Read Less" : "Read More"}
          </button>
          ) : null}
        </div>

        <div className="space-y-3 pt-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
            Details
          </p>
          <p className="text-sm text-white/80">{details}</p>
        </div>
      </div>

      {/* Center: Image */}
      <div className="my-10 flex justify-center lg:my-0">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-white/10">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Right: Purchase */}
      <div className="space-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-subtle">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
            Quantity
          </p>
          <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold">
            <button
              type="button"
              onClick={dec}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-base text-white/80 leading-none"
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="min-w-[24px] text-center">{quantity}</span>
            <button
              type="button"
              onClick={inc}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white text-base text-black leading-none"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-300"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}


