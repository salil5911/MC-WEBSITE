import { Nav } from "@/components/nav"
import { Services } from "@/components/services"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="pt-24 bg-gradient-to-b from-white via-brand-mint/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-bold text-brand-dark mb-6">Our Services</h1>
          <p className="text-2xl text-gray-600 max-w-3xl">
            Comprehensive device care solutions for all your needs, from repairs to accessories and more.
          </p>
        </div>
      </div>
      <Services />
      <CTA />
      <Footer />
    </main>
  )
}

