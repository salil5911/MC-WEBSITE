"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const locations = [
    {
      name: "Augusta Mall",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/augusta.jpg-gb2Jb2dWAyZ9gJLMnMpk4uaTKs47yb.jpeg",
      description:
        "Our flagship store featuring expert staff and comprehensive repair services",
    },
    {
      name: "Perimeter Mall",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perimeter.jpg-YiRrKjRiy7javUPwJzOjcD82ezca7f.jpeg",
      description: "Modern location with state-of-the-art repair facilities",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % locations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); // ✅ Make sure this closing bracket exists

  return (
    <div className="relative bg-brand-dark pt-24">
      <div className="absolute inset-0 bg-circuit-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Expert Device Repair <span className="text-brand-mint">You Can Trust</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional repair services for all your devices. From iPhones to Samsung, we fix it all with certified
              expertise and genuine parts.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-6 w-6 text-brand-mint" />
                <span className="text-white">All major brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-brand-mint" />
                <span className="text-white">30-day warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-brand-mint" />
                <span className="text-white">Multiple locations</span>
              </div>
            </div>
            <Link href="/schedule-appointment">
              <Button
                size="lg"
                className="bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6"
              >
                Start Device Repair Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              {locations.map((location, index) => (
                <div
                  key={location.name}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={`${location.name} store`}
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white text-xl font-semibold">{location.name}</p>
                    <p className="text-gray-200 text-sm">{location.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
