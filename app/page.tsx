import Link from "next/link";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Verileri paralel çekmek performansı artırır
  const [latestPostsRes, movieRes] = await Promise.all([
    supabase.from("posts").select("*").order("createdAt", { ascending: false }).limit(3),
    fetch(`https://api.themoviedb.org/3/tv/1402?api_key=${process.env.TMDB_API_KEY}`, { next: { revalidate: 86400 } })
  ]);

  const posts = latestPostsRes.data ?? [];
  const show = movieRes.ok ? await movieRes.json() : null;

  const year = show?.first_air_date?.slice(0, 4);
  const studio = show?.production_companies?.[0]?.name ?? "Bilinmiyor";

  return (
    <Container>
      <section className="mb-20 text-center space-y-8">
        <div className="flex justify-center">
          <span className="text-zinc-400">⏔⏔⏔ ꒰ ᧔ෆ᧓ ꒱ ⏔⏔⏔</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          boş hikayelerimi dinlemeye hoş geldin!! <span className="animate-pulse">♡</span>
        </h1>
        <p className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg">
          tamamıyla aklımdan geçenleri yazdığım küçük bi sayfa (˶˃𐃷˂˶)
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/blog" className="px-6 py-2 rounded-full border border-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Yazılara göz at .ᐟ
          </Link>
          <Link href="/projects" className="px-6 py-2 rounded-full border border-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Projelerim <span className="text-pink-400">(˶˃𐃷˂˶)</span>
          </Link>
        </div>
      </section>

      {show && (
  <section className="mb-20 p-8 rounded-3xl border border-pink-100 bg-pink-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="text-pink-400">✧</span>
        <h3 className="font-medium text-pink-900 dark:text-pink-200">bu ara buna sardım .ᐟ</h3>
      </div>
      <span className="text-xs text-zinc-400 font-mono">꒰ ᧔ෆ᧓ ꒱</span>
    </div>

    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-950/50 border border-pink-100 dark:border-zinc-800">
      <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <img 
          src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} 
          alt={show.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {show.name} ({year})
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {studio} • Disney+ ♡
        </p>
      </div>

      <div className="text-xl">
        (˶˃𐃷˂˶)
      </div>
    </div>
  </section>
)}

      {/* İçerik Bölümü */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Son Karalamalar .ᐟ</h2>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <span className="text-xs text-zinc-400">
                {new Date(post.createdAt as unknown as string).toLocaleDateString("tr-TR")}
              </span>
              <p className="group-hover:text-pink-500 transition">{post.title} ♡</p>
            </Link>
          ))}
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Başka Neler Var?</h2>
          <div className="space-y-4">
            {["Blog", "Projeler", "Hakkımda"].map((item) => (
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