import { notFound } from "next/navigation";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Watermark from "../../../components/Watermark";
import { getPostBySlug } from "../../../lib/blogRepo";

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) return notFound();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />

      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.18em] text-white/60">
          {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
        ) : null}

        <div
          className="prose prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <Footer />
    </main>
  );
}

