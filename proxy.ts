// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login";

  const protectedRoutes = [
    "/dashboard",
    "/members",
    "/explorer",
    "/assets",
    "transactions",
  ];

  const isProtectedPage = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // ❌ Not logged in & trying to access protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Logged in & trying to access login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/members/:path*",
    "/explorer/:path*",
    "/assets/:path*",
    "/transactions/:path*"
  ],
};
