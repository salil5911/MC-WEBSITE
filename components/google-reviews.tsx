import { Star, Quote, MapPin, ExternalLink } from "lucide-react"
import { getGoogleReviews, type GoogleReview } from "@/lib/google-reviews"

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/Mobile+Care+USA"

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.5 10.5 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}

function Avatar({ review, size = "h-10 w-10" }: { review: GoogleReview; size?: string }) {
  if (review.authorPhoto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={review.authorPhoto}
        alt=""
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-brand-mint/20 font-semibold text-brand-mintDark ring-2 ring-white`}
    >
      {review.author.charAt(0).toUpperCase()}
    </span>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:w-96">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <GoogleMark className="h-4 w-4" />
      </div>
      <blockquote className="mt-4 line-clamp-5 flex-1 text-[15px] leading-relaxed text-gray-700">
        {review.text}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-brand-dark">{review.author}</p>
          <p className="flex items-center gap-1 truncate text-xs text-gray-500">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            {review.storeName}
            {review.relativeTime && <span aria-hidden="true">{" · "}</span>}
            {review.relativeTime}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

function MarqueeRow({ reviews, reverse = false }: { reviews: GoogleReview[]; reverse?: boolean }) {
  return (
    <div className="reviews-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className={`reviews-marquee-track gap-5 ${reverse ? "reviews-marquee-reverse" : ""}`}>
        {[...reviews, ...reviews].map((review, i) => (
          <div key={`${review.id}-${i}`} aria-hidden={i >= reviews.length ? true : undefined}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Fallback() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
      <GoogleMark className="h-10 w-10" />
      <p className="mt-4 text-lg font-semibold text-brand-dark">Rated by real customers on Google</p>
      <p className="mt-2 text-gray-600">See what customers say about every Mobile Care store.</p>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-mintDark"
      >
        Read our Google reviews
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}

export async function GoogleReviews() {
  const data = await getGoogleReviews()
  if (!data || data.reviews.length === 0) return <Fallback />

  const { reviews, stores, averageRating, totalReviews } = data
  const [featured, ...rest] = [...reviews].sort((a, b) => b.text.length - a.text.length)
  const pool = rest.length > 0 ? rest : [featured]
  const half = Math.ceil(pool.length / 2)
  const rowA = pool.slice(0, half)
  const rowB = pool.length > 3 ? pool.slice(half) : pool
  const topStores = [...stores].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4)

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col justify-between rounded-3xl bg-brand-dark p-8 text-white lg:col-span-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <GoogleMark />
              Google rating across all stores
            </div>
            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-6xl font-bold leading-none">{averageRating.toFixed(1)}</span>
              <span className="pb-1 text-lg text-gray-400">/ 5</span>
            </div>
            <div className="mt-3">
              <Stars rating={averageRating} size="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm text-gray-300">
              Based on {totalReviews.toLocaleString("en-US")} verified Google reviews
            </p>
          </div>
          <ul className="mt-8 flex flex-col gap-3">
            {topStores.map((store) => (
              <li key={store.storeSlug}>
                <a
                  href={store.mapsUrl ?? GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
                >
                  <span className="font-medium">{store.storeName}</span>
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {store.rating.toFixed(1)}
                    <span className="text-gray-500">({store.reviewCount.toLocaleString("en-US")})</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-brand-mint/10 p-8 sm:p-10 lg:col-span-3">
          <Quote className="absolute -right-4 -top-4 h-40 w-40 text-brand-mint/20" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-mintDark">
              Featured review
            </span>
            <div className="mt-6">
              <Stars rating={featured.rating} size="h-5 w-5" />
            </div>
            <blockquote className="mt-4 line-clamp-[8] text-pretty font-display text-xl font-medium leading-relaxed text-brand-dark sm:text-2xl">
              {`\u201C${featured.text}\u201D`}
            </blockquote>
          </div>
          <figcaption className="relative mt-8 flex items-center gap-4">
            <Avatar review={featured} size="h-12 w-12" />
            <div>
              <p className="font-semibold text-brand-dark">{featured.author}</p>
              <p className="text-sm text-gray-600">
                {featured.storeName}
                {featured.relativeTime && ` · ${featured.relativeTime}`}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>

      {pool.length > 1 && (
        <div className="mt-10 flex flex-col gap-5">
          <MarqueeRow reviews={rowA} />
          {pool.length > 3 && <MarqueeRow reviews={rowB} reverse />}
        </div>
      )}

      <div className="mt-8 flex justify-center text-sm">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-dark underline-offset-4 hover:underline"
        >
          See all reviews on Google
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
