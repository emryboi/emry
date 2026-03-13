import { Container } from "@/components/container";

const projects = [
  {
    title: "Personal Blog Starter",
    description:
      "The codebase you are looking at right now – a modern, full‑stack blog built with Next.js, Prisma, and PostgreSQL.",
    href: "https://vercel.com",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Projects
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Highlight your favorite work, experiments, and case studies. Replace
          these examples with your own projects.
        </p>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.title}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
            >
              <div>
                <h2 className="text-base font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

