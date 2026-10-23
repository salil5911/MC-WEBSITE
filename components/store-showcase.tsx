import Image from "next/image"
import { MapPin, Users } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

export function StoreShowcase({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fade-up">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/store-interior.webp"
                alt="Inside a Mobile Care store — staff helping a customer at the service counter, surrounded by phones and accessories"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Visit A Store"
                title="Friendly experts, ready when you walk in"
                subtitle="Step into any Mobile Care location and you'll find a fully stocked store and a team that treats your device like their own — from screen repairs to the latest phones and accessories."
              />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint/15 text-brand-mintDark">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-dark">Face-to-face service</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      Talk to a real technician and get honest, on-the-spot advice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint/15 text-brand-mintDark">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-dark">Conveniently located</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      Find us at malls near you — no appointment needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
