import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";
import { verifySignedSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  // 1. Session Kontrolü
  if (!token || !verifySignedSession(token)) {
    redirect("/admin/login");
  }

  // 2. Doğrudan Veritabanı Sorgusu
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // 3. Hata Yakalama (Neden bağlanamadığımızı burada göreceğiz)
  if (error) {
    return (
      <Container>
        <div className="rounded-2xl border border-red-500 bg-red-50 p-6 text-red-700 dark:bg-red-950/20 dark:text-red-400">
          <h2 className="text-lg font-bold">Veritabanı Hatası</h2>
          <p className="mt-2 text-sm">{error.message}</p>
          <p className="mt-1 text-xs opacity-75">Detay: {error.code}</p>
        </div>
      </Container>
    );
  }

  const safePosts = posts ?? [];

  return (
    <Container>
      <section className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Admin</p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:text-zinc-50">
              Log out
            </button>
          </form>
          <Link href="/admin/posts/new" className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200">
            New post
          </Link>
        </div>
      </section>

      {safePosts.length === 0 ? (
        <p className="text-sm text-zinc-500">No posts yet. Create your first post to get started.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">Title</th>
                <th className="px-4 py-3 text-right font-medium text-zinc-600 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {safePosts.map((post: any) => (
                <tr key={post.id} className="border-t border-zinc-200 dark:border-zinc-800">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/posts/${post.id}/edit`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}