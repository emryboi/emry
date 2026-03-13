import { NextResponse } from "next/server";
import { verifySignedSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

function getSessionFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("admin_session="));

  if (!match) return null;
  const token = decodeURIComponent(match.split("=").slice(1).join("="));
  return verifySignedSession(token);
}

export async function GET(request: Request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("GET Hatası:", error); // Terminalde göreceksin
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: posts ?? [] });
}

export async function POST(request: Request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const { title, slug, content, excerpt, coverImage } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, slug, content, excerpt, coverImage }])
      .select()
      .single();

    if (error) {
      console.error("POST Hata Detayı:", error); // HATA BURADA ÇIKACAK
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    console.error("Beklenmedik Hata:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}