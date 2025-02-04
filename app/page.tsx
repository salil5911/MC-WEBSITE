import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { DeviceCategories } from "@/components/device-categories"
import { TechTips } from "@/components/tech-tips"
import { Testimonials } from "@/components/testimonials"
import { Locations } from "@/components/locations"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero className="py-12" />
      <DeviceCategories className="py-12" />
      <TechTips className="py-12" />
      <Locations className="py-12" />
      <Testimonials className="py-12" />
      <FAQ className="py-12" />
      <Footer />
    </main>
  )
}

