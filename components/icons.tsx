import type { SVGProps } from "react"

// Mobile Care's own small glyph set. Drawn on a 24px grid with square caps and
// a 1.5px stroke so they read as precise linework rather than stock icons.
// Decorative use is avoided on purpose: only glyphs that carry meaning
// (direction, contact, time, place) live here.

type IconProps = SVGProps<SVGSVGElement>

function Glyph({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Glyph>
)

export const ArrowLeft = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </Glyph>
)

export const ArrowUpRight = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Glyph>
)

export const ChevronDown = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M6 9l6 6 6-6" />
  </Glyph>
)

export const ChevronRight = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M9 6l6 6-6 6" />
  </Glyph>
)

export const Check = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Glyph>
)

export const Close = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Glyph>
)

export const Menu = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M3 7h18M3 12h18M3 17h12" />
  </Glyph>
)

export const Search = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15l5.5 5.5" />
  </Glyph>
)

export const Phone = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M5 4h4l1.5 4.5-2.5 1.5a11 11 0 006 6l1.5-2.5L20 15v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
  </Glyph>
)

export const Pin = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.25" />
  </Glyph>
)

export const Clock = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Glyph>
)

/** Filled star for ratings. */
export const Star = ({ className, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...p}>
    <path d="M12 2.8l2.75 5.95 6.5.7-4.85 4.4 1.35 6.4L12 17.05l-5.75 3.2 1.35-6.4-4.85-4.4 6.5-.7z" />
  </svg>
)

export const Dot = ({ className, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...p}>
    <circle cx="12" cy="12" r="4" />
  </svg>
)

export const Facebook = ({ className, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
  </svg>
)

export const Instagram = (p: IconProps) => (
  <Glyph {...p}>
    <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
    <circle cx="12" cy="12" r="3.75" />
    <path d="M17.25 6.75h.01" strokeWidth={2} />
  </Glyph>
)
