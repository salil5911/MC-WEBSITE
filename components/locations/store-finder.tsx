"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "@/components/icons"

export interface FinderStore {
  slug: string
  name: string
  city: string
  state: string
  zip: string
  address: string
}

/**
 * ZIP code lookup. ZIP prefixes are roughly geographic, so the closest numeric
 * match is a good-enough "nearest store" without sending location data anywhere.
 */
export function StoreFinder({ stores }: { stores: FinderStore[] }) {
  const [zip, setZip] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const nearest = useMemo(() => {
    if (!submitted || !/^\d{3,5}$/.test(zip)) return null
    const target = Number(zip.padEnd(5, "0"))
    return [...stores].sort((a, b) => Math.abs(Number(a.zip) - target) - Math.abs(Number(b.zip) - target))[0]
  }, [zip, submitted, stores])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="flex max-w-xl items-center rounded-full border border-white/15 bg-white/[0.06] focus-within:border-brand-mint/70"
      >
        <label htmlFor="zip" className="sr-only">
          ZIP code
        </label>
        <Search className="ml-6 h-5 w-5 shrink-0 text-white/60" />
        <input
          id="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
            setSubmitted(false)
          }}
          className="h-16 w-full bg-transparent px-3 text-lg text-white outline-none placeholder:text-white/45"
        />
        <button
          type="submit"
          className="mr-2 inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-brand-mint px-5 text-[0.95rem] font-medium text-ink hover:bg-brand-mintLight"
        >
          Find nearest
        </button>
      </form>
      <div aria-live="polite" className="mt-4 min-h-[3.5rem]">
        {nearest && (
          <Link
            href={`/locations/${nearest.slug}`}
            className="group inline-flex items-center gap-4 rounded-full border border-brand-mint/40 bg-brand-mint/10 py-3 pl-6 pr-5"
          >
            <span>
              <span className="block text-sm font-medium text-brand-mint">Closest store</span>
              <span className="block font-medium text-white">
                {nearest.name}, {nearest.city} {nearest.state}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
        {submitted && !nearest && <p className="text-sm text-white/60">Enter a 3 to 5 digit ZIP code.</p>}
      </div>
    </div>
  )
}
