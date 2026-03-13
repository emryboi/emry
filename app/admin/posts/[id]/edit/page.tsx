import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { AdminPostForm } from "@/components/admin-post-form";
import { AdminDeletePostButton } from "@/components/admin-delete-post-button";
import { supabase } from "@/lib/supabase";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    notFound();
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <Container>
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Admin
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Edit post
        </h1>
      </section>

      <section className="mt-6 space-y-4">
        <AdminPostForm
          mode="edit"
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            content: post.content,
          }}
        />
        <AdminDeletePostButton id={post.id} />
      </section>
    </Container>
  );
}
