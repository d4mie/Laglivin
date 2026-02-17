import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing BLOB_READ_WRITE_TOKEN. Configure Vercel Blob (or use Image URL insert).",
      },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ ok: false, error: "file is required" }, { status: 400 });
  }
  if (typeof file === "string") {
    return NextResponse.json({ ok: false, error: "file must be a File" }, { status: 400 });
  }

  const filename = String(file.name || "upload")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_.-]/g, "");

  const blob = await put(`blog/${Date.now()}-${filename}`, file, {
    access: "public",
    token,
    addRandomSuffix: false,
  });

  return NextResponse.json({ ok: true, url: blob.url });
}

