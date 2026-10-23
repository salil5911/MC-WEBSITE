import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { ButtonLink } from "@/components/button-link"
import { PageHeader } from "@/components/page-header"
import { HeaderPhoto } from "@/components/header-photo"
import { Accordion } from "@/components/motion/accordion"
import { FadeIn, WordReveal } from "@/components/motion/primitives"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Mobile Care USA",
  description:
    "Answers to common questions about Mobile Care device repair: turnaround times, warranty, pricing, walk-ins, data safety, and the brands and devices we service.",
  alternates: { canonical: "https://mobilecareusa.com/faqs" },
}

const faqCategories = [
  {
    category: "Repairs & Turnaround",
    faqs: [
      {
        question: "How long does a typical repair take?",
        answer:
          "Most common repairs, such as screen replacements, battery swaps, and charging port fixes, are completed in 30 to 45 minutes while you wait. More complex repairs, such as water damage or board-level work, may take longer, and our technician will give you a clear time estimate before starting.",
      },
      {
        question: "Do I need an appointment, or can I walk in?",
        answer:
          "Walk-ins are always welcome at every location, and no appointment is needed. If you'd like to make sure the right part is in stock for your specific device, feel free to call the store ahead of your visit.",
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
          "Yes. Diagnostics are completely free at all of our locations. Bring your device in and we'll assess the issue and give you a clear quote at no charge.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards as well as cash at every location. Your technician can confirm the payment options available at your specific store.",
      },
    ],
  },
]

function slugify(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function FaqsPage() {
  const total = faqCategories.reduce((n, c) => n + c.faqs.length, 0)
  return (
    <>
      <Nav />
      <JsonLd data={faqPageSchema(faqCategories.flatMap((category) => category.faqs))} />
      <main>
        <PageHeader
          breadcrumbs={[{ name: "FAQs", path: "/faqs" }]}
          eyebrow="Help center"
          title="Answers before you walk in."
          intro={`${total} answers about repairs, warranty, pricing, and what to expect when you visit. Can't find yours? Call your nearest store.`}
          actions={
            <>
              <ButtonLink href="#repairs-and-turnaround">Start reading</ButtonLink>
              <ButtonLink href="/locations" variant="outline-light" arrow={false}>
                Call a store
              </ButtonLink>
            </>
          }
          media={<HeaderPhoto src="/store-interior.webp" alt="The counter inside a Mobile Care USA store" />}
        />

        <section className="bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[17rem_1fr] lg:gap-24 lg:px-8">
            <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold text-brand-mintDark">Topics</p>
              <ul className="mt-4 space-y-3">
                {faqCategories.map((category) => (
                  <li key={category.category}>
                    <a
                      href={`#${slugify(category.category)}`}
                      className="text-lg text-ink-soft transition-colors hover:text-ink"
                    >
                      {category.category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-20">
              {faqCategories.map((category) => (
                <div key={category.category} id={slugify(category.category)} className="scroll-mt-28">
                  <WordReveal
                    text={category.category}
                    className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl"
                  />
                  <Accordion items={category.faqs} />
                </div>
              ))}

              <FadeIn className="rounded-[2rem] bg-ink p-10 text-white sm:p-14">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Still have a question?</h2>
                <p className="mt-3 max-w-xl text-lg text-white/70">
                  Call your nearest Mobile Care store or stop by. No appointment needed.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/locations">Find a store</ButtonLink>
                  <ButtonLink href="/services" variant="outline-light" arrow={false}>
                    See repair prices
                  </ButtonLink>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
