import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight } from "@/components/icons"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"

export interface Crumb {
  name: string
  path: string
}

interface PageHeaderProps {
  /** Trail after Home, e.g. [{ name: "Repairs", path: "/services" }]. The last item is the current page. */
  breadcrumbs: Crumb[]
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
  /** Right-hand column (image, facts). */
  aside?: ReactNode
  children?: ReactNode
}

/**
 * Standard inner-page header: visible breadcrumb trail (with matching
 * BreadcrumbList schema), one h1, an intro, and optional actions or aside.
 */
export function PageHeader({ breadcrumbs, eyebrow, title, intro, actions, aside, children }: PageHeaderProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs]
  return (
    <header className="relative overflow-hidden bg-ink text-white">
      <JsonLd data={breadcrumbSchema(trail)} />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/50">
            {trail.map((crumb, i) => {
              const last = i === trail.length - 1
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="text-white/80">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="transition-colors hover:text-white">
                        {crumb.name}
                      </Link>
                      <ChevronRight className="h-3 w-3" />
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className={`mt-10 grid gap-10 ${aside ? "lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16" : ""}`}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-mint">{eyebrow}</p>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] text-balance">
              {title}
            </h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </header>
  )
}

/** Thin spec row used in headers and sidebars: mono label over a value. */
export function Spec({ label, value, light = true }: { label: string; value: ReactNode; light?: boolean }) {
  return (
    <div className={`border-t pt-3 ${light ? "border-white/15" : "border-ink/15"}`}>
      <dt className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${light ? "text-white/50" : "text-ink-faint"}`}>
        {label}
      </dt>
      <dd className={`mt-1 font-display text-xl font-medium ${light ? "text-white" : "text-ink"}`}>{value}</dd>
    </div>
  )
}
