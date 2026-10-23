"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ReactLenis } from "lenis/react"

/**
 * Site-wide smooth, eased scrolling (Lenis). Off for visitors who ask their
 * device to reduce motion; native touch scrolling is kept on phones.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <>
      {enabled && <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }} />}
      {children}
    </>
  )
}
