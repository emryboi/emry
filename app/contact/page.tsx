import { Container } from "@/components/container";

export default function ContactPage() {
  return (
    <Container>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Contact
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Reach out about collaborations, questions, or just to say hello.
        </p>

        <form className="mt-6 max-w-xl space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="message"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What would you like to talk about?"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Wire this form up to your favorite email provider or API endpoint.
          </p>
        </form>
      </section>
    </Container>
  );
}

