import { Container } from "@/components/container";
import Link from "next/link";

export default function ContactPage() {
  const socials = [
    { name: "Instagram", href: "https://instagram.com/emryboii", label: "@emryboii" },
    { name: "TikTok", href: "https://tiktok.com/@emryboi", label: "@emryboi" },
    { name: "Discord", href: "https://discord.gg/emry", label: "Sunucuya Katıl" },
  ];

  return (
    <Container>
      <section className="mx-auto max-w-xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">İletişim</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Benimle iş birliği yapmak, sorular sormak veya sadece selam vermek için aşağıdaki kanallardan ulaşabilirsin :3
          </p>
        </div>

        <div className="grid gap-4">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-900 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-400"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{social.name}</span>
              <span className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                {social.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 italic">
            "En hızlı dönüşü Discord üzerinden yapabilirimm!!"
          </p>
        </div>
      </section>
    </Container>
  );
}