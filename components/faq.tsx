"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What types of devices do you repair?",
    answer:
      "We repair a wide range of devices including smartphones, tablets, laptops, smartwatches, and gaming consoles. Our expert technicians are trained to work on all major brands such as Apple, Samsung, Google, LG, Motorola, and more.",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Most common repairs can be completed within 30-45 minutes. More complex repairs may take longer, but we always strive to return your device as quickly as possible without compromising on quality.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes, we offer a 30-day warranty on all our repairs. This covers both parts and labor. If you experience any issues related to the repair within this period, bring your device back, and we'll fix it at no additional cost. The warranty is applicable as long as the device is in the same condition as when the repair was done.",
  },
  {
    question: "Can I trade in my old device for a new one?",
    answer:
      "We have a trade-in program where you can exchange your current device for credit towards a new or certified pre-owned device. We'll assess your device's condition and provide a competitive offer on the spot.",
  },
  {
    question: "Do I need an appointment for a repair?",
    answer:
      "While walk-ins are welcome, we recommend booking an appointment to minimize your wait time. You can easily schedule a repair online or by calling your nearest Mobile Care location.",
  },
]

export function FAQ({ className = "" }: { className?: string }) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-brand-dark bg-brand-mint/10 rounded-lg hover:bg-brand-mint/20 focus:outline-none focus-visible:ring focus-visible:ring-brand-mint focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronDown className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-brand-mint`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600">{faq.answer}</Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  )
}

