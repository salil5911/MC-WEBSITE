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

const expandedFaqs = [
  {
    question: "How long does a typical repair take?",
    answer:
      "Most common repairs like screen replacements and battery changes are completed within 30-45 minutes. More complex repairs such as water damage restoration may take 2-24 hours depending on severity.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes, all our repairs come with a 30-day warranty covering both parts and labor. If you experience any issues related to our repair work within this period, we'll fix it at no additional cost.",
  },
  {
    question: "What brands do you repair?",
    answer:
      "We repair all major brands including Apple, Samsung, Google, Motorola, and more. Our technicians are certified to work on the latest models and receive regular training.",
  },
  {
    question: "Do you use original parts for repairs?",
    answer:
      "We use high-quality parts that meet or exceed OEM specifications. For certain repairs, we offer both original manufacturer parts and premium aftermarket alternatives.",
  },
  {
    question: "Can you recover data from a damaged device?",
    answer:
      "Yes, we offer data recovery services for most types of device damage. Our success rate is high for physical damage, though water damage recovery may vary depending on severity.",
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex gap-4">
                    <feature.icon className="h-8 w-8 text-brand-mint" />
                    <h3>{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                  <ul>
                    {feature.details.map((detail, i) => (
                      <li key={i}>- {detail}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <Accordion type="single" collapsible>
          {expandedFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
    </main>
  );
}
