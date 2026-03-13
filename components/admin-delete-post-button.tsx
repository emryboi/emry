'use client';

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export function AdminDeletePostButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(
      "Are you sure you want to permanently delete this post?",
    );
    if (!ok) return;

    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete post.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
    >
      Delete post
    </button>
  );
}

