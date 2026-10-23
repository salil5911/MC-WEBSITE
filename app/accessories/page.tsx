import type { Metadata } from "next"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem, VelocityMarquee } from "@/components/motion/primitives"
import { BrandMark, ClosingCta } from "@/components/home/sections"
import { accessoryBrands, monoLogo } from "@/lib/brands"

export const metadata: Metadata = {
  title: "Device Accessories | Mobile Care USA",
  description:
    "Shop premium phone and device accessories from trusted brands: cases, chargers, power banks, audio, and screen protection from OtterBox, Belkin, Anker, Spigen, JBL, and more.",
  alternates: { canonical: "https://mobilecareusa.com/accessories" },
}

const categories = [
  {
    title: "Cases and protection",
    description: "Rugged and slim cases, plus tempered-glass screen protectors fitted in store so they go on straight.",
  },
  {
    title: "Charging and power",
    description: "Fast chargers, wireless pads, cables, and power banks matched to what your device actually supports.",
  },
  {
    title: "Audio",
    description: "Earbuds, headphones, and portable speakers from the brands you already know.",
  },
  {
    title: "Screen protection",
    description: "Precision-fit tempered glass and film that guards phones and tablets against scratches and drops.",
  },
]

export default function AccessoriesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Accessories", path: "/accessories" }]}
          eyebrow="In-store accessories"
          title="Accessories from the brands we trust."
          intro="Cases, chargers, audio, and screen protection from the names that lead the industry. Stop by any store and we will help you pick the right fit for your device."
          actions={<ButtonLink href="/locations">Find a store</ButtonLink>}
          media={<HeaderPhoto src="/store-interior.webp" alt="Accessory walls inside a Mobile Care USA store" />}
        >
          <Fact label="Brands in store" value={accessoryBrands.length} />
          <Fact label="Categories" value={categories.length} />
          <Fact label="Fitted in store" value="Yes" />
          <Fact label="Stores stocking them" value="8" />
        </PageHeader>

        <section aria-label="Brands we carry" className="space-y-8 bg-ink py-14">
          <VelocityMarquee baseVelocity={-2}>
            {accessoryBrands.map((brand) => (
              <BrandMark key={brand.name} name={brand.name} logo={brand.logo} />
            ))}
          </VelocityMarquee>
          <VelocityMarquee baseVelocity={2}>
            {[...accessoryBrands].reverse().map((brand) => (
              <BrandMark key={brand.name} name={brand.name} logo={brand.logo} />
            ))}
          </VelocityMarquee>
        </section>

        <section className="bg-white py-24 sm:py-32" aria-labelledby="brands-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Brands" title={`${accessoryBrands.length} brands, all in one place.`} />
            <Stagger as="ul" gap={0.05} className="mt-16 grid grid-cols-2 gap-x-10 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
              {accessoryBrands.map((brand) => (
                <StaggerItem as="li" key={brand.name} className="group flex flex-col items-center">
                  <span className="relative block h-16 w-full transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={monoLogo(brand.logo)}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="(max-width: 640px) 45vw, 18vw"
                      className="object-contain opacity-75 brightness-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-4 text-[0.95rem] text-ink-soft">{brand.name}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="What we carry" title="Everything your device needs." />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((item, i) => (
                <StaggerItem as="li" key={item.title}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
