import Link from "next/link"
import { Star } from "@/components/icons"
import { RepairSearch, type SearchEntry } from "@/components/home/repair-search"
import { RepairOrbit } from "@/components/home/repair-orbit"
import { services } from "@/lib/services"
import { locations } from "@/lib/locations"
import { getGoogleReviews } from "@/lib/google-reviews"

// Extra words people actually type, mapped to the service that fixes them.
const SERVICE_TERMS: Record<string, string[]> = {
  "screen-replacement": ["screen", "display", "cracked", "crack", "shattered", "touch", "lcd", "oled", "lines", "black"],
  "back-glass-repair": ["back", "rear", "glass", "housing"],
  "charging-port-replacement": ["charge", "charging", "charger", "port", "plug", "usb", "lightning", "won't", "wont"],
  "battery-replacement": ["battery", "drain", "drains", "dies", "swollen", "power", "shuts", "health"],
  "camera-replacement": ["camera", "lens", "blurry", "photo", "photos", "focus"],
  "water-damage-repair": ["water", "liquid", "wet", "spill", "spilled", "pool", "toilet", "dropped"],
}

const DEVICE_TERMS = ["iphone", "galaxy", "samsung", "pixel", "google", "ipad", "tablet", "phone", "android", "motorola"]

function searchEntries(): SearchEntry[] {
  const repairs: SearchEntry[] = services.map((service) => ({
    kind: "repair",
    label: service.name,
    detail: `${service.turnaround.replace("–", " to ")}, from ${service.priceFrom}`,
    href: `/services/${service.slug}`,
    terms: [...service.name.toLowerCase().split(" "), ...(SERVICE_TERMS[service.slug] ?? []), ...DEVICE_TERMS],
  }))
  const stores: SearchEntry[] = locations.map((store) => ({
    kind: "store",
    label: `${store.name}`,
    detail: `${store.city}, ${store.state} ${store.zip}`,
    href: `/locations/${store.slug}`,
    terms: [
      ...store.name.toLowerCase().split(" "),
      store.city.toLowerCase(),
      ...store.city.toLowerCase().split(" "),
      store.state.toLowerCase(),
      store.zip,
      "store",
      "stores",
      "near",
      "location",
      ...store.nearby.flatMap((n) => n.toLowerCase().split(" ")),
    ],
  }))
  return [...repairs, ...stores]
}

export async function Hero({ className = "" }: { className?: string }) {
  const reviews = await getGoogleReviews()
  const rating = reviews && reviews.averageRating > 0 ? reviews.averageRating.toFixed(1) : "4.9"
  const reviewCount = reviews?.totalReviews

  return (
    <section className={`relative overflow-hidden bg-ink text-white ${className}`}>
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">
            Phone, tablet &amp; laptop repair <span className="text-brand-mint">/</span> 8 stores in GA, VA, NC &amp; MI
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
            Same-day phone repair,
            <br />
            <span className="text-brand-mint">done properly.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Walk into any Mobile Care store with a cracked screen, a tired battery, or a port that stopped charging.
            Most repairs are finished while you shop, with a 30-day warranty on parts and labor.
          </p>

          <div className="mt-9">
            <RepairSearch entries={searchEntries()} />
            <p className="mt-3 text-sm text-white/50">
              Popular:{" "}
              <Link href="/services/screen-replacement" className="text-white/80 underline-offset-4 hover:underline">
                Screen
              </Link>
              ,{" "}
              <Link href="/services/battery-replacement" className="text-white/80 underline-offset-4 hover:underline">
                Battery
              </Link>
              ,{" "}
              <Link
                href="/services/charging-port-replacement"
                className="text-white/80 underline-offset-4 hover:underline"
              >
                Charging port
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <RepairOrbit />
        </div>
      </div>

      {/* Phones: the orbit is too cramped, so the same cards scroll by in a row. */}
      <div className="relative -mt-4 mb-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:hidden">
        <div className="type-marquee-track gap-3">
          {[...services, ...services].map((service, i) => (
            <Link
              key={`${service.slug}-${i}`}
              href={`/services/${service.slug}`}
              aria-hidden={i >= services.length || undefined}
              tabIndex={i >= services.length ? -1 : undefined}
              className="shrink-0 rounded-md border border-white/15 bg-white/[0.04] px-3 py-2"
            >
              <span className="block text-sm font-medium text-white">{service.shortName}</span>
              <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/55">
                {service.turnaround} · from {service.priceFrom}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <dl className="relative mx-auto grid max-w-7xl grid-cols-2 border-t border-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <Stat label="Devices repaired" value="1M+" />
        <Stat
          label={reviewCount ? `Google rating, ${reviewCount.toLocaleString("en-US")} reviews` : "Average Google rating"}
          value={
            <span className="inline-flex items-center gap-2">
              {rating}
              <Star className="h-6 w-6 text-brand-mint" />
            </span>
          }
        />
        <Stat label="Repair warranty, parts and labor" value="30 days" />
        <Stat label="Diagnostics, no appointment" value="Free" />
      </dl>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col border-white/10 py-7 pr-4 [&:not(:first-child)]:lg:border-l [&:not(:first-child)]:lg:pl-8 even:border-l even:pl-6 lg:even:pl-8">
      <dt className="order-2 mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/50">{label}</dt>
      <dd className="order-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{value}</dd>
    </div>
  )
}
