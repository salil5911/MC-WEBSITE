import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { services } from "@/lib/services"
import { locations } from "@/lib/locations"

const companyLinks = [
  { href: "/services", label: "Repair Services" },
  { href: "/pre-owned", label: "Pre-Owned Phones" },
  { href: "/accessories", label: "Accessories" },
  { href: "/locations", label: "All Locations" },
  { href: "/about", label: "About Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
]

const linkClass = "text-sm text-gray-300 hover:text-brand-mint transition-colors"

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-xl font-bold text-brand-mint">Mobile Care</p>
            <p className="text-sm text-gray-300">
              Walk-in phone, tablet, and laptop repair in Georgia, Virginia, North Carolina, and Michigan.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/mobilecareaugusta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-mint transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/mobilecareusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-mint transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <nav aria-label="Repair services">
            <p className="text-lg font-semibold mb-4">Repair Services</p>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Store locations">
            <p className="text-lg font-semibold mb-4">Store Locations</p>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className={linkClass}>
                    {location.name}, {location.city} {location.state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-lg font-semibold mb-4">Company</p>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Mobile Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
