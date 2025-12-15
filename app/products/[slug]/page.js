import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Watermark from "../../../components/Watermark";
import { products } from "../../../data/products";
import { notFound } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";

export default function ProductPage({ params }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark />
      <NavBar />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}


