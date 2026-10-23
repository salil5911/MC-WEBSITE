interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: "center" | "left"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"
  return (
    <div
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${
            light ? "text-brand-mint" : "text-brand-mintDark"
          }`}
        >
          <span className="h-px w-6 bg-brand-mint" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance ${
          light ? "text-white" : "text-brand-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
