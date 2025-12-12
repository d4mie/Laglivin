import Watermark from "./Watermark";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#6d6d6d] text-white"
      role="contentinfo"
    >
      <div className="relative overflow-hidden border-b border-amber-400 bg-black text-white">
        <Watermark />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-5">
          <div>
            <h4 className="font-semibold uppercase tracking-[0.16em]">
              Community
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>
                <a
                  href="https://www.instagram.com/lagliviin?igsh=MTJrdWV2NXl2azQ1ZQ=="
                  className="hover:text-amber-300 transition"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/laglivin?s=21"
                  className="hover:text-amber-300 transition"
                >
                  X
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-[0.16em]">
              Country/Region
            </h4>
            <select className="mt-3 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800">
              <option>Nigerian Naira ₦</option>
              <option>USD $</option>
              <option>GBP £</option>
            </select>
          </div>

          <div />
        </div>
      </div>

      <div className="relative overflow-hidden bg-neutral-950 px-6 py-4 text-center text-xs text-neutral-200">
        <Watermark />
        Design and Development by{" "}
        <a
          href="https://damilolaogunnaike.com"
          className="font-semibold text-white transition hover:text-amber-300"
        >
          Ogunnaike Damilola
        </a>
      </div>
    </footer>
  );
}

