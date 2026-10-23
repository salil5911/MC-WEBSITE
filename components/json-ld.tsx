import { getLocation } from "@/lib/locations"
import { locationSchema } from "@/lib/seo"

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export function LocationJsonLd({ slug }: { slug: string }) {
  const location = getLocation(slug)
  if (!location) return null
  return <JsonLd data={locationSchema(location)} />
}
