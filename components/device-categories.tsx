"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, Tablet, Watch, Laptop, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const devices = [
  {
    name: "Smartphones",
    icon: Smartphone,
    description: "From iPhones to Androids, we repair and upgrade all major brands.",
    color: "bg-blue-500",
    features: ["Screen Repairs", "Battery Replacement", "Water Damage Recovery", "Software Updates"],
    animation: {
      initial: { rotateY: -180, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: 180, opacity: 0 },
    },
  },
  {
    name: "Tablets",
    icon: Tablet,
    description: "iPad or Galaxy Tab, we've got your tablet needs covered.",
    color: "bg-green-500",
    features: ["Cracked Screen Fixes", "Charging Port Repairs", "Performance Optimization", "Data Recovery"],
    animation: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
    },
  },
  {
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers, repaired and optimized.",
    color: "bg-purple-500",
    features: ["Screen Replacement", "Battery Upgrades", "Water Resistance Restoration", "Sensor Calibration"],
    animation: {
      initial: { rotate: -180, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
      exit: { rotate: 180, opacity: 0 },
    },
  },
  {
    name: "Laptops",
    icon: Laptop,
    description: "PC or Mac, we'll get your laptop running like new.",
    color: "bg-red-500",
    features: ["Hardware Upgrades", "Virus Removal", "Data Backup & Transfer", "Keyboard Replacements"],
    animation: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -50, opacity: 0 },
    },
  },
]

export function DeviceCategories({ className = "" }: { className?: string }) {
  const [activeDevice, setActiveDevice] = useState(0)

  return (
    <section className={`py-12 bg-gradient-to-b from-white to-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-brand-dark mb-8">Devices We Care For</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Expert care for all your tech needs, from pocket-sized to professional-grade.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {devices.map((device, index) => (
              <Card
                key={device.name}
                className={`cursor-pointer transition-all duration-300 ${
                  activeDevice === index ? "ring-2 ring-brand-mint shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setActiveDevice(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${device.color} mr-4`}>
                      <device.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-dark">{device.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{device.description}</p>
                  <ul className="space-y-2">
                    {device.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-mint mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            {devices.map((device, index) => (
              <motion.div
                key={device.name}
                className="absolute inset-0 flex items-center justify-center"
                initial="initial"
                animate={activeDevice === index ? "animate" : "exit"}
                variants={device.animation}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-64 h-64 rounded-full ${device.color} flex items-center justify-center`}>
                  <device.icon className="w-32 h-32 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

