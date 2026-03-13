import { Container } from "@/components/container";
import { AdminPostForm } from "@/components/admin-post-form";

export default function NewPostPage() {
  return (
    <Container>
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Admin
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          New post
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Draft a new blog post using Markdown. You can always edit it later.
        </p>
      </section>

      <section className="mt-6">
        <AdminPostForm mode="create" />
      </section>
    </Container>
  );
}

