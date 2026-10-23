import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import {
  DeviceMarquee,
  ServicesSection,
  StoresSection,
  ReviewsSection,
  ShopSection,
  ClosingCta,
} from "@/components/home/sections"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export const revalidate = 43200

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DeviceMarquee />
        <ServicesSection />
        <StoresSection />
        <ReviewsSection />
        <ShopSection />
        <FAQ className="py-24 sm:py-32" />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
