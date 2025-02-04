"use client"

import { useState, useEffect } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight, Search } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"

const locations = {
  Georgia: [
    {
      name: "Augusta Mall",
      address: "Lower Level Next to Bath and Body Works, 3450 Wrightsboro Rd #1125",
      city: "Augusta",
      state: "GA",
      zip: "30909",
      phone: "+1 762 444 9461",
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
      phone: "+1 470 983 1595",
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
      phone: "+1 404 271 6281",
      hours: "Mon-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cumberland.jpg-r6o3X74ufd6nWdNblq9vMz1Ig3D8XJ.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Cumberland+Mall,+2860+Cumberland+Mall+Suite+%23+208,+Atlanta,+GA+30339/",
    },
    {
      name: "Southlake Mall",
      address: "Located Next to Status Jewels, 1000 Southlake Cir #1123",
      city: "Morrow",
      state: "GA",
      zip: "30260",
      phone: "+1 470 546 9171",
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
      address: "Lynnhaven Mall, 701 Lynnhaven Pkwy",
      city: "Virginia Beach",
      state: "VA",
      zip: "23452",
      phone: "+1 757 692 1915",
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
      address: "11025 Carolina Pl Pkwy Suite # A04",
      city: "Pineville",
      state: "NC",
      zip: "28134",
      phone: "+1 704 670 8479",
      hours: "Mon-Thu: 11AM-7PM, Fri-Sat: 11AM-8PM, Sun: 12PM-6PM",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carolina%20place%20mall.jpg-LColFtaGmCqrSK6WTwRMvNbpLz887Y.jpeg",
      directionsUrl:
        "https://www.google.com/maps/dir//Mobile+Care+Carolina+Place+Mall,+11025+Carolina+Pl+Pkwy+Suite+%23+A04,+Pineville,+NC+28134/",
    },
  ],
}

const getDirectionsUrl = (location: any) => {
  return location.directionsUrl
}

const GeorgiaSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const georgiaLocations = locations.Georgia

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % georgiaLocations.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [georgiaLocations.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % georgiaLocations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + georgiaLocations.length) % georgiaLocations.length)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      <div className="flex">
        <AnimatePresence mode="wait" initial={false} custom={currentIndex}>
          {georgiaLocations.map((location, index) => (
            <motion.div
              key={location.name}
              custom={index}
              variants={{
                enter: (index: number) => ({
                  x: index > currentIndex ? "100%" : "-100%",
                  opacity: 0,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  },
                },
                exit: (index: number) => ({
                  x: index < currentIndex ? "-100%" : "100%",
                  opacity: 0,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  },
                }),
              }}
              initial="enter"
              animate={index === currentIndex ? "center" : "exit"}
              exit="exit"
              className="w-full flex-shrink-0"
              style={{ position: index === currentIndex ? "relative" : "absolute" }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <Image
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl mb-4">{location.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-brand-mint mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">
                        {location.address}, {location.city}, {location.state} {location.zip}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-brand-mint mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{location.phone}</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-brand-mint mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{location.hours}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={() => window.open(getDirectionsUrl(location), "_blank", "noopener,noreferrer")}
                      className="w-full bg-brand-mint hover:bg-brand-mintDark text-white"
                    >
                      Get Directions
                    </Button>
                    <Button
                      onClick={() => window.open(`tel:${location.phone}`, "_blank", "noopener,noreferrer")}
                      className="w-full bg-brand-dark hover:bg-gray-800 text-white"
                    >
                      Call Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous location</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next location</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {georgiaLocations.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-brand-mint" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const calculateDistance = (zip1: string, zip2: string) => {
  // This is a simplified distance calculation.
  // In a real-world scenario, you'd use a more accurate method or a geocoding service.
  const diff = Math.abs(Number.parseInt(zip1) - Number.parseInt(zip2))
  return diff
}

const LocationSearch = () => {
  const [zipCode, setZipCode] = useState("")
  const [nearestLocation, setNearestLocation] = useState<any>(null)

  const handleSearch = () => {
    const allLocations = Object.values(locations).flat()
    let nearest = null
    let minDistance = Number.POSITIVE_INFINITY

    allLocations.forEach((location) => {
      const distance = calculateDistance(zipCode, location.zip)
      if (distance < minDistance) {
        minDistance = distance
        nearest = { ...location, distance }
      }
    })

    setNearestLocation(nearest || { name: "No location found nearby" })
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Find a Location Near You</h2>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4 w-full bg-brand-mint hover:bg-brand-mintDark text-white">
            Search
          </Button>
          {nearestLocation && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{nearestLocation.name}</h3>
                {nearestLocation.address && (
                  <>
                    <p className="text-gray-600">
                      {nearestLocation.address}, {nearestLocation.city}, {nearestLocation.state} {nearestLocation.zip}
                    </p>
                    {nearestLocation.distance !== undefined && (
                      <p className="text-sm text-gray-500 mt-1">
                        Approximate distance: {nearestLocation.distance} units from your location
                      </p>
                    )}
                    <p className="text-gray-600 mt-2">{nearestLocation.phone}</p>
                    <p className="text-gray-600 mt-1">{nearestLocation.hours}</p>
                    <div className="mt-4 space-y-2">
                      <Button
                        onClick={() => window.open(getDirectionsUrl(nearestLocation), "_blank", "noopener,noreferrer")}
                        className="w-full bg-brand-mint hover:bg-brand-mintDark text-white"
                      >
                        Get Directions
                      </Button>
                      <Button
                        onClick={() => window.open(`tel:${nearestLocation.phone}`, "_blank", "noopener,noreferrer")}
                        className="w-full bg-brand-dark hover:bg-gray-800 text-white"
                      >
                        Call Location
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Nav />
      <div className="pt-24 pb-12 bg-gradient-to-b from-white via-brand-mint/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Our Locations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find a Mobile Care location near you for expert device repair and premium accessories. We're here to serve
            you across multiple states.
          </p>
        </div>
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Georgia</h2>
            <GeorgiaSlideshow />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.entries(locations)
              .filter(([state]) => state !== "Georgia")
              .map(([state, stateLocations]) => (
                <div key={state} className="mb-12">
                  <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">{state}</h2>
                  {stateLocations.map((location) => (
                    <Card
                      key={location.name}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardHeader className="p-0">
                        <div className="relative w-full h-0 pb-[56.25%]">
                          <Image
                            src={location.image || "/placeholder.svg"}
                            alt={location.name}
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-2xl mb-4">{location.name}</CardTitle>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-brand-mint mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">
                              {location.address}, {location.city}, {location.state} {location.zip}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-brand-mint mr-2 flex-shrink-0" />
                            <p className="text-gray-600">{location.phone}</p>
                          </div>
                          <div className="flex items-start">
                            <Clock className="w-5 h-5 text-brand-mint mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">{location.hours}</p>
                          </div>
                          {location.details && <p className="text-brand-mint font-semibold mt-2">{location.details}</p>}
                        </div>
                        <div className="mt-4 space-y-2">
                          <Button
                            onClick={() => window.open(getDirectionsUrl(location), "_blank", "noopener,noreferrer")}
                            className="w-full bg-brand-mint hover:bg-brand-mintDark text-white"
                          >
                            Get Directions
                          </Button>
                          <Button
                            onClick={() => window.open(`tel:${location.phone}`, "_blank", "noopener,noreferrer")}
                            className="w-full bg-brand-dark hover:bg-gray-800 text-white"
                          >
                            Call Location
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>
      <LocationSearch />
      <Footer />
    </main>
  )
}

