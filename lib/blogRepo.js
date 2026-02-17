import { sql } from "@vercel/postgres";

// Neon integrations often provide DATABASE_URL; @vercel/postgres expects POSTGRES_URL.
if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_URL = process.env.DATABASE_URL;
}

export function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['".,!?/\\:;()]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPost({ title, slug, excerpt, html, published = true }) {
  if (!title) throw new Error("title required");
  if (!slug) throw new Error("slug required");
  if (!html) throw new Error("html required");

  const { rows } = await sql`
    INSERT INTO blog_posts (title, slug, excerpt, html, published, updated_at)
    VALUES (${title}, ${slug}, ${excerpt || null}, ${html}, ${published}, NOW())
    RETURNING id, title, slug, excerpt, published, created_at, updated_at
  `;
  return rows[0];
}

export async function listPosts({ limit = 50, includeUnpublished = false } = {}) {
  const lim = Math.max(1, Math.min(200, Number(limit) || 50));
  const { rows } = includeUnpublished
    ? await sql`
        SELECT id, title, slug, excerpt, published, created_at, updated_at
        FROM blog_posts
        ORDER BY created_at DESC
        LIMIT ${lim}
      `
    : await sql`
        SELECT id, title, slug, excerpt, published, created_at, updated_at
        FROM blog_posts
        WHERE published = true
        ORDER BY created_at DESC
        LIMIT ${lim}
      `;
  return rows;
}

export async function getPostBySlug(slug) {
  const { rows } = await sql`
    SELECT id, title, slug, excerpt, html, published, created_at, updated_at
    FROM blog_posts
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] || null;
}

