import { NextResponse } from "next/server";
import { verifySignedSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// 1. Tipi Promise olarak güncelliyoruz
type Params = {
  params: Promise<{ id: string }>;
};

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

export async function PUT(request: Request, { params }: Params) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. await ile çözümlüyoruz
  const { id: rawId } = await params;
  const id = Number(rawId);
  
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);

  const title = body?.title as string | undefined;
  const slug = body?.slug as string | undefined;
  const content = body?.content as string | undefined;
  const excerpt = (body?.excerpt as string | undefined) ?? null;
  const coverImage = (body?.coverImage as string | undefined) ?? null;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Title, slug, and content are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      slug,
      content,
      excerpt,
      coverImage,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }

  return NextResponse.json({ post: data });
}

export async function DELETE(request: Request, { params }: Params) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. await ile çözümlüyoruz
  const { id: rawId } = await params;
  const id = Number(rawId);
  
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}