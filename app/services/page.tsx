import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, ShieldCheck, Clock, BadgeCheck, Wallet, Wrench } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ServicesReviews } from "@/components/services-reviews"
import { services } from "@/lib/services"

export const revalidate = 43200

export const metadata: Metadata = {
  title: "Phone & Tablet Repair Services in GA, VA, NC & MI | Mobile Care USA",
  description:
    "Screen, back glass, charging port, battery, camera, and water damage repair. Most repairs done in under an hour, backed by a 30-day warranty.",
  alternates: { canonical: "https://mobilecareusa.com/services" },
  openGraph: {
    title: "Phone & Tablet Repair Services | Mobile Care USA",
    description:
      "Screen, back glass, charging port, battery, camera, and water damage repair. Most repairs done in under an hour, backed by a 30-day warranty.",
    url: "https://mobilecareusa.com/services",
    type: "website",
  },
}

const trustFactors = [
  {
    icon: BadgeCheck,
    title: "Certified Technicians",
    description: "Highly skilled, certified experts with years of hands-on mobile device repair experience.",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Warranty",
    description: "Every repair is backed by our 30-day warranty covering both parts and labor.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most repairs are completed in under an hour, minimizing your downtime.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Transparent, competitive quotes with no hidden fees — and free diagnostics.",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Repair Services", path: "/services" }])} />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
              <Wrench className="h-4 w-4" />
              Expert Repair Services
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Fast, affordable device repair
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300 sm:text-xl text-pretty">
              From cracked screens to failing batteries, our certified technicians repair all major brands — most in
              under an hour, every repair backed by a 30-day warranty.
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

      {/* Service grid */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What We Fix"
              title="Our most-requested repairs"
              subtitle="Tap any service to see what's included, how the process works, and what it costs."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Reveal key={service.slug} variant="fade-up" delay={(index % 3) * 100}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-xl"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-brand-mintDark shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="absolute bottom-3 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-dark">
                        From {service.priceFrom}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-bold text-brand-dark">{service.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{service.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-mintDark">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust factors */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Mobile Care"
              title="Repairs you can rely on"
              subtitle="We combine expertise, quality parts, and honest pricing on every single repair."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustFactors.map((factor, index) => (
              <Reveal key={factor.title} variant="fade-up" delay={index * 100}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark">
                    <factor.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{factor.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{factor.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ServicesReviews className="bg-white py-16 sm:py-24" />

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-20">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Need a repair? Get in touch now
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Most repairs completed in under an hour. Walk in to your nearest location today.
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
                <Check className="h-4 w-4 text-brand-mint" /> No appointment needed
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> Free diagnostics
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-mint" /> 30-day warranty
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
