import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
    // Load Elfsight script dynamically for Google Reviews
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Nav />

      {/* Header Section with Image and CTA */}
      <section className="relative bg-cover bg-center py-20 text-center text-white" style={{ backgroundImage: "url('/images/repair-banner.jpg')" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold">Expert Mobile Repair Services – Fast & Affordable</h1>
          <p className="mt-4 text-xl">Reliable & professional repairs for your devices.</p>
          <button className="mt-6 bg-brand-dark text-white py-3 px-6 rounded-md hover:bg-brand-mint transition">Book a Repair Now</button>
        </div>
      </section>

      {/* Features List Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-brand-dark mb-6 text-center">Our Mobile Repair Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Screen Repair</h3>
            <p>Cracked or unresponsive screen? We fix it quickly!</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Battery Replacement</h3>
            <p>Low battery life? Get a new one installed hassle-free.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Water Damage Repair</h3>
            <p>Accidentally dropped your phone in water? We can help.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Charging Port Fix</h3>
            <p>Having trouble charging? We replace faulty ports.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Speaker & Mic Repair</h3>
            <p>Audio issues? We repair or replace broken parts.</p>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-dark mb-6">Why Trust Our Mobile Repair Services?</h2>
          <ul className="text-xl list-disc list-inside space-y-3">
            <li>✅ Certified Technicians</li>
            <li>✅ Warranty on Repairs</li>
            <li>✅ Affordable Pricing</li>
          </ul>
        </div>
      </section>

      {/* Testimonials & Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-brand-dark mb-6 text-center">What Our Customers Say</h2>
        {/* Elfsight Google Reviews Widget */}
        <div className="elfsight-app-d3c7508c-be91-4856-8b11-894c2c0e7d75" data-elfsight-app-lazy></div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-dark mb-6 text-center">Frequently Asked Questions</h2>
          <details className="mb-4 border p-4 rounded-lg shadow">
            <summary className="text-2xl font-semibold cursor-pointer">How long does a phone repair take?</summary>
            <p className="mt-2">Most repairs are completed within 30 minutes.</p>
          </details>
          <details className="mb-4 border p-4 rounded-lg shadow">
            <summary className="text-2xl font-semibold cursor-pointer">Do you offer a warranty on repairs?</summary>
            <p className="mt-2">Yes, we provide a 1 Month warranty on all repairs.</p>
          </details>
          <details className="border p-4 rounded-lg shadow">
            <summary className="text-2xl font-semibold cursor-pointer">Do I need an appointment?</summary>
            <p className="mt-2">Walk-ins are welcome, but appointments ensure priority service.</p>
          </details>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="bg-brand-dark text-white py-12 text-center">
        <h2 className="text-4xl font-bold">Need a Repair? Get in Touch Now!</h2>
        <p className="mt-4 text-xl">Contact us today for fast & reliable service.</p>
        <div className="mt-6 space-x-4">
          <button className="bg-white text-brand-dark py-3 px-6 rounded-md hover:bg-brand-mint transition">Call Now</button>
          <button className="bg-brand-mint text-white py-3 px-6 rounded-md hover:bg-brand-light transition">Book a Repair</button>
        </div>
        <p className="mt-4 text-lg"> GA | (762) 444-9461</p>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
