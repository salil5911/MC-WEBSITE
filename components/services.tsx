import Image from "next/image"
import { Smartphone, Headphones, Phone, RefreshCw, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Services({ className = "" }: { className?: string }) {
  const services = [
    {
      title: "Device Repairs",
      description:
        "Expert repair services for all major brands and models. We fix screens, batteries, charging ports, and more.",
      icon: Smartphone,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Our-quality-control-side.jpg-S6UB4ca4wJSyTZj6EPZxUeNDCmllR3.jpeg",
      brands: ["Apple", "Samsung", "Google", "Motorola"],
      repairs: [
        "Screen Replacement",
        "Battery Replacement",
        "Water Damage Repair",
        "Camera Repair",
        "Back Glass Repair",
        "Charging Port Repair",
      ],
    },
    {
      title: "Accessories",
      description: "Premium accessories to protect and enhance your devices. From rugged cases to high-speed chargers.",
      icon: Headphones,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accessories_for_phone_like_cases_chargers_screen-RFU9RyODDYvfV3I49qxMki4Xorv7a5.jpeg",
      items: [
        "Cases",
        "Screen Protectors",
        "Chargers",
        "Watch Bands",
        "Bluetooth Headphones",
        "Power Banks",
        "Car Mounts",
        "Camera Lens Protector",
        "Speakers",
        "MagSafe Accessories",
      ],
    },
    {
      title: "Network Carriers",
      description:
        "Connect with major carriers or switch to a new plan. We offer competitive rates and excellent coverage. Get a plan today for as low as $10!",
      icon: Phone,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-hnal31lhsDQ2eqqM3NfFOEkFFM4OKr.jpeg",
      carriers: ["T-Mobile", "Verizon", "AT&T", "Cricket"],
    },
    {
      title: "Certified Pre-Owned",
      description:
        "Quality checked and certified pre-owned devices at great prices. All devices come with a 30-day warranty. Through our financing options by Acima and Progressive, you can shop without using credit.",
      icon: ShieldCheck,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2021-03-2416.28.28_8fde6dd2-8a45-46d5-af9e-0f5a579a04a4_900x-mZPlz8BSTbpTz08KsiIkkYjuv2IbdV.webp",
      devices: ["iPhones", "iPads", "Samsung Devices", "Apple Watches", "AirPods", "Samsung Watches"],
    },
    {
      title: "Trade-In Program",
      description:
        "Get value for your current device with our trade-in program. Upgrade to the latest technology for less.",
      icon: RefreshCw,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trade%20in-6lUN07Xl7Q2FJajszV7RKQZ0s4nRcQ.jpeg",
      benefits: ["Competitive Pricing", "Instant Quote", "Environmentally Friendly", "Credit Towards New Devices"],
    },
  ]

  return (
    <section className={`bg-gradient-radial from-brand-mint/20 via-white to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="border-2 border-brand-mint hover:border-brand-mintDark transition-colors shadow-lg hover:shadow-xl"
              >
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-t-lg overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <Icon className="h-16 w-16 text-brand-mint mb-4" />
                  <CardTitle className="text-3xl font-bold text-brand-dark">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  {Object.entries(service)
                    .filter(([key, value]) => Array.isArray(value))
                    .map(([key, items]) => (
                      <div key={key} className="mt-4">
                        <h4 className="font-semibold text-xl text-brand-dark mb-3 capitalize">{key}:</h4>
                        <ul className="grid grid-cols-2 gap-3">
                          {(items as string[]).map((item) => (
                            <li key={item} className="flex items-center text-base text-gray-600">
                              <span className="h-2 w-2 rounded-full bg-brand-mint mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

