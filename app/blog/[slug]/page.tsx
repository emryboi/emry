import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Yazı bulunamadı" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) notFound();


  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Tarih belirtilmemiş";

  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <header className="mb-8 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            {formattedDate}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          )}
        </header>
        {post.coverImage && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="aspect-[2/1] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </Container>
  );
}