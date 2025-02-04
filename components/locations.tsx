"use client"

import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const locations = {
  Georgia: [
    {
      name: "Augusta Mall",
      address: "3450 Wrightboro Rd. Suite 1125",
      city: "Augusta",
      state: "GA",
      zip: "30909",
      phone: "(762) 444-9461",
      hours: "Mon-Thu: 11AM-7PM, Fri-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/augusta.jpg-gb2Jb2dWAyZ9gJLMnMpk4uaTKs47yb.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//mobile+care+augusta+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x88f9d39de4ce3a31:0xb9a94f1eb818376f?sa=X&ved=1t:3061&ictx=111",
    },
    {
      name: "Perimeter Mall",
      address: "4400 Ashford Dunwoody Rd Space #2085",
      city: "Dunwoody",
      state: "GA",
      zip: "30346",
      phone: "(470) 983-1595",
      hours: "Mon-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perimeter.jpg-YiRrKjRiy7javUPwJzOjcD82ezca7f.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Perimeter+Mall,+4400+Ashford+Dunwoody+Rd+Space+%232085,+Dunwoody,+GA+30346/",
    },
    {
      name: "Cumberland Mall",
      address: "2860 Cumberland Mall Suite # 208",
      city: "Atlanta",
      state: "GA",
      zip: "30339",
      phone: "(404) 271-6281",
      hours: "Mon-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cumberland.jpg-r6o3X74ufd6nWdNblq9vMz1Ig3D8XJ.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Cumberland+Mall,+2860+Cumberland+Mall+Suite+%23+208,+Atlanta,+GA+30339/",
    },
    {
      name: "Southlake Mall",
      address: "1000 Southlake Cir #1123",
      city: "Morrow",
      state: "GA",
      zip: "30260",
      phone: "(470) 546-9171",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/southlake.jpg-cyX67ok0kHYNaPXsFzRqmfNPsFWY33.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Southlake+Mall,+1000+Southlake+Cir+%231123,+Morrow,+GA+30260/",
    },
  ],
  Virginia: [
    {
      name: "Lynnhaven Mall",
      address: "701 Lynnhaven Pkwy",
      city: "Virginia Beach",
      state: "VA",
      zip: "23452",
      phone: "(757) 692-1915",
      hours: "Mon-Thu: 11AM-7PM, Fri-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lynnhaven.jpg-6s3aZDBwqPpwPuujrrkE9HTbvcZrJs.jpeg",
      details: "2 kiosks and 1 store",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Lynnhaven+Mall,+701+Lynnhaven+Pkwy,+Virginia+Beach,+VA+23452/",
    },
  ],
  "North Carolina": [
    {
      name: "Carolina Place Mall",
      address: "11025 Carolina Place Pkwy",
      city: "Pineville",
      state: "NC",
      zip: "28134",
      phone: "(704) 670-8479",
      hours: "Mon-Thu: 11AM-7PM, Fri-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carolina%20place%20mall.jpg-LColFtaGmCqrSK6WTwRMvNbpLz887Y.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Carolina+Place+Mall,+11025+Carolina+Pl+Pkwy+Suite+%23+A04,+Pineville,+NC+28134/",
    },
  ],
}

export function Locations({ className = "" }: { className?: string }) {
  return (
    <section className={`py-12 bg-gradient-to-b from-white via-brand-mint/10 to-white ${className}`}>
      <div className="absolute inset-0 bg-circuit-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Our Locations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find a Mobile Care location near you for expert device repair and premium accessories
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(locations).map(([state, stateLocations]) => (
            <div key={state}>
              {state === "Georgia" ? (
                <>
                  <h3 className="text-3xl font-bold text-brand-dark mb-8">{state}</h3>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {stateLocations.map((location) => (
                      <LocationCard key={location.name} location={location} />
                    ))}
                  </div>
                </>
              ) : (
                state === "Virginia" && (
                  <>
                    <h3 className="text-3xl font-bold text-brand-dark mb-8">Virginia & North Carolina</h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                      {stateLocations.map((location) => (
                        <LocationCard key={location.name} location={location} />
                      ))}
                      {locations["North Carolina"].map((location) => (
                        <LocationCard key={location.name} location={location} />
                      ))}
                    </div>
                  </>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const LocationCard = ({ location }) => {
  const handleGetDirections = () => {
    window.open(location.directionsUrl, "_blank", "noopener,noreferrer")
  }

  const handleCallNow = () => {
    window.open(`tel:${location.phone.replace(/[^\d+]/g, "")}`, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="border-2 border-brand-mint/20 hover:border-brand-mint transition-colors shadow-lg hover:shadow-xl">
      <CardHeader>
        <div className="relative h-64 w-full mb-4 rounded-t-lg overflow-hidden">
          <Image src={location.image || "/placeholder.svg"} alt={location.name} layout="fill" objectFit="cover" />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-brand-dark mb-2">{location.name}</CardTitle>
            {location.details && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-mint text-brand-dark mt-2">
                {location.details}
              </span>
            )}
          </div>
          <MapPin className="h-6 w-6 text-brand-mint" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <address className="not-italic text-lg text-gray-600">
          {location.address}
          <br />
          {location.city}, {location.state} {location.zip}
        </address>
        <div className="flex items-center text-gray-600">
          <Phone className="h-5 w-5 mr-2 text-brand-mint" />
          <span>{location.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2 text-brand-mint" />
          <span>{location.hours}</span>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <Button onClick={handleGetDirections} className="w-full bg-brand-mint hover:bg-brand-mintDark text-white">
            Get Directions
          </Button>
          <Button onClick={handleCallNow} className="w-full bg-brand-dark hover:bg-gray-800 text-white">
            Call Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

