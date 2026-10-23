import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "@/components/icons"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { SITE_URL, faqPageSchema } from "@/lib/seo"
import { locations } from "@/lib/locations"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Spec } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ClosingCta } from "@/components/home/sections"
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

  const title = `${service.name} in GA, VA, NC & MI | Mobile Care USA`
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
  const minPrice = Number(service.priceFrom.replace(/[^\d.]/g, ""))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: locations.map((location) => ({ "@type": "City", name: `${location.city}, ${location.state}` })),
    availableChannel: locations.map((location) => ({
      "@type": "ServiceChannel",
      serviceLocation: { "@id": `${SITE_URL}/locations/${location.slug}#store` },
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", minPrice, priceCurrency: "USD" },
      warranty: { "@type": "WarrantyPromise", durationOfWarranty: { "@type": "QuantitativeValue", value: 30, unitCode: "DAY" } },
    },
    url: `${SITE_URL}/services/${service.slug}`,
  }

  return (
    <>
      <Nav />
      <JsonLd data={jsonLd} />
      <JsonLd data={faqPageSchema(service.faqs)} />
      <main>
        <PageHeader
          breadcrumbs={[
            { name: "Repairs", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]}
          eyebrow="Repair service"
          title={service.name}
          intro={service.tagline}
          actions={<ButtonLink href="/locations">Find a store</ButtonLink>}
          aside={
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-white/10">
                <Image
                  src={service.image}
                  alt={`${service.name} being done by a Mobile Care technician`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-6">
                <Spec label="From" value={service.priceFrom} />
                <Spec label="Time" value={service.turnaround.replace("–", "-")} />
                <Spec label="Warranty" value="30 days" />
              </dl>
            </div>
          }
        />

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:px-8">
            <Reveal>
              <SectionHeading index="01" eyebrow="Overview" title={`How we handle ${service.name.toLowerCase()}.`} />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{service.overview}</p>
            </Reveal>
            <div className="lg:pt-24">
              <h3 className="border-t border-ink/15 pt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                What&apos;s included
              </h3>
              <ul className="mt-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-ink/10 py-3 text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-mintDark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                index="02"
                eyebrow="Process"
                title="How the repair works."
                subtitle="No appointment needed. Here is what happens after you walk in."
              />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="border-t border-ink/15 pt-5">
                  <span className="font-mono text-xs text-brand-mintDark">Step {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div>
              <SectionHeading index="03" eyebrow="When to visit" title={`Signs you need a ${service.shortName.toLowerCase()}.`} />
              <ul className="mt-8 border-t border-ink/15">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 border-b border-ink/10 py-3 text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-mintDark" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading index="04" eyebrow="Terms" title="What our technicians mean." as="h2" />
              <dl className="mt-8 border-t border-ink/15">
                {service.glossary.map((item) => (
                  <div key={item.term} className="border-b border-ink/10 py-4">
                    <dt className="font-display text-lg font-medium text-ink">{item.term}</dt>
                    <dd className="mt-1 leading-relaxed text-ink-soft">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-8">
            <SectionHeading
              index="05"
              eyebrow="Questions"
              title={`${service.shortName} FAQs.`}
              subtitle="Still unsure? Call your nearest store and a technician will help."
            />
            <div className="border-t border-ink/15">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-ink-faint transition-transform group-open:-rotate-90" />
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div>
              <SectionHeading index="06" eyebrow="Where" title={`Get ${service.name.toLowerCase()} near you.`} />
              <ul className="mt-8 grid gap-x-8 border-t border-ink/15 sm:grid-cols-2">
                {locations.map((location) => (
                  <li key={location.slug} className="border-b border-ink/10">
                    <Link href={`/locations/${location.slug}`} className="group flex items-center justify-between py-3">
                      <span>
                        <span className="block font-medium text-ink group-hover:text-brand-mintDark">{location.name}</span>
                        <span className="block text-sm text-ink-soft">
                          {location.city}, {location.state}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading index="07" eyebrow="Related" title="Other repairs we do." />
              <ul className="mt-8 border-t border-ink/15">
                {related.map((item) => (
                  <li key={item.slug} className="border-b border-ink/10">
                    <Link href={`/services/${item.slug}`} className="group flex items-center justify-between gap-6 py-4">
                      <span>
                        <span className="block font-display text-lg font-medium text-ink group-hover:text-brand-mintDark">
                          {item.name}
                        </span>
                        <span className="block text-sm text-ink-soft">{item.tagline}</span>
                      </span>
                      <span className="shrink-0 font-mono text-sm text-ink">from {item.priceFrom}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
