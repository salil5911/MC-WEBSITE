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
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/primitives"
import { Accordion } from "@/components/motion/accordion"
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
          intro={service.summary}
          actions={
            <>
              <ButtonLink href="/locations">Find a store</ButtonLink>
              <ButtonLink href="#process" variant="outline-light" arrow={false}>
                How it works
              </ButtonLink>
            </>
          }
          media={<HeaderPhoto src={service.image} alt={`${service.name} being done by a Mobile Care technician`} />}
        >
          <Fact label="Starting price" value={service.priceFrom} />
          <Fact label="Typical time" value={service.turnaround} />
          <Fact label="Parts and labor warranty" value="30 days" />
          <Fact label="Diagnostic" value="Free" />
        </PageHeader>

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:px-8">
            <div>
              <SectionHeading eyebrow="Overview" title={`How we handle ${service.name.toLowerCase()}.`} />
              <FadeIn as="p" className="mt-8 text-xl leading-relaxed text-ink-soft">
                {service.overview}
              </FadeIn>
            </div>
            <FadeIn className="lg:pt-20">
              <h3 className="font-display text-2xl font-semibold text-ink">What&apos;s included</h3>
              <ul className="mt-6 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-ink">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mint text-ink">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        <section id="process" className="scroll-mt-20 bg-ink py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              light
              eyebrow="Process"
              title="How the repair works."
              subtitle="No appointment needed. Here is what happens after you walk in."
            />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <StaggerItem as="li" key={step.title}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{index + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-white/65">{step.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <SectionHeading eyebrow="When to visit" title={`Signs you need a ${service.shortName.toLowerCase()}.`} />
              <ul className="mt-10 space-y-4">
                {service.signs.map((sign) => (
                  <FadeIn as="li" key={sign} className="flex items-start gap-4 text-lg text-ink">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mint text-ink">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {sign}
                  </FadeIn>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Terms" title="What our technicians mean." />
              <dl className="mt-10 space-y-8">
                {service.glossary.map((item) => (
                  <FadeIn key={item.term}>
                    <dt className="font-display text-xl font-semibold text-ink">{item.term}</dt>
                    <dd className="mt-2 text-lg leading-relaxed text-ink-soft">{item.definition}</dd>
                  </FadeIn>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Questions"
                title={`${service.shortName} questions.`}
                subtitle="Still unsure? Call your nearest store and a technician will help."
              />
            </div>
            <Accordion items={service.faqs} />
          </div>
        </section>

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <SectionHeading eyebrow="Where" title={`Get ${service.name.toLowerCase()} near you.`} />
              <Stagger as="ul" className="mt-10 grid gap-x-8 sm:grid-cols-2">
                {locations.map((location) => (
                  <StaggerItem as="li" key={location.slug}>
                    <Link href={`/locations/${location.slug}`} className="group flex items-center justify-between py-3">
                      <span>
                        <span className="block text-lg font-medium text-ink group-hover:text-brand-mintDark">
                          {location.name}
                        </span>
                        <span className="block text-ink-soft">
                          {location.city}, {location.state}
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <SectionHeading eyebrow="Related" title="Other repairs we do." />
              <Stagger as="ul" className="mt-10 space-y-3">
                {related.map((item) => (
                  <StaggerItem as="li" key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="group flex items-center gap-5 rounded-[1.5rem] p-2 transition-colors hover:bg-white"
                    >
                      <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl">
                        <Image src={item.image} alt={`${item.name} at Mobile Care USA`} fill sizes="96px" className="object-cover" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-xl font-semibold text-ink group-hover:text-brand-mintDark">
                          {item.name}
                        </span>
                        <span className="block text-ink-soft">from {item.priceFrom}</span>
                      </span>
                      <ArrowRight className="mr-3 h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
