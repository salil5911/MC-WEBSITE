import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Spec } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
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

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params
  const brand = getPreOwnedBrand(slug)
  if (!brand) notFound()
  const others = preOwnedBrands.filter((b) => b.slug !== brand.slug)

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[
            { name: "Pre-owned phones", path: "/pre-owned" },
            { name: brand.name, path: `/pre-owned/${brand.slug}` },
          ]}
          eyebrow="Certified pre-owned"
          title={`Certified pre-owned ${brand.name}`}
          intro={brand.description}
          actions={<ButtonLink href="/locations">Check stock at a store</ButtonLink>}
          aside={
            <div>
              <div className="flex h-36 items-center justify-center rounded-md bg-white p-8">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={240}
                  height={120}
                  priority
                  className="h-full w-auto object-contain"
                />
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-6">
                <Spec label="Series" value={brand.series.length} />
                <Spec label="Warranty" value="60 days" />
                <Spec label="Carrier" value="Unlocked" />
              </dl>
            </div>
          }
        />

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="Shop by series"
                title={`Every ${brand.name} generation we carry.`}
                subtitle={`Every ${brand.name} we sell is unlocked, inspected on a multi-point checklist, and covered by our 60-day warranty. Colors and storage vary by store, so call ahead or visit to see what is in stock.`}
              />
            </Reveal>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {brand.series.map((series) => (
                <li key={series.slug}>
                  <SeriesCard series={series} />
                </li>
              ))}
            </ul>
            {others.length > 0 && (
              <p className="mt-10 text-ink-soft">
                Also available:{" "}
                {others.map((other, i) => (
                  <span key={other.slug}>
                    {i > 0 && ", "}
                    <Link href={`/pre-owned/${other.slug}`} className="font-medium text-ink underline-offset-4 hover:underline">
                      certified pre-owned {other.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
