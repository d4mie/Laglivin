const DEFAULT_WP_SITE = "folahanmionajoko-msihv.wordpress.com";

function getWpBase() {
  const raw = (process.env.WP_API_BASE || "").trim().replace(/\/+$/, "");
  if (raw) return raw;

  // WordPress.com hosted sites work reliably via the public API host.
  const site = (process.env.WP_SITE || DEFAULT_WP_SITE).trim();
  return `https://public-api.wordpress.com/wp/v2/sites/${site}`;
}

export function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function wpFetch(path, { revalidate = 60 } = {}) {
  const base = getWpBase();
  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WP fetch failed (${res.status}): ${text.slice(0, 160)}`);
  }

  return res.json();
}

export async function listWpPosts({ perPage = 20, page = 1 } = {}) {
  const per = Math.max(1, Math.min(100, Number(perPage) || 20));
  const pg = Math.max(1, Number(page) || 1);

  // WordPress.com doesn't always support _embed the same way as self-hosted;
  // we rely on `jetpack_featured_media_url` when available.
  return wpFetch(`/posts?per_page=${per}&page=${pg}`, { revalidate: 60 });
}

export async function getWpPostBySlug(slug) {
  const safeSlug = String(slug || "").trim();
  if (!safeSlug) return null;
  const posts = await wpFetch(
    `/posts?slug=${encodeURIComponent(safeSlug)}`,
    { revalidate: 60 }
  );
  return posts?.[0] || null;
}

