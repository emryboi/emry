import { Container } from "@/components/container";

export default function AboutPage() {
  return (
    <Container>
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hakkımda
        </h1>
       
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          selam!! Ben emir :3 (daha cok emry diyorlar ๑ᵔ⤙ᵔ๑) film/dizi, müzik ilgi alanlardımdan 🎧ྀི
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Nelerden Bahsediyorum?</h2>
            <p>
              bu sitede daha cok gundelik yasamımı ve aktivitelerimi yazıyorum ≽^•⩊•^≼
            </p>
          </div>

          <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Bu Site Hakkında</h2>
            <p>
              Bu siteyi modern web standartlarını kullanarak geliştirdim. 
              Altyapısında <strong>Next.js App Router</strong>, <strong>Tailwind CSS</strong>, 
              <strong>Supabase</strong> ve <strong>PostgreSQL</strong> kullanıyorum. 
              İçeriklerimi ise kendi geliştirdiğim yönetim panelinden yönetiyorum.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}