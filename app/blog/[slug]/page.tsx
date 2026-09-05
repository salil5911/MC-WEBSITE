import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getArticles, getArticleBySlug, formatDate, stripLeadingTitleAndHero } from "@/lib/babylovegrowth"

export const revalidate = 600
// Generate post pages on demand (ISR) rather than all at build time. This
// avoids bursting the BabyLoveGrowth API during the build, and new posts are
// served + cached on their first request.
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) {
    return { title: "Article not found | Mobile Care USA" }
  }
  const url = `https://mobilecareusa.com/blog/${article.slug}`
  return {
    title: `${article.title} | Mobile Care USA`,
    description: article.meta_description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.meta_description,
      url,
      type: "article",
      publishedTime: article.created_at,
      images: article.hero_image_url ? [{ url: article.hero_image_url }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="pt-24">
        {/* JSON-LD structured data from BabyLoveGrowth for SEO */}
        {article.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(article.jsonLd) }}
          />
        )}
        {article.faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faqJsonLd) }}
          />
        )}

        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-mintDark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>

          <header className="mb-8">
            <time dateTime={article.created_at} className="text-sm font-medium text-brand-mintDark">
              {formatDate(article.created_at)}
            </time>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-dark text-balance sm:text-4xl">
              {article.title}
            </h1>
            {article.meta_description && (
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {article.meta_description}
              </p>
            )}
          </header>

          {article.hero_image_url && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.hero_image_url || "/placeholder.svg"}
                alt={article.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: stripLeadingTitleAndHero(article.content_html) }}
          />

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-brand-dark px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl font-bold text-white text-balance">
              Need a repair done right?
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-300">
              Visit any Mobile Care location for fast, expert device repair — walk-ins always
              welcome.
            </p>
            <Link href="/locations" className="mt-6 inline-block">
              <Button className="bg-brand-mint text-brand-dark hover:bg-brand-mint/90">
                <MapPin className="mr-2 h-4 w-4" />
                Find a Location
              </Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
