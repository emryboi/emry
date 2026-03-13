import Link from "next/link";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: latestPosts, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(3);

  if (error) console.error("Son yazılar yüklenemedi:", error);
  const posts = latestPosts ?? [];

  return (
    <Container>
      {/* Hero Bölümü */}
      <section className="mb-20 grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Yayında ve yazıyor
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            Modern web için ürünler inşa ediyorum.
          </h1>
          
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Yazılım mimarisi, ürün geliştirme süreçleri ve dijital deneyimler üzerine gerçek deneyimlerimi paylaşıyorum.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/blog" className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200">
              Blogu Oku
            </Link>
            <Link href="/projects" className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300">
              Projelerimi Gör
            </Link>
          </div>
        </div>

        {/* Yan Panel */}
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50/50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/30">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Son Yazılar</h3>
          <div className="mt-6 space-y-3">
            {posts.length === 0 ? (
              <p className="text-sm text-zinc-500">Henüz yeni bir yazı yok.</p>
            ) : (
              posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-900 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{post.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{new Date(post.createdAt as unknown as string).toLocaleDateString("tr-TR")}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Keşfet Bölümü */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">Neler Var?</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "Blog", desc: "Teknik derinlik ve tecrübeler.", href: "/blog" },
            { title: "Projeler", desc: "İnşa ettiğim dijital işler.", href: "/projects" },
            { title: "Hakkımda", desc: "Ben kimim?", href: "/about" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-500">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}