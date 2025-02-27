"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Shield, PenToolIcon as Tool, ArrowRight, Star, Smartphone, Battery, Wifi, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Mobile Repair Services | Fast & Affordable Repairs Near You",
  description:
    "Get expert mobile repair services for all brands. Screen replacement, battery issues, water damage repair & more. Visit us or book a doorstep repair today!",
  keywords: [
    "mobile repair",
    "phone screen replacement",
    "battery repair",
    "water damage fix",
    "phone repair near you",
    "phone repair augusta",
    "phone repair atlanta",
    "phone repair dunwoody",
    "phone repair southlake",
    "phone repair cumberland mall",
    "phone repair perimeter mall",
    "phone repair virgina beach",
    "phone repair lynnhaven",
    "phone repair north carolina",
    "phone repair carolina place mall",
    "phone repair augusta mall",
    "phone repair ga",
    "phone repair atlanta",
  ],
  openGraph: {
    title: "Mobile Repair Services | Fast & Affordable Repairs Near You",
    description:
      "Get expert mobile repair services for all brands. Screen replacement, battery issues, water damage repair & more. Visit us or book a doorstep repair today!",
    url: "https://mobilecareusa.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  useEffect(() => {
    // Load Elfsight script dynamically for Google Reviews
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const features = [
    {
      title: "Screen Repair",
      description: "Expert screen replacement with premium quality parts",
      icon: Smartphone,
    },
    {
      title: "Battery Replacement",
      description: "Restore your device's power with genuine batteries",
      icon: Battery,
    },
    {
      title: "Water Damage Repair",
      description: "Professional water damage recovery services",
      icon: Tool,
    },
    {
      title: "Charging Port Fix",
      description: "Fix charging issues and port replacements",
      icon: Wifi,
    },
    {
      title: "Speaker & Mic Repair",
      description: "Restore clear audio and communication",
      icon: Tool,
    },
    {
      title: "Button Repair",
      description: "Fix power, volume, and home button issues",
      icon: Tool,
    },
    {
      title: "Camera Repair",
      description: "Fix front and rear camera problems",
      icon: Tool,
    },
    {
      title: "Software Issues",
      description: "Resolve system crashes and software problems",
      icon: Wrench,
    },
  ];

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-brand-dark">
        <div className="absolute inset-0 bg-circuit-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/75" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-brand-mint/20 hover:border-brand-mint transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-brand-mint mb-4" />
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Google Reviews Widget */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">What Our Customers Say</h2>
          </div>
          {/* Elfsight Google Reviews Widget */}
          <div className="elfsight-app-d3c7508c-be91-4856-8b11-894c2c0e7d75" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">How long does a typical repair take?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-600">
                Most repairs are completed within 30-45 minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Repair? Get in Touch Now!</h2>
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
  );
}
