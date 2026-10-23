import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/icons"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Spec } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
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
  const cheapest = services.reduce((min, s) => (Number(s.priceFrom.replace(/\D/g, "")) < Number(min.priceFrom.replace(/\D/g, "")) ? s : min))

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Repairs", path: "/services" }]}
          eyebrow="Repair services"
          title="Fast, honest repairs for the devices you rely on."
          intro="From cracked screens to failing batteries, our technicians repair every major brand. Most repairs take less than an hour and every one is backed by a 30-day warranty."
          actions={
            <>
              <ButtonLink href="/locations">Find a store</ButtonLink>
              <ButtonLink href="#repairs" variant="outline-light" arrow={false}>
                Compare repairs
              </ButtonLink>
            </>
          }
          aside={
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              <Spec label="Repairs from" value={cheapest.priceFrom} />
              <Spec label="Typical time" value="30-60 min" />
              <Spec label="Warranty" value="30 days" />
              <Spec label="Diagnostics" value="Free" />
            </dl>
          }
        />

        <section id="repairs" className="scroll-mt-20 bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="What we fix"
                title="Six repairs, each with a clear process and price."
                subtitle="Open any repair to see what is included, how we do it, and what it costs."
              />
            </Reveal>
            <ol className="mt-14 border-t border-ink/15">
              {services.map((service, i) => (
                <li key={service.slug} className="border-b border-ink/15">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid gap-6 py-8 sm:grid-cols-[12rem_1fr] lg:grid-cols-[3rem_14rem_1fr_10rem_1.5rem] lg:items-center"
                  >
                    <span className="hidden font-mono text-xs text-ink-faint lg:block">{String(i + 1).padStart(2, "0")}</span>
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-md bg-paper-deep">
                      <Image
                        src={service.image}
                        alt={`${service.name} at Mobile Care USA`}
                        fill
                        sizes="(max-width: 640px) 100vw, 14rem"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-brand-mintDark">
                        {service.name}
                      </span>
                      <span className="mt-2 block max-w-xl leading-relaxed text-ink-soft">{service.summary}</span>
                    </span>
                    <span className="flex gap-8 font-mono text-sm text-ink sm:col-start-2 lg:col-start-auto lg:block lg:space-y-3">
                      <span className="block">
                        <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">From</span>
                        {service.priceFrom}
                      </span>
                      <span className="block">
                        <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">Time</span>
                        {service.turnaround.replace("–", "-")}
                      </span>
                    </span>
                    <ArrowRight className="hidden h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading index="02" eyebrow="Our standard" title="What every repair includes." />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {commitments.map((item, i) => (
                <li key={item.title} className="border-t border-ink/15 pt-5">
                  <span className="font-mono text-xs text-brand-mintDark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ReviewsSection index="03" />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
