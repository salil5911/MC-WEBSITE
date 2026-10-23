import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, ShieldCheck, Unlock, BadgeCheck, Sparkles } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { preOwnedBrands } from "@/lib/pre-owned"

export const metadata: Metadata = {
  title: "Certified Pre-Owned Phones | Mobile Care USA",
  description:
    "Shop certified pre-owned Apple iPhone and Samsung Galaxy phones — fully unlocked, never repaired, and backed by a 60-day warranty. Browse by brand and series.",
  alternates: { canonical: "https://mobilecareusa.com/pre-owned" },
}

const guarantees = [
  {
    icon: Unlock,
    title: "Fully Unlocked",
    description: "Works with any carrier out of the box — AT&T, T-Mobile, Verizon, and more. No contracts, no locks.",
  },
  {
    icon: BadgeCheck,
    title: "Never Repaired",
    description: "Every device is 100% original with genuine parts. No aftermarket screens, batteries, or components.",
  },
  {
    icon: ShieldCheck,
    title: "60-Day Warranty",
    description: "Buy with confidence. Every certified device is covered by our 60-day warranty against defects.",
  },
  {
    icon: Sparkles,
    title: "Certified & Tested",
    description: "Each phone passes a full multi-point inspection for performance, battery health, and functionality.",
  },
]

export default function PreOwnedPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pre-Owned Phones", path: "/pre-owned" }])} />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
              <ShieldCheck className="h-4 w-4" />
              Certified Pre-Owned
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Certified pre-owned phones you can trust
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300 sm:text-xl text-pretty">
              Premium pre-owned Apple iPhone and Samsung Galaxy devices — fully unlocked, never repaired, and backed by
              our 60-day warranty. Browse by brand and series to find your next phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#brands">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-7 py-6 rounded-xl font-semibold">
                  Shop by Brand
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The Mobile Care Promise"
              title="Every device, certified to a higher standard"
              subtitle="We don't just resell phones — we certify them. Here's what comes with every pre-owned device."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item, index) => (
              <Reveal key={item.title} variant="fade-up" delay={index * 100}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="scroll-mt-24 bg-brand-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Shop by Brand"
              title="Find your next phone"
              subtitle="Browse our certified pre-owned lineup by brand. Every model is fully unlocked and warranty-backed."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {preOwnedBrands.map((brand, index) => (
              <Reveal key={brand.slug} variant="fade-up" delay={(index % 2) * 120}>
                <Link
                  href={`/pre-owned/${brand.slug}`}
                  className="group flex h-full flex-col items-center overflow-hidden rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-10"
                >
                  <div className="flex h-40 w-full items-center justify-center">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={320}
                      height={160}
                      className="h-32 w-auto max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-brand-dark">{brand.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{brand.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-mintDark">
                    Shop {brand.name} · {brand.series.length} series
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-20">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              See it in person before you buy
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Visit any Mobile Care location to hold, test, and take home your certified pre-owned device today.
            </p>
            <div className="mt-8">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> Fully unlocked
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> Never repaired
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> 60-day warranty
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
