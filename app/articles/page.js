import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Watermark from "../../components/Watermark";
import Link from "next/link";
import { listWpPosts, stripHtml } from "../../lib/wordpress";

export const metadata = {
  title: "Articles • Laglivin",
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  let posts = [];
  let error = "";
  try {
    posts = await listWpPosts({ perPage: 20, page: 1 });
  } catch (e) {
    error = e?.message || "Unable to load articles right now.";
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="fixed inset-0 z-0 opacity-10" lines={40} />
      <NavBar />
      <div className="pt-16" />

      <section className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Articles</h1>
          </div>
        </div>

        {error ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const featured = p?.jetpack_featured_media_url || "";
            const title = p?.title?.rendered || "Untitled";
            const excerpt = stripHtml(p?.excerpt?.rendered || "");
            return (
              <Link
                key={p.id}
                href={`/articles/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                <div className="relative h-52 overflow-hidden bg-black/30">
                  {featured ? (
                    <img
                      src={featured}
                      alt={stripHtml(title)}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    {p?.date ? new Date(p.date).toLocaleDateString() : ""}
                  </p>
                  <h2
                    className="mt-2 text-lg font-semibold text-white"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  {excerpt ? (
                    <p className="mt-2 text-sm text-white/70 line-clamp-3">
                      {excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}

          {posts.length === 0 && !error ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              No articles yet.
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}

