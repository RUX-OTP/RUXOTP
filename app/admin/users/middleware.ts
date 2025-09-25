import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const adminToken = req.cookies.get("admin_token")?.value;

    if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
      // redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}
