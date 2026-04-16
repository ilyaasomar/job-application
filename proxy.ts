import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/auth/sign-in" || path === "/auth/sign-up";
  const token = req.cookies.get("token");
  const session = await auth();

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Block seekers from /admin
  // @ts-ignore
  if (path.startsWith("/admin") && session?.user?.role !== "EMPLOYER") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
};
