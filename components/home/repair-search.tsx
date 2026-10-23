"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Pin, Search } from "@/components/icons"

export interface SearchEntry {
  kind: "repair" | "store"
  label: string
  detail: string
  href: string
  /** Lowercase words that should match this entry. */
  terms: string[]
}

const EXAMPLES = [
  "iPhone 15 cracked screen",
  "Galaxy S24 battery drains fast",
  "iPad won't charge",
  "Stores near Atlanta",
  "Dropped my phone in water",
  "Pixel camera is blurry",
]

function useTypedPlaceholder(active: boolean) {
  const [text, setText] = useState(EXAMPLES[0])

  useEffect(() => {
    if (!active) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let example = 0
    let chars = EXAMPLES[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (deleting) {
        chars -= 1
        if (chars <= 0) {
          deleting = false
          example = (example + 1) % EXAMPLES.length
        }
      } else {
        chars += 1
      }
      setText(EXAMPLES[example].slice(0, Math.max(chars, 0)))
      const done = !deleting && chars >= EXAMPLES[example].length
      if (done) deleting = true
      timer = setTimeout(tick, done ? 2200 : deleting ? 28 : 55)
    }

    timer = setTimeout(tick, 2200)
    return () => clearTimeout(timer)
  }, [active])

  return text
}

function score(entry: SearchEntry, words: string[]) {
  let total = 0
  for (const word of words) {
    if (word.length < 2) continue
    if (entry.terms.some((term) => term.startsWith(word) || word.startsWith(term))) total += 2
    else if (entry.terms.some((term) => term.includes(word))) total += 1
  }
  return total
}

/**
 * "What needs fixing?" search. Matches free text against repair services and
 * store names, cities, and ZIP codes, and sends people straight to the page
 * that answers them. Works as a plain form (to /services) without JavaScript.
 */
export function RepairSearch({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const placeholder = useTypedPlaceholder(!focused && query === "")

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
    if (words.length === 0) return []
    const zip = words.find((w) => /^\d{3,5}$/.test(w))
    return entries
      .map((entry) => {
        let s = score(entry, words)
        if (zip && entry.kind === "store") {
          const storeZip = entry.terms.find((t) => /^\d{5}$/.test(t))
          if (storeZip) s += Math.max(0, 3 - Math.abs(Number(storeZip.slice(0, 3)) - Number(zip.slice(0, 3))) / 10)
        }
        return { entry, s }
      })
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 5)
      .map((r) => r.entry)
  }, [entries, query])

  useEffect(() => setActiveIndex(0), [query])

  const open = focused && query.trim().length > 0

  return (
    <form
      action="/services"
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        router.push(results[activeIndex]?.href ?? "/services")
      }}
      className="relative w-full max-w-xl"
    >
      <label htmlFor={`${listId}-input`} className="sr-only">
        What needs fixing? Search repairs or stores
      </label>
      <div className="search-glow relative flex items-center rounded-lg border border-white/15 bg-white/[0.06] backdrop-blur-sm transition-colors focus-within:border-brand-mint/70 focus-within:bg-white/[0.09]">
        <Search className="ml-4 h-5 w-5 shrink-0 text-white/60" />
        <input
          ref={inputRef}
          id={`${listId}-input`}
          name="q"
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${listId}-list`}
          aria-autocomplete="list"
          aria-activedescendant={open && results[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => {
            if (!open || results.length === 0) return
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setActiveIndex((i) => (i + 1) % results.length)
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setActiveIndex((i) => (i - 1 + results.length) % results.length)
            } else if (e.key === "Escape") {
              setQuery("")
            }
          }}
          className="h-14 w-full bg-transparent px-3 text-base text-white outline-none placeholder:text-white/45"
        />
        <button
          type="submit"
          aria-label="Find a fix"
          className="mr-2 inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-brand-mint px-4 text-sm font-medium text-ink transition-colors hover:bg-brand-mintLight"
        >
          <span className="hidden sm:inline">Find a fix</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <ul
          id={`${listId}-list`}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-ink/10 bg-white text-ink shadow-xl shadow-black/20"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-ink-soft">
              No exact match. Press Enter to see every repair we offer.
            </li>
          ) : (
            results.map((entry, i) => (
              <li
                key={entry.href}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault()
                  router.push(entry.href)
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center gap-3 border-b border-ink/5 px-4 py-3 last:border-0 ${
                  i === activeIndex ? "bg-paper" : ""
                }`}
              >
                <span className="w-14 shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
                  {entry.kind === "repair" ? "Repair" : "Store"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{entry.label}</span>
                  <span className="flex items-center gap-1 truncate text-xs text-ink-soft">
                    {entry.kind === "store" && <Pin className="h-3 w-3 shrink-0" />}
                    {entry.detail}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" />
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  )
}
