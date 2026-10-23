"use client"

import Image from "next/image"
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

type Location = {
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  hours: string
  image: string
  details?: string
  directionsUrl: string
}

const locationGroups: { label: string; items: Location[] }[] = [
  {
    label: "Georgia",
    items: [
      {
        name: "Augusta Mall",
        address: "3450 Wrightsboro Rd. Suite 1125",
        city: "Augusta",
        state: "GA",
        zip: "30909",
        phone: "(762) 444-9461",
        hours: "Mon-Thu 11-7 · Fri-Sat 11-8 · Sun 12-6",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-1rthSq43p4kpNrDLcfH1wcDlEz8SpR.jpg",
        directionsUrl:
          "https://www.google.com/maps/dir//mobile+care+augusta+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x88f9d39de4ce3a31:0xb9a94f1eb818376f?sa=X&ved=1t:3061&ictx=111",
      },
      {
        name: "Perimeter Mall",
        address: "4400 Ashford Dunwoody Rd Space #2085",
        city: "Dunwoody",
        state: "GA",
        zip: "30346",
        phone: "(470) 983-1595",
        hours: "Mon-Sat 11-8 · Sun 12-6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perimeter.jpg-YiRrKjRiy7javUPwJzOjcD82ezca7f.jpeg",
        directionsUrl:
          "https://www.google.com/maps/dir//Mobile+Care+Perimeter+Mall,+4400+Ashford+Dunwoody+Rd+Space+%232085,+Dunwoody,+GA+30346/",
      },
      {
        name: "Cumberland Mall",
        address: "2860 Cumberland Mall Suite # 208",
        city: "Atlanta",
        state: "GA",
        zip: "30339",
        phone: "(404) 271-6281",
        hours: "Mon-Sat 11-8 · Sun 12-6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cumberland.jpg-r6o3X74ufd6nWdNblq9vMz1Ig3D8XJ.jpeg",
        directionsUrl:
          "https://www.google.com/maps/dir//Mobile+Care+Cumberland+Mall,+2860+Cumberland+Mall+Suite+%23+208,+Atlanta,+GA+30339/",
      },
      {
        name: "Southlake Mall",
        address: "1000 Southlake Cir #1123",
        city: "Morrow",
        state: "GA",
        zip: "30260",
        phone: "(470) 546-9171",
        hours: "Mon-Sat 10-8 · Sun 12-6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/southlake.jpg-cyX67ok0kHYNaPXsFzRqmfNPsFWY33.jpeg",
        directionsUrl:
          "https://www.google.com/maps/dir//Mobile+Care+Southlake+Mall,+1000+Southlake+Cir+%231123,+Morrow,+GA+30260/",
      },
    ],
  },
  {
    label: "Virginia & North Carolina",
    items: [
      {
        name: "Lynnhaven Mall",
        address: "701 Lynnhaven Pkwy",
        city: "Virginia Beach",
        state: "VA",
        zip: "23452",
        phone: "(757) 692-1915",
        hours: "Mon-Thu 11-7 · Fri-Sat 11-8 · Sun 12-6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lynnhaven.jpg-6s3aZDBwqPpwPuujrrkE9HTbvcZrJs.jpeg",
        details: "2 kiosks and 1 store",
        directionsUrl:
          "https://www.google.com/maps/dir//Mobile+Care+Lynnhaven+Mall,+701+Lynnhaven+Pkwy,+Virginia+Beach,+VA+23452/",
      },
      {
        name: "Carolina Place Mall",
        address: "11025 Carolina Place Pkwy",
        city: "Pineville",
        state: "NC",
        zip: "28134",
        phone: "(704) 670-8479",
        hours: "Mon-Thu 11-7 · Fri-Sat 11-8 · Sun 12-6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carolina%20place%20mall.jpg-LColFtaGmCqrSK6WTwRMvNbpLz887Y.jpeg",
        directionsUrl:
          "https://www.google.com/maps/dir//Mobile+Care+Carolina+Place+Mall,+11025+Carolina+Pl+Pkwy+Suite+%23+A04,+Pineville,+NC+28134/",
      },
    ],
  },
]

export function Locations({ className = "" }: { className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-brand-dark ${className}`}>
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.06]" aria-hidden="true" />
      <div
        className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-mint/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Locations"
            title="Find a store near you"
            subtitle="Visit any Mobile Care location for expert device repair and premium accessories — walk-ins always welcome."
            light
            className="mb-16"
          />
        </Reveal>

        <div className="space-y-14">
          {locationGroups.map((group) => (
            <div key={group.label}>
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="font-display text-xl font-bold text-white">{group.label}</h3>
                  <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  <span className="text-sm font-medium text-brand-mint">
                    {group.items.length} {group.items.length === 1 ? "location" : "locations"}
                  </span>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {group.items.map((location, index) => (
                  <Reveal key={location.name} variant="fade-up" delay={(index % 2) * 100}>
                    <LocationRow location={location} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationRow({ location }: { location: Location }) {
  const telHref = `tel:${location.phone.replace(/[^\d+]/g, "")}`

  return (
    <div className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-brand-mint/40 hover:bg-white/[0.06] sm:gap-5 sm:p-5">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
        <Image
          src={location.image || "/placeholder.svg"}
          alt={`Mobile Care at ${location.name}`}
          fill
          sizes="128px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-lg font-bold text-white">{location.name}</h4>
          <MapPin className="h-5 w-5 shrink-0 text-brand-mint" aria-hidden="true" />
        </div>

        {location.details && (
          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-brand-mint/15 px-2.5 py-0.5 text-xs font-medium text-brand-mint">
            {location.details}
          </span>
        )}

        <address className="mt-1.5 not-italic text-sm leading-relaxed text-gray-300">
          {location.address}, {location.city}, {location.state} {location.zip}
        </address>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5 shrink-0 text-brand-mint/70" aria-hidden="true" />
          <span>{location.hours}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-3">
          <a
            href={telHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-mint"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {location.phone}
          </a>
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-mint transition-colors hover:text-white"
          >
            Get directions
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
