import type { MetadataRoute } from "next"
import { getArticles } from "@/lib/babylovegrowth"

const SITE_URL = "https://mobilecareusa.com"

// Regenerate the sitemap on the same cadence as the blog cache so newly
// published BabyLoveGrowth articles are included automatically.
export const revalidate = 600

const LOCATION_SLUGS = [
  "augusta-mall",
  "perimeter-mall",
  "cumberland-mall",
  "southlake-mall",
  "lynnhaven-mall",
  "carolina-place-mall",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ]

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const articles = await getArticles()
  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.created_at ? new Date(article.created_at) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...locationRoutes, ...blogRoutes]
}
