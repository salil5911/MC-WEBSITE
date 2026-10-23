import type { Metadata } from "next"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { accessoryBrands } from "@/lib/brands"

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
        />

        <section className="bg-white py-20 sm:py-28" aria-labelledby="brands-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading index="01" eyebrow="Brands" title={`${accessoryBrands.length} brands, all in one place.`} />
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
              {accessoryBrands.map((brand) => (
                <li key={brand.name} className={`flex h-32 items-center justify-center p-6 ${brand.dark ? "bg-ink" : "bg-white"}`}>
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={180}
                    height={80}
                    className={`max-h-14 w-auto object-contain ${brand.dark ? "" : "mix-blend-multiply"}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading index="02" eyebrow="What we carry" title="Everything your device needs." />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((item, i) => (
                <li key={item.title} className="border-t border-ink/15 pt-5">
                  <span className="font-mono text-xs text-brand-mintDark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
