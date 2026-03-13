import { Container } from "@/components/container";

export default function BlogLoading() {
  return (
    <Container>
      <div className="space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-40 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="flex justify-between gap-4">
          <div className="h-4 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-52 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="h-3 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

