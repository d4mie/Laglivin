import NavBar from "../components/NavBar";
import EventBanner from "../components/EventBanner";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <NavBar />
      <EventBanner />
      <Hero />
      <ProductGrid products={products} />
      <Footer />
    </main>
  );
}

