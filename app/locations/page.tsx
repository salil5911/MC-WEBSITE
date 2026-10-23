import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "@/components/icons"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { StoreFinder } from "@/components/locations/store-finder"
import { locations } from "@/lib/locations"

const REGIONS = [
  { state: "GA", name: "Georgia" },
  { state: "VA", name: "Virginia" },
  { state: "NC", name: "North Carolina" },
  { state: "MI", name: "Michigan" },
]

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "Locations", path: "/locations" }]}
          eyebrow={`${locations.length} stores in 4 states`}
          title="Find a Mobile Care store near you."
          intro="Every store offers the same repairs, technicians, and 30-day warranty. No appointment needed."
        >
          <div className="mt-10">
            <StoreFinder
              stores={locations.map(({ slug, name, city, state, zip, address }) => ({ slug, name, city, state, zip, address }))}
            />
          </div>
        </PageHeader>

        <section className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
            {REGIONS.map((region) => {
              const stores = locations.filter((l) => l.state === region.state)
              if (stores.length === 0) return null
              return (
                <div key={region.state}>
                  <h2 className="flex items-baseline justify-between border-t border-ink/15 pt-4">
                    <span className="font-display text-3xl font-semibold tracking-tight text-ink">{region.name}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                      {stores.length} {stores.length === 1 ? "store" : "stores"}
                    </span>
                  </h2>
                  <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 md:grid-cols-2">
                    {stores.map((store) => (
                      <li key={store.slug} className="flex flex-col bg-white sm:flex-row">
                        <Link
                          href={`/locations/${store.slug}`}
                          className="relative aspect-[4/3] shrink-0 overflow-hidden sm:aspect-auto sm:w-44"
                        >
                          <Image
                            src={store.image || "/placeholder.svg"}
                            alt={`Mobile Care USA store at ${store.name}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 176px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col p-6">
                          <Link href={`/locations/${store.slug}`} className="group">
                            <h3 className="font-display text-xl font-medium text-ink group-hover:text-brand-mintDark">
                              {store.name}
                            </h3>
                          </Link>
                          {store.badge && (
                            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brand-mintDark">
                              {store.badge}
                            </p>
                          )}
                          <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
                            {store.address}, {store.city}, {store.state} {store.zip}
                          </address>
                          <dl className="mt-3 space-y-0.5 font-mono text-xs text-ink-soft">
                            {store.hours.map((h) => (
                              <div key={h.day} className="flex gap-2">
                                <dt>{h.day}:</dt>
                                <dd>{h.time}</dd>
                              </div>
                            ))}
                          </dl>
                          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-4 text-sm">
                            <a
                              href={`tel:${store.phone.replace(/\s+/g, "")}`}
                              className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-brand-mintDark"
                            >
                              <Phone className="h-4 w-4" />
                              {store.phone.replace("+1 ", "")}
                            </a>
                            <a
                              href={store.directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-ink-soft hover:text-ink"
                            >
                              Directions
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <Link
                              href={`/locations/${store.slug}`}
                              className="ml-auto inline-flex items-center gap-1 font-medium text-ink hover:text-brand-mintDark"
                            >
                              Store details
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
