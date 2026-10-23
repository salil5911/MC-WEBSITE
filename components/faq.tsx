import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

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
      "No appointment needed—walk-ins are always welcome at any Mobile Care location. If you'd like to check part availability or minimize your wait, feel free to call your nearest store ahead of your visit.",
  },
]

export function FAQ({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-gray-50 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know before you visit. Can't find an answer? Give your nearest location a call."
            className="mb-12"
          />
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <summary className="flex w-full cursor-pointer list-none justify-between px-5 py-4 text-left text-lg font-medium text-brand-dark hover:bg-brand-mint/5 focus:outline-none focus-visible:ring focus-visible:ring-brand-mint focus-visible:ring-opacity-75 [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="ml-4 h-5 w-5 shrink-0 text-brand-mintDark transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 pt-0 leading-relaxed text-gray-600">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

