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
    "/transactions",
    "/admin",
  ];

  const isProtectedPage = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // ❌ Not logged in
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const clientType = request.cookies.get("clientType")?.value;
    // ❌ Auditor trying to access restricted create pages
    const auditorRestrictedRoutes = [
      "/assets/mint",
      "/assets/accounts/new",
      "/transactions/new",
      "/assets/vault-sites/new",
    ];

    const isRestrictedForAuditor = auditorRestrictedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (clientType === "AUDITOR" && isRestrictedForAuditor) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ✅ Logged in & trying to access login page
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
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
    "/transactions/:path*",
    "/admin/:path*",
  ],
};
