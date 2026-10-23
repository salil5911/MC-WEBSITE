"use client"

import { useRef } from "react"
import Link from "next/link"
import { services } from "@/lib/services"

const devices = ["iPhone", "Galaxy", "Pixel", "iPad", "MacBook"]

/**
 * Repairs orbiting a phone. The rings spin with CSS (see .orbit-* in
 * globals.css, constant speed in every browser). Cards fade in one by one, and
 * the whole orbit tilts softly toward the pointer (CSS variables, eased with a
 * transition).
 */
export function RepairOrbit() {
  const orbit = useRef<HTMLDivElement>(null)
  const tilt = (x: number, y: number) => {
    orbit.current?.style.setProperty("--tilt-x", `${(-y * 20).toFixed(2)}deg`)
    orbit.current?.style.setProperty("--tilt-y", `${(x * 24).toFixed(2)}deg`)
  }

  return (
    <div
      className="[perspective:1200px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        tilt((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => tilt(0, 0)}
    >
      <div
        ref={orbit}
        className="orbit orbit-enter relative mx-auto aspect-square w-[var(--orbit)] transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
      >
        <div className="absolute inset-[16%] rounded-full border border-white/[0.07]" aria-hidden="true" />
        <div className="absolute inset-[1%] rounded-full border border-white/[0.07]" aria-hidden="true" />
        <div className="orbit-pulse absolute inset-[30%] rounded-full bg-brand-mint/10 blur-2xl" aria-hidden="true" />

        {/* phone */}
        <div className="absolute left-1/2 top-1/2 h-[44%] w-[23%] -translate-x-1/2 -translate-y-1/2 rounded-[1.6rem] bg-gradient-to-b from-white/25 to-white/5 p-[3px] shadow-[0_30px_80px_-20px_rgba(80,213,183,0.5)]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] bg-[#0c1a17]">
            <div className="absolute left-1/2 top-[5%] h-[4%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            <div className="orbit-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-brand-mint/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-[10%] text-center text-[0.65rem] font-medium text-brand-mint">
              Ready
            </div>
          </div>
        </div>

        {/* inner ring: device names drifting the other way */}
        <ul className="orbit-ring absolute inset-0" style={{ animationDuration: "90s", animationDirection: "reverse" }} aria-hidden="true">
          {devices.map((device, i) => {
            const angle = 36 + (360 / devices.length) * i
            return (
              <li
                key={device}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit) * 0.34))` }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div className="orbit-counter" style={{ animationDuration: "90s" }}>
                    <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white/30">
                      {device}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* outer ring: repairs */}
        <ul className="orbit-ring absolute inset-0" style={{ animationDuration: "70s" }} aria-label="Repairs we do most">
          {services.map((service, i) => {
            const angle = 30 + (360 / services.length) * i
            return (
              <li
                key={service.slug}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit) * 0.47))` }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div className="orbit-counter" style={{ animationDuration: "70s", animationDirection: "reverse" }}>
                    <div className="orbit-pop" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex w-max -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-[#1a2421] py-2 pl-3 pr-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors hover:border-brand-mint/60 hover:bg-[#223330]"
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-mint shadow-[0_0_12px_rgba(80,213,183,0.9)]" />
                        <span className="text-sm font-medium text-white">{service.shortName}</span>
                        <span className="text-sm text-white/50">{service.priceFrom}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
