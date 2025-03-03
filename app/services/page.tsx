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


export default function ServicesPage() {
  useEffect(() => {
    // Load Elfsight script dynamically for Google Reviews
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
      title: "Water Damage Repair",
      description:
        "Professional water damage recovery services using ultrasonic cleaning technology. Our specialized treatment process includes corrosion removal, board-level repair, and thorough testing to restore your device to working condition.",
      icon: Tool,
      details: [
        "Ultrasonic cleaning",
        "Component-level repair",
        "Anti-corrosion treatment",
        "Data recovery attempts",
        "Preventive coating application",
      ],
    },
    {
      title: "Charging Port Fix",
      description:
        "Fix charging issues and port replacements with precision micro-soldering. We clean, repair, or replace charging ports, ensuring proper power delivery and data transfer functionality.",
      icon: Wifi,
      details: [
        "Deep port cleaning",
        "Pin repair & alignment",
        "Full port replacement",
        "Fast charge testing",
        "Water resistance restoration",
      ],
    },
    {
      title: "Speaker & Mic Repair",
      description:
        "Restore clear audio and communication with expert acoustic component repair. We handle speaker replacements, microphone repairs, and complete audio system diagnostics.",
      icon: Tool,
      details: [
        "Speaker replacement",
        "Microphone cleaning",
        "Audio calibration",
        "Noise cancellation testing",
        "Water damage treatment",
      ],
    },
    {
      title: "Button Repair",
      description:
        "Fix power, volume, and home button issues with precision repair services. We handle mechanical and capacitive button repairs, ensuring proper tactile feedback and functionality.",
      icon: Tool,
      details: [
        "Tactile feedback restoration",
        "Button mechanism repair",
        "Waterproofing seal replacement",
        "Sensitivity adjustment",
        "Complete button assembly",
      ],
    },
    {
      title: "Camera Repair",
      description:
        "Fix front and rear camera problems with expert lens and sensor replacement. We handle focus issues, lens cleaning, and complete camera module replacements.",
      icon: Tool,
      details: ["Lens replacement", "Sensor cleaning", "Focus calibration", "Image quality testing", "Flash repair"],
    },
    {
      title: "Software Issues",
      description:
        "Resolve system crashes and software problems through advanced diagnostics and repair. We handle operating system repairs, data recovery, and performance optimization.",
      icon: Wrench,
      details: [
        "System diagnostics",
        "OS repair & update",
        "Data backup & recovery",
        "Performance optimization",
        "Security check",
      ],
    },
  ]

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

      const expandedFaqs = [
    {
      question: "How long does a typical repair take?",
      answer:
        "Most common repairs like screen replacements and battery changes are completed within 30-45 minutes. More complex repairs such as water damage restoration may take 2-24 hours depending on severity. We'll provide you with an accurate time estimate before beginning any work.",
    },
    {
      question: "Do you offer a warranty on repairs?",
      answer:
        "Yes, all our repairs come with a 30-day warranty covering both parts and labor. If you experience any issues related to our repair work within this period, we'll fix it at no additional cost. The warranty remains valid as long as the device hasn't been damaged or tampered with after our repair.",
    },
    {
      question: "What brands do you repair?",
      answer:
        "We repair all major brands including Apple, Samsung, Google, Motorola, and more. Our technicians are certified to work on the latest models and receive regular training on new device repairs. We maintain an extensive inventory of quality parts for all supported brands.",
    },
    {
      question: "Do you use original parts for repairs?",
      answer:
        "We use high-quality parts that meet or exceed OEM specifications. For certain repairs, we offer both original manufacturer parts and premium aftermarket alternatives, allowing you to choose based on your preference and budget. All parts come with our standard warranty.",
    },
    {
      question: "Can you recover data from a damaged device?",
      answer:
        "Yes, we offer data recovery services for most types of device damage. Our success rate is high for physical damage, though water damage recovery may vary depending on severity. We always attempt data backup before any repair work begins when possible.",
    },
    {
      question: "Do I need an appointment?",
      answer:
        "While we welcome walk-ins, we recommend scheduling an appointment to minimize wait time. Appointments receive priority service, and we'll have the necessary parts ready for your repair. You can easily book online or call your nearest location.",
    },
    {
      question: "What happens if my device can't be repaired?",
      answer:
        "If we determine that a repair isn't possible or cost-effective, we'll explain why and discuss alternative options. We offer trade-in services and can help you explore replacement options. No diagnosis fee is charged if we can't fix your device.",
    },
    {
      question: "How do you handle water-damaged devices?",
      answer:
        "Our water damage treatment process includes: 1) Initial assessment 2) Professional ultrasonic cleaning 3) Component-level inspection 4) Corrosion removal 5) Board repair if needed 6) Thorough testing. Success rates vary based on exposure time and type of liquid.",
    },
  ]

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
