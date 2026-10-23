"use client"

import { useEffect } from "react"

/**
 * The single observer behind every [data-reveal] element: marks each one
 * data-shown when it first comes into view. Watches the DOM for elements
 * added by client-side navigation.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion-ok")) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-shown", "")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    )

    const watch = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el))
    watch(document)

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches("[data-reveal]:not([data-shown])")) io.observe(node)
          watch(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
