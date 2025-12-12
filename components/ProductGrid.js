import ProductCard from "./ProductCard";
import Watermark from "./Watermark";

export default function ProductGrid({ products = [] }) {
  return (
    <section
      id="products"
      className="relative overflow-hidden border-y border-amber-400 bg-black py-16 text-white"
    >
      <Watermark />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}

