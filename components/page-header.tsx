import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight } from "@/components/icons"
import { JsonLd } from "@/components/json-ld"
import { RiseText } from "@/components/motion/rise-text"
import { breadcrumbSchema } from "@/lib/seo"

export interface Crumb {
  name: string
  path: string
}

interface PageHeaderProps {
  /** Trail after Home, e.g. [{ name: "Repairs", path: "/services" }]. The last item is the current page. */
  breadcrumbs: Crumb[]
  eyebrow?: string
  title: string
  intro?: ReactNode
  actions?: ReactNode
  /** The big visual on the right: a photo, product shots, a map. */
  media?: ReactNode
  /** "light" sits on the studio grey of the product photos. */
  tone?: "dark" | "light"
  /** Facts row under the header (see <Fact>). */
  children?: ReactNode
}

/**
 * Inner-page header: breadcrumb trail (with BreadcrumbList schema), a large
 * rising headline, intro and actions on the left, and a big visual on the right.
 */
export function PageHeader({ breadcrumbs, eyebrow, title, intro, actions, media, tone = "dark", children }: PageHeaderProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs]
  const dark = tone === "dark"

  return (
    <header className={`relative overflow-hidden ${dark ? "bg-ink text-white" : "bg-[#f0eff2] text-ink"}`}>
      <JsonLd data={breadcrumbSchema(trail)} />
      {dark && <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />}

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <nav aria-label="Breadcrumb" className="soft-in">
          <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? "text-white/55" : "text-ink-soft"}`}>
            {trail.map((crumb, i) => {
              const last = i === trail.length - 1
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className={dark ? "text-white/85" : "text-ink"}>
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className={`transition-colors ${dark ? "hover:text-white" : "hover:text-ink"}`}>
                        {crumb.name}
                      </Link>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className={`mt-10 grid items-center gap-12 lg:mt-14 ${media ? "lg:grid-cols-[1.05fr_1fr] lg:gap-16" : ""}`}>
          <div className={media ? "" : "max-w-4xl"}>
            {eyebrow && (
              <p
                className={`soft-in flex items-center gap-3 text-[0.95rem] font-medium ${dark ? "text-brand-mint" : "text-brand-mintDark"}`}
                style={{ animationDelay: "0.05s" }}
              >
                <span className="h-px w-8 bg-current" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h1
              className={`mt-5 font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl ${
                media ? "lg:text-[3.9rem]" : "lg:text-[4.5rem]"
              }`}
            >
              <RiseText text={title} start={0.1} />
            </h1>
            {intro && (
              <div
                className={`soft-in mt-7 max-w-xl text-lg leading-relaxed sm:text-xl ${dark ? "text-white/70" : "text-ink-soft"}`}
                style={{ animationDelay: "0.35s" }}
              >
                {intro}
              </div>
            )}
            {actions && (
              <div className="soft-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.5s" }}>
                {actions}
              </div>
            )}
          </div>
          {media && (
            <div className="soft-in" style={{ animationDelay: "0.25s" }}>
              {media}
            </div>
          )}
        </div>

        {children && (
          <dl
            className={`soft-in mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t pt-10 lg:grid-cols-4 ${
              dark ? "border-white/10" : "border-ink/10"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            {children}
          </dl>
        )}
      </div>
    </header>
  )
}

/** A headline fact: big value, short label under it. Use inside <PageHeader>. */
export function Fact({ label, value, tone = "dark" }: { label: string; value: ReactNode; tone?: "dark" | "light" }) {
  return (
    <div className="flex flex-col">
      <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{value}</dd>
      <dt className={`mt-2 text-[0.95rem] ${tone === "dark" ? "text-white/55" : "text-ink-soft"}`}>{label}</dt>
    </div>
  )
}
