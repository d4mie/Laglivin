const BACKDROP_LINES = Array.from({ length: 10 }, () => "NO LABELS");

export default function Watermark({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 opacity-25 pointer-events-none ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0">
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
  );
}


