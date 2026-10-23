import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { DeviceMarquee, ServicesIndex, StoresDirectory, ReviewsSection, ShopSplit, ClosingCta } from "@/components/home/sections"
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
        <ServicesIndex />
        <StoresDirectory />
        <ReviewsSection />
        <ShopSplit />
        <FAQ className="py-20 sm:py-28" />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
