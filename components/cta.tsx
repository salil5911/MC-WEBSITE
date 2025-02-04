import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-16">
      <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Experience the
              <span className="text-brand-mint"> Mobile Care Difference</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-brand-mint/10 p-3">
                  <Zap className="h-6 w-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Express Repair Service</h3>
                  <p className="mt-2 text-gray-400">Most repairs completed in 2 hours or less</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-brand-mint/10 p-3">
                  <Shield className="h-6 w-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Lifetime Warranty</h3>
                  <p className="mt-2 text-gray-400">All our repairs come with a lifetime warranty</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-brand-mint/10 p-3">
                  <Smartphone className="h-6 w-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Multi-Device Expertise</h3>
                  <p className="mt-2 text-gray-400">From phones to laptops, we fix it all</p>
                </div>
              </div>
            </div>
            <Link href="/schedule-appointment">
              <Button className="bg-brand-mint text-brand-dark hover:bg-brand-mint/90 text-lg px-8 py-6">
                Schedule a Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="relative lg:ml-12">
            <div className="aspect-square rounded-full bg-gradient-radial from-brand-mint/30 via-brand-mint/5 to-transparent animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-mint to-brand-mintDark opacity-20 blur-2xl" />
                  <div className="relative h-full w-full rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm p-8">
                    <div className="h-full w-full rounded-2xl bg-brand-dark/40 shadow-2xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-white mb-2">100,000+</p>
                        <p className="text-xl text-brand-mint">Devices Repaired</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

