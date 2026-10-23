"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { locations, type StoreLocation } from "@/lib/locations"
import { MapPin, Phone, Clock, Search, ArrowRight, ArrowUpRight } from "lucide-react"

const REGION_ORDER = ["Georgia", "Virginia", "North Carolina", "Michigan"] as const

const STATE_TO_REGION: Record<string, (typeof REGION_ORDER)[number]> = {
  GA: "Georgia",
  VA: "Virginia",
  NC: "North Carolina",
  MI: "Michigan",
}

function groupByRegion(list: StoreLocation[]) {
  const groups: Record<string, StoreLocation[]> = {}
  for (const loc of list) {
    const region = STATE_TO_REGION[loc.state] ?? loc.state
    groups[region] = groups[region] ? [...groups[region], loc] : [loc]
  }
  return REGION_ORDER.filter((r) => groups[r]?.length).map((region) => ({
    region,
    stores: groups[region],
  }))
}

function LocationRow({ location }: { location: StoreLocation }) {
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`
  return (
    <div className="group flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-mint/30 hover:shadow-lg sm:flex-row sm:items-center sm:p-5">
      <Link
        href={`/locations/${location.slug}`}
        className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40"
      >
        <Image
          src={location.image || "/placeholder.svg"}
          alt={`Mobile Care ${location.name}`}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href={`/locations/${location.slug}`}
            className="text-lg font-semibold text-brand-dark transition-colors hover:text-brand-mint"
          >
            {location.name}
          </Link>
          {location.badge && (
            <span className="rounded-full bg-brand-mint/10 px-2.5 py-0.5 text-xs font-medium text-brand-mintDark">
              {location.badge}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-mint" />
          <span>
            {location.address}, {location.city}, {location.state} {location.zip}
          </span>
        </div>
        <div className="mt-1.5 flex items-start gap-2 text-sm text-gray-600">
          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-mint" />
          <div className="flex flex-col gap-0.5">
            {location.hours.length > 0 ? (
              location.hours.map((h) => (
                <span key={h.day}>
                  <span className="font-medium text-brand-dark">{h.day}:</span> {h.time}
                </span>
              ))
            ) : (
              <span>See hours</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-wrap items-center gap-x-5 gap-y-2 sm:flex-col sm:items-end sm:gap-2">
        <a
          href={telHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-mint"
        >
          <Phone className="h-4 w-4" />
          {location.phone}
        </a>
        <a
          href={location.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-mint transition-colors hover:text-brand-mintDark"
        >
          Get directions
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link
          href={`/locations/${location.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-brand-dark"
        >
          View store
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function LocationSearch() {
  const [zipCode, setZipCode] = useState("")
  const [searched, setSearched] = useState(false)

  const nearest = useMemo(() => {
    if (!searched || !/^\d{3,5}$/.test(zipCode)) return null
    const target = Number.parseInt(zipCode, 10)
    return [...locations]
      .map((loc) => ({ loc, distance: Math.abs(Number.parseInt(loc.zip, 10) - target) }))
      .sort((a, b) => a.distance - b.distance)[0]?.loc
  }, [zipCode, searched])

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-semibold text-brand-dark">Find your closest store</h2>
      <p className="mt-1 text-sm text-gray-500">Enter your ZIP code and we&apos;ll point you to the nearest location.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSearched(true)
        }}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value)
              setSearched(false)
            }}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-brand-dark outline-none transition focus:border-brand-mint focus:ring-2 focus:ring-brand-mint/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand-mint px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-mintDark"
        >
          Search
        </button>
      </form>

      {searched && nearest && (
        <div className="mt-5 rounded-2xl bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-mintDark">Closest location</p>
          <div className="mt-2">
            <LocationRow location={nearest} />
          </div>
        </div>
      )}
      {searched && !nearest && (
        <p className="mt-4 text-sm text-gray-500">Please enter a valid ZIP code to see the closest store.</p>
      )}
    </div>
  )
}

export default function LocationsPage() {
  const regions = groupByRegion(locations)

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pb-16 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(80,200,180,0.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-mint">Our Stores</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Find a Mobile Care near you
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            {locations.length} stores across Georgia, Virginia, North Carolina, and Michigan — expert device repair and
            premium accessories, no appointment needed.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="relative z-10 mx-auto -mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <LocationSearch />
        </Reveal>
      </section>

      {/* Directory */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {regions.map(({ region, stores }) => (
            <div key={region}>
              <Reveal>
                <div className="mb-6 flex items-baseline justify-between border-b border-gray-200 pb-3">
                  <h2 className="text-2xl font-bold text-brand-dark">{region}</h2>
                  <span className="text-sm text-gray-500">
                    {stores.length} {stores.length === 1 ? "location" : "locations"}
                  </span>
                </div>
              </Reveal>
              <div className="space-y-4">
                {stores.map((location, i) => (
                  <Reveal key={location.slug} delay={i * 60}>
                    <LocationRow location={location} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
