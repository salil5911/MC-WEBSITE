import Link from "next/link"
import { services } from "@/lib/services"

/**
 * A ring of repair "spec cards" orbiting a phone, with device names drifting
 * the other way on an inner ring.
 * Pure CSS motion (see .orbit-* in globals.css); cards stay upright because
 * each one counter-rotates at the ring's speed. Paused under reduced motion.
 */
export function RepairOrbit() {
  const devices = ["iPhone", "Galaxy", "Pixel", "iPad", "MacBook"]

  return (
    <div className="orbit relative mx-auto aspect-square w-[var(--orbit)]" aria-label="Repairs we do most">
      {/* rings */}
      <div className="absolute inset-[17%] rounded-full border border-dashed border-white/15" aria-hidden="true" />
      <div className="absolute inset-[1%] rounded-full border border-white/10" aria-hidden="true" />

      {/* phone */}
      <div className="absolute left-1/2 top-1/2 h-[42%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border border-white/25 bg-ink p-[5%] shadow-[0_0_60px_-10px_rgba(80,213,183,0.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] bg-[#0b1f1b]">
          <div className="orbit-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-brand-mint/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-[12%] text-center font-mono text-[0.5rem] uppercase tracking-[0.18em] text-brand-mint sm:text-[0.6rem]">
            Ready
          </div>
        </div>
      </div>

      {/* inner ring: device names drifting the other way */}
      <ul className="orbit-ring absolute inset-0" style={{ animationDuration: "80s", animationDirection: "reverse" }} aria-hidden="true">
        {devices.map((device, i) => {
          const angle = 36 + (360 / devices.length) * i
          return (
            <li
              key={device}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit) * 0.33))` }}
            >
              <div style={{ transform: `rotate(${-angle}deg)` }}>
                <div className="orbit-counter" style={{ animationDuration: "80s" }}>
                  <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
                    {device}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <Ring items={services} radius="47%" duration="70s" offset={30} />
    </div>
  )
}

function Ring({
  items,
  radius,
  duration,
  reverse = false,
  offset = 0,
}: {
  items: typeof services
  radius: string
  duration: string
  reverse?: boolean
  offset?: number
}) {
  return (
    <ul
      className="orbit-ring absolute inset-0"
      style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
    >
      {items.map((service, i) => {
        const angle = offset + (360 / items.length) * i
        return (
          <li
            key={service.slug}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit) * ${parseFloat(radius) / 100}))` }}
          >
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <div
                className="orbit-counter"
                style={{ animationDuration: duration, animationDirection: reverse ? "normal" : "reverse" }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block w-max -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-ink/80 px-2 py-1.5 backdrop-blur-md sm:px-3 sm:py-2 transition-colors hover:border-brand-mint/70"
                >
                  <span className="block text-[0.7rem] font-medium text-white sm:text-sm">{service.shortName}</span>
                  <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.08em] text-white/55 sm:text-[0.62rem] sm:tracking-[0.1em]">
                    {service.turnaround.replace("–", "-")} · from {service.priceFrom}
                  </span>
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
