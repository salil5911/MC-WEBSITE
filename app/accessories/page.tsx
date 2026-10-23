import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Smartphone, BatteryCharging, Headphones, ShieldCheck, Package } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { BrandMarquee } from "@/components/brand-marquee"

export const metadata: Metadata = {
  title: "Device Accessories | Mobile Care USA",
  description:
    "Shop premium phone and device accessories from trusted brands — cases, chargers, power banks, audio, and screen protection from OtterBox, Belkin, Anker, Spigen, JBL, and more.",
  alternates: { canonical: "https://mobilecareusa.com/accessories" },
}

const categories = [
  {
    icon: Smartphone,
    title: "Cases & Protection",
    description: "Rugged and slim cases plus tempered-glass screen protectors that keep your device safe.",
  },
  {
    icon: BatteryCharging,
    title: "Charging & Power",
    description: "Fast chargers, wireless pads, cables, and power banks to keep you powered all day.",
  },
  {
    icon: Headphones,
    title: "Audio",
    description: "Earbuds, headphones, and portable speakers from the brands you already love.",
  },
  {
    icon: ShieldCheck,
    title: "Screen Protection",
    description: "Precision-fit tempered glass and film to guard against scratches and drops.",
  },
]

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accessories", path: "/accessories" }])} />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
              <Package className="h-4 w-4" />
              Premium Accessories
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Accessories from the brands you trust
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300 sm:text-xl text-pretty">
              We stock cases, chargers, audio, and screen protection from the industry&apos;s most trusted names — stop
              by any location to find the perfect match for your device.
            </p>
            <div className="mt-8">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-7 py-6 rounded-xl font-semibold">
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white py-16 sm:py-24" aria-labelledby="brands-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Brands"
              title="Trusted brands, all in one place"
              subtitle="From everyday essentials to premium protection, we carry accessories from the names that lead the industry."
            />
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <BrandMarquee />
        </Reveal>
      </section>

      {/* Categories */}
      <section className="bg-brand-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What We Carry"
              title="Everything for your device"
              subtitle="Whatever you need to protect, power, and get the most from your device, we have you covered."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.title} variant="fade-up" delay={index * 100}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{category.description}</p>
                </div>
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
              Find your accessories in store
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Our team will help you pick the right case, charger, or audio gear for your device.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> Genuine brand products
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> Expert recommendations
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> In-store fitting
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
