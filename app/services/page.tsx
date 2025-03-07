"use client";

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Shield, PenToolIcon as Tool, ArrowRight, Star, Smartphone, Battery, Wifi, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect } from "react";


const trustFactors = [
  {
    title: "Certified Technicians",
    description:
      "Our team consists of highly skilled and certified technicians with years of experience in mobile device repair.",
  },
  {
    title: "High-Quality Parts",
    description:
      "We use only premium quality parts that meet or exceed OEM specifications, ensuring long-lasting repairs.",
  },
  {
    title: "30-Day Warranty",
    description: "All our repairs are backed by a 30-day warranty, giving you peace of mind and protection.",
  },
  {
    title: "Fast Turnaround Time",
    description: "We strive to complete most repairs quickly and efficiently, minimizing your downtime.",
  },
  {
    title: "Affordable Pricing",
    description: "We offer competitive pricing and transparent quotes, ensuring you get the best value for your money.",
  },
]

export default function ServicesPage() {
 useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  
  const features = [
    {
      title: "Screen Repair",
      description:
        "Expert screen replacement with premium quality parts, including OLED and LCD displays. Our certified technicians use manufacturer-approved components to ensure perfect color accuracy, touch sensitivity, and brightness. We handle everything from minor crack repairs to complete screen assembly replacements.",
      icon: Smartphone,
      details: [
        "Original quality display panels",
        "Full touch & Face ID functionality",
        "Color calibration included",
        "Anti-scratch protection applied",
        "30-minute average repair time",
      ],
    },
    {
      title: "Battery Replacement",
      description:
        "Restore your device's power with genuine batteries that meet or exceed OEM specifications. We perform complete power diagnostics, replace batteries with high-capacity alternatives, and ensure proper calibration for optimal performance.",
      icon: Battery,
      details: [
        "Genuine high-capacity batteries",
        "Full power diagnostics",
        "Battery health optimization",
        "Charging cycle calibration",
        "Environmental safe disposal",
      ],
    },
    {
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360_F_497507112_B3HkhNbCTI4kagU8Ywf5rEvjwh6YeZBa.jpg-mLhblO8muHM0gKIBIumWAkTsXpcecV.jpeg"
          alt="Professional phone repair technician working on disassembled smartphones"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Expert Mobile Repair Services – Fast & Affordable
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Professional repair services for all your devices, backed by our 30-day warranty
            </p>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Mobile Repair Services</h2>
            <p className="text-xl text-gray-600 mb-8">Professional repairs for all your device needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-brand-mint/20 hover:border-brand-mint transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-brand-mint/10">
                      <feature.icon className="h-8 w-8 text-brand-mint" />
                    </div>
                    <h3 className="text-2xl font-semibold text-brand-dark">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-brand-dark uppercase tracking-wider mb-3">
                      Service Includes:
                    </h4>
                    <ul className="grid gap-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-mint flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/schedule-appointment">
              <Button size="lg" className="bg-brand-mint text-brand-dark hover:bg-brand-mintLight px-8 py-6 text-lg">
                Schedule an Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Factors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Why Trust Our Mobile Repair Services?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full bg-brand-mint/10 p-3">
                  <Shield className="h-6 w-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{factor.title}</h3>
                  <p className="text-gray-600">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Widget (Replacing Testimonials) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">What Our Customers Say</h2>
          </div>
          {/* Google Reviews Widget */}
          <div className="elfsight-app-d3c7508c-be91-4856-8b11-894c2c0e7d75" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {expandedFaqs.map((faq, index) => (
              <AccordionItem key={index} value={item-${index}} className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-brand-dark">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Repair? Get in Touch Now!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Most repairs completed in 30-45 minutes. Schedule your repair today!
          </p>
          <Link href="/schedule-appointment">
            <Button size="lg" className="bg-brand-mint text-brand-dark hover:bg-brand-mintLight px-8 py-6 text-lg">
              Schedule an Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
