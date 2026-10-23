import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HelpCircle, Phone, MapPin } from "lucide-react"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Mobile Care USA",
  description:
    "Answers to common questions about Mobile Care device repair — turnaround times, warranty, pricing, walk-ins, data safety, and the brands and devices we service.",
  alternates: { canonical: "https://mobilecareusa.com/faqs" },
}

const faqCategories = [
  {
    category: "Repairs & Turnaround",
    faqs: [
      {
        question: "How long does a typical repair take?",
        answer:
          "Most common repairs — screen replacements, battery swaps, charging port fixes — are completed in 30 to 45 minutes while you wait. More complex repairs, such as water damage or board-level work, may take longer, and our technician will give you a clear time estimate before starting.",
      },
      {
        question: "Do I need an appointment, or can I walk in?",
        answer:
          "Walk-ins are always welcome at every location — no appointment needed. If you'd like to make sure the right part is in stock for your specific device, feel free to call the store ahead of your visit.",
      },
      {
        question: "What devices and brands do you repair?",
        answer:
          "We repair smartphones, tablets, and laptops from all major brands including Apple, Samsung, Google, Motorola, LG, and more. If you're unsure whether we can help with your device, give us a call and we'll let you know right away.",
      },
      {
        question: "Will my data be safe during the repair?",
        answer:
          "Yes. The vast majority of our repairs don't touch your data at all, and we never access your personal files. We still recommend backing up your device before any repair as a best practice, and we're happy to walk you through how.",
      },
    ],
  },
  {
    category: "Warranty & Quality",
    faqs: [
      {
        question: "Are your repairs covered by a warranty?",
        answer:
          "Every repair we perform is backed by our 30-day warranty covering both parts and labor. If anything related to the repair isn't working as expected, bring your device back and we'll make it right at no additional cost.",
      },
      {
        question: "What kind of parts do you use?",
        answer:
          "We use quality-tested parts selected for reliability and performance. We never use the cheapest components available, because a repair that fails quickly isn't a repair worth doing. Ask your technician about the specific parts used for your device.",
      },
      {
        question: "What if my device can't be repaired?",
        answer:
          "Our diagnostics are always free. If we determine your device can't be repaired or that a repair isn't cost-effective, we'll tell you honestly and you won't pay a diagnostic fee. We'd rather earn your trust than push an unnecessary repair.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    faqs: [
      {
        question: "How much will my repair cost?",
        answer:
          "Pricing depends on your device model and the type of repair. We provide transparent, upfront quotes with no hidden fees before any work begins. Diagnostics are always free, so you'll know the exact cost before you commit.",
      },
      {
        question: "Do you offer free diagnostics?",
        answer:
          "Yes — diagnostics are completely free at all of our locations. Bring your device in and we'll assess the issue and give you a clear quote at no charge.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards as well as cash at every location. Your technician can confirm the payment options available at your specific store.",
      },
    ],
  },
]

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    ),
  }

  return (
    <main className="min-h-screen">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }])} />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark pt-24">
        <div className="absolute inset-0 circuit-pattern opacity-[0.06]" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mint/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
                <HelpCircle className="h-4 w-4" />
                Help Center
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                Frequently asked questions
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg leading-relaxed text-gray-300 sm:text-xl text-pretty">
                Everything you need to know about our repairs, warranty, pricing, and what to expect when you visit.
                Can't find your answer? Give your nearest store a call.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {faqCategories.map((category, catIndex) => (
              <Reveal key={category.category} variant="fade-up" delay={catIndex * 80}>
                <div>
                  <h2 className="font-display text-2xl font-bold text-brand-dark">{category.category}</h2>
                  <Accordion type="single" collapsible className="mt-6 w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
                        value={`${catIndex}-${index}`}
                        className="border-b border-gray-100"
                      >
                        <AccordionTrigger className="text-left text-base font-semibold text-brand-dark hover:text-brand-mintDark hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-dark px-6 py-12 text-center sm:px-12">
              <div className="absolute inset-0 circuit-pattern opacity-10" aria-hidden="true" />
              <div className="relative">
                <SectionHeading
                  light
                  eyebrow="Still have questions?"
                  title="Our team is happy to help"
                  subtitle="Reach out to your nearest Mobile Care store or stop by in person — no appointment needed."
                />
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/locations">
                    <Button className="group bg-brand-mint text-brand-dark hover:bg-brand-mintLight text-lg px-8 py-6 rounded-xl font-semibold">
                      <MapPin className="mr-2 h-5 w-5" />
                      Find a Location
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-xl font-semibold"
                    >
                      Explore services
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
