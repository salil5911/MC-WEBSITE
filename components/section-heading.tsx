interface SectionHeadingProps {
  /** Short mono label above the title, e.g. "Repairs". */
  eyebrow?: string
  /** Optional section number shown before the eyebrow, e.g. "02". */
  index?: string
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
  index,
  title,
  subtitle,
  light = false,
  align = "left",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"
  const rule = light ? "border-white/15" : "border-ink/15"
  const label = light ? "text-white/60" : "text-ink-faint"
  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      {(eyebrow || index) && (
        <p
          className={`flex items-center gap-3 border-t pt-4 font-mono text-xs uppercase tracking-[0.14em] ${rule} ${label} ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {index && <span className={light ? "text-brand-mint" : "text-brand-mintDark"}>{index}</span>}
          {eyebrow}
        </p>
      )}
      <Heading
        className={`mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.6rem] text-balance ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-pretty ${isCenter ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
