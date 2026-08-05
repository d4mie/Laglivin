import NavBar from "./NavBar";
import Footer from "./Footer";
import Watermark from "./Watermark";

export default function PolicyPage({ title, children }) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />

      <section className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/70">
          {children}
        </div>
      </section>

      <Footer />
    </main>
  );
}
