import type { Metadata } from "next"
import { LocationJsonLd } from "@/components/json-ld"
import { locationMetadata } from "@/lib/seo"

export const metadata: Metadata = locationMetadata("perimeter-mall")

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocationJsonLd slug="perimeter-mall" />
      {children}
    </>
  )
}
