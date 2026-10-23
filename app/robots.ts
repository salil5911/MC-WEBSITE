import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// Search engines and AI assistants we want to read the site. Everything is
// already allowed by the "*" rule; naming them makes the intent explicit and
// survives anyone later tightening the default rule.
const AI_AND_SEARCH_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_AND_SEARCH_AGENTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
