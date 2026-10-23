import type { ElementType, ReactNode } from "react"

type Variant = "fade-up" | "fade" | "fade-left" | "fade-right" | "scale"

interface RevealProps {
  children: ReactNode
  variant?: Variant
  /** Kept for call-site compatibility; scroll-driven reveals are paced by scroll position. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Scroll reveal driven entirely by CSS (`animation-timeline: view()`).
 * Content is visible by default and only animates in browsers that support
 * scroll-driven animations, so crawlers, no-JS visitors, and reduced-motion
 * users always get the full page. See globals.css.
 */
export function Reveal({ children, variant = "fade-up", className = "", as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  return (
    <Tag data-reveal={variant} className={className}>
      {children}
    </Tag>
  )
}
