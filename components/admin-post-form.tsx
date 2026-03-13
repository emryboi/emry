'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

type BasePost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
};

type Props =
  | {
      mode: "create";
      post?: undefined;
    }
  | {
      mode: "edit";
      post: BasePost;
    };

export function AdminPostForm(props: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(props.post?.title ?? "");
  const [slug, setSlug] = useState(props.post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(props.post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(props.post?.coverImage ?? "");
  const [content, setContent] = useState(props.post?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title,
        slug,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        content,
      };

      let res: Response;

      if (props.mode === "create") {
        res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/posts/${props.post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to save post");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function handleTitleBlur() {
    if (!slug && title) {
      setSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          required
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
        />
        <p className="text-xs text-zinc-500">
          Used in the URL, e.g. <code>/blog/{slug || "my-first-post"}</code>
        </p>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
        />
        <p className="text-xs text-zinc-500">
          Short summary shown on listing pages and used for SEO description.
        </p>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Cover image URL
        </label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://images.example.com/post-cover.jpg"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
        />
        <p className="text-xs text-zinc-500">
          Host images on your preferred provider (e.g. Vercel Blob, S3,
          Cloudinary) and paste the public URL here.
        </p>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Content (Markdown)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          required
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-mono text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
        />
        <p className="text-xs text-zinc-500">
          Supports standard Markdown – headings, lists, links, code blocks, and
          more.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:text-zinc-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {saving
            ? props.mode === "create"
              ? "Publishing..."
              : "Saving..."
            : props.mode === "create"
            ? "Publish post"
            : "Save changes"}
        </button>
      </div>
    </form>
  );
}

