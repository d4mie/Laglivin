import ProductCard from "./ProductCard";
import Watermark from "./Watermark";

export default function ProductGrid({ products = [] }) {
  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-amber-400 bg-black py-16 text-white"
    >
      <Watermark />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.slug ?? index} {...product} />
        ))}
      </div>
    </section>
  );
}

