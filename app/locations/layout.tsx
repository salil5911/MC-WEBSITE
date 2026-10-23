import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Phone Repair Store Locations in GA, VA, NC & MI | Mobile Care USA",
  description:
    "Find a Mobile Care USA phone, tablet, and laptop repair store near you. Walk-in locations in Georgia, Virginia, North Carolina, and Michigan malls with same-day repairs.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Phone Repair Store Locations | Mobile Care USA",
    description:
      "Walk-in phone, tablet, and laptop repair stores in Georgia, Virginia, North Carolina, and Michigan.",
    url: "/locations",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
