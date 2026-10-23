"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

type Variant = "fade-up" | "fade" | "fade-left" | "fade-right" | "scale"

interface RevealProps {
  children: ReactNode
  variant?: Variant
  delay?: number
  className?: string
  as?: ElementType
  once?: boolean
}

/**
 * Scroll-triggered reveal wrapper. Elements start hidden and animate into
 * view when they enter the viewport, producing an Apple-style scroll effect.
 * Respects prefers-reduced-motion by rendering content immediately.
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as,
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}
