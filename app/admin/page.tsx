import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase"; // Supabase'i import et
import { verifySignedSession } from "@/lib/auth"; // Auth kontrolünü import et

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;


  if (!token || !verifySignedSession(token)) {
    redirect("/admin/login");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const safePosts = posts ?? [];

  return (
    <Container>
      {}
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {}
    </Container>
  );
}