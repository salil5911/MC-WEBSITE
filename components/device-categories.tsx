import { Smartphone, Tablet, Watch, Laptop, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const devices = [
  {
    name: "Smartphones",
    icon: Smartphone,
    description: "From iPhones to Androids, we repair and upgrade all major brands.",
    features: ["Screen Repairs", "Battery Replacement", "Water Damage Recovery", "Software Updates"],
  },
  {
    name: "Tablets",
    icon: Tablet,
    description: "iPad or Galaxy Tab, we've got your tablet needs covered.",
    features: ["Cracked Screen Fixes", "Charging Port Repairs", "Performance Optimization", "Data Recovery"],
  },
  {
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers, repaired and optimized.",
    features: ["Screen Replacement", "Battery Upgrades", "Water Resistance Restoration", "Sensor Calibration"],
  },
  {
    name: "Laptops",
    icon: Laptop,
    description: "PC or Mac, we'll get your laptop running like new.",
    features: ["Hardware Upgrades", "Virus Removal", "Data Backup & Transfer", "Keyboard Replacements"],
  },
];

export function DeviceCategories({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What We Repair"
            title="Expert repairs for every device"
            subtitle="From cracked screens to failing batteries, our technicians handle it all across every device you rely on."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {devices.map((device, index) => (
            <Reveal key={device.name} variant="fade-up" delay={(index % 2) * 120}>
            <Card
              className="group h-full border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-lg"
            >
              <CardContent className="flex items-start gap-5 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mintDark transition-colors group-hover:bg-brand-mint group-hover:text-white">
                  <device.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-dark">
                    {device.name}
                  </h3>
                  <p className="mt-1 text-gray-600">{device.description}</p>
                  <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {device.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="mr-2 h-4 w-4 shrink-0 text-brand-mintDark" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
