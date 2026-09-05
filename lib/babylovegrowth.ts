const BASE_URL = "https://api.babylovegrowth.ai/api/integrations"

// Articles are managed in BabyLoveGrowth and fetched at request time.
// Responses are cached for 10 minutes so newly published posts appear
// automatically without a redeploy.
const REVALIDATE_SECONDS = 600

export interface ArticleSummary {
  id: number
  title: string
  slug: string
  hero_image_url: string | null
  languageCode: string
  meta_description: string
  excerpt: string
  orgWebsite: string
  created_at: string
  seedKeyword: string
  keywords: string[]
}

export interface Article extends ArticleSummary {
  content_html: string
  content_markdown: string
  jsonLd: Record<string, unknown> | null
  faqJsonLd: Record<string, unknown> | null
}

function getApiKey(): string | null {
  return process.env.BABYLOVEGROWTH_API_KEY ?? null
}

function headers(key: string) {
  return {
    "X-API-Key": key,
    "Content-Type": "application/json",
  }
}

/**
 * Returns whether the BabyLoveGrowth integration is configured.
 * Used to render a helpful empty state instead of crashing when the
 * API key has not been added yet.
 */
export function isBlogConfigured(): boolean {
  return getApiKey() !== null
}

export async function getArticles(): Promise<ArticleSummary[]> {
  const key = getApiKey()
  if (!key) return []

  try {
    const res = await fetch(`${BASE_URL}/v1/articles`, {
      headers: headers(key),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      console.log("[v0] BabyLoveGrowth list request failed:", res.status)
      return []
    }
    const data = (await res.json()) as ArticleSummary[]
    if (!Array.isArray(data)) return []
    return [...data].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  } catch (error) {
    console.log("[v0] BabyLoveGrowth list request error:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const key = getApiKey()
  if (!key) return null

  const summaries = await getArticles()
  const match = summaries.find((a) => a.slug === slug)
  if (!match) return null

  try {
    const res = await fetch(`${BASE_URL}/v1/articles/${match.id}`, {
      headers: headers(key),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      console.log("[v0] BabyLoveGrowth article request failed:", res.status)
      return null
    }
    return (await res.json()) as Article
  } catch (error) {
    console.log("[v0] BabyLoveGrowth article request error:", error)
    return null
  }
}

export function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString))
  } catch {
    return ""
  }
}
