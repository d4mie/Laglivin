"use client";

import { useEffect, useMemo, useState } from "react";

const EVENT_END = new Date(2026, 3, 25, 13, 0, 0, 0);

function pad(n) {
  return String(n).padStart(2, "0");
}

function getParts(ms) {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: false };
}

export default function EventBanner() {
  const target = useMemo(() => EVENT_END.getTime(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds, done } = getParts(target - now);

  return (
    <section
      className="relative z-20 isolate overflow-hidden border-b border-white/10 pt-16 text-white"
      aria-label="Upcoming Laglivin event"
    >
      <img
        src="/IMG_1391.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/35 sm:via-black/65 sm:to-black/25"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[min(52vh,560px)] max-w-6xl flex-col justify-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[min(48vh,520px)] lg:px-12">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
            Laglivin · April 25
          </p>
          <h2 className="mt-2 font-semibold tracking-tight text-2xl sm:text-3xl">
            Join us tomorrow at 1:00 PM
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/85">
            Live countdown to doors — EPISODES, from Lagos with love.
          </p>
        </div>

        {done ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
            We are live — see you there
          </p>
        ) : (
          <div
            className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
          >
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-white/20 bg-black/55 px-3 py-3 text-center shadow-lg backdrop-blur-sm sm:px-4 sm:py-4"
              >
                <div className="font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  {label === "Days" ? value : pad(value)}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
