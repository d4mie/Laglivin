import Link from "next/link";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Watermark from "../../../components/Watermark";
import { listPosts } from "../../../lib/blogRepo";

export const metadata = {
  title: "Blog • Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listPosts({ includeUnpublished: true, limit: 200 });

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={0} />
      <NavBar />
      <div className="pt-16" />

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Blog (Admin)</h1>
            <p className="mt-2 text-sm text-white/60">
              Create and manage blog posts.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
          >
            New post
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-white/60">
                <tr>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {posts.map((p) => (
                  <tr key={p.slug} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white/70">
                      {p.created_at ? new Date(p.created_at).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-white">{p.title}</td>
                    <td className="px-4 py-3 font-mono text-xs text-white/80">
                      <Link className="hover:underline" href={`/blog/${p.slug}`}>
                        {p.slug}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-white/80">
                      {p.published ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
                {posts.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-white/60" colSpan={4}>
                      No posts yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

