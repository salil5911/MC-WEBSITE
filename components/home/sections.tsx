import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "@/components/icons"
import { ButtonLink } from "@/components/button-link"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { BrandMarquee } from "@/components/brand-marquee"
import { ReviewStack } from "@/components/home/review-stack"
import { services } from "@/lib/services"
import { locations } from "@/lib/locations"
import { preOwnedBrands } from "@/lib/pre-owned"
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
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {DEVICES.map((device) => (
        <li key={device} className="flex items-center">
          <span className="px-6 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">{device}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Devices we repair" className="overflow-hidden border-b border-ink/10 bg-paper py-6">
      <div className="type-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

export function ServicesIndex() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Repairs"
              title="The six repairs we do every day."
              subtitle="Each one starts with a free diagnostic and a fixed quote. You approve the price before we open the device."
            />
            <ButtonLink href="/services" variant="outline" className="mt-8">
              All repair services
            </ButtonLink>
          </Reveal>

          <ol className="border-t border-ink/15">
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-ink/15">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors sm:grid-cols-[3rem_1fr_9rem_6rem_1.5rem] sm:py-6"
                >
                  <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-brand-mintDark sm:text-2xl">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{service.tagline}</span>
                  </span>
                  <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ink-soft sm:block">
                    {service.turnaround.replace("–", "-")}
                  </span>
                  <span className="text-right font-mono text-sm text-ink sm:text-left">
                    <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">From</span>
                    {service.priceFrom}
                  </span>
                  <ArrowRight className="hidden h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
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

export function StoresDirectory() {
  const states = ["GA", "VA", "NC", "MI"]
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              index="02"
              eyebrow="Stores"
              title="Eight stores inside the malls you already visit."
              subtitle="Drop your device off, finish your shopping, and pick it up repaired. Every store has the same technicians, parts, and warranty."
            />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/store-interior.webp"
                alt="Customers at the counter inside a Mobile Care USA store"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-10">
            {states.map((state) => (
              <div key={state}>
                <h3 className="flex items-baseline justify-between border-b border-ink/15 pb-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  {STATE_NAMES[state]}
                  <span>
                    {locations.filter((l) => l.state === state).length}{" "}
                    {locations.filter((l) => l.state === state).length === 1 ? "store" : "stores"}
                  </span>
                </h3>
                <ul>
                  {locations
                    .filter((l) => l.state === state)
                    .map((store) => (
                      <li
                        key={store.slug}
                        className="grid grid-cols-1 gap-1 border-b border-ink/10 py-4 sm:grid-cols-[1.2fr_1fr_auto] sm:items-center sm:gap-6"
                      >
                        <Link href={`/locations/${store.slug}`} className="group">
                          <span className="block font-display text-lg font-medium text-ink group-hover:text-brand-mintDark">
                            {store.name}
                          </span>
                          <span className="block text-sm text-ink-soft">
                            {store.address}, {store.city}
                          </span>
                        </Link>
                        <span className="font-mono text-xs text-ink-soft">
                          {store.hours[0] ? `${store.hours[0].day}: ${store.hours[0].time}` : ""}
                        </span>
                        <a
                          href={`tel:${store.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand-mintDark"
                        >
                          <Phone className="h-4 w-4" />
                          {store.phone.replace("+1 ", "")}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function ReviewsSection({ index = "03" }: { index?: string }) {
  const data = await getGoogleReviews()
  const reviews = data?.reviews ?? []
  const topStores = data ? [...data.stores].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4) : []

  return (
    <section className="overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            light
            index={index}
            eyebrow="Reviews"
            title="What customers say after the repair."
            subtitle="Every review here comes straight from our Google Business Profiles, updated twice a day."
          />
          {data && data.totalReviews > 0 && (
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="font-display text-6xl font-semibold tracking-tight">
                {data.averageRating.toFixed(1)}
                <span className="ml-2 align-middle font-mono text-sm font-normal text-white/50">/ 5</span>
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
                From {data.totalReviews.toLocaleString("en-US")} Google reviews across {data.stores.length} stores
              </p>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {topStores.map((store) => (
                  <li key={store.storeSlug} className="flex items-center justify-between py-3 text-sm">
                    <Link href={`/locations/${store.storeSlug}`} className="text-white/80 hover:text-white">
                      {store.storeName}
                    </Link>
                    {store.mapsUrl ? (
                      <a
                        href={store.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-white/60 hover:text-brand-mint"
                      >
                        {store.rating.toFixed(1)} · {store.reviewCount} reviews
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-white/60">
                        {store.rating.toFixed(1)} · {store.reviewCount} reviews
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <ReviewStack reviews={reviews.slice(0, 12)} />
        ) : (
          <div className="flex flex-col justify-center border-t border-white/15 pt-8">
            <p className="text-lg text-white/70">Read what customers say about every Mobile Care store on Google.</p>
            <a
              href="https://www.google.com/maps/search/Mobile+Care+USA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-medium text-brand-mint hover:underline"
            >
              Read our Google reviews
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export function ShopSplit() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Shop in store"
            title="Pre-owned phones and the accessories to protect them."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 lg:grid-cols-2">
          <div className="flex flex-col bg-white p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">Certified pre-owned</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Unlocked iPhone and Samsung Galaxy phones that have never been repaired, each inspected and covered by
              a 60-day warranty.
            </p>
            <ul className="mt-8 grid flex-1 grid-cols-2 gap-px overflow-hidden rounded border border-ink/10 bg-ink/10">
              {preOwnedBrands.map((brand) => (
                <li key={brand.slug} className="bg-white">
                  <Link
                    href={`/pre-owned/${brand.slug}`}
                    className="group flex h-full flex-col items-center justify-center gap-4 p-6 transition-colors hover:bg-paper"
                  >
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={160}
                      height={80}
                      className="h-12 w-auto object-contain"
                    />
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                      {brand.name}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col bg-white p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">Accessories</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Cases, screen protectors, chargers, and audio from the brands we trust on our own phones, fitted in store.
            </p>
            <div className="mt-8 flex flex-1 items-center">
              <BrandMarquee />
            </div>
            <ButtonLink href="/accessories" variant="text" className="mt-6 self-start">
              Browse accessories
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-8">
        <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          Broken this morning. <span className="text-brand-mint">Fixed this afternoon.</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/locations">Find your nearest store</ButtonLink>
          <ButtonLink href="/services" variant="outline-light" arrow={false}>
            See repair prices
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
