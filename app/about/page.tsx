import type { Metadata } from "next"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Spec } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ClosingCta } from "@/components/home/sections"

export const metadata: Metadata = {
  title: "About Us | Mobile Care USA",
  description:
    "Learn the story behind Mobile Care USA: certified technicians, quality parts, and honest pricing across our mall-based repair stores in Georgia, Virginia, North Carolina, and Michigan.",
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
    title: "Integrity first",
    description:
      "Honest diagnostics and clear quotes. If a repair isn't worth it, we tell you. No upsells and no surprises.",
  },
  {
    title: "Craftsmanship",
    description:
      "Our technicians use quality-tested parts and proven techniques, so the repair holds up long after you leave.",
  },
  {
    title: "Respect for your time",
    description:
      "Most repairs are done the same day, often in under an hour. Drop it off, finish your errands, and pick it up.",
  },
  {
    title: "People over transactions",
    description:
      "We treat every customer like a neighbor. That relationship, not a single sale, is what keeps our stores busy.",
  },
]

const process = [
  {
    step: "01",
    title: "Free diagnosis",
    description:
      "Walk in and we inspect your device on the spot, find the problem, and explain your options in plain language.",
  },
  {
    step: "02",
    title: "Clear quote",
    description: "You get an itemized price before any work begins. No hidden fees and no add-ons at checkout.",
  },
  {
    step: "03",
    title: "Expert repair",
    description: "A technician completes most repairs in under an hour using quality-tested parts, right in the store.",
  },
  {
    step: "04",
    title: "Tested and warrantied",
    description: "We check every fix before handing it back, and back it with our 30-day repair warranty.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "About", path: "/about" }]}
          eyebrow="About Mobile Care"
          title="Repair experts your neighborhood can trust."
          intro="Mobile Care began with a simple idea: device repair should be fast, honest, and done by people who care. A decade later, that idea runs eight stores across four states."
        >
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <Spec key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </dl>
        </PageHeader>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="Mission"
                title="Getting your device back to like-new, the right way."
                subtitle="We want expert repair to feel accessible, transparent, and reassuring. No jargon and no pressure, just skilled technicians who treat your device like their own."
              />
              <div className="mt-8 space-y-5 border-t border-ink/15 pt-6 text-ink-soft">
                <p>
                  <span className="font-medium text-ink">Quality parts, every time.</span> We never cut corners on
                  components, because a cheap fix that fails isn&apos;t a fix at all.
                </p>
                <p>
                  <span className="font-medium text-ink">A team you&apos;ll remember.</span> Friendly, trained, and happy
                  to explain exactly what your device needs.
                </p>
              </div>
              <ButtonLink href="/locations" variant="dark" className="mt-8">
                Visit a store
              </ButtonLink>
            </Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/store-interior.webp"
                alt="Technicians helping customers inside a Mobile Care USA store"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading index="02" eyebrow="Values" title="What we hold ourselves to." />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item, i) => (
                <li key={item.title} className="border-t border-ink/15 pt-5">
                  <span className="font-mono text-xs text-brand-mintDark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow="Process"
                title="A repair process with no surprises."
                subtitle="From the moment you walk in to the moment you leave, here is what to expect."
              />
            </Reveal>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item) => (
                <li key={item.step} className="border-t border-ink/15 pt-5">
                  <span className="font-display text-4xl font-semibold text-ink/15">{item.step}</span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
