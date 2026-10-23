import { Children, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactElement, type ReactNode } from "react"

// Scroll reveals without per-element JavaScript. Elements carry data-reveal;
// one observer (RevealObserver) marks them data-shown as they enter the
// screen, and CSS in globals.css does the animating. Nothing is hidden unless
// the html element has .motion-ok, which an inline script sets only when
// JavaScript runs and the visitor hasn't asked to reduce motion.

type Direction = "up" | "left" | "right" | "none"

function delayStyle(delay: number, style?: CSSProperties): CSSProperties {
  return { ...style, ["--d" as string]: `${delay}s` }
}

/** Fades and slides its content in the first time it scrolls into view. */
export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  direction?: Direction
  /** Seconds. */
  delay?: number
  className?: string
  as?: ElementType
}) {
  return (
    <Tag data-reveal={direction} className={className} style={delayStyle(delay)}>
      {children}
    </Tag>
  )
}

/** Reveals each direct child (a StaggerItem) one after another. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  /** Seconds between items. */
  gap?: number
  as?: ElementType
}) {
  let i = 0
  return (
    <Tag className={className}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ delay?: number }>, { delay: Math.min(i++ * gap, 0.6) })
          : child,
      )}
    </Tag>
  )
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Set by Stagger. */
  delay?: number
}) {
  return (
    <Tag data-reveal="up" className={className} style={delayStyle(delay)}>
      {children}
    </Tag>
  )
}

/** Headline whose words rise one by one from behind a mask when it scrolls into view. */
export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
}) {
  const words = text.split(" ")
  return (
    <Tag data-reveal="words" className={className}>
      {words.map((word, i) => (
        <span key={i} className="reveal-mask">
          <span className="reveal-word" style={delayStyle(delay + i * 0.06)}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/** Gentle idle float, for product shots (CSS, see .float in globals.css). */
export function Float({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`float ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
