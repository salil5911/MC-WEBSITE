import { WordReveal, FadeIn } from "@/components/motion/primitives"

interface SectionHeadingProps {
  /** Short label above the title, e.g. "Repairs". */
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: "center" | "left"
  /** Heading level; sections are h2 unless they sit under another h2. */
  as?: "h2" | "h3"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "left",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"
  return (
    <div className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <FadeIn
          as="p"
          className={`flex items-center gap-3 text-[0.95rem] font-medium ${isCenter ? "justify-center" : ""} ${
            light ? "text-brand-mint" : "text-brand-mintDark"
          }`}
        >
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </FadeIn>
      )}
      <WordReveal
        as={as}
        text={title}
        className={`mt-4 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem] ${
          light ? "text-white" : "text-ink"
        }`}
      />
      {subtitle && (
        <FadeIn
          as="p"
          delay={0.15}
          className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${isCenter ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </FadeIn>
      )}
    </div>
  )
}
