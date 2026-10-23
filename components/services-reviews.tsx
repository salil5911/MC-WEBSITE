import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { GoogleReviews } from "@/components/google-reviews"

export function ServicesReviews({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What our customers say"
            subtitle="Thousands of locals trust Mobile Care to keep their devices running. Here's what they think."
            className="mb-12"
          />
        </Reveal>
        <GoogleReviews />
      </div>
    </section>
  )
}
