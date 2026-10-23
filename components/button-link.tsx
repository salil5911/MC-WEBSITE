import Link from "next/link"
import type { ComponentProps } from "react"
import { ArrowRight } from "@/components/icons"

type Variant = "primary" | "dark" | "outline" | "outline-light" | "text" | "text-light"

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2"

const variants: Record<Variant, string> = {
  primary: "bg-brand-mint px-7 py-3.5 text-ink hover:bg-brand-mintLight",
  dark: "bg-ink px-7 py-3.5 text-white hover:bg-ink/85",
  outline: "border border-ink/20 px-7 py-3.5 text-ink hover:border-ink/60",
  "outline-light": "border border-white/25 px-7 py-3.5 text-white hover:border-white/70",
  text: "text-ink underline-offset-4 hover:underline",
  "text-light": "text-white underline-offset-4 hover:underline",
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant
  arrow?: boolean
}

/** A link styled as a button. Use instead of nesting <Button> inside <Link>. */
export function ButtonLink({ variant = "primary", arrow = true, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  )
}
