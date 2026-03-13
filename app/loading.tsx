import { Container } from "@/components/container";

export default function RootLoading() {
  return (
    <Container>
      <div className="space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-3 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="space-y-4">
          <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/60"
              >
                <div className="h-3 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

