import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { LocationDetail } from "@/components/location-detail"
import { getLocation } from "@/lib/locations"

// Rebuild twice a day so this store's Google rating and reviews stay current.
export const revalidate = 43200

export default function LynnhavenMallPage() {
  const location = getLocation("lynnhaven-mall")
  if (!location) notFound()

  return (
    <>
      <Nav />
      <main>
        <LocationDetail location={location} />
      </main>
      <Footer />
    </>
  )
}
