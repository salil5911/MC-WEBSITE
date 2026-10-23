import type { Metadata } from "next"
import { LocationJsonLd } from "@/components/json-ld"
import { locationMetadata } from "@/lib/seo"

export const metadata: Metadata = locationMetadata("great-lakes-crossing")

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocationJsonLd slug="great-lakes-crossing" />
      {children}
    </>
  )
}
