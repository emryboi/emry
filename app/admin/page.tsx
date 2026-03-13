import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";
import { verifySignedSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token || !verifySignedSession(token)) {
    redirect("/admin/login");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    return (
      <Container>
        <div className="rounded-2xl border border-red-500 bg-red-50 p-6 text-red-700 dark:bg-red-950/20 dark:text-red-400">
          <h2 className="text-lg font-bold">Veritabanı Hatası</h2>
          <p className="mt-2 text-sm">{error.message}</p>
        </div>
      </Container>
    );
  }

  const safePosts = posts ?? [];

  return (
    <Container>
      {}
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Yönetim Paneli
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Yazıların
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <form action="/api/admin/logout" method="post" className="flex-1 sm:flex-none">
            <button
              type="submit"
              className="w-full rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300"
            >
              Çıkış Yap
            </button>
          </form>
          <Link
            href="/admin/posts/new"
            className="flex-1 text-center sm:flex-none rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            + Yeni Yazı
          </Link>
        </div>
      </section>

      {}
      {safePosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">Henüz bir yazı eklemedin.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-6 py-4 text-left font-medium text-zinc-600 dark:text-zinc-400">Başlık</th>
                <th className="px-6 py-4 text-right font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {safePosts.map((post: any) => (
                <tr
                  key={post.id}
                  className="border-t border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{post.title}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Düzenle
                    </Link>
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