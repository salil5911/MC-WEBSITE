import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ArrowRight } from "@/components/icons"
import { getArticles, isBlogConfigured, formatDate } from "@/lib/babylovegrowth"

export const revalidate = 600

export const metadata: Metadata = {
  title: "Phone, Tablet & Laptop Repair Tips | Mobile Care USA Blog",
  description:
    "Expert advice, repair guides, and device care tips from the technicians at Mobile Care USA. Keep your phone, tablet, and laptop running like new.",
  alternates: { canonical: "https://mobilecareusa.com/blog" },
  openGraph: {
    title: "Blog | Mobile Care USA",
    description:
      "Expert advice, repair guides, and device care tips from the technicians at Mobile Care USA.",
    url: "https://mobilecareusa.com/blog",
    type: "website",
  },
}

export default async function BlogPage() {
  const articles = await getArticles()
  const configured = isBlogConfigured()
  const [featured, ...rest] = articles

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Blog", path: "/blog" }]}
          eyebrow="The Mobile Care blog"
          title="Repair guides, device tips, and tech news."
          intro="Practical advice from our technicians to help you get more out of your phone, tablet, and laptop."
        />

        <section className="bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {articles.length === 0 ? (
              <div className="border-t border-ink/15 pt-8">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {configured ? "New articles are on the way." : "The blog is coming soon."}
                </h2>
                <p className="mt-2 max-w-md text-ink-soft">
                  {configured
                    ? "We are publishing new repair guides and tips shortly. Check back soon."
                    : "Our blog is being set up. Check back soon for repair tips and guides."}
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {featured && (
                  <Link href={`/blog/${featured.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-paper-deep">
                      {featured.hero_image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featured.hero_image_url}
                          alt={featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="eager"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center border-t border-ink/15 pt-6 lg:border-0 lg:pt-0">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                        Latest <span className="text-brand-mintDark">/</span>{" "}
                        <time dateTime={featured.created_at}>{formatDate(featured.created_at)}</time>
                      </p>
                      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink text-balance group-hover:text-brand-mintDark sm:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 leading-relaxed text-ink-soft">
                        {featured.excerpt || featured.meta_description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 font-medium text-ink">
                        Read the article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                )}

                {rest.length > 0 && (
                  <ul className="grid gap-x-8 gap-y-12 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((article) => (
                      <li key={article.id}>
                        <Link href={`/blog/${article.slug}`} className="group flex h-full flex-col">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-paper-deep">
                            {article.hero_image_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={article.hero_image_url}
                                alt={article.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                loading="lazy"
                              />
                            )}
                          </div>
                          <time dateTime={article.created_at} className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                            {formatDate(article.created_at)}
                          </time>
                          <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink text-balance group-hover:text-brand-mintDark">
                            {article.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                            {article.excerpt || article.meta_description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
