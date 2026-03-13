import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // .env dosyasında tanımladığın URL veya kendi domainin
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emry.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/blog",
    "/projects",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, updatedAt");

  const blogRoutes: MetadataRoute.Sitemap =
    !error && posts
      ? posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          // updatedAt string gelebilir, o yüzden güvenli dönüşüm yapıyoruz
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        }))
      : [];

  return [...staticRoutes, ...blogRoutes];
}