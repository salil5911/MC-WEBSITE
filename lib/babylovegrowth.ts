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
 * Fetch that retries on 429 (rate limit) with exponential backoff, honoring
 * a Retry-After header when present. BabyLoveGrowth rate-limits bursts, which
 * otherwise causes on-demand page builds to fail intermittently.
 */
async function fetchWithRetry(
  url: string,
  init: RequestInit & { next?: { revalidate?: number } },
  attempts = 4,
): Promise<Response> {
  let lastRes: Response | null = null
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, init)
    if (res.status !== 429) return res
    lastRes = res
    const retryAfter = Number(res.headers.get("retry-after"))
    const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 500 * 2 ** i
    if (i < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  return lastRes as Response
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
    const res = await fetchWithRetry(`${BASE_URL}/v1/articles`, {
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
    const res = await fetchWithRetry(`${BASE_URL}/v1/articles/${match.id}`, {
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

/**
 * BabyLoveGrowth's content_html begins with its own <h1> title and, usually,
 * the hero image as the first <img>. The post page renders its own styled
 * title and hero, so strip those leading elements to avoid duplicates.
 */
export function stripLeadingTitleAndHero(html: string): string {
  if (!html) return ""
  let out = html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, "")
  // Remove a leading paragraph that only wraps the hero image, or a bare hero image.
  out = out.replace(/^\s*<p[^>]*>\s*<img[^>]*>\s*<\/p>/i, "")
  out = out.replace(/^\s*<img[^>]*>/i, "")
  return out.trim()
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
