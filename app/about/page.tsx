import { Container } from "@/components/container";

export default function AboutPage() {
  return (
    <Container>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          About
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This is a modern personal blog built as a clean starting point for
          sharing your writing, projects, and thoughts online.
        </p>
        <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            Customize this page to introduce yourself, your background, and what
            you care about. You might talk about your work, your interests, or
            the kinds of things you&apos;ll be publishing here.
          </p>
          <p>
            The stack includes Next.js App Router, Tailwind CSS, Prisma, and
            PostgreSQL, with an admin panel for managing blog posts.
          </p>
        </div>
      </section>
    </Container>
  );
}

