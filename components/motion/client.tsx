"use client"

import { Children, useEffect, useRef, type ReactNode } from "react"

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Calls `update` once per frame in which the page scrolled (and once up
 * front), but only while `target` is near the screen. Idle pages cost nothing.
 */
export function onScrollWhileVisible(target: Element, update: () => void) {
  let raf = 0
  let visible = false
  const schedule = () => {
    if (!visible || raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      update()
    })
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    },
    { rootMargin: "200px" },
  )
  io.observe(target)
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule, { passive: true })
  return () => {
    io.disconnect()
    cancelAnimationFrame(raf)
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", schedule)
  }
}

/** Moves its content slower than the page scrolls. Wrap images in an overflow-hidden frame. */
export function Parallax({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode
  className?: string
  /** Percent of travel across the viewport. */
  strength?: number
}) {
  const frame = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frame.current
    const inner = layer.current
    if (!el || !inner || prefersReducedMotion()) return
    return onScrollWhileVisible(el, () => {
      const r = el.getBoundingClientRect()
      // -1 when the frame is just below the screen, 1 when just above it.
      const half = window.innerHeight / 2
      const p = Math.max(-1, Math.min(1, (half - (r.top + r.height / 2)) / (half + r.height / 2)))
      inner.style.transform = `translate3d(0, ${(p * strength).toFixed(2)}%, 0) scale(${1 + strength / 50})`
    })
  }, [strength])

  return (
    <div ref={frame} className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      <div ref={layer} className="absolute inset-0 will-change-transform" style={{ transform: `scale(${1 + strength / 50})` }}>
        {children}
      </div>
    </div>
  )
}

/** Counts up to `value` the first time it is seen. */
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return
    const format = (v: number) => `${v.toFixed(decimals)}${suffix}`
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600)
          node.textContent = format(value * easeOut(t))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, decimals, suffix])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/**
 * Infinite ticker. The drift is a CSS animation the browser runs on the GPU;
 * scrolling speeds it up (and scrolling up reverses it) by adjusting the
 * animation's playback rate, then it eases back to its normal pace.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -2,
  className,
}: {
  children: ReactNode
  /** Percent of one copy's width per second; negative moves left. */
  baseVelocity?: number
  className?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  const seconds = 50 / Math.abs(baseVelocity)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const animation = el.getAnimations()[0]
    if (!animation) return

    let lastY = window.scrollY
    let lastT = performance.now()
    let rate = 1
    let raf = 0
    const settle = () => {
      rate += (Math.sign(rate) - rate) * 0.06
      animation.updatePlaybackRate(rate)
      raf = Math.abs(rate - Math.sign(rate)) > 0.01 ? requestAnimationFrame(settle) : 0
    }
    const onScroll = () => {
      const now = performance.now()
      const velocity = (window.scrollY - lastY) / Math.max(16, now - lastT)
      lastY = window.scrollY
      lastT = now
      const direction = velocity < -0.05 ? -1 : velocity > 0.05 ? 1 : Math.sign(rate) || 1
      rate = direction * Math.min(1 + Math.abs(velocity) * 3, 7)
      animation.updatePlaybackRate(rate)
      if (!raf) raf = requestAnimationFrame(settle)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const items = Children.toArray(children)
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={track}
        className="marquee-track flex w-max"
        style={{ animationDuration: `${seconds}s`, animationDirection: baseVelocity < 0 ? "normal" : "reverse" }}
      >
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  )
}
