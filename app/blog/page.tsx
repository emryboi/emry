import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

type SearchParams = {
  q?: string;
  page?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const PAGE_SIZE = 6;

export default async function BlogPage({ searchParams }: Props) {
  const sp = await searchParams;

  const query = (sp.q ?? "").trim();
  const page = Number(sp.page ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let queryBuilder = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("createdAt", { ascending: false })
    .range(from, to);

  if (query.length > 0) {
    const pattern = `%${query}%`;
    queryBuilder = queryBuilder.or(
      `title.ilike.${pattern},excerpt.ilike.${pattern},content.ilike.${pattern}`,
    );
  }

  const { data: posts, error, count } = await queryBuilder;

  if (error) {
    console.error("Yazılar yüklenirken hata oluştu:", error);
  }

  const total = count ?? 0;
  const safePosts = posts ?? [];

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (currentPage > totalPages && total > 0) {
    notFound();
  }

  return (
    <Container>
      <section className="mb-10 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Blog
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Tamamıyla keyfime göre yazdıgım bloglar :3
        </p>
        <form className="mt-4">
          <label className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm shadow-sm focus-within:border-zinc-900 focus-within:ring-1 focus-within:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-300 dark:focus-within:ring-zinc-300">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              Ara
            </span>
            <input
              name="q"
              placeholder="Yazılarda ara..."
              defaultValue={query}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
          </label>
        </form>
      </section>

      {safePosts.length === 0 ? (
        <p className="text-sm text-zinc-500">
          {query
            ? "Arama kriterlerinle eşleşen yazı bulunamadı."
            : "Henüz yayınlanmış bir yazı yok. Yakında görüşmek üzere!"}
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {safePosts.map((post) => (
            <li
              key={post.id}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
            >
              <Link href={`/blog/${post.slug}`}>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString("tr-TR") : "Tarih bilinmiyor"}
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-3 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between gap-4 text-sm text-zinc-500">
          <div>
            Sayfa {currentPage} / {totalPages}
          </div>
          <div className="flex gap-2">
            <PaginationLink
              label="Önceki"
              page={currentPage - 1}
              disabled={currentPage <= 1}
              query={query}
            />
            <PaginationLink
              label="Sonraki"
              page={currentPage + 1}
              disabled={currentPage >= totalPages}
              query={query}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

type PaginationLinkProps = {
  label: string;
  page: number;
  disabled: boolean;
  query: string;
};

function PaginationLink({ label, page, disabled, query }: PaginationLinkProps) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-full border border-dashed border-zinc-300 px-4 py-1.5 text-xs text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
        {label}
      </span>
    );
  }

  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (query.length > 0) params.set("q", query);

  const href = params.toString().length > 0 ? `/blog?${params.toString()}` : "/blog";

  return (
    <Link
      href={href}
      className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:text-zinc-50"
    >
      {label}
    </Link>
  );
}