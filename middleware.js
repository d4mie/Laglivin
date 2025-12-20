import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Laglivin Admin"',
    },
  });
}

export function middleware(req) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return unauthorized();

  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
  } catch {
    return unauthorized();
  }

  const [u, p] = decoded.split(":");
  if (u !== user || p !== pass) return unauthorized();

  return NextResponse.next();
}


