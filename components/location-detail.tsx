import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone, Pin, Star } from "@/components/icons"
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/primitives"
import { Accordion } from "@/components/motion/accordion"
import { ClosingCta } from "@/components/home/sections"
import { services } from "@/lib/services"
import { locations, type StoreLocation } from "@/lib/locations"
import { locationFaqs } from "@/lib/seo"
import { getGoogleReviews } from "@/lib/google-reviews"

export async function LocationDetail({ location }: { location: StoreLocation }) {
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `Mobile Care ${location.name} ${location.address} ${location.city} ${location.state} ${location.zip}`,
  )}&output=embed`

  const reviewsData = await getGoogleReviews()
  const storeRating = reviewsData?.stores.find((s) => s.storeSlug === location.slug)
  const storeReviews = (reviewsData?.reviews ?? []).filter((r) => r.storeSlug === location.slug).slice(0, 3)
  const sameState = locations.filter((l) => l.state === location.state && l.slug !== location.slug)
  const others = sameState.length > 0 ? sameState : locations.filter((l) => l.slug !== location.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Locations", path: "/locations" },
          { name: location.name, path: `/locations/${location.slug}` },
        ]}
        eyebrow={`${location.city}, ${location.state}`}
        title={location.heading}
        intro={
          <>
            Phone, tablet, and laptop repair inside {location.name} in {location.city}. Walk in with a cracked screen, a
            weak battery, or a charging problem, and most repairs are done the same day, often while you shop.
          </>
        }
        actions={
          <>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-7 py-3.5 font-medium text-ink transition-colors hover:bg-brand-mintLight"
            >
              <Phone className="h-4 w-4" />
              Call {location.phone.replace("+1 ", "")}
            </a>
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-medium text-white transition-colors hover:border-white/70"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </>
        }
        media={
          <HeaderPhoto
            src={location.image || "/placeholder.svg"}
            alt={`Mobile Care USA store at ${location.name}, ${location.city}`}
            caption={
              location.badge ? (
                <span className="font-medium">{location.badge}</span>
              ) : storeRating ? (
                <span className="flex items-center gap-2 font-medium">
                  <Star className="h-4 w-4 text-brand-mint" />
                  {storeRating.rating.toFixed(1)} from {storeRating.reviewCount} Google reviews
                </span>
              ) : undefined
            }
          />
        }
      >
        <Fact label="Address" value={<span className="text-xl sm:text-2xl">{location.address}</span>} />
        <Fact label="City" value={<span className="text-xl sm:text-2xl">{`${location.city}, ${location.state} ${location.zip}`}</span>} />
        <Fact
          label={location.hours[0]?.day ?? "Hours"}
          value={<span className="text-xl sm:text-2xl">{location.hours[0]?.time ?? "Call the store"}</span>}
        />
        {storeRating ? (
          <Fact
            label={`${storeRating.reviewCount} Google reviews`}
            value={
              <span className="inline-flex items-center gap-2">
                {storeRating.rating.toFixed(1)}
                <Star className="h-6 w-6 text-brand-mint" />
              </span>
            }
          />
        ) : (
          <Fact label="Repair warranty" value="30 days" />
        )}
      </PageHeader>

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <SectionHeading eyebrow="Visit" title={`Find us inside ${location.name}.`} />
            <FadeIn>
              <address className="mt-10 not-italic">
                <p className="font-display text-2xl font-semibold text-ink">Mobile Care USA, {location.name}</p>
                <p className="mt-2 text-lg text-ink-soft">
                  {location.address}
                  <br />
                  {location.city}, {location.state} {location.zip}
                </p>
                <a href={telHref} className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-ink hover:text-brand-mintDark">
                  <Phone className="h-5 w-5" />
                  {location.phone}
                </a>
              </address>
              <h3 className="mt-12 font-display text-xl font-semibold text-ink">Store hours</h3>
              <dl className="mt-4 space-y-3">
                {location.hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-6 text-lg">
                    <dt className="text-ink-soft">{h.day}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-ink-faint">Hours can change on holidays and mall event days. Call to confirm.</p>
            </FadeIn>
          </div>
          <FadeIn className="min-h-[420px] overflow-hidden rounded-[2rem] bg-paper-deep">
            <iframe
              title={`Map showing Mobile Care USA at ${location.name}`}
              src={mapEmbed}
              className="h-full w-full"
              style={{ minHeight: 420, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Repairs"
            title={`Repairs available at ${location.name}.`}
            subtitle={`Our ${location.city} technicians handle every common repair on site. Each one starts with a free diagnostic and a quote you approve.`}
          />
          <Stagger as="ul" className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem as="li" key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src={service.image}
                      alt={`${service.name} in ${location.city}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink group-hover:text-brand-mintDark">
                    {service.name} in {location.city}
                  </h3>
                  <p className="mt-2 text-lg text-ink-soft">{service.tagline}</p>
                  <p className="mt-3 text-ink-soft">
                    From <span className="font-semibold text-ink">{service.priceFrom}</span>
                    <span className="mx-2 text-ink/20">|</span>
                    {service.turnaround}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {(storeReviews.length > 0 || storeRating) && (
        <section className="bg-ink py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                light
                eyebrow="Reviews"
                title={`What ${location.city} customers say.`}
                subtitle={`Recent Google reviews of our ${location.name} store.`}
              />
              {storeRating?.mapsUrl && (
                <FadeIn>
                  <a
                    href={storeRating.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium text-white transition-colors hover:border-white/70"
                  >
                    All {storeRating.reviewCount} reviews on Google
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </FadeIn>
              )}
            </div>
            {storeReviews.length > 0 && (
              <Stagger as="ul" className="mt-16 grid gap-6 lg:grid-cols-3">
                {storeReviews.map((review) => (
                  <StaggerItem as="li" key={review.id} className="flex flex-col rounded-[2rem] bg-white/[0.06] p-8 sm:p-10">
                    <div className="flex gap-1 text-brand-mint" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className={`h-5 w-5 ${s < review.rating ? "" : "opacity-20"}`} />
                      ))}
                    </div>
                    <blockquote className="mt-6 line-clamp-6 flex-1 font-display text-xl leading-snug text-white/90">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <p className="mt-6 text-white/60">
                      <span className="font-semibold text-white">{review.author}</span>, {review.relativeTime}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
        </section>
      )}

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Areas served"
              title={`Phone repair near ${location.city}, ${location.state}.`}
              subtitle={`Customers visit our ${location.name} store from across ${location.city} and nearby communities.`}
            />
            <FadeIn as="p" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-lg text-ink">
              {[location.city, ...location.nearby].map((area) => (
                <span key={area} className="inline-flex items-center gap-2">
                  <Pin className="h-4 w-4 text-brand-mintDark" />
                  {area}
                </span>
              ))}
            </FadeIn>
            <h3 className="mt-14 font-display text-xl font-semibold text-ink">
              {sameState.length > 0 ? `Other stores in ${location.state}` : "Other Mobile Care stores"}
            </h3>
            <ul className="mt-4 space-y-1">
              {others.map((store) => (
                <li key={store.slug}>
                  <Link href={`/locations/${store.slug}`} className="group flex items-center justify-between py-2.5">
                    <span>
                      <span className="block text-lg font-medium text-ink group-hover:text-brand-mintDark">{store.name}</span>
                      <span className="block text-ink-soft">
                        {store.city}, {store.state}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
              {location.name} repair questions
            </h2>
            <Accordion items={locationFaqs(location)} />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
