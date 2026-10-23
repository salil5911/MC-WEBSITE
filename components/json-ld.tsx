import { getLocation } from "@/lib/locations"
import { locationSchema } from "@/lib/seo"
import { getGoogleReviews } from "@/lib/google-reviews"

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export async function LocationJsonLd({ slug }: { slug: string }) {
  const location = getLocation(slug)
  if (!location) return null
  const reviews = await getGoogleReviews()
  const mapsUrl = reviews?.stores.find((store) => store.storeSlug === slug)?.mapsUrl
  return <JsonLd data={locationSchema(location, mapsUrl)} />
}
