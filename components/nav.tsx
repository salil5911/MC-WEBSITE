"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Home, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const locations = [
  {
    name: "Augusta Mall",
    path: "/locations/augusta-mall",
  },
  {
    name: "Perimeter Mall",
    path: "/locations/perimeter-mall",
  },
  {
    name: "Cumberland Mall",
    path: "/locations/cumberland-mall",
  },
  {
    name: "Southlake Mall",
    path: "/locations/southlake-mall",
  },
  {
    name: "Lynnhaven Mall",
    path: "/locations/lynnhaven-mall",
  },
  {
    name: "Carolina Place Mall",
    path: "/locations/carolina-place-mall",
  },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MC%20LOGO-XowG6Q2hKUlDImWUZUx6UDaRQp4r2h.png"
                alt="Mobile Care Logo"
                width={400}
                height={133}
                className="h-24 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-brand-dark hover:text-brand-mint transition-colors text-xl font-semibold px-4 py-2 flex items-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Button>
            </Link>
            <Link
              href="/services"
              className="text-brand-dark hover:text-brand-mint transition-colors text-xl font-semibold px-4 py-2"
            >
              Services
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-brand-dark hover:text-brand-mint transition-colors text-xl font-semibold px-4 py-2 flex items-center"
                >
                  Locations
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {locations.map((location) => (
                  <DropdownMenuItem key={location.path} asChild>
                    <Link href={location.path} className="w-full cursor-pointer">
                      {location.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/schedule-appointment">
              <Button className="bg-brand-mint text-brand-dark hover:bg-brand-mint/90 text-lg px-4 py-2">
                Schedule Appointment
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="flex w-full items-center py-3 text-xl font-semibold">
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Link>
                <Link href="/services" className="flex w-full items-center py-3 text-xl font-semibold">
                  Services
                </Link>
                <div className="py-3">
                  <p className="text-xl font-semibold mb-2">Locations</p>
                  <div className="space-y-2 pl-4">
                    {locations.map((location) => (
                      <Link
                        key={location.path}
                        href={location.path}
                        className="block text-lg text-gray-600 hover:text-brand-mint"
                      >
                        {location.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/schedule-appointment" className="w-full">
                  <Button className="w-full bg-brand-mint text-brand-dark hover:bg-brand-mint/90">
                    Schedule Appointment
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

