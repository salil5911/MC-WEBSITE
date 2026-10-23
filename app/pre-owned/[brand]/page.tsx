import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Fact } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { SeriesCard } from "@/components/series-card"
import { FadeIn, Float, Stagger, StaggerItem } from "@/components/motion/primitives"
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
      <Nav tone="light" />
      <main>
        <PageHeader
          tone="light"
          breadcrumbs={[
            { name: "Pre-owned phones", path: "/pre-owned" },
            { name: brand.name, path: `/pre-owned/${brand.slug}` },
          ]}
          eyebrow="Certified pre-owned"
          title={`Certified pre-owned ${brand.name}`}
          intro={brand.description}
          actions={
            <>
              <ButtonLink href="#series" variant="dark">
                See every series
              </ButtonLink>
              <ButtonLink href="/locations" variant="outline" arrow={false}>
                Check stock at a store
              </ButtonLink>
            </>
          }
          media={
            <div className="relative mx-auto aspect-square w-full max-w-xl">
              <Float className="absolute inset-0">
                <Image
                  src={`/pre-owned/${brand.slug}-device.webp`}
                  alt={`Certified pre-owned ${brand.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-contain feather"
                />
              </Float>
              <span className="absolute bottom-[8%] left-[6%] block h-12 w-32">
                <Image src={brand.logo} alt={`${brand.name} logo`} fill sizes="128px" className="object-contain object-left" />
              </span>
            </div>
          }
        >
          <Fact tone="light" label="Series in stock" value={brand.series.length} />
          <Fact tone="light" label="Models to choose from" value={brand.series.reduce((n, s) => n + s.models.length, 0)} />
          <Fact tone="light" label="Warranty" value="60 days" />
          <Fact tone="light" label="Carrier" value="Unlocked" />
        </PageHeader>

        <section id="series" className="scroll-mt-20 bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Shop by series"
              title={`Every ${brand.name} generation we carry.`}
              subtitle={`Every ${brand.name} we sell is unlocked, inspected on a multi-point checklist, and covered by our 60-day warranty. Colors and storage vary by store, so call ahead or visit to see what is in stock.`}
            />
            <Stagger as="ul" className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {brand.series.map((series) => (
                <StaggerItem as="li" key={series.slug}>
                  <SeriesCard series={series} />
                </StaggerItem>
              ))}
            </Stagger>
            {others.length > 0 && (
              <FadeIn as="p" className="mt-16 text-lg text-ink-soft">
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
              </FadeIn>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
