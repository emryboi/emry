import { NextResponse } from "next/server";
import { setAdminSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    await setAdminSessionCookie(username);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Hatalı giriş" }, { status: 401 });
}