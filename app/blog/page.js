import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Watermark from "../../components/Watermark";
import { listPosts } from "../../lib/blogRepo";

export const metadata = {
  title: "Blog • Laglivin",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await listPosts({ limit: 100 });

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />

      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="mt-2 text-sm text-white/60">
          Updates, stories, and releases.
        </p>

        <div className="mt-10 grid gap-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                {p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{p.title}</h2>
              {p.excerpt ? (
                <p className="mt-2 text-sm text-white/70">{p.excerpt}</p>
              ) : null}
            </Link>
          ))}
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              No blog posts yet.
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}

