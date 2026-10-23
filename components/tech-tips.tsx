import { Lightbulb, Battery, Smartphone, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const tips = [
  {
    icon: Battery,
    title: "Extend Battery Life",
    description:
      "Reduce screen brightness and close background apps to significantly improve your device's battery life.",
  },
  {
    icon: Smartphone,
    title: "Protect Your Screen",
    description: "Invest in a high-quality screen protector to prevent scratches and cracks on your device's display.",
  },
  {
    icon: Wifi,
    title: "Boost Wi-Fi Speed",
    description: "Place your router in a central location and away from walls to improve your Wi-Fi signal strength.",
  },
  {
    icon: Lightbulb,
    title: "Night Mode for Better Sleep",
    description: "Enable night mode on your devices to reduce blue light exposure and improve sleep quality.",
  },
]

export function TechTips({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-brand-dark ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tech Tips"
            title="Pro tips from our experts"
            subtitle="Maximize your device's performance and longevity with advice straight from our repair technicians."
            light
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <Reveal key={index} variant="fade-up" delay={index * 100}>
              <Card className="h-full bg-white/10 border-brand-mint/20 hover:border-brand-mint transition-colors">
                <CardHeader>
                  <tip.icon className="h-8 w-8 text-brand-mint mb-4" />
                  <CardTitle className="text-xl text-white">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{tip.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

