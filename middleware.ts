// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { verifySignedSession } from "./lib/auth"; // Artık async

const ADMIN_PREFIX = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";

// middleware fonksiyonunu async yapmalısın
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  
  // Burada await kullanmak ZORUNDASIN
  const session = await verifySignedSession(token);

  if (!session) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};