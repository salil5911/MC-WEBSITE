import type { Metadata } from "next"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, Parallax, Stagger, StaggerItem } from "@/components/motion/primitives"
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
          actions={<ButtonLink href="/locations">Visit a store</ButtonLink>}
          media={<HeaderPhoto src="/hero-repair.webp" alt="A Mobile Care technician at work on a phone" />}
        >
          {stats.map((stat) => (
            <Fact key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </PageHeader>

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Mission"
                title="Getting your device back to like-new, the right way."
                subtitle="We want expert repair to feel accessible, transparent, and reassuring. No jargon and no pressure, just skilled technicians who treat your device like their own."
              />
              <FadeIn className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
                <p>
                  <span className="font-semibold text-ink">Quality parts, every time.</span> We never cut corners on
                  components, because a cheap fix that fails isn&apos;t a fix at all.
                </p>
                <p>
                  <span className="font-semibold text-ink">A team you&apos;ll remember.</span> Friendly, trained, and
                  happy to explain exactly what your device needs.
                </p>
              </FadeIn>
            </div>
            <FadeIn className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Parallax strength={10}>
                <Image
                  src="/store-interior.webp"
                  alt="Technicians helping customers inside a Mobile Care USA store"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Parallax>
            </FadeIn>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Values" title="What we hold ourselves to." />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item, i) => (
                <StaggerItem as="li" key={item.title}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="bg-ink py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              light
              eyebrow="Process"
              title="A repair process with no surprises."
              subtitle="From the moment you walk in to the moment you leave, here is what to expect."
            />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item) => (
                <StaggerItem as="li" key={item.step}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{Number(item.step)}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-white/65">{item.description}</p>
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
