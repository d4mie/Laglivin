import Image from "next/image";
import Watermark from "./Watermark";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <Watermark />

      <div className="relative z-10 flex flex-col items-center gap-10 pt-16">
        <div className="relative h-[70vh] w-auto max-w-[520px] overflow-hidden rounded-lg shadow-2xl ring-4 ring-black/10">
          <Image
            src="/Laglivin cover.png"
            alt="Laglivin cover"
            width={520}
            height={780}
            priority
            quality={85}
            sizes="(max-width: 520px) 100vw, 520px"
            className="block h-[70vh] w-auto max-w-[520px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

