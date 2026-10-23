import { Clock, BadgeCheck, Wallet, ShieldCheck } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const reasons = [
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Most repairs are completed in under an hour, so you're never without your device for long.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Technicians",
    description: "Our trained experts repair all major brands using premium, quality-tested parts.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Transparent, competitive pricing with no hidden fees and free repair estimates.",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Warranty",
    description: "Every repair is backed by our warranty covering both parts and labor for peace of mind.",
  },
]

export function WhyChooseUs({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Mobile Care"
            title="Repairs done right, the first time"
            subtitle="We combine speed, expertise, and honest pricing to get your devices back to perfect condition."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} variant="fade-up" delay={index * 100}>
              <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark transition-colors group-hover:bg-brand-mint group-hover:text-white">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
