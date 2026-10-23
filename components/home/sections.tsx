import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "@/components/icons"
import { ButtonLink } from "@/components/button-link"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, Float, Parallax, Stagger, StaggerItem, VelocityMarquee, WordReveal } from "@/components/motion/primitives"
import { ReviewStack } from "@/components/home/review-stack"
import { ServicesShowcase } from "@/components/home/services-showcase"
import { services } from "@/lib/services"
import { locations } from "@/lib/locations"
import { preOwnedBrands } from "@/lib/pre-owned"
import { accessoryBrands, monoLogo } from "@/lib/brands"
import { getGoogleReviews } from "@/lib/google-reviews"

const DEVICES = [
  "iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "iPad",
  "MacBook",
  "Apple Watch",
  "Galaxy Tab",
  "Windows laptops",
  "Motorola",
  "Nintendo Switch",
]

export function DeviceMarquee() {
  return (
    <section aria-label="Devices we repair" className="bg-paper py-10 sm:py-14">
      <VelocityMarquee baseVelocity={-1.5}>
        {DEVICES.map((device) => (
          <span key={device} className="flex items-center">
            <span className="px-6 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:px-10 sm:text-6xl">
              {device}
            </span>
            <span className="h-3 w-3 rounded-full bg-brand-mint" aria-hidden="true" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="bg-paper pb-24 pt-8 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Repairs"
            title="The six repairs we do every day."
            subtitle="Each one starts with a free diagnostic and a fixed quote. You approve the price before we open the device."
          />
          <FadeIn>
            <ButtonLink href="/services" variant="dark">
              All repair services
            </ButtonLink>
          </FadeIn>
        </div>
        <ServicesShowcase
          services={services.map(({ slug, name, tagline, image, priceFrom, turnaround }) => ({
            slug,
            name,
            tagline,
            image,
            priceFrom,
            turnaround,
          }))}
        />
      </div>
    </section>
  )
}

const STATE_NAMES: Record<string, string> = {
  GA: "Georgia",
  VA: "Virginia",
  NC: "North Carolina",
  MI: "Michigan",
}

export function StoresSection() {
  return (
    <section className="bg-white">
      {/* full-bleed photo band */}
      <div className="relative h-[70vh] min-h-[28rem] overflow-hidden">
        <Parallax strength={10}>
          <Image
            src="/store-interior.webp"
            alt="Customers at the counter inside a Mobile Care USA store"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
            <FadeIn as="p" className="flex items-center gap-3 text-[0.95rem] font-medium text-brand-mint">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              Stores
            </FadeIn>
            <WordReveal
              text="Eight stores inside the malls you already visit."
              className="mt-4 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <FadeIn as="p" className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Drop your device off, finish your shopping, and pick it up repaired. Every store has the same technicians,
          parts, and 30-day warranty.
        </FadeIn>

        <Stagger as="ul" className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((store) => (
            <StaggerItem as="li" key={store.slug}>
              <Link href={`/locations/${store.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-deep">
                  <Image
                    src={store.image}
                    alt={`Mobile Care USA store at ${store.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-ink backdrop-blur">
                    {STATE_NAMES[store.state]}
                  </span>
                </div>
                <h3 className="mt-5 flex items-center justify-between font-display text-xl font-semibold text-ink">
                  {store.name}
                  <ArrowRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1 text-ink-soft">
                  {store.city}, {store.state}
                </p>
                {store.hours[0] && (
                  <p className="mt-1 text-[0.95rem] text-ink-faint">
                    {store.hours[0].day}, {store.hours[0].time}
                  </p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export async function ReviewsSection() {
  const data = await getGoogleReviews()
  const reviews = data?.reviews ?? []
  const topStores = data ? [...data.stores].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4) : []

  return (
    <section className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            light
            eyebrow="Reviews"
            title="What customers say after the repair."
            subtitle="Every review here comes straight from our Google Business Profiles, updated twice a day."
          />
          {data && data.totalReviews > 0 && (
            <FadeIn className="mt-12">
              <p className="font-display text-7xl font-semibold tracking-tight">
                {data.averageRating.toFixed(1)}
                <span className="ml-3 align-middle text-xl font-normal tracking-normal text-white/50">out of 5</span>
              </p>
              <p className="mt-2 text-white/60">
                From {data.totalReviews.toLocaleString("en-US")} Google reviews across {data.stores.length} stores
              </p>
              <ul className="mt-8 space-y-3">
                {topStores.map((store) => (
                  <li key={store.storeSlug} className="flex items-center justify-between gap-4">
                    <Link href={`/locations/${store.storeSlug}`} className="text-white/85 hover:text-white">
                      {store.storeName}
                    </Link>
                    {store.mapsUrl ? (
                      <a
                        href={store.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/55 hover:text-brand-mint"
                      >
                        {store.rating.toFixed(1)} from {store.reviewCount}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-white/55">
                        {store.rating.toFixed(1)} from {store.reviewCount}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
        </div>

        {reviews.length > 0 ? (
          <ReviewStack reviews={reviews.slice(0, 6)} />
        ) : (
          <FadeIn className="flex flex-col justify-center">
            <p className="text-xl text-white/75">Read what customers say about every Mobile Care store on Google.</p>
            <a
              href="https://www.google.com/maps/search/Mobile+Care+USA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-medium text-brand-mint hover:underline"
            >
              Read our Google reviews
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

export function ShopSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Shop in store" title="Pre-owned phones and the accessories to protect them." />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* pre-owned: product shots floating on the studio grey they were shot on */}
          <FadeIn className="relative overflow-hidden rounded-[2rem] bg-[#f0eff2]">
            <div className="p-8 sm:p-12">
              <p className="text-[0.95rem] font-medium text-brand-mintDark">Certified pre-owned</p>
              <h3 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                Unlocked. Never repaired. 60-day warranty.
              </h3>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {preOwnedBrands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/pre-owned/${brand.slug}`}
                    className="group inline-flex items-center gap-1.5 font-medium text-ink"
                  >
                    Shop {brand.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative -mt-4 flex h-72 items-end justify-center sm:h-80">
              <Float className="relative h-full w-1/2">
                <Image
                  src="/pre-owned/apple-device.webp"
                  alt="Certified pre-owned iPhone"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain feather"
                />
              </Float>
              <Float className="relative -ml-10 h-full w-1/2" delay={1.5}>
                <Image
                  src="/pre-owned/samsung-device.webp"
                  alt="Certified pre-owned Samsung Galaxy"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain feather"
                />
              </Float>
            </div>
          </FadeIn>

          {/* accessories: brand logos gliding past on dark */}
          <FadeIn delay={0.12} className="relative flex flex-col overflow-hidden rounded-[2rem] bg-ink text-white">
            <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative p-8 sm:p-12">
              <p className="text-[0.95rem] font-medium text-brand-mint">Accessories</p>
              <h3 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
                Cases, chargers, and audio from brands we trust.
              </h3>
              <Link href="/accessories" className="group mt-6 inline-flex items-center gap-1.5 font-medium text-white">
                Browse accessories
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative mt-auto space-y-6 pb-12">
              <VelocityMarquee baseVelocity={-2}>
                {accessoryBrands.slice(0, 7).map((brand) => (
                  <BrandMark key={brand.name} name={brand.name} logo={brand.logo} />
                ))}
              </VelocityMarquee>
              <VelocityMarquee baseVelocity={2}>
                {accessoryBrands.slice(7).map((brand) => (
                  <BrandMark key={brand.name} name={brand.name} logo={brand.logo} />
                ))}
              </VelocityMarquee>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/** A brand logo knocked out to white, for dark backgrounds. */
export function BrandMark({ name, logo }: { name: string; logo: string }) {
  return (
    <span className="relative mx-6 block h-12 w-28 shrink-0 sm:mx-8 sm:w-32">
      <Image src={monoLogo(logo)} alt={`${name} logo`} fill sizes="128px" className="object-contain opacity-75" />
    </span>
  )
}

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          <WordReveal as="span" text="Broken this morning." className="block" />
          <WordReveal as="span" text="Fixed this afternoon." delay={0.25} className="block text-brand-mint" />
        </h2>
        <FadeIn delay={0.4} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/locations">Find your nearest store</ButtonLink>
          <ButtonLink href="/services" variant="outline-light" arrow={false}>
            See repair prices
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  )
}
