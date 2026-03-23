import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/auth/sign-in" || path === "/auth/sign-up";
  const token = req.cookies.get("token");
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/sign-in", "/auth/sign-up"],
};
