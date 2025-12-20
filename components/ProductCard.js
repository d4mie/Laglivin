"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProductCard({
  slug,
  image,
  hoverImage,
  title,
  price,
  tag,
}) {
  const [showAlt, setShowAlt] = useState(false);
  const cardRef = useRef(null);
  const pointerPosRef = useRef({ x: -1, y: -1 });
  const wheelTimerRef = useRef(null);

  useEffect(() => {
    if (!hoverImage) return;
    const onPointerMove = (e) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [hoverImage]);

  useEffect(() => {
    if (!hoverImage) return;
    const isPointerInside = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const { x, y } = pointerPosRef.current;
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };
    const onWheel = () => {
      if (!isPointerInside(cardRef.current)) return;
      setShowAlt(true);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => setShowAlt(false), 900);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
    };
  }, [hoverImage]);

  return (
    <Link
      href={`/products/${slug}`}
      className="group block h-full rounded-2xl bg-white/80 text-black shadow-subtle ring-1 ring-neutral-200/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg hover:ring-neutral-300"
    >
      <article
        ref={cardRef}
        onPointerEnter={() => hoverImage && setShowAlt(true)}
        onPointerLeave={() => hoverImage && setShowAlt(false)}
        className="flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative h-72 overflow-hidden bg-neutral-100">
          <img
            src={showAlt && hoverImage ? hoverImage : image}
            alt={title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          {tag ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700 shadow-sm">
              {tag}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Get Laglivin
          </p>
          <h3 className="text-sm font-semibold leading-snug text-neutral-900">
            {title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-sm font-semibold text-neutral-800">
            <span>{price}</span>
            <span className="text-[13px] font-semibold text-neutral-600 transition group-hover:text-neutral-900">
              View
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}


