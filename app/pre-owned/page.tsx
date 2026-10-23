import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Spec } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ArrowRight } from "@/components/icons"
import { preOwnedBrands } from "@/lib/pre-owned"

export const metadata: Metadata = {
  title: "Certified Pre-Owned Phones | Mobile Care USA",
  description:
    "Shop certified pre-owned Apple iPhone and Samsung Galaxy phones. Fully unlocked, never repaired, and backed by a 60-day warranty. Browse by brand and series.",
  alternates: { canonical: "https://mobilecareusa.com/pre-owned" },
}

const guarantees = [
  {
    title: "Fully unlocked",
    description: "Works with any carrier out of the box, including AT&T, T-Mobile, and Verizon. No contracts and no locks.",
  },
  {
    title: "Never repaired",
    description: "Every device is original, with genuine parts. No aftermarket screens, batteries, or components.",
  },
  {
    title: "60-day warranty",
    description: "Every certified device is covered against defects for 60 days from the day you buy it.",
  },
  {
    title: "Certified and tested",
    description: "Each phone passes a multi-point inspection covering performance, battery health, and every function.",
  },
]

export default function PreOwnedPage() {
  const seriesCount = preOwnedBrands.reduce((n, b) => n + b.series.length, 0)
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Pre-owned phones", path: "/pre-owned" }]}
          eyebrow="Certified pre-owned"
          title="Pre-owned phones, certified before they reach the shelf."
          intro="Apple iPhone and Samsung Galaxy phones that are fully unlocked, never repaired, and backed by our 60-day warranty. Browse by brand and series, then see them in any store."
          actions={
            <>
              <ButtonLink href="#brands">Shop by brand</ButtonLink>
              <ButtonLink href="/locations" variant="outline-light" arrow={false}>
                Find a store
              </ButtonLink>
            </>
          }
          aside={
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              <Spec label="Brands" value={preOwnedBrands.length} />
              <Spec label="Series in stock" value={seriesCount} />
              <Spec label="Warranty" value="60 days" />
              <Spec label="Carrier" value="Unlocked" />
            </dl>
          }
        />

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="Our standard"
                title="What certified means at Mobile Care."
                subtitle="We don't just resell phones. Every one is checked against the same standard before it goes on sale."
              />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((item, i) => (
                <li key={item.title} className="border-t border-ink/15 pt-5">
                  <span className="font-mono text-xs text-brand-mintDark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="brands" className="scroll-mt-20 bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading index="02" eyebrow="Shop by brand" title="Find your next phone." />
            </Reveal>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {preOwnedBrands.map((brand) => (
                <li key={brand.slug} className="bg-white">
                  <Link
                    href={`/pre-owned/${brand.slug}`}
                    className="group flex h-full flex-col p-8 transition-colors hover:bg-paper sm:p-10"
                  >
                    <div className="flex h-28 items-center">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={`${brand.name} logo`}
                        width={240}
                        height={120}
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-medium text-ink">{brand.name}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{brand.tagline}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink">
                      {brand.series.length} series
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ClosingCtaPreOwned />
      </main>
      <Footer />
    </>
  )
}

function ClosingCtaPreOwned() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-8">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Hold it, test it, <span className="text-brand-mint">then take it home.</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Stock varies by store. Visit any Mobile Care location to see what is available today.
          </p>
        </div>
        <ButtonLink href="/locations">Find your nearest store</ButtonLink>
      </div>
    </section>
  )
}
