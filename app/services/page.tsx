"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  Shield,
  PenToolIcon as Tool,
  ArrowRight,
  Star,
  Smartphone,
  Battery,
  Wifi,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

export const metadata = {
  title: "Our Repair Services | Mobile Care USA",
  description: "Explore our expert mobile repair services, including screen replacement, battery fixes, and water damage repair.",
  openGraph: {
    title: "Our Repair Services | Mobile Care USA",
    description: "Explore our expert mobile repair services, including screen replacement, battery fixes, and water damage repair.",
    url: "https://mobilecareusa.com/services",
    type: "website",
  },
};

const trustFactors = [
  {
    title: "Certified Technicians",
    description: "Our team consists of highly skilled and certified technicians with years of experience in mobile device repair.",
  },
  {
    title: "High-Quality Parts",
    description: "We use only premium quality parts that meet or exceed OEM specifications, ensuring long-lasting repairs.",
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
];

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
        "Expert screen replacement with premium quality parts, including OLED and LCD displays. Our certified technicians use manufacturer-approved components to ensure perfect color accuracy, touch sensitivity, and brightness.",
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
        "Restore your device's power with genuine batteries that meet or exceed OEM specifications. We perform complete power diagnostics and ensure proper calibration for optimal performance.",
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
      title: "Water Damage Recovery",
      description:
        "Professional water damage recovery services using ultrasonic cleaning technology. Our specialized treatment process includes corrosion removal and board-level repair.",
      icon: Wrench,
      details: [
        "Component-level cleaning",
        "Corrosion removal",
        "Board-level repair",
        "Full functionality testing",
        "Moisture protection application",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-brand-dark">
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
              Professional repair services for all your devices, backed by our 30-day warranty.
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
                  <ul className="grid gap-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-mint flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Factors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Why Trust Our Mobile Repair Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustFactors.map((factor, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-brand-dark">{factor.title}</h3>
                <p className="text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
