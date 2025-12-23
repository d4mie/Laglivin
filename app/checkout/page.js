import CheckoutForm from "../../components/CheckoutForm";
import Watermark from "../../components/Watermark";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Checkout • Laglivin",
};

export default function CheckoutPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />
      <CheckoutForm />
      <Footer />
    </main>
  );
}


