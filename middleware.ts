import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

export default NextAuth(authConfig).auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  if (process.env.NODE_ENV !== "production") {
    console.log("[middleware] pathname:", pathname);
    console.log("[middleware] session:", session);
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    pathname.startsWith("/dashboard/employer") &&
    session?.user.role !== "employer"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    pathname.startsWith("/dashboard/jobseeker") &&
    session?.user.role !== "jobseeker"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
