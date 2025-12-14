import Watermark from "./Watermark";

export default function NavBar({ cartCount = 0 }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 overflow-hidden bg-black">
      <Watermark />
      <nav className="relative z-10 flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12 text-white">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Lag Livin logo"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </a>

        <button
          className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-white transition hover:opacity-80"
          aria-label="Open cart"
        >
          <img
            src="/cart.png"
            alt="Cart icon"
            className="h-6 w-6 object-contain sm:h-7 sm:w-7"
          />
          <span className="flex h-5 w-5 items-center justify-center text-[11px] font-semibold text-amber-400">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  );
}

