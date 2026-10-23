import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader, Fact } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { ArrowRight } from "@/components/icons"
import { FadeIn, Float, Stagger, StaggerItem, WordReveal } from "@/components/motion/primitives"
import { preOwnedBrands } from "@/lib/pre-owned"

export const metadata: Metadata = {
  title: "Certified Pre-Owned Phones | Mobile Care USA",
  description:
    "Shop certified pre-owned Apple iPhone and Samsung Galaxy phones. Fully unlocked, never repaired, and backed by a 60-day warranty. Browse by brand and series.",
  alternates: { canonical: "https://mobilecareusa.com/pre-owned" },
}

const guarantees = [
  {
    title: "Fully unlocked",
    description: "Works with any carrier out of the box, including AT&T, T-Mobile, and Verizon. No contracts and no locks.",
  },
  {
    title: "Never repaired",
    description: "Every device is original, with genuine parts. No aftermarket screens, batteries, or components.",
  },
  {
    title: "60-day warranty",
    description: "Every certified device is covered against defects for 60 days from the day you buy it.",
  },
  {
    title: "Certified and tested",
    description: "Each phone passes a multi-point inspection covering performance, battery health, and every function.",
  },
]

const DEVICE_SHOTS: Record<string, string> = {
  apple: "/pre-owned/apple-device.webp",
  samsung: "/pre-owned/samsung-device.webp",
  google: "/pre-owned/google-device.webp",
  motorola: "/pre-owned/motorola-device.webp",
}

export default function PreOwnedPage() {
  const seriesCount = preOwnedBrands.reduce((n, b) => n + b.series.length, 0)
  return (
    <>
      <Nav tone="light" />
      <main>
        <PageHeader
          tone="light"
          breadcrumbs={[{ name: "Pre-owned phones", path: "/pre-owned" }]}
          eyebrow="Certified pre-owned"
          title="Pre-owned phones, certified before they reach the shelf."
          intro="Apple iPhone and Samsung Galaxy phones that are fully unlocked, never repaired, and backed by our 60-day warranty."
          actions={
            <>
              <ButtonLink href="#brands" variant="dark">
                Shop by brand
              </ButtonLink>
              <ButtonLink href="/locations" variant="outline" arrow={false}>
                Find a store
              </ButtonLink>
            </>
          }
          media={
            <div className="relative mx-auto flex aspect-square max-w-xl items-center justify-center">
              <Float className="relative z-10 -mr-[18%] h-full w-[62%]">
                <Image
                  src="/pre-owned/apple-device.webp"
                  alt="Certified pre-owned iPhone"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-contain feather"
                />
              </Float>
              <Float className="relative h-full w-[62%]" delay={1.8}>
                <Image
                  src="/pre-owned/samsung-device.webp"
                  alt="Certified pre-owned Samsung Galaxy"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-contain feather"
                />
              </Float>
            </div>
          }
        >
          <Fact tone="light" label="Brands" value={preOwnedBrands.length} />
          <Fact tone="light" label="Series in the lineup" value={seriesCount} />
          <Fact tone="light" label="Warranty on every phone" value="60 days" />
          <Fact tone="light" label="Works with any carrier" value="Unlocked" />
        </PageHeader>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our standard"
              title="What certified means at Mobile Care."
              subtitle="We don't just resell phones. Every one is checked against the same standard before it goes on sale."
            />
            <Stagger as="ol" className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((item, i) => (
                <StaggerItem as="li" key={item.title}>
                  <span className="font-display text-6xl font-semibold text-brand-mint">{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="brands" className="scroll-mt-20 bg-paper py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Shop by brand" title="Find your next phone." />
            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              {preOwnedBrands.map((brand, i) => (
                <FadeIn key={brand.slug} delay={i * 0.12}>
                  <Link
                    href={`/pre-owned/${brand.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#f0eff2] p-8 sm:p-12"
                  >
                    <span className="relative block h-10 w-36">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        sizes="144px"
                        className="object-contain object-left"
                      />
                    </span>
                    <h3 className="mt-8 font-display text-4xl font-semibold tracking-[-0.02em] text-ink">{brand.name}</h3>
                    <p className="mt-3 max-w-sm text-lg text-ink-soft">{brand.tagline}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-medium text-ink">
                      {brand.series.length} series in stock
                      <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                    <div className="relative mt-6 h-72 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.04] sm:h-96">
                      <Image
                        src={DEVICE_SHOTS[brand.slug] ?? brand.series[0].image}
                        alt={`Certified pre-owned ${brand.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-contain feather"
                      />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
              <WordReveal as="span" text="Hold it, test it," className="block" />
              <WordReveal as="span" text="then take it home." delay={0.2} className="block text-brand-mint" />
            </h2>
            <FadeIn as="p" delay={0.3} className="mt-8 max-w-xl text-xl text-white/70">
              Stock varies by store. Visit any Mobile Care location to see what is available today.
            </FadeIn>
            <FadeIn delay={0.4} className="mt-10">
              <ButtonLink href="/locations">Find your nearest store</ButtonLink>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
