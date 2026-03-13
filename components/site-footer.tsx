export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/80 py-8 text-sm text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p>emry yani benim boş yapma alanım. © {year} Tüm haklar saklıdır.</p>
        <p className="text-xs text-zinc-400">
          Next.js, Prisma ve PostgreSQL ile oluşturulmuştur.
        </p>
      </div>
    </footer>
  );
}

