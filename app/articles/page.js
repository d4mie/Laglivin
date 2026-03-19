import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Watermark from "../../components/Watermark";

export const metadata = {
  title: "Articles • Laglivin",
};

export default function ArticlesPage() {
  const wpUrl = "https://folahanmionajoko-msihv.wordpress.com/";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Articles</h1>
            <p className="mt-2 text-sm text-white/60">
              Embedded from WordPress.
            </p>
          </div>
          <Link
            href={wpUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-white/25"
          >
            Open in new tab
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            title="Laglivin Articles (WordPress)"
            src={wpUrl}
            className="h-[80vh] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-4 text-xs text-white/50">
          If the embed shows a blank page or redirects back to Laglivin, WordPress
          is likely redirecting your domain or blocking iframes. In that case,
          use a separate blog domain/subdomain (e.g. <span className="text-white">blog.laglivin.com</span>)
          or switch to WordPress as a headless CMS.
        </p>
      </section>

      <Footer />
    </main>
  );
}

