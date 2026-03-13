import { Container } from "@/components/container";
import Link from "next/link";

const projects = [
  {
    title: "Kişisel Blog Projesi",
    description:
      "Şu an incelediğin bu proje; Next.js, Supabase, Tailwind CSS ve Markdown kullanarak geliştirdiğim modern ve hızlı bir kişisel blog.",
    href: "https://github.com/emryboi/emry",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <section className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projelerim
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Geliştirdiğim bazı projeler, deneyler ve üzerinde çalıştığım işler.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.title}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-500"
            >
              <Link href={project.href} className="flex-1">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </Link>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
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