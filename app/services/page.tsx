import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/icons"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/primitives"
import { ReviewsSection, ClosingCta } from "@/components/home/sections"
import { services } from "@/lib/services"

export const revalidate = 43200

export const metadata: Metadata = {
  title: "Phone & Tablet Repair Services in GA, VA, NC & MI | Mobile Care USA",
  description:
    "Screen, back glass, charging port, battery, camera, and water damage repair. Most repairs done in under an hour, backed by a 30-day warranty.",
  alternates: { canonical: "https://mobilecareusa.com/services" },
  openGraph: {
    title: "Phone & Tablet Repair Services | Mobile Care USA",
    description:
      "Screen, back glass, charging port, battery, camera, and water damage repair. Most repairs done in under an hour, backed by a 30-day warranty.",
    url: "https://mobilecareusa.com/services",
    type: "website",
  },
}

const commitments = [
  {
    title: "Certified technicians",
    description: "Every repair is done in store by a trained technician, not shipped out to a third party.",
  },
  {
    title: "A quote before we start",
    description: "Diagnostics are free. You get a fixed price and approve it before any work begins.",
  },
  {
    title: "Most repairs in under an hour",
    description: "We stock parts for the most common models, so screens and batteries are usually same day.",
  },
  {
    title: "30-day warranty",
    description: "Parts and labor are covered. If the repair fails, bring it back and we make it right.",
  },
]

export default function ServicesPage() {
  const cheapest = services.reduce((min, s) =>
    Number(s.priceFrom.replace(/\D/g, "")) < Number(min.priceFrom.replace(/\D/g, "")) ? s : min,
  )

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Repairs", path: "/services" }]}
          eyebrow="Repair services"
          title="Fast, honest repairs for the devices you rely on."
          intro="From cracked screens to failing batteries, our technicians repair every major brand. Most repairs take less than an hour, and every one is backed by a 30-day warranty."
          actions={
            <>
              <ButtonLink href="/locations">Find a store</ButtonLink>
              <ButtonLink href="#repairs" variant="outline-light" arrow={false}>
                Compare repairs
              </ButtonLink>
            </>
          }
          media={
            <HeaderPhoto
              src="/hero-repair.webp"
              alt="A Mobile Care technician repairing a smartphone"
              caption={
                <span className="flex items-center justify-between gap-4">
                  <span className="font-medium">Screen, battery, port, camera, glass, water</span>
                  <span className="text-white/70">from {cheapest.priceFrom}</span>
                </span>
              }
            />
          }
        >
          <Fact label="Repairs start at" value={cheapest.priceFrom} />
          <Fact label="Typical repair time" value="30-60 min" />
          <Fact label="Warranty on every repair" value="30 days" />
          <Fact label="Diagnostics" value="Free" />
        </PageHeader>

        <section id="repairs" className="scroll-mt-20 bg-paper py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="What we fix"
              title="Six repairs, each with a clear process and price."
              subtitle="Open any repair to see what is included, how we do it, and what it costs."
            />
            <ol className="mt-16 space-y-6">
              {services.map((service, i) => (
                <FadeIn as="li" key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid items-center gap-8 rounded-[2rem] p-3 transition-colors duration-500 hover:bg-white sm:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr_auto] lg:gap-12 lg:pr-10"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-paper-deep">
                      <Image
                        src={service.image}
                        alt={`${service.name} at Mobile Care USA`}
                        fill
                        sizes="(max-width: 640px) 100vw, 22rem"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </span>
                    <span className="block px-2 sm:px-0">
                      <span className="text-[0.95rem] font-medium text-brand-mintDark">
                        Repair {i + 1} of {services.length}
                      </span>
                      <span className="mt-2 block font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
                        {service.name}
                      </span>
                      <span className="mt-3 block max-w-xl text-lg leading-relaxed text-ink-soft">{service.summary}</span>
                      <span className="mt-5 flex gap-8 text-ink-soft">
                        <span>
                          From <span className="font-semibold text-ink">{service.priceFrom}</span>
                        </span>
                        <span>{service.turnaround}</span>
                      </span>
                    </span>
                    <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white lg:flex">
                      <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our standard" title="What every repair includes." />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {commitments.map((item, i) => (
                <StaggerItem as="li" key={item.title}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ReviewsSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
