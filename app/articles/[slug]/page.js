import { notFound } from "next/navigation";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import { getWpAuthorName, getWpPostBySlug, stripHtml } from "../../../lib/wordpress";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }) {
  const post = await getWpPostBySlug(params.slug).catch(() => null);
  if (!post || post?.status !== "publish") return notFound();

  const title = post?.title?.rendered || "Untitled";
  const authorName = getWpAuthorName(post);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <NavBar />
      <div className="pt-16" />

      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-white/50">
          <span>{post?.date ? new Date(post.date).toLocaleDateString() : ""}</span>
          {authorName ? <span>•</span> : null}
          {authorName ? <span>By {authorName}</span> : null}
        </div>
        <h1
          className="mt-3 text-3xl font-semibold"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {post?.jetpack_featured_media_url ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <img
              src={post.jetpack_featured_media_url}
              alt={stripHtml(title)}
              className="w-full object-cover"
            />
          </div>
        ) : null}

        <div
          className="prose prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: post?.content?.rendered || "" }}
        />
      </article>

      <Footer />
    </main>
  );
}

