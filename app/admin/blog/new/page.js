import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";
import Watermark from "../../../../components/Watermark";
import BlogEditor from "../../../../components/BlogEditor";
import { createPost, slugify } from "../../../../lib/blogRepo";

export const metadata = {
  title: "New Blog Post • Admin",
};

export default function NewBlogPostPage() {
  async function createPostAction(payload) {
    "use server";
    const title = (payload?.title || "").trim();
    const slug = slugify(payload?.slug || title);
    const excerpt = (payload?.excerpt || "").trim();
    const html = String(payload?.html || "");
    const published = !!payload?.published;

    if (!title) throw new Error("Title is required");
    if (!slug) throw new Error("Slug is required");
    if (!html || html === "<p></p>") throw new Error("Post content is required");

    return await createPost({ title, slug, excerpt, html, published });
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <Watermark className="opacity-20" lines={40} />
      <NavBar />
      <div className="pt-16" />
      <BlogEditor createPostAction={createPostAction} />
      <Footer />
    </main>
  );
}

