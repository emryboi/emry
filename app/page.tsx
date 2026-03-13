import Link from "next/link";
import { Container } from "@/components/container";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: latestPosts, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to load latest posts", error);
  }

  const posts = latestPosts ?? [];

  return (
    <Container>
      {/* Hero */}
      <section className="mb-14 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Now writing in public
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
            Building things on the web,
            <br />
            and sharing the process.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Thoughts on software craft, side projects, and lessons learned while
            shipping real products. No hype, sadece gerçek deneyim.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-zinc-50 shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Read the blog
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:text-zinc-50"
            >
              View projects
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-900">
              Next.js · React 19
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-900">
              Supabase · PostgreSQL
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-900">
              Tailwind CSS
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
          <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                Currently exploring
              </p>
              <h2 className="mt-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Better developer experience on the modern web.
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Writing about architecture, DX, performance, and the little UX
                details that make products feel polished.
              </p>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Latest posts
                </span>
                <Link
                  href="/blog"
                  className="text-[11px] font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {posts.length === 0 ? (
                  <p className="text-[11px] text-zinc-500">
                    No posts yet. Once you publish from the admin panel, they
                    will appear here.
                  </p>
                ) : (
                  posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 text-left text-[11px] transition hover:border-zinc-900 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-400 dark:hover:bg-zinc-900"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                          {post.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                          {post.excerpt || "No excerpt yet."}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-zinc-400">
                        {new Date(post.createdAt as unknown as string).toLocaleDateString()}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mb-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Sections
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              What you&apos;ll find here
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/blog"
            className="group rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              01 · Blog
            </p>
            <h3 className="mt-2 text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
              Deep dives & notes
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Longer-form posts on architecture, tooling, and real-world
              lessons from building products.
            </p>
          </Link>
          <Link
            href="/projects"
            className="group rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              02 · Projects
            </p>
            <h3 className="mt-2 text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
              Things I&apos;m building
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              A curated list of experiments, products, and open source work.
            </p>
          </Link>
          <Link
            href="/about"
            className="group rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              03 · About
            </p>
            <h3 className="mt-2 text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
              Who&apos;s behind this
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              A bit about my background, values, and how I like to work.
            </p>
          </Link>
        </div>
      </section>

      {/* Timeline style section */}
      <section className="mb-10 space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Recent focus
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            What I&apos;m currently exploring
          </h2>
        </div>
        <ol className="space-y-5 border-l border-zinc-200 pl-4 dark:border-zinc-800 sm:pl-6">
          <li className="relative pl-4 sm:pl-5">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border border-emerald-500 bg-emerald-400/80 dark:border-emerald-400 dark:bg-emerald-500" />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              2025 · Developer experience
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Designing flows that feel effortless for engineers.
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Tooling, scaffolding, and conventions that let you focus on your
              product instead of boilerplate.
            </p>
          </li>
          <li className="relative pl-4 sm:pl-5">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900" />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Next · Content systems
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Blending markdown, CMS, and code.
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Exploring how writers and developers can collaborate without
              fighting tools.
            </p>
          </li>
        </ol>
      </section>
    </Container>
  );
}
