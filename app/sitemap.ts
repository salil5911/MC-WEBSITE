import type { MetadataRoute } from "next"
import { getArticles } from "@/lib/babylovegrowth"
import { preOwnedBrands } from "@/lib/pre-owned"
import { locations } from "@/lib/locations"
import { services } from "@/lib/services"
import { SITE_URL } from "@/lib/seo"

// Regenerate the sitemap on the same cadence as the blog cache so newly
// published BabyLoveGrowth articles are included automatically.
export const revalidate = 600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pre-owned`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/accessories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const preOwnedRoutes: MetadataRoute.Sitemap = preOwnedBrands.map((brand) => ({
    url: `${SITE_URL}/pre-owned/${brand.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
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

  return [...staticRoutes, ...serviceRoutes, ...preOwnedRoutes, ...locationRoutes, ...blogRoutes]
}
