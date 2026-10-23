import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { BrandMarquee } from "@/components/brand-marquee"
import { Reveal } from "@/components/reveal"

export function AccessoriesBrands({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-brand-cream ${className}`} aria-labelledby="accessories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Accessories"
            title="Premium Accessories From Brands You Trust"
            subtitle="Cases, chargers, audio, and screen protection for your devices — we stock the industry's most trusted names."
          />
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <BrandMarquee />
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/accessories"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-mintDark"
          >
            Shop Accessories
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
