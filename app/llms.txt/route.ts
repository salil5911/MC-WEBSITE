import { services } from "@/lib/services"
import { locations } from "@/lib/locations"
import { preOwnedBrands } from "@/lib/pre-owned"
import { SITE_URL } from "@/lib/seo"
import { homeFaqs } from "@/lib/faqs"

// Generated from the same data as the site so it never drifts out of date.
// Format: https://llmstxt.org
export const revalidate = 86400

function hours(location: (typeof locations)[number]) {
  return location.hours.map((h) => `${h.day} ${h.time}`).join("; ")
}

export function GET() {
  const lines = [
    "# Mobile Care USA",
    "",
    "> Mobile Care USA is a walk-in phone, tablet, and laptop repair company with 8 stores inside shopping malls in Georgia, Virginia, North Carolina, and Michigan. Most repairs are finished the same day with a 30-day parts and labor warranty. Diagnostics are free and no appointment is needed. The stores also sell certified pre-owned iPhone and Samsung Galaxy phones (unlocked, never repaired, 60-day warranty) and phone accessories.",
    "",
    "Key facts:",
    "- Walk-ins welcome at every store. Free diagnostic and a fixed quote before any work starts.",
    "- Most screen, battery, and charging port repairs take 30 to 60 minutes.",
    "- 30-day parts and labor warranty on every repair.",
    "- Repairs iPhone, Samsung Galaxy, Google Pixel, iPad and other tablets, MacBook and Windows laptops, Apple Watch, and game consoles.",
    "- Trade-in credit toward a new or certified pre-owned phone.",
    "",
    "## Repair services and starting prices",
    "",
    ...services.map(
      (s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): from ${s.priceFrom}, typically ${s.turnaround}. ${s.tagline}.`,
    ),
    "",
    "## Store locations",
    "",
    ...locations.map(
      (l) =>
        `- [Mobile Care USA, ${l.name}](${SITE_URL}/locations/${l.slug}): ${l.address}, ${l.city}, ${l.state} ${l.zip}. Phone ${l.phone}. Hours: ${hours(l)}. Serves ${[l.city, ...l.nearby].join(", ")}.`,
    ),
    "",
    "## Certified pre-owned phones",
    "",
    ...preOwnedBrands.map(
      (b) => `- [${b.name}](${SITE_URL}/pre-owned/${b.slug}): ${b.series.map((s) => s.name).join(", ")}.`,
    ),
    "",
    "## Common questions",
    "",
    ...homeFaqs.map((f) => `- ${f.question} ${f.answer}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/)`,
    `- [All repair services](${SITE_URL}/services)`,
    `- [All store locations](${SITE_URL}/locations)`,
    `- [Accessories](${SITE_URL}/accessories)`,
    `- [About Mobile Care USA](${SITE_URL}/about)`,
    `- [FAQs](${SITE_URL}/faqs)`,
    `- [Blog](${SITE_URL}/blog)`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${SITE_URL}/sitemap.xml): every page, including blog articles.`,
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
