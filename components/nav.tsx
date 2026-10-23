"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu } from "@/components/icons"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { services } from "@/lib/services"
import { locations as storeLocations } from "@/lib/locations"
import { preOwnedBrands } from "@/lib/pre-owned"

const STATE_NAMES: Record<string, string> = {
  GA: "Georgia",
  VA: "Virginia",
  NC: "North Carolina",
  MI: "Michigan",
}

const REGION_ORDER = ["GA", "VA", "NC", "MI"]

const locationsByRegion = REGION_ORDER.map((state) => ({
  state,
  name: STATE_NAMES[state] ?? state,
  stores: storeLocations.filter((l) => l.state === state),
})).filter((region) => region.stores.length > 0)

const LOGO_SRC =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MC%20LOGO-XowG6Q2hKUlDImWUZUx6UDaRQp4r2h.png"

const menuItem = "w-full cursor-pointer rounded-lg px-3 py-2 text-[0.95rem]"
const menuLabel = "px-2 pb-1 pt-2 text-xs font-semibold text-ink-faint"

export function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Over a dark hero the bar starts transparent with white text; over a light
  // hero (or once scrolled) it is ink on paper.
  const onDark = tone === "dark" && !scrolled
  const linkColor = onDark ? "text-white/85 hover:text-white" : "text-ink hover:text-brand-mintDark"
  const navLink = `px-3.5 py-2 text-[0.98rem] font-medium transition-colors ${linkColor}`

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
          : `border-b bg-transparent ${tone === "dark" ? "border-white/10" : "border-ink/10"}`
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0" aria-label="Mobile Care USA home">
          <Image
            src={LOGO_SRC}
            alt="Mobile Care USA"
            width={400}
            height={133}
            priority
            className={`h-11 w-auto transition-[filter] duration-300 ${onDark ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <div className="hidden items-center md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${navLink}`}>
              Repairs
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-2xl border-ink/10 p-2 shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/services" className={`${menuItem} font-semibold`}>
                  All repair services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {services.map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link href={`/services/${service.slug}`} className={menuItem}>
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${navLink}`}>
              Locations
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-2xl border-ink/10 p-2 shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/locations" className={`${menuItem} font-semibold`}>
                  All 8 stores
                </Link>
              </DropdownMenuItem>
              {locationsByRegion.map((region) => (
                <div key={region.state}>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className={menuLabel}>{region.name}</DropdownMenuLabel>
                  {region.stores.map((store) => (
                    <DropdownMenuItem key={store.slug} asChild>
                      <Link href={`/locations/${store.slug}`} className={menuItem}>
                        {store.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${navLink}`}>
              Pre-owned
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60 rounded-2xl border-ink/10 p-2 shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/pre-owned" className={`${menuItem} font-semibold`}>
                  All pre-owned phones
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {preOwnedBrands.map((brand) => (
                <DropdownMenuItem key={brand.slug} asChild>
                  <Link href={`/pre-owned/${brand.slug}`} className={menuItem}>
                    {brand.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/accessories" className={navLink}>
            Accessories
          </Link>
          <Link href="/about" className={navLink}>
            About
          </Link>

          <Link
            href="/locations"
            className={`ml-4 rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition-colors ${
              onDark ? "bg-brand-mint text-ink hover:bg-brand-mintLight" : "bg-ink text-white hover:bg-ink/85"
            }`}
          >
            Find a store
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className={`-mr-2 p-2 md:hidden ${onDark ? "text-white" : "text-ink"}`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto bg-paper">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-8">
              <MobileGroup title="Repairs" href="/services" hrefLabel="All repair services">
                {services.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="block py-1 text-ink-soft">
                    {service.name}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Locations" href="/locations" hrefLabel="All 8 stores">
                {storeLocations.map((store) => (
                  <Link key={store.slug} href={`/locations/${store.slug}`} className="block py-1 text-ink-soft">
                    {store.name}, {store.state}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Shop" href="/pre-owned" hrefLabel="Pre-owned phones">
                <Link href="/accessories" className="block py-1 text-ink-soft">
                  Accessories
                </Link>
                <Link href="/about" className="block py-1 text-ink-soft">
                  About Mobile Care
                </Link>
                <Link href="/faqs" className="block py-1 text-ink-soft">
                  FAQs
                </Link>
              </MobileGroup>
              <Link
                href="/locations"
                className="rounded-full bg-ink px-4 py-3.5 text-center font-medium text-white hover:bg-ink/85"
              >
                Find a store
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

function MobileGroup({
  title,
  href,
  hrefLabel,
  children,
}: {
  title: string
  href: string
  hrefLabel: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="border-t border-ink/10 pt-3 text-sm font-semibold text-brand-mintDark">
        {title}
      </p>
      <Link href={href} className="mt-3 block py-1 text-lg font-semibold text-ink">
        {hrefLabel}
      </Link>
      <div className="mt-1">{children}</div>
    </div>
  )
}
