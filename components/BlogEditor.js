"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

function slugifyClient(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['".,!?/\\:;()]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ToolbarButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-blue-500/60 bg-blue-500/15 text-white"
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
      }`}
    >
      {children}
    </button>
  );
}

export default function BlogEditor({ createPostAction }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Keep this editor focused on curated posts only
        codeBlock: false,
        code: false,
        horizontalRule: false,
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your post…",
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "blog-img",
        },
      }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/90 outline-none",
      },
    },
  });

  useEffect(() => {
    if (!title) return;
    setSlug((prev) => (prev ? prev : slugifyClient(title)));
  }, [title]);

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      slug.trim().length > 0 &&
      editor &&
      editor.getText().trim().length > 0 &&
      !isPending
    );
  }, [title, slug, editor, isPending]);

  const onSubmit = () => {
    setError("");
    setSuccess("");

    if (!editor) return;
    const html = editor.getHTML();

    startTransition(async () => {
      try {
        const result = await createPostAction({
          title: title.trim(),
          slug: slugifyClient(slug),
          excerpt: excerpt.trim(),
          html,
          published,
        });
        setSuccess(`Saved: ${result?.slug || slug}`);
      } catch (e) {
        setError(e?.message || "Failed to save post.");
      }
    });
  };

  const setLink = () => {
    const url = window.prompt("Link URL");
    if (!url) return;
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const unsetLink = () => editor?.chain().focus().unsetLink().run();

  const insertImageByUrl = () => {
    const url = window.prompt("Image URL");
    if (!url) return;
    editor?.chain().focus().setImage({ src: url }).run();
  };

  const uploadAndInsertImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads", { method: "POST", body: formData });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok || !json?.url) {
      throw new Error(json?.error || "Upload failed.");
    }
    editor?.chain().focus().setImage({ src: json.url }).run();
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10 text-white">
      <h1 className="text-2xl font-semibold">New blog post</h1>
      <p className="mt-2 text-sm text-white/60">
        Create and publish a post with Tiptap.
      </p>

      <div className="mt-8 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Title
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Post title"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Slug
            </span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
              placeholder="post-slug"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Excerpt (optional)
          </span>
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
            placeholder="Short description for /blog"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            active={!!editor?.isActive("heading", { level: 2 })}
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            active={!!editor?.isActive("heading", { level: 3 })}
          >
            H3
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            active={!!editor?.isActive("bold")}
          >
            Bold
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            active={!!editor?.isActive("italic")}
          >
            Italic
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            active={!!editor?.isActive("bulletList")}
          >
            Bullets
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            active={!!editor?.isActive("orderedList")}
          >
            Numbered
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            active={!!editor?.isActive("blockquote")}
          >
            Quote
          </ToolbarButton>
          <ToolbarButton onClick={setLink} active={!!editor?.isActive("link")}>
            Link
          </ToolbarButton>
          <ToolbarButton onClick={unsetLink} active={false}>
            Unlink
          </ToolbarButton>
          <ToolbarButton onClick={insertImageByUrl} active={false}>
            Image URL
          </ToolbarButton>
          <label className="inline-flex">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setError("");
                setSuccess("");
                startTransition(async () => {
                  try {
                    await uploadAndInsertImage(file);
                    setSuccess("Image inserted.");
                  } catch (err) {
                    setError(
                      err?.message ||
                        "Image upload failed. You can still use Image URL."
                    );
                  } finally {
                    e.target.value = "";
                  }
                });
              }}
            />
            <span
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                isPending
                  ? "border-white/10 bg-white/5 text-white/40"
                  : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
              }`}
            >
              Upload image
            </span>
          </label>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
          <EditorContent editor={editor} />
        </div>

        <label className="flex items-center gap-3 text-sm text-white/70">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500"
          />
          Published
        </label>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`w-full rounded-xl px-5 py-4 text-sm font-semibold text-white transition ${
            canSubmit ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-600/40"
          }`}
        >
          {isPending ? "Saving…" : "Save post"}
        </button>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-300">{success}</p> : null}
      </div>
    </div>
  );
}

