"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

const allTestimonials = [
  {
    name: "Alex M.",
    location: "Augusta, GA",
    text: "Fixed my iPhone screen in under an hour. Great service and professional staff!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Virginia Beach, VA",
    text: "Best phone repair service I've ever used. Fair prices and quality work.",
    rating: 5,
  },
  {
    name: "Michael R.",
    location: "Atlanta, GA",
    text: "They saved my water-damaged Samsung. Incredible turnaround time!",
    rating: 5,
  },
  {
    name: "Emily L.",
    location: "Pineville, NC",
    text: "Excellent customer service and quick repairs. Highly recommend!",
    rating: 5,
  },
  {
    name: "David W.",
    location: "Dunwoody, GA",
    text: "The team at Mobile Care is knowledgeable and efficient. My go-to place for all device repairs.",
    rating: 5,
  },
]

export function Testimonials({ className = "" }: { className?: string }) {
  const [testimonials, setTestimonials] = useState(allTestimonials.slice(0, 3))
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setTestimonials([
      allTestimonials[currentIndex],
      allTestimonials[(currentIndex + 1) % allTestimonials.length],
      allTestimonials[(currentIndex + 2) % allTestimonials.length],
    ])
  }, [currentIndex])

  return (
    <section className={`bg-gradient-to-b from-brand-mint/10 to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-dark">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600">Don't just take our word for it</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-2xl shadow-xl border-2 border-brand-mint/10 hover:border-brand-mint transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-mint text-brand-mint" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

