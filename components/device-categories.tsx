"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Watch, Laptop, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const devices = [
  {
    name: "Smartphones",
    icon: Smartphone,
    description: "From iPhones to Androids, we repair and upgrade all major brands.",
    color: "bg-blue-500",
    features: ["Screen Repairs", "Battery Replacement", "Water Damage Recovery", "Software Updates"],
  },
  {
    name: "Tablets",
    icon: Tablet,
    description: "iPad or Galaxy Tab, we've got your tablet needs covered.",
    color: "bg-green-500",
    features: ["Cracked Screen Fixes", "Charging Port Repairs", "Performance Optimization", "Data Recovery"],
  },
  {
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers, repaired and optimized.",
    color: "bg-purple-500",
    features: ["Screen Replacement", "Battery Upgrades", "Water Resistance Restoration", "Sensor Calibration"],
  },
  {
    name: "Laptops",
    icon: Laptop,
    description: "PC or Mac, we'll get your laptop running like new.",
    color: "bg-red-500",
    features: ["Hardware Upgrades", "Virus Removal", "Data Backup & Transfer", "Keyboard Replacements"],
  },
];

export function DeviceCategories({ className = "" }) {
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);

  return (
    <div className={`max-w-7xl mx-auto px-6 py-12 ${className}`}>
      <h2 className="text-4xl font-bold text-brand-dark mb-6 text-center">What We Repair</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {devices.map((device) => (
          <Card key={device.name} onClick={() => setSelectedDevice(device)} className="cursor-pointer hover:shadow-lg transition">
            <CardContent className="p-6 flex items-start space-x-4">
              <div className={`p-3 rounded-full ${device.color}`}>
                <device.icon className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{device.name}</h3>
                <p>{device.description}</p>
                <ul className="mt-2 space-y-1">
                  {device.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
