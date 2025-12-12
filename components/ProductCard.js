export default function ProductCard({ image, title, price, tag }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 shadow-subtle ring-1 ring-neutral-200/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg hover:ring-neutral-300 text-black">
      <div className="relative h-72 overflow-hidden bg-neutral-100">
        <img
          src={image}
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
  );
}

