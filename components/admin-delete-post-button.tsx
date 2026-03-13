'use client';

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 

type Props = {
  id: string; 
};

export function AdminDeletePostButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Bu gönderiyi silmek istediğine emin misin?");
    if (!ok) return;


    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id); 

    if (error) {
      alert("Silme hatası: " + error.message);
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