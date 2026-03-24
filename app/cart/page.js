import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Watermark from "../../components/Watermark";
import CartPage from "../../components/CartPage";

export const metadata = {
  title: "Cart • Laglivin",
};

export default function Cart() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark lines={0} />
      <NavBar />
      <div className="pt-16" />
      <CartPage />
      <Footer />
    </main>
  );
}


