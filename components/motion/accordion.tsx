"use client"

import { useId, useState } from "react"

export interface AccordionItem {
  question: string
  answer: string
}

/**
 * Questions that glide open (CSS grid-rows transition). Answers are always in
 * the HTML, so search engines and AI assistants can read every one.
 */
export function Accordion({
  items,
  light = false,
  headingLevel = "h3",
}: {
  items: AccordionItem[]
  light?: boolean
  headingLevel?: "h3" | "h4"
}) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()
  const Heading = headingLevel
  const line = light ? "border-white/15" : "border-ink/10"

  return (
    <div className={`border-t ${line}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.question} className={`border-b ${line}`}>
            <Heading>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-medium tracking-[-0.01em] sm:text-2xl ${
                  light ? "text-white" : "text-ink"
                }`}
              >
                {item.question}
                <span
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                    isOpen
                      ? "border-brand-mint bg-brand-mint text-ink"
                      : light
                        ? "border-white/20 text-white group-hover:border-white/60"
                        : "border-ink/15 text-ink group-hover:border-ink/50"
                  }`}
                  aria-hidden="true"
                >
                  <span className="absolute h-[1.5px] w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 ${
                      isOpen ? "rotate-90 opacity-0" : ""
                    }`}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className={`max-w-2xl pb-7 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink-soft"}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
