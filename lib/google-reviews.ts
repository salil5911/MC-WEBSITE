import { unstable_cache } from "next/cache"
import { locations } from "@/lib/locations"

export const MIN_RATING = 4

export interface GoogleReview {
  id: string
  author: string
  authorPhoto?: string
  authorUrl?: string
  rating: number
  text: string
  relativeTime: string
  publishTime: string
  storeName: string
  storeSlug: string
}

export interface StoreRating {
  storeName: string
  storeSlug: string
  rating: number
  reviewCount: number
  mapsUrl?: string
}

export interface ReviewsData {
  reviews: GoogleReview[]
  stores: StoreRating[]
  averageRating: number
  totalReviews: number
}

interface PlacesReview {
  name?: string
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  publishTime?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

interface PlacesResult {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: PlacesReview[]
}

const FIELD_MASK = "places.id,places.rating,places.userRatingCount,places.googleMapsUri,places.reviews"

async function fetchStorePlace(apiKey: string, query: string): Promise<PlacesResult | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 1, languageCode: "en" }),
  })
  if (!res.ok) {
    console.error(`Google Places request failed (${res.status}) for "${query}"`)
    return null
  }
  const data = (await res.json()) as { places?: PlacesResult[] }
  return data.places?.[0] ?? null
}

async function loadReviews(apiKey: string): Promise<ReviewsData> {
  const results = await Promise.all(
    locations.map(async (store) => {
      const query = `Mobile Care ${store.name}, ${store.address}, ${store.city}, ${store.state} ${store.zip}`
      try {
        return { store, place: await fetchStorePlace(apiKey, query) }
      } catch (error) {
        console.error(`Google Places lookup error for ${store.slug}`, error)
        return { store, place: null }
      }
    }),
  )

  const stores: StoreRating[] = []
  const reviews: GoogleReview[] = []

  for (const { store, place } of results) {
    if (!place) continue
    if (place.rating && place.userRatingCount) {
      stores.push({
        storeName: store.name,
        storeSlug: store.slug,
        rating: place.rating,
        reviewCount: place.userRatingCount,
        mapsUrl: place.googleMapsUri,
      })
    }
    for (const review of place.reviews ?? []) {
      const text = (review.originalText?.text ?? review.text?.text ?? "").trim()
      const rating = review.rating ?? 0
      if (rating < MIN_RATING || text.length === 0) continue
      reviews.push({
        id: review.name ?? `${store.slug}-${review.publishTime}-${review.authorAttribution?.displayName}`,
        author: review.authorAttribution?.displayName ?? "Google user",
        authorPhoto: review.authorAttribution?.photoUri,
        authorUrl: review.authorAttribution?.uri,
        rating,
        text,
        relativeTime: review.relativePublishTimeDescription ?? "",
        publishTime: review.publishTime ?? "",
        storeName: store.name,
        storeSlug: store.slug,
      })
    }
  }

  // Throwing keeps unstable_cache from storing an empty result for the full revalidate window.
  if (reviews.length === 0 && stores.length === 0) {
    throw new Error("Google Places returned no ratings or reviews for any store")
  }

  reviews.sort((a, b) => b.publishTime.localeCompare(a.publishTime))

  const totalReviews = stores.reduce((sum, s) => sum + s.reviewCount, 0)
  const averageRating =
    totalReviews > 0 ? stores.reduce((sum, s) => sum + s.rating * s.reviewCount, 0) / totalReviews : 0

  return { reviews, stores, averageRating, totalReviews }
}

const getCachedReviews = unstable_cache(loadReviews, ["google-reviews-v3"], {
  revalidate: 60 * 60 * 12,
  tags: ["google-reviews"],
})

export async function getGoogleReviews(): Promise<ReviewsData | null> {
  const apiKey =
    process.env.GCP_API_KEY_2 || process.env.GOOGLE_PLACES_API_KEY || process.env.GCP_API_KEY
  if (!apiKey) return null
  try {
    return await getCachedReviews(apiKey)
  } catch (error) {
    console.error("Failed to load Google reviews", error)
    return null
  }
}
