import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Unlock, BadgeCheck, ShieldCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { preOwnedBrands } from "@/lib/pre-owned"

const chips = [
  { icon: Unlock, label: "Fully unlocked" },
  { icon: BadgeCheck, label: "Never repaired" },
  { icon: ShieldCheck, label: "60-day warranty" },
]

export function PreOwnedHighlight({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Certified Pre-Owned"
            title="Premium phones, half the worry"
            subtitle="Certified pre-owned Apple iPhone and Samsung Galaxy devices — fully unlocked, never repaired, and backed by our 60-day warranty."
          />
        </Reveal>

        <Reveal>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {chips.map((chip) => (
              <li key={chip.label} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <chip.icon className="h-4 w-4 text-brand-mintDark" />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {preOwnedBrands.map((brand, index) => (
            <Reveal key={brand.slug} variant="fade-up" delay={index * 100}>
              <Link
                href={`/pre-owned/${brand.slug}`}
                className="group flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-10"
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
                <h3 className="mt-6 font-display text-xl font-bold text-brand-dark">{brand.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{brand.series.length} series available</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-mintDark">
                  Shop now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pre-owned"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            View all pre-owned phones
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
