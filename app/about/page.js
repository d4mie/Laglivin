import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Watermark from "../../components/Watermark";

export const metadata = {
  title: "About • Laglivin",
};

export default function AboutPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={0} />
      <NavBar />
      <div className="pt-16" />

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Laglivin is a curated gallery of objects and stories.
        </p>
      </section>

      <Footer />
    </main>
  );
}

