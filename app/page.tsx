import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { StoreShowcase } from "@/components/store-showcase"
import { DeviceCategories } from "@/components/device-categories"
import { PreOwnedHighlight } from "@/components/pre-owned-highlight"
import { TechTips } from "@/components/tech-tips"
import { Testimonials } from "@/components/testimonials"
import { AccessoriesBrands } from "@/components/accessories-brands"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export const revalidate = 43200

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <WhyChooseUs className="py-16 sm:py-24" />
      <StoreShowcase className="bg-brand-cream py-16 sm:py-24" />
      <DeviceCategories className="py-16 sm:py-24" />
      <PreOwnedHighlight className="bg-brand-cream py-16 sm:py-24" />
      <AccessoriesBrands className="py-16 sm:py-24" />
      <TechTips className="py-16 sm:py-24" />
      <Testimonials className="py-16 sm:py-24" />
      <FAQ className="py-16 sm:py-24" />
      <Footer />
    </main>
  )
}
