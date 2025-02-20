"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Smartphone, Shield, MapPin } from "lucide-react";
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
  }, []);
  
  return (
    <div className="relative bg-brand-dark pt-24">
      <div className="absolute inset-0 bg-circuit-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <noscript>
  Phone screen repair Atlanta, iPhone repair near me, Samsung screen repair Atlanta, 
  Fast phone repair in Atlanta, Cell phone battery replacement Atlanta, 
  Best phone repair shop in Georgia
</noscript>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Fast & Affordable Phone Repair <span className="text-brand-mint">in Atlanta, Georgia</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Atlanta’s go-to phone repair experts! Whether it's a shattered screen or a weak battery, we’ll fix it fast. Affordable pricing & top-rated service!
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-6 w-6 text-brand-mint" />
                <span className="text-white">All major brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-brand-mint" />
                <span className="text-white">Multiple locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-brand-mint" />
                <span className="text-white">30-day warranty</span>
              </div>
            </div>
            {/* ✅ Fixed button - Now fully clickable & properly styled */}
            <div className="flex justify-start">
              <Link href="/schedule-appointment" passHref>
                <a className="relative z-10">
                  <Button className="bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-6 py-3 rounded-lg">
                    Schedule Appointment
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            {locations.map((location, index) => (
              <div
                key={location.name}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={location.image}
                  alt={location.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white">
                  <h2 className="text-lg font-semibold">{location.name}</h2>
                  <p className="text-sm">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
