import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase.from("posts").select("title, excerpt").eq("slug", slug).single();
  return { title: post?.title || "Yazı bulunamadı", description: post?.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error || !post) notFound();

  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })
    : "Tarih yok";

  return (
    <Container>
      <article className="mx-auto max-w-2xl py-12">
        <header className="mb-12 text-center space-y-6">
          <p className="text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase">
             ⏔ {formattedDate} ⏔
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
            {post.title}
          </h1>
          <div className="text-pink-400">꒰ ᧔ෆ᧓ ꒱</div>
        </header>

        {post.coverImage && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-pink-100 dark:border-zinc-800 shadow-sm">
            <img src={post.coverImage} alt={post.title} className="w-full object-cover" />
          </div>
        )}

        <div className="prose prose-zinc max-w-none dark:prose-invert 
          prose-headings:font-medium prose-a:text-pink-500 
          prose-a:no-underline hover:prose-a:underline 
          prose-img:rounded-2xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 text-center text-zinc-400">
          .ᐟ :3 .ᐟ (˶˃𐃷˂˶)
        </footer>
      </article>
    </Container>
  );
}