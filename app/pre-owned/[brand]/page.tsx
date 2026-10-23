import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Unlock, BadgeCheck } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SeriesCard } from "@/components/series-card"
import { preOwnedBrands, getPreOwnedBrand } from "@/lib/pre-owned"

export function generateStaticParams() {
  return preOwnedBrands.map((brand) => ({ brand: brand.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand: slug } = await params
  const brand = getPreOwnedBrand(slug)
  if (!brand) return { title: "Not Found" }

  return {
    title: `Certified Pre-Owned ${brand.name} Phones | Mobile Care USA`,
    description: brand.description,
    alternates: { canonical: `https://mobilecareusa.com/pre-owned/${brand.slug}` },
  }
}

const promiseChips = [
  { icon: Unlock, label: "Fully unlocked" },
  { icon: BadgeCheck, label: "Never repaired" },
  { icon: ShieldCheck, label: "60-day warranty" },
]

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params
  const brand = getPreOwnedBrand(slug)
  if (!brand) notFound()

  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pre-Owned Phones", path: "/pre-owned" },
          { name: brand.name, path: `/pre-owned/${brand.slug}` },
        ])}
      />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/pre-owned"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-brand-mint"
          >
            <ArrowLeft className="h-4 w-4" />
            All brands
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8">
            <div className="flex h-28 w-56 items-center justify-center rounded-2xl bg-white p-6">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={220}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl text-balance">
                Certified Pre-Owned {brand.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-300 text-pretty">{brand.description}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {promiseChips.map((chip) => (
                  <li key={chip.label} className="flex items-center gap-2 text-sm font-medium text-gray-200">
                    <chip.icon className="h-4 w-4 text-brand-mint" />
                    {chip.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Series grid */}
      <section className="bg-brand-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">Shop by series</h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Choose your generation below to see the models we carry. Every {brand.name} we sell is fully unlocked,
                inspected across a multi-point checklist, and backed by our 60-day warranty. Exact availability and
                colors vary by store — visit any Mobile Care location to see what&apos;s in stock.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-sm font-medium text-brand-dark">Available generations</span>
              <span className="text-sm font-medium text-gray-500">{brand.series.length} series</span>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brand.series.map((series, index) => (
              <Reveal key={series.slug} variant="fade-up" delay={(index % 3) * 80}>
                <SeriesCard series={series} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-20">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to grab your {brand.name}?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Availability varies by store. Visit a Mobile Care location to check current stock and take your certified
              device home today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/pre-owned">
                <Button
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl font-semibold"
                >
                  Browse other brands
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-300">
              {promiseChips.map((chip) => (
                <li key={chip.label} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-mint" /> {chip.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
