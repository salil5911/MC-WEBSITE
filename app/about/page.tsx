import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Users, ShieldCheck, Clock, Wrench, HeartHandshake, Target, Sparkles, MapPin } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

export const metadata: Metadata = {
  title: "About Us | Mobile Care USA",
  description:
    "Learn the story behind Mobile Care USA — certified technicians, quality parts, and honest pricing across our mall-based repair stores in Georgia, Virginia, North Carolina, and Michigan.",
  alternates: { canonical: "https://mobilecareusa.com/about" },
}

const stats = [
  { value: "8+", label: "Store locations" },
  { value: "1M+", label: "Devices repaired" },
  { value: "4.9", label: "Average rating" },
  { value: "30-Day", label: "Repair warranty" },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity first",
    description:
      "We give honest diagnostics and transparent quotes. If a repair isn't worth it, we'll tell you — no upsells, no surprises.",
  },
  {
    icon: Wrench,
    title: "Craftsmanship",
    description:
      "Our certified technicians use quality-tested parts and proven techniques so every repair holds up long after you leave.",
  },
  {
    icon: Clock,
    title: "Respect for your time",
    description:
      "Most repairs are done the same day, often in under an hour. Walk in, grab a coffee, and your device is ready before you know it.",
  },
  {
    icon: HeartHandshake,
    title: "People over transactions",
    description:
      "We treat every customer like a neighbor. That relationship — not a single sale — is what keeps our stores busy.",
  },
]

const process = [
  {
    step: "01",
    title: "Free diagnosis",
    description:
      "Walk in and we'll inspect your device on the spot, pinpoint the problem, and explain your options in plain language.",
  },
  {
    step: "02",
    title: "Transparent quote",
    description:
      "You get an upfront, itemized price before any work begins. No hidden fees, no surprise add-ons at checkout.",
  },
  {
    step: "03",
    title: "Expert repair",
    description:
      "A certified technician completes most repairs in under an hour using quality-tested parts — right in the store.",
  },
  {
    step: "04",
    title: "Tested & warrantied",
    description:
      "We quality-check every fix before handing it back, and back it with our 30-day repair warranty for peace of mind.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 circuit-pattern opacity-[0.06]" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
                <Sparkles className="h-4 w-4" />
                Our Story
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                Repair experts your neighborhood can trust
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg leading-relaxed text-gray-300 sm:text-xl text-pretty">
                Mobile Care began with a simple idea: device repair should be fast, honest, and done by people who
                genuinely care. A decade later, that idea powers eight stores across four states.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} variant="fade-up" delay={index * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                  <div className="font-display text-3xl font-bold text-brand-mint sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Our Mission"
                title="Getting you back to like-new — the right way"
                subtitle="We're on a mission to make expert device repair accessible, transparent, and genuinely reassuring. No jargon, no pressure, just skilled technicians who treat your device like their own."
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-mint/15 text-brand-mintDark">
                    <Target className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold text-brand-dark">Quality parts, every time.</span> We never cut
                    corners on components — because a cheap fix that fails isn't a fix at all.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-mint/15 text-brand-mintDark">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold text-brand-dark">A team you'll remember.</span> Friendly, certified,
                    and happy to explain exactly what your device needs.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/locations">
                  <Button className="group bg-brand-dark text-white hover:bg-brand-dark/90 text-base px-6 py-6 rounded-xl font-semibold">
                    Visit a store
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid gap-6 sm:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="A simple, no-surprises repair process"
              subtitle="From the moment you walk in to the moment you leave, here's exactly what to expect."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <Reveal key={item.step} variant="fade-up" delay={index * 100}>
                <div className="group relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg">
                  <span className="font-display text-4xl font-bold text-brand-mint/30 transition-colors group-hover:text-brand-mint/60">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-20">
        <div className="absolute inset-0 circuit-pattern opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Come say hello at your nearest store
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Eight locations across Georgia, Virginia, North Carolina, and Michigan — no appointment needed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/locations">
                <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find a Location
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-xl font-semibold"
                >
                  Explore services
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
