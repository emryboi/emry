import { Container } from "@/components/container";
import { AdminPostForm } from "@/components/admin-post-form";

export default function NewPostPage() {
  return (
    <Container>
      {/* Üst Bilgi Bölümü */}
      <section className="space-y-2 mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
          Yönetim Paneli
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl text-zinc-900 dark:text-zinc-50">
          Yeni Yazı Oluştur
        </h1>
        <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Markdown kullanarak yeni bir blog yazısı taslağı hazırla. İstediğin zaman düzenleyebilirsin.
        </p>
      </section>

      {/* Form Bölümü */}
      <section className="mt-6">
        <AdminPostForm mode="create" />
      </section>
    </Container>
  );
}