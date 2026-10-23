import { SectionHeading } from "@/components/section-heading"
import { JsonLd } from "@/components/json-ld"
import { Accordion } from "@/components/motion/accordion"
import { faqPageSchema } from "@/lib/seo"
import { homeFaqs } from "@/lib/faqs"

export function FAQ({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title="Before you visit."
            subtitle="Can't find your answer here? Call your nearest store and a technician will help."
          />
        </div>
        <Accordion items={homeFaqs} />
      </div>
    </section>
  )
}
