import { ChevronDown } from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema } from "@/lib/seo"
import { homeFaqs } from "@/lib/faqs"

export function FAQ({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Questions"
          title="Before you visit."
          subtitle="Can't find your answer here? Call your nearest store and a technician will help."
        />
        <div className="border-t border-ink/15">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-ink focus:outline-none focus-visible:text-brand-mintDark [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-ink-faint transition-transform group-open:rotate-180" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
