import Watermark from "./Watermark";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <Watermark />

      <div className="relative z-10 flex flex-col items-center gap-10 pt-16">
        <div className="overflow-hidden rounded-lg shadow-2xl ring-4 ring-black/10">
          <img
            src="/Laglivin%20cover.png"
            alt="Laglivin cover"
            className="block h-[70vh] w-auto max-w-[520px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

