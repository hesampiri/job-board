import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;
  console.log(pathname);
  

  if (!session && pathname.startsWith("/dashboard"))
    return NextResponse.redirect(new URL("/unauthorized", req.url));

  if (pathname.startsWith("/dashboard/employer") && session?.user.role !== "employer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/jobseeker") && session?.user.role !== "jobseeker") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path"],
};
