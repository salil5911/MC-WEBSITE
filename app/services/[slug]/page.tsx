import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Check, Clock, ShieldCheck, Tag } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { services, getService } from "@/lib/services"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Service Not Found | Mobile Care USA" }

  const title = `${service.name} in Atlanta, GA | Mobile Care USA`
  const description = service.summary
  return {
    title,
    description,
    alternates: { canonical: `https://mobilecareusa.com/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `https://mobilecareusa.com/services/${service.slug}`,
      images: [{ url: service.image, width: 1200, height: 630, alt: service.name }],
      type: "website",
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)
  const Icon = service.icon

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: {
      "@type": "LocalBusiness",
      name: "Mobile Care USA",
      address: { "@type": "PostalAddress", addressLocality: "Atlanta", addressRegion: "GA", addressCountry: "USA" },
    },
    areaServed: "Atlanta, GA",
    url: `https://mobilecareusa.com/services/${service.slug}`,
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Repair Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" aria-hidden="true" />
        <div
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-brand-mint transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Services
              </Link>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
                <Icon className="h-4 w-4" />
                {service.shortName}
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl text-balance">
                {service.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-300 text-pretty">{service.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-brand-mint" />
                  <span className="text-sm text-gray-200">
                    From <span className="font-semibold text-white">{service.priceFrom}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-mint" />
                  <span className="text-sm text-gray-200">{service.turnaround}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-mint" />
                  <span className="text-sm text-gray-200">30-day warranty</span>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/locations">
                  <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-7 py-6 rounded-xl font-semibold">
                    Find a Location
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <Reveal variant="scale">
              <div className="relative h-[360px] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <Image src={service.image} alt={service.name} fill className="object-cover" priority />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview + Includes */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <Reveal variant="fade-up" className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-mintDark">
                <span className="h-px w-6 bg-brand-mint" aria-hidden="true" />
                Overview
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl text-balance">
                Expert {service.name.toLowerCase()} you can trust
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">{service.overview}</p>
            </Reveal>

            <Reveal variant="fade-up" delay={120} className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-brand-dark">What&apos;s included</h3>
                <ul className="mt-5 space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mint/15 text-brand-mintDark">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="bg-white pb-16 sm:pb-24" aria-labelledby="glossary-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-mintDark">
              <span className="h-px w-6 bg-brand-mint" aria-hidden="true" />
              Tech terms, explained
            </span>
            <h2
              id="glossary-heading"
              className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl text-balance"
            >
              What our technicians mean
            </h2>
          </Reveal>
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.glossary.map((item, index) => (
              <Reveal key={item.term} variant="fade-up" delay={index * 80}>
                <div className="h-full rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <dt className="font-display text-base font-bold text-brand-dark">{item.term}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-gray-600">{item.definition}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Process"
              title="How the repair works"
              subtitle="A simple, transparent process designed to get your device back fast — no appointment required."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <Reveal key={step.title} variant="fade-up" delay={index * 100}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-mint/15 font-display text-lg font-bold text-brand-mintDark">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signs you need this repair */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right">
              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-100">
                <Image src={service.image} alt={service.name} fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal variant="fade-left">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-mintDark">
                <span className="h-px w-6 bg-brand-mint" aria-hidden="true" />
                When to visit
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl text-balance">
                Signs you need a {service.shortName.toLowerCase()}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mint/15 text-brand-mintDark">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-gray-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              subtitle="Still unsure? Call your nearest Mobile Care location and our team will help."
              className="mb-12"
            />
          </Reveal>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <Reveal key={faq.question} variant="fade-up" delay={index * 80}>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-brand-dark">{faq.question}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Explore More" title="Other repairs we offer" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item, index) => {
              const RelIcon = item.icon
              return (
                <Reveal key={item.slug} variant="fade-up" delay={index * 100}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark transition-colors group-hover:bg-brand-mint group-hover:text-white">
                      <RelIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{item.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-mintDark">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-20">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to fix your device?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Most repairs are done in under an hour. Walk in to any Mobile Care location today.
            </p>
            <div className="mt-8">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
