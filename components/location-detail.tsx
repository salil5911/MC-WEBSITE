import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone, Pin, Star } from "@/components/icons"
import { PageHeader, Spec } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
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
            <p>
              Phone, tablet, and laptop repair inside {location.name} in {location.city}. Walk in with a cracked screen,
              a weak battery, or a charging problem and most repairs are done the same day, often while you shop.
            </p>
            {location.badge && (
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-brand-mint">{location.badge}</p>
            )}
          </>
        }
        actions={
          <>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-md bg-brand-mint px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:bg-brand-mintLight"
            >
              <Phone className="h-4 w-4" />
              Call {location.phone.replace("+1 ", "")}
            </a>
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-[0.95rem] font-medium text-white transition-colors hover:border-white/60"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </>
        }
        aside={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md ring-1 ring-white/10">
            <Image
              src={location.image || "/placeholder.svg"}
              alt={`Mobile Care USA store at ${location.name}, ${location.city}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>
        }
      >
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
          <Spec label="Address" value={<span className="text-base">{location.address}</span>} />
          <Spec label="City" value={<span className="text-base">{`${location.city}, ${location.state} ${location.zip}`}</span>} />
          <Spec label="Hours" value={<span className="text-base">{location.hours[0] ? `${location.hours[0].day}, ${location.hours[0].time}` : "See below"}</span>} />
          {storeRating ? (
            <Spec
              label={`${storeRating.reviewCount} Google reviews`}
              value={
                <span className="inline-flex items-center gap-1.5">
                  {storeRating.rating.toFixed(1)}
                  <Star className="h-4 w-4 text-brand-mint" />
                </span>
              }
            />
          ) : (
            <Spec label="Warranty" value="30 days" />
          )}
        </dl>
      </PageHeader>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeading index="01" eyebrow="Visit" title={`Find us inside ${location.name}.`} />
            <address className="mt-8 border-t border-ink/15 pt-6 not-italic">
              <p className="font-display text-xl font-medium text-ink">Mobile Care USA, {location.name}</p>
              <p className="mt-1 text-ink-soft">
                {location.address}
                <br />
                {location.city}, {location.state} {location.zip}
              </p>
              <a href={telHref} className="mt-3 inline-flex items-center gap-2 font-medium text-ink hover:text-brand-mintDark">
                <Phone className="h-4 w-4" />
                {location.phone}
              </a>
            </address>
            <h3 className="mt-10 border-t border-ink/15 pt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              Store hours
            </h3>
            <dl className="mt-2">
              {location.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between border-b border-ink/10 py-3">
                  <dt className="text-ink-soft">{h.day}</dt>
                  <dd className="font-mono text-sm text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-ink-faint">Hours can change on holidays and mall event days. Call to confirm.</p>
          </div>
          <div className="min-h-[380px] overflow-hidden rounded-md border border-ink/10">
            <iframe
              title={`Map showing Mobile Care USA at ${location.name}`}
              src={mapEmbed}
              className="h-full w-full grayscale-[30%]"
              style={{ minHeight: 380, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Repairs"
              title={`Repairs available at ${location.name}.`}
              subtitle={`Our ${location.city} technicians handle every common repair on site. Each one starts with a free diagnostic and a quote you approve.`}
            />
          </Reveal>
          <ol className="mt-12 border-t border-ink/15">
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-ink/15">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[3rem_1fr_8rem_6rem_1.5rem]"
                >
                  <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-xl font-medium text-ink group-hover:text-brand-mintDark">
                      {service.name} in {location.city}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{service.tagline}</span>
                  </span>
                  <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ink-soft sm:block">
                    {service.turnaround.replace("–", "-")}
                  </span>
                  <span className="font-mono text-sm text-ink">from {service.priceFrom}</span>
                  <ArrowRight className="hidden h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {(storeReviews.length > 0 || storeRating) && (
        <section className="bg-ink py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                light
                index="03"
                eyebrow="Reviews"
                title={`What ${location.city} customers say.`}
                subtitle={`Recent reviews of our ${location.name} store from Google.`}
              />
              {storeRating?.mapsUrl && (
                <a
                  href={storeRating.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-brand-mint hover:underline"
                >
                  All {storeRating.reviewCount} reviews on Google
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
            {storeReviews.length > 0 && (
              <ul
                className={`mt-12 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 ${
                  storeReviews.length >= 3 ? "lg:grid-cols-3" : storeReviews.length === 2 ? "lg:grid-cols-2" : "max-w-2xl"
                }`}
              >
                {storeReviews.map((review) => (
                  <li key={review.id} className="flex flex-col bg-ink p-7">
                    <div className="flex gap-0.5 text-brand-mint" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className={`h-4 w-4 ${s < review.rating ? "" : "opacity-20"}`} />
                      ))}
                    </div>
                    <blockquote className="mt-5 line-clamp-6 flex-1 leading-relaxed text-white/85">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <p className="mt-5 border-t border-white/10 pt-4 text-sm">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-white/50"> · {review.relativeTime}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              index={storeReviews.length > 0 || storeRating ? "04" : "03"}
              eyebrow="Areas served"
              title={`Phone repair near ${location.city}, ${location.state}.`}
              subtitle={`Customers visit our ${location.name} store from across ${location.city} and nearby communities.`}
            />
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/15 pt-6">
              {[location.city, ...location.nearby].map((area) => (
                <li key={area} className="inline-flex items-center gap-1.5 text-ink-soft">
                  <Pin className="h-3.5 w-3.5 text-brand-mintDark" />
                  {area}
                </li>
              ))}
            </ul>
            <h3 className="mt-12 border-t border-ink/15 pt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              {sameState.length > 0 ? `Other stores in ${location.state}` : "Other Mobile Care stores"}
            </h3>
            <ul className="mt-2">
              {others.map((store) => (
                <li key={store.slug} className="border-b border-ink/10">
                  <Link href={`/locations/${store.slug}`} className="group flex items-center justify-between py-3">
                    <span>
                      <span className="block font-medium text-ink group-hover:text-brand-mintDark">{store.name}</span>
                      <span className="block text-sm text-ink-soft">
                        {store.city}, {store.state}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-ink-faint" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {location.name} repair FAQs
            </h2>
            <div className="mt-6 border-t border-ink/15">
              {locationFaqs(location).map((faq) => (
                <details key={faq.question} className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-lg font-medium text-ink">{faq.question}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-ink-faint transition-transform group-open:-rotate-90" />
                  </summary>
                  <p className="pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
