import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "@/components/icons"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PageHeader, Fact } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { StoreFinder } from "@/components/locations/store-finder"
import { Stagger, StaggerItem, WordReveal } from "@/components/motion/primitives"
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
          actions={
            <div className="w-full">
              <StoreFinder
                stores={locations.map(({ slug, name, city, state, zip, address }) => ({ slug, name, city, state, zip, address }))}
              />
            </div>
          }
          media={<HeaderPhoto src="/store-interior.webp" alt="Inside a Mobile Care USA mall store" />}
        >
          <Fact label="Stores" value={locations.length} />
          <Fact label="States" value="4" />
          <Fact label="Appointment needed" value="None" />
          <Fact label="Warranty at every store" value="30 days" />
        </PageHeader>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-6 lg:px-8">
            {REGIONS.map((region) => {
              const stores = locations.filter((l) => l.state === region.state)
              if (stores.length === 0) return null
              return (
                <div key={region.state}>
                  <div className="flex items-baseline justify-between gap-6">
                    <WordReveal
                      text={region.name}
                      className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl"
                    />
                    <span className="text-lg text-ink-soft">
                      {stores.length} {stores.length === 1 ? "store" : "stores"}
                    </span>
                  </div>
                  <Stagger as="ul" className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {stores.map((store) => (
                      <StaggerItem as="li" key={store.slug}>
                        <Link href={`/locations/${store.slug}`} className="group block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-paper-deep">
                            <Image
                              src={store.image || "/placeholder.svg"}
                              alt={`Mobile Care USA store at ${store.name}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            />
                            {store.badge && (
                              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-ink backdrop-blur">
                                {store.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-6 flex items-center justify-between font-display text-2xl font-semibold text-ink">
                            {store.name}
                            <ArrowRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                          </h3>
                        </Link>
                        <address className="mt-2 text-lg not-italic leading-relaxed text-ink-soft">
                          {store.address}, {store.city}, {store.state} {store.zip}
                        </address>
                        <dl className="mt-3 space-y-0.5 text-ink-soft">
                          {store.hours.map((h) => (
                            <div key={h.day} className="flex gap-2">
                              <dt className="font-medium text-ink">{h.day}</dt>
                              <dd>{h.time}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                          <a
                            href={`tel:${store.phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand-mintDark"
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
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
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
