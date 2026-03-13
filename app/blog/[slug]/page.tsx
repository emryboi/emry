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

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <Container>
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
          {}
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Date unknown"}
        </p>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mb-6 text-base text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-8 aspect-[16/9] w-full rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
          />
        )}
        <div className="prose prose-zinc max-w-none text-base leading-relaxed dark:prose-invert">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </Container>
  );
}