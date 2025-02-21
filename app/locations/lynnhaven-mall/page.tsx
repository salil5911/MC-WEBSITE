"use client";
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export default function LynnhavenMallPage() {
  const location = {
    name: "Lynnhaven Mall",
    address: "701 Lynnhaven Pkwy",
    city: "Virginia Beach",
    state: "VA",
    zip: "23452",
    phone: "+1 757 692 1915",
    hours: "Mon-Thu: 11AM-7PM, Fri-Sat: 11AM-8PM, Sun: 12PM-6PM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lynnhaven.jpg-6s3aZDBwqPpwPuujrrkE9HTbvcZrJs.jpeg",
    details: "2 kiosks and 1 store",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Lynnhaven+Mall,+701+Lynnhaven+Pkwy,+Virginia+Beach,+VA+23452/",
  }

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="pt-24 pb-12 bg-gradient-to-b from-white via-brand-mint/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">{location.name}</h1>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-[400px] w-full">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-brand-mint mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-600">{location.address}</p>
                      <p className="text-gray-600">
                        {location.city}, {location.state} {location.zip}
                      </p>
                      {location.details && <p className="text-brand-mint font-medium mt-1">{location.details}</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-brand-mint mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">{location.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-brand-mint mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Hours</h3>
                      <p className="text-gray-600">{location.hours}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => window.open(location.directionsUrl, "_blank", "noopener,noreferrer")}
                    className="w-full bg-brand-mint hover:bg-brand-mintDark"
                  >
                    Get Directions
                  </Button>
                  <Button
                    onClick={() => window.open(`tel:${location.phone}`, "_blank", "noopener,noreferrer")}
                    className="w-full bg-brand-dark hover:bg-gray-800"
                  >
                    Call Now
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/schedule-appointment")}
                    className="w-full"
                    variant="outline"
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}

