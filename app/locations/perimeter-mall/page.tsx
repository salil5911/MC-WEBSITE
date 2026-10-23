import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { LocationDetail } from "@/components/location-detail"
import { getLocation } from "@/lib/locations"
import { notFound } from "next/navigation"

export default function PerimeterMallPage() {
  const location = getLocation("perimeter-mall")
  if (!location) notFound()

  return (
    <main className="min-h-screen">
      <Nav />
      <LocationDetail location={location} />
      <Footer />
    </main>
  )
}
