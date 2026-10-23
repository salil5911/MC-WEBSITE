import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
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
    <>
      <Nav />
      {article.jsonLd && <JsonLd data={article.jsonLd} />}
      {article.faqJsonLd && <JsonLd data={article.faqJsonLd} />}
      <main>
        <PageHeader
          breadcrumbs={[
            { name: "Blog", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]}
          eyebrow={formatDate(article.created_at)}
          title={article.title}
          intro={article.meta_description || undefined}
          media={article.hero_image_url ? <HeaderPhoto src={article.hero_image_url} alt={article.title} aspect="aspect-[4/3]" /> : undefined}
        />

        <article className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: stripLeadingTitleAndHero(article.content_html) }}
            />

            <aside className="mt-20 rounded-[2rem] bg-paper p-10 sm:p-12">
              <p className="text-[0.95rem] font-medium text-brand-mintDark">Need it fixed?</p>
              <p className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
                Walk into any Mobile Care store for a free diagnostic. Most repairs are done the same day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/locations" variant="dark">
                  Find a store
                </ButtonLink>
                <ButtonLink href="/services" variant="outline" arrow={false}>
                  See repair prices
                </ButtonLink>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
