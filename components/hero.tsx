import Link from "next/link"
import { Star } from "@/components/icons"
import { RepairSearch, type SearchEntry } from "@/components/home/repair-search"
import { RepairOrbit } from "@/components/home/repair-orbit"
import { CountUp, VelocityMarquee } from "@/components/motion/primitives"
import { RiseText } from "@/components/motion/rise-text"
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
  const rating = reviews && reviews.averageRating > 0 ? Number(reviews.averageRating.toFixed(1)) : 4.9
  const reviewCount = reviews?.totalReviews

  return (
    <section className={`relative overflow-hidden bg-ink text-white ${className}`}>
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-12 pt-32 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-8 lg:pb-20 lg:pt-40">
        <div>
          <p className="soft-in flex items-center gap-3 text-[0.95rem] font-medium text-brand-mint">
            <span className="h-px w-8 bg-current" aria-hidden="true" />8 stores in Georgia, Virginia, North Carolina &amp; Michigan
          </p>

          <h1 className="mt-6 font-display text-[2.9rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-7xl lg:text-[5.2rem]">
            <RiseText text="Same-day phone repair," start={0.05} />
            <RiseText text="done properly." start={0.3} className="text-brand-mint" />
          </h1>

          <p className="soft-in mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl" style={{ animationDelay: "0.45s" }}>
            Walk into any Mobile Care store with a cracked screen, a tired battery, or a port that stopped charging.
            Most repairs are finished while you shop, with a 30-day warranty on parts and labor.
          </p>

          <div className="soft-in mt-10" style={{ animationDelay: "0.6s" }}>
            <RepairSearch entries={searchEntries()} />
            <p className="mt-4 text-[0.95rem] text-white/50">
              Popular:{" "}
              <Link href="/services/screen-replacement" className="text-white/85 underline-offset-4 hover:underline">
                Screen
              </Link>
              ,{" "}
              <Link href="/services/battery-replacement" className="text-white/85 underline-offset-4 hover:underline">
                Battery
              </Link>
              ,{" "}
              <Link href="/services/charging-port-replacement" className="text-white/85 underline-offset-4 hover:underline">
                Charging port
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <RepairOrbit />
        </div>
      </div>

      {/* Phones: the orbit is too cramped, so the same repairs glide by in a row. */}
      <VelocityMarquee className="relative mb-10 sm:hidden" baseVelocity={-3}>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" aria-hidden="true" />
            <span className="text-sm font-medium text-white">{service.shortName}</span>
            <span className="text-sm text-white/50">from {service.priceFrom}</span>
          </Link>
        ))}
      </VelocityMarquee>

      <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-8 border-t border-white/10 px-5 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <Stat label="Devices repaired" value={<CountUp value={1} suffix="M+" />} />
        <Stat
          label={reviewCount ? `Google rating from ${reviewCount.toLocaleString("en-US")} reviews` : "Average Google rating"}
          value={
            <span className="inline-flex items-center gap-2">
              <CountUp value={rating} decimals={1} />
              <Star className="h-7 w-7 text-brand-mint" />
            </span>
          }
        />
        <Stat label="Warranty on parts and labor" value={<CountUp value={30} suffix=" days" />} />
        <Stat label="Diagnostics, no appointment" value="Free" />
      </dl>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{value}</dd>
      <dt className="mt-2 text-[0.95rem] text-white/55">{label}</dt>
    </div>
  )
}
