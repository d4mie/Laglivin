import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <NavBar />
      <Hero />
      <ProductGrid products={products} />
      <Footer />
    </main>
  );
}

