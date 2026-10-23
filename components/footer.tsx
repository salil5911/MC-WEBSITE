import Link from "next/link"
import { Facebook, Instagram } from "@/components/icons"
import { services } from "@/lib/services"
import { locations } from "@/lib/locations"

const companyLinks = [
  { href: "/services", label: "Repair services" },
  { href: "/pre-owned", label: "Pre-owned phones" },
  { href: "/accessories", label: "Accessories" },
  { href: "/locations", label: "All locations" },
  { href: "/about", label: "About Mobile Care" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
]

const heading = "text-sm font-semibold text-brand-mint"
const link = "text-[0.98rem] text-white/75 transition-colors hover:text-white"

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_2fr]">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight">
              Mobile Care <span className="text-brand-mint">USA</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Walk-in phone, tablet, and laptop repair in Georgia, Virginia, North Carolina, and Michigan. Same-day
              repairs with a 30-day warranty.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/mobilecareaugusta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-white"
                aria-label="Mobile Care USA on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/mobilecareusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-white"
                aria-label="Mobile Care USA on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Repair services">
            <p className={heading}>Repairs</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={link}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className={heading}>Company</p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Store locations">
            <p className={heading}>Stores</p>
            <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {locations.map((store) => (
                <li key={store.slug} className="text-sm">
                  <Link href={`/locations/${store.slug}`} className="font-medium text-white/90 hover:text-brand-mint">
                    {store.name}
                  </Link>
                  <address className="mt-0.5 not-italic leading-relaxed text-white/55">
                    {store.address}, {store.city}, {store.state} {store.zip}
                    <br />
                    <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                      {store.phone.replace("+1 ", "")}
                    </a>
                  </address>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Mobile Care USA. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
