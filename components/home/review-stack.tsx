"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Star } from "@/components/icons"
import type { GoogleReview } from "@/lib/google-reviews"

const VISIBLE = 3
const INTERVAL_MS = 6000

/**
 * A deck of Google reviews. The front card is readable; the next two peek out
 * behind it. Advances on a timer (paused on hover/focus and under reduced
 * motion), with buttons, arrow keys, and swipe for manual control.
 */
export function ReviewStack({ reviews }: { reviews: GoogleReview[] }) {
  const [front, setFront] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = reviews.length

  const next = useCallback(() => setFront((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setFront((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = setInterval(next, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused, next, count])

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next()
          if (e.key === "ArrowLeft") prev()
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
          touchX.current = null
        }}
        className="relative mt-12 grid min-h-[22rem] outline-none focus-visible:ring-2 focus-visible:ring-brand-mint sm:min-h-[20rem]"
      >
        {reviews.map((review, i) => {
          const depth = (i - front + count) % count
          const shown = depth < VISIBLE
          return (
            <figure
              key={review.id}
              aria-hidden={depth !== 0}
              className="review-card col-start-1 row-start-1 flex flex-col rounded-md border border-ink/10 bg-paper p-7 text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] sm:p-9"
              style={{
                zIndex: count - depth,
                opacity: shown ? 1 - depth * 0.3 : 0,
                transform: `translateY(${depth * -22}px) scale(${1 - depth * 0.05})`,
                transformOrigin: "top center",
                pointerEvents: depth === 0 ? "auto" : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-brand-mintDark" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className={`h-4 w-4 ${s < review.rating ? "" : "opacity-20"}`} />
                  ))}
                </div>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
                  {review.storeName}
                </span>
              </div>
              <blockquote className="mt-6 line-clamp-6 flex-1 font-display text-xl leading-snug tracking-[-0.01em] sm:text-[1.4rem]">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
                <span className="font-medium">{review.author}</span>
                <span className="text-ink-faint">{review.relativeTime}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-white/60"
          aria-label="Previous review"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-white/60"
          aria-label="Next review"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="font-mono text-xs text-white/50" aria-live="polite">
          {String(front + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </div>
  )
}
