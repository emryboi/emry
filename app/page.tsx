import Link from "next/link";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: latestPosts } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(3);

  const posts = latestPosts ?? [];

  return (
    <Container>
      <section className="mb-20 text-center space-y-8">
        <div className="flex justify-center">
           <span className="text-zinc-400">⏔⏔⏔ ꒰ ᧔ෆ᧓ ꒱ ⏔⏔⏔</span>
        </div>
        
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          bos hıkayelerımı dınlemeye hosgeldıın!! <span className="animate-pulse">♡</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg">
          tamamıyla aklımdan gecenlerı yazdıgım kucuk bı sayfa (˶˃𐃷˂˶)
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/blog" className="px-6 py-2 rounded-full border border-zinc-200 hover:bg-zinc-100 transition">
            Yazılara göz at .ᐟ
          </Link>
          <Link href="/projects" className="px-6 py-2 rounded-full border border-zinc-200 hover:bg-zinc-100 transition">
            Projelerim <span className="text-pink-400">(˶˃𐃷˂˶)</span>
          </Link>
        </div>
      </section>

     <section className="mb-20 p-8 rounded-3xl border border-pink-100 bg-pink-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <span className="text-pink-400">✧</span>
      <h3 className="font-medium text-pink-900 dark:text-pink-200">bu ara buna sardım .ᐟ</h3>
    </div>
    <span className="text-xs text-zinc-400 font-mono">꒰ ᧔ෆ᧓ ꒱</span>
  </div>

  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-950/50 border border-pink-100 dark:border-zinc-800">
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/30 dark:text-pink-500 font-bold">
      D+
    </div>
    
    <div className="flex-1">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Daredevil (2015)
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
        Marvel Studios • Disney+ ♡
      </p>
    </div>

    <div className="text-xl">
      (˶˃𐃷˂˶)
    </div>
  </div>
</section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Son Karalamalar .ᐟ</h2>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <span className="text-xs text-zinc-400"> {new Date(post.createdAt as unknown as string).toLocaleDateString("tr-TR")} </span>
              <p className="group-hover:text-pink-500 transition">{post.title} ♡</p>
            </Link>
          ))}
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Başka Neler Var?</h2>
          <div className="space-y-4">
            {['Blog', 'Projeler', 'Hakkımda'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="flex items-center gap-2 hover:translate-x-2 transition">
                 <span>⏔</span> {item}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}