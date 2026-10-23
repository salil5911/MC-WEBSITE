"use client"

import { useEffect, useRef } from "react"
import { Star } from "@/components/icons"
import type { GoogleReview } from "@/lib/google-reviews"
import { onScrollWhileVisible } from "@/components/motion/client"

/**
 * Scroll-stacking testimonials: each review pins near the top of the screen
 * and the next one slides up over it, while the ones underneath shrink back
 * and dim. Recomputed only on frames where the page scrolled.
 */
export function ReviewStack({ reviews }: { reviews: GoogleReview[] }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"))
    const shades = Array.from(el.querySelectorAll<HTMLElement>("[data-shade]"))
    const n = cards.length
    return onScrollWhileVisible(el, () => {
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0
      cards.forEach((card, i) => {
        const local = Math.min(1, Math.max(0, (progress - i / n) / (1 - i / n || 1)))
        card.style.transform = `scale(${(1 - local * (n - i) * 0.035).toFixed(4)})`
        const next = Math.min(1, Math.max(0, (progress - i / n) * n))
        shades[i].style.opacity = i === n - 1 ? "0" : (next * 0.35).toFixed(3)
      })
    })
  }, [])

  return (
    <div ref={root} className="relative">
      {reviews.map((review, i) => (
        <div
          key={review.id}
          className="sticky flex h-[70vh] min-h-[26rem] items-start"
          style={{ top: `calc(7rem + ${i * 1.4}rem)` }}
        >
          <figure
            data-card=""
            className="relative flex min-h-[22rem] w-full origin-top flex-col overflow-hidden rounded-[2rem] bg-paper p-8 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] will-change-transform sm:p-12"
          >
            <div data-shade="" className="pointer-events-none absolute inset-0 bg-ink opacity-0" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-brand-mintDark" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className={`h-5 w-5 ${s < review.rating ? "" : "opacity-20"}`} />
                ))}
              </div>
              <span className="text-[0.95rem] font-medium text-ink-soft">{review.storeName}</span>
            </div>
            <blockquote className="mt-8 line-clamp-6 flex-1 font-display text-2xl font-medium leading-snug tracking-[-0.01em] sm:text-[2rem]">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-between text-[0.95rem]">
              <span className="font-semibold">{review.author}</span>
              <span className="text-ink-soft">{review.relativeTime}</span>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  )
}
