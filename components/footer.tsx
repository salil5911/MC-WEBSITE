import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-mint">Mobile Care</h3>
            <p className="text-sm">Expert device repair and premium accessories for all your tech needs.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-brand-mint transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-brand-mint transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-mint transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-mint transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-brand-mint transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
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
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mobile Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

