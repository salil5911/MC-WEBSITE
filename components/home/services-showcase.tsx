"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@/components/icons"

export interface ShowcaseService {
  slug: string
  name: string
  tagline: string
  image: string
  priceFrom: string
  turnaround: string
}

/**
 * Repairs list with a pinned photo that follows the repair in focus, either
 * by scrolling past it or hovering it. On phones each row shows its own photo.
 */
export function ServicesShowcase({ services }: { services: ShowcaseService[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-deep">
          {services.map((service, i) => (
            <div
              key={service.slug}
              className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
              }`}
            >
              <Image
                src={service.image}
                alt={`${service.name} at Mobile Care USA`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 pt-24 text-white">
            <p className="font-display text-2xl font-semibold">{services[active].name}</p>
            <p className="mt-1 text-white/75">
              {services[active].turnaround}, from {services[active].priceFrom}
            </p>
          </div>
        </div>
      </div>

      <ol>
        {services.map((service, i) => (
          <Row key={service.slug} service={service} index={i} active={active === i} setActive={setActive} />
        ))}
      </ol>
    </div>
  )
}

function Row({
  service,
  index,
  active,
  setActive,
}: {
  service: ShowcaseService
  index: number
  active: boolean
  setActive: (index: number) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  // "In focus" means crossing the middle band of the screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(index), {
      rootMargin: "-45% 0px -45% 0px",
    })
    io.observe(el)
    return () => io.disconnect()
  }, [index, setActive])

  return (
    <li
      ref={ref}
      data-reveal="up"
      onMouseEnter={() => setActive(index)}
      style={{ ["--d" as string]: `${index * 0.04}s` }}
      className="border-b border-ink/10 first:border-t"
    >
      <Link href={`/services/${service.slug}`} className="group block py-8 lg:py-10">
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
          <Image src={service.image} alt={`${service.name} at Mobile Care USA`} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3
              className={`font-display text-3xl font-semibold tracking-[-0.02em] transition-colors duration-500 sm:text-4xl ${
                active ? "text-ink" : "text-ink/35 lg:text-ink/30"
              } group-hover:text-ink`}
            >
              {service.name}
            </h3>
            <p className="mt-3 max-w-md text-lg text-ink-soft">{service.tagline}</p>
          </div>
          <span
            className={`mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
              active ? "border-ink bg-ink text-white" : "border-ink/15 text-ink"
            } group-hover:border-ink group-hover:bg-ink group-hover:text-white`}
          >
            <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
          </span>
        </div>
        <p className="mt-5 flex gap-8 text-[0.95rem] text-ink-soft">
          <span>
            From <span className="font-semibold text-ink">{service.priceFrom}</span>
          </span>
          <span>{service.turnaround}</span>
        </p>
      </Link>
    </li>
  )
}
