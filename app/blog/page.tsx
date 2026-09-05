import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { getArticles, isBlogConfigured, formatDate } from "@/lib/babylovegrowth"

export const revalidate = 600

export const metadata: Metadata = {
  title: "Blog | Mobile Care USA — Phone, Tablet & Laptop Repair Tips",
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
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="pt-24">
        {/* Header */}
        <section className="bg-brand-dark">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-mint">
              The Mobile Care Blog
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white text-balance sm:text-5xl">
              Repair guides, device tips, and tech news
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
              Practical advice straight from our repair technicians to help you get the most out of
              your phone, tablet, and laptop.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
              <h2 className="text-2xl font-bold text-brand-dark">
                {configured ? "New articles are on the way" : "Blog coming soon"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-gray-600">
                {configured
                  ? "We're publishing fresh repair guides and tips shortly. Check back soon."
                  : "Our blog is being set up. Please check back soon for expert repair tips and guides."}
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 lg:aspect-auto">
                    {featured.hero_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.hero_image_url || "/placeholder.svg"}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-brand-mint/10 text-brand-mintDark">
                        Mobile Care
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 lg:p-10">
                    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-mint/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-mintDark">
                      Featured
                    </span>
                    <h2 className="text-2xl font-bold leading-snug text-brand-dark text-balance transition-colors group-hover:text-brand-mintDark sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 leading-relaxed text-gray-600">
                      {featured.excerpt || featured.meta_description}
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
                      <time dateTime={featured.created_at}>{formatDate(featured.created_at)}</time>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid of remaining posts */}
              {rest.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        {article.hero_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={article.hero_image_url || "/placeholder.svg"}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-brand-mint/10 text-brand-mintDark">
                            Mobile Care
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-bold leading-snug text-brand-dark text-balance transition-colors group-hover:text-brand-mintDark">
                          {article.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                          {article.excerpt || article.meta_description}
                        </p>
                        <time
                          dateTime={article.created_at}
                          className="mt-4 text-xs text-gray-500"
                        >
                          {formatDate(article.created_at)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
