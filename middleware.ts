import { NextResponse } from "next/server";

export function middleware(request:any) {
  // You can check cookies or headers here
  // but avoid using next-auth or openid-client imports

  const token = request.cookies.get("next-auth.session-token")?.value;
  if (!token) {
    // redirect to login
    console.log("middel");
    
  }

  return NextResponse.next();
}
