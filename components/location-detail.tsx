import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Clock, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { services } from "@/lib/services"
import type { StoreLocation } from "@/lib/locations"
import { locationFaqs } from "@/lib/seo"

const highlights = [
  "Walk-ins welcome — most repairs done same day",
  "Certified technicians & quality-tested parts",
  "30-day parts & labor warranty on every repair",
]

export function LocationDetail({ location }: { location: StoreLocation }) {
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `Mobile Care ${location.name} ${location.address} ${location.city} ${location.state} ${location.zip}`,
  )}&output=embed`

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.06]" aria-hidden="true" />
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Reveal>
                <nav className="flex items-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-brand-mint transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/locations" className="hover:text-brand-mint transition-colors">
                    Locations
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white/90">{location.name}</span>
                </nav>
              </Reveal>
              <Reveal delay={80}>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint mb-5">
                  <MapPin className="w-4 h-4" />
                  {location.city}, {location.state}
                </div>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">{location.heading}</h1>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-5 text-lg text-white/70 max-w-xl leading-relaxed">
                  Expert phone, tablet, and laptop repair at {location.name}. Fast turnarounds, premium parts, and a
                  friendly team ready to get your device back to like-new.
                </p>
              </Reveal>
              {location.badge && (
                <Reveal delay={220}>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-brand-mint">
                    {location.badge}
                  </p>
                </Reveal>
              )}
              <Reveal delay={260}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-6 py-3 font-semibold text-brand-dark transition-transform hover:scale-[1.03]"
                  >
                    <Phone className="w-4 h-4" />
                    Call {location.phone}
                  </a>
                  <a
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Get directions
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:justify-self-end w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={`Mobile Care store at ${location.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Store info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-mint/10 text-brand-mint">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-dark">Address</h3>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  {location.address}
                  <br />
                  {location.city}, {location.state} {location.zip}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-mint/10 text-brand-mint">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-dark">Phone</h3>
                <a href={telHref} className="mt-1 block text-gray-600 hover:text-brand-mint transition-colors">
                  {location.phone}
                </a>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:col-span-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-mint/10 text-brand-mint">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-dark">Store hours</h3>
                <dl className="mt-2 divide-y divide-gray-100">
                  {location.hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-2 text-sm">
                      <dt className="text-gray-500">{h.day}</dt>
                      <dd className="font-medium text-brand-dark">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 space-y-2">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full min-h-[360px] overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <iframe
                title={`Map showing Mobile Care ${location.name}`}
                src={mapEmbed}
                className="h-full w-full"
                style={{ minHeight: 360, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services at this location */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-mint">What we fix here</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-dark text-balance">
              Repairs available at {location.name}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our {location.city} technicians handle every common repair on-site. Explore each service or call the store
              for a free quote.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Reveal key={service.slug} delay={i * 60}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/10 text-brand-mint transition-colors group-hover:bg-brand-mint group-hover:text-brand-dark">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-brand-dark">{service.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{service.summary}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm font-medium text-gray-500">
                        From <span className="text-brand-dark">{service.priceFrom}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-mintDark">
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Areas served + FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-mint">Areas we serve</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-dark text-balance">
              Phone repair near {location.city}, {location.state}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our {location.name} store is a convenient stop for iPhone, Samsung, iPad, and laptop repairs for customers
              across {location.city} and the surrounding communities.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[location.city, ...location.nearby].map((area) => (
                <li
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-mint" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl font-bold text-brand-dark">
              {location.name} repair FAQs
            </h2>
            <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
              {locationFaqs(location).map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base">{faq.question}</h3>
                    <ChevronRight
                      className="h-5 w-5 flex-shrink-0 text-brand-mint transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.06]" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to fix your device?</h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Visit us at {location.name} or call ahead for a free diagnostic and quote. Most repairs are done the same
              day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-6 py-3 font-semibold text-brand-dark transition-transform hover:scale-[1.03]"
              >
                <Phone className="w-4 h-4" />
                Call {location.phone}
              </a>
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get directions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
