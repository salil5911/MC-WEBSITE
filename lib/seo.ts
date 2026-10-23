import type { Metadata } from "next"
import { getLocation, locations, type StoreLocation } from "@/lib/locations"

export const SITE_URL = "https://mobilecareusa.com"
export const SITE_NAME = "Mobile Care USA"
export const DEFAULT_OG_IMAGE = {
  url: "/store-interior.webp",
  width: 1536,
  height: 1024,
  alt: "Inside a Mobile Care USA phone repair store",
}

const DAY_NAMES: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
}
const WEEK = Object.values(DAY_NAMES)

function expandDays(label: string): string[] {
  const [start, end] = label.split(/\s*[–-]\s*/).map((d) => DAY_NAMES[d.trim().slice(0, 3).toLowerCase()])
  if (!start) return []
  if (!end) return [start]
  const from = WEEK.indexOf(start)
  const to = WEEK.indexOf(end)
  return WEEK.slice(from, to + 1)
}

function to24h(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return time.trim()
  let hours = Number(match[1]) % 12
  if (match[3].toUpperCase() === "PM") hours += 12
  return `${String(hours).padStart(2, "0")}:${match[2]}`
}

function openingHours(hours: StoreLocation["hours"]) {
  return hours.flatMap(({ day, time }) => {
    const [opens, closes] = time.split(/\s*[–-]\s*/)
    const dayOfWeek = expandDays(day)
    if (!opens || !closes || dayOfWeek.length === 0) return []
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: to24h(opens),
        closes: to24h(closes),
      },
    ]
  })
}

function cityState(location: StoreLocation) {
  return `${location.city}, ${location.state}`
}

function locationDescription(location: StoreLocation) {
  return `Same-day iPhone, Samsung, iPad & laptop repair at ${location.name} in ${cityState(location)}. Screen & battery replacement, 30-day warranty, walk-ins welcome.`
}

export function locationFaqs(location: StoreLocation) {
  const hours = location.hours.map((h) => `${h.day}: ${h.time}`).join(", ")
  return [
    {
      question: `Where is Mobile Care at ${location.name} located?`,
      answer: `Mobile Care USA is inside ${location.name} at ${location.address}, ${cityState(location)} ${location.zip}. You can call the store at ${location.phone}.`,
    },
    {
      question: `Do you offer same-day phone repair in ${location.city}?`,
      answer: `Yes. Most screen replacements, battery replacements, and charging port repairs at our ${location.name} store are finished the same day, often while you shop.`,
    },
    {
      question: `What devices can you repair at ${location.name}?`,
      answer: `Our ${location.city} technicians repair iPhone, Samsung Galaxy, Google Pixel, iPad and other tablets, MacBook and Windows laptops, Apple Watch, and game consoles.`,
    },
    {
      question: `Do I need an appointment at the ${location.name} store?`,
      answer: `No appointment is needed. Walk-ins are welcome during store hours (${hours}). Calling ahead lets us confirm your part is in stock.`,
    },
    {
      question: "Do your repairs come with a warranty?",
      answer: "Every repair includes a 30-day parts and labor warranty, and we use quality-tested parts on all devices.",
    },
    {
      question: `Do you serve customers near ${location.city}?`,
      answer: `Yes. Customers visit our ${location.name} store from ${location.nearby.join(", ")} and across the ${location.city} area.`,
    },
  ]
}

export function locationMetadata(slug: string): Metadata {
  const location = getLocation(slug)
  if (!location) return {}

  const path = `/locations/${location.slug}`
  const title = `Phone Repair ${location.name}, ${location.city} ${location.state} | ${SITE_NAME}`
  const description = locationDescription(location)
  const image = { url: location.image, alt: `Mobile Care USA phone repair store at ${location.name}` }
  const { city, name } = location

  return {
    title: { absolute: title },
    description,
    keywords: [
      `phone repair ${name}`,
      `mobile phone repair in ${name}`,
      `phone repair ${city} ${location.state}`,
      `cell phone repair ${city}`,
      `iPhone repair ${city}`,
      `iPhone screen repair ${city}`,
      `Samsung repair ${city}`,
      `iPad repair ${city}`,
      `tablet repair ${city}`,
      `laptop repair ${city}`,
      `MacBook repair ${city}`,
      `smartwatch repair ${city}`,
      `cracked screen repair ${city}`,
      `battery replacement ${city}`,
      `phone repair near ${name}`,
      `pre-owned phones ${city}`,
      ...location.nearby.map((area) => `phone repair ${area}`),
    ],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    other: {
      "geo.region": `US-${location.state}`,
      "geo.placename": city,
      "geo.position": `${location.geo.lat};${location.geo.lng}`,
      ICBM: `${location.geo.lat}, ${location.geo.lng}`,
    },
  }
}

export function locationSchema(location: StoreLocation) {
  const url = `${SITE_URL}/locations/${location.slug}`
  return [
    {
      "@context": "https://schema.org",
      "@type": "MobilePhoneStore",
      "@id": `${url}#store`,
      name: `${SITE_NAME} – ${location.name}`,
      description: locationDescription(location),
      url,
      image: location.image,
      telephone: location.phone.replace(/\s+/g, ""),
      priceRange: "$$",
      geo: { "@type": "GeoCoordinates", latitude: location.geo.lat, longitude: location.geo.lng },
      areaServed: [location.city, ...location.nearby].map((name) => ({ "@type": "City", name })),
      containedInPlace: { "@type": "ShoppingCenter", name: location.name },
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.zip,
        addressCountry: "US",
      },
      hasMap: location.directionsUrl,
      openingHoursSpecification: openingHours(location.hours),
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      makesOffer: ["Phone repair", "Tablet repair", "Laptop repair", "Smartwatch repair", "Pre-owned phones"].map(
        (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } }),
      ),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      { name: location.name, path: `/locations/${location.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: locationFaqs(location).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ]
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  }
}

export function organizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      department: locations.map((location) => ({ "@id": `${SITE_URL}/locations/${location.slug}#store` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ]
}
