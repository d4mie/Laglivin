import ProductCard from "./ProductCard";
import Watermark from "./Watermark";

export default function ProductGrid({ products = [] }) {
  const isFiveGrid = products.length === 5;

  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-amber-400 bg-black py-16 text-white"
    >
      <Watermark />
      {isFiveGrid ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-12">
          {products.map((product, index) => {
            // 3 on top (4/4/4), then 2 centered below (start at col 3 and 7).
            const placement =
              index === 0
                ? "md:col-span-4"
                : index === 1
                  ? "md:col-span-4"
                  : index === 2
                    ? "md:col-span-4"
                    : index === 3
                      ? "md:col-span-4 md:col-start-3"
                      : "md:col-span-4 md:col-start-7";

            return (
              <div key={product.slug ?? index} className={placement}>
                <ProductCard {...product} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.slug ?? index} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}

