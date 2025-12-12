const BACKDROP_LINES = Array.from({ length: 10 }, () => "NO LABELS");

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0" aria-hidden>
          {BACKDROP_LINES.map((line, idx) => (
            <div
              key={idx}
              className="watermark-line whitespace-nowrap text-center text-[9vw] font-semibold uppercase tracking-[0.08em] text-white/30"
              style={{
                position: "absolute",
                top: `${idx * 12}vh`,
                left: "-25vw",
                animationDuration: "20s",
                animationDelay: `${idx * 0.5}s`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 noise" />
      </div>

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

