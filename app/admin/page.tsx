import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Container } from "@/components/container";

export default async function AdminDashboardPage() {

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;


  if (!token) {
    redirect("/admin/login");
  }


const res = await fetch(`/api/admin/posts`, {
  headers: { Cookie: `admin_session=${token}` },
  cache: "no-store",
});

  if (!res.ok) {
    redirect("/admin/login");
  }

  const { posts } = await res.json();
  const safePosts = posts ?? [];

  return (
    <Container>
      <section className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Admin
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:text-zinc-50"
            >
              Log out
            </button>
          </form>
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            New post
          </Link>
        </div>
      </section>

      {/* Tablo kısmı aynı şekilde devam ediyor... */}
      {safePosts.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No posts yet. Create your first post to get started.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
          {/* Tablon burada aynen kalabilir */}
          <table className="min-w-full border-separate border-spacing-0 text-sm">
             {/* ... tablo içeriğin ... */}
          </table>
        </div>
      )}
    </Container>
  );
}