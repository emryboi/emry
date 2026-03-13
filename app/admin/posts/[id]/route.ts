import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { verifySignedSession } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;


  if (!token || !verifySignedSession(token)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(null, { status: 204 });
}