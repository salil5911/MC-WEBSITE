"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Calendar, Clock, Smartphone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { jsPDF } from "jspdf"

const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T12:00:00")
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString(undefined, options)
}

const generateTimeSlots = (openTime: string, closeTime: string): string[] => {
  const slots = []
  const currentTime = new Date(`2000-01-01T${openTime}:00`)
  const endTime = new Date(`2000-01-01T${closeTime}:00`)

  while (currentTime < endTime) {
    const startTime = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    currentTime.setMinutes(currentTime.getMinutes() + 30)
    const endTime = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    slots.push(`${startTime} - ${endTime}`)
  }

  return slots
}

export default function AppointmentForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    time: "",
    deviceType: "",
    brand: "",
    model: "",
    damageType: "",
    fullName: "",
    phoneNumber: "",
    additionalInfo: "",
  })
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "location" || name === "date") {
      setFormData((prev) => ({ ...prev, time: "" }))
    }
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  useEffect(() => {
    if (formData.location && formData.date) {
      const selectedDate = new Date(formData.date + "T12:00:00")
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][selectedDate.getDay()]

      let open: string
      let close: string

      if (dayOfWeek === "Sun") {
        open = "12:30"
        close = "17:00"
      } else if (formData.location === "Southlake") {
        open = "10:30"
        close = "19:00"
      } else if (["Perimeter", "Cumberland"].includes(formData.location)) {
        open = "11:30"
        close = "19:00"
      } else {
        open = "11:30"
        if (["Fri", "Sat"].includes(dayOfWeek)) {
          close = "20:00"
        } else {
          close = "19:00"
        }
      }

      const timeSlots = generateTimeSlots(open, close)
      setAvailableTimes(timeSlots)
    }
  }, [formData.location, formData.date])

  const generatePDFAndNotify = async (formData: any) => {
    try {
      // Generate PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add logo at the top
    pdf.addImage("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MC%20LOGO-XowG6Q2hKUlDImWUZUx6UDaRQp4r2h.png",
        "PNG",
        10,
        10,
        50,
        16.67,
      )

      // Add title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.setTextColor(0, 102, 204);
    pdf.text("Appointment Confirmation", 105, 40, { align: "center" });
      pdf.setTextColor(80, 213, 183) // brand-mint color
      pdf.text("Appointment Confirmation", 105, 40, { align: "center" })

      // Add logo in the middle (watermark)
      pdf.setGState(new pdf.GState({ opacity: 0.1 }))
    pdf.addImage("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MC%20LOGO-XowG6Q2hKUlDImWUZUx6UDaRQp4r2h.png",
        "PNG",
        55,
        100,
        100,
        33.33,
      )
      pdf.setGState(new pdf.GState({ opacity: 1 }))

      // Add appointment details
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(14);
    pdf.setTextColor(50, 50, 50);
    pdf.text("Appointment Details", 20, 55);
    pdf.setFontSize(12);
    pdf.text(`📍 Location: ${formData.location}`, 20, 65);
    pdf.text(`📅 Date: ${formatDate(formData.date)}`, 20, 75);
    pdf.text(`⏰ Time: ${formData.time}`, 20, 85);
    pdf.text(`📱 Device: ${formData.brand} ${formData.model}`, 20, 95);
    pdf.text(`🔧 Service: ${formData.damageType}`, 20, 105);
    pdf.text(`👤 Name: ${formData.fullName}`, 20, 115);
    pdf.text(`📞 Phone: ${formData.phoneNumber}`, 20, 125);
      pdf.text(`Time: ${formData.time}`, 20, 80)
      pdf.text(`Device: ${formData.brand} ${formData.model}`, 20, 90)
      pdf.text(`Service: ${formData.damageType}`, 20, 100)
      pdf.text(`Name: ${formData.fullName}`, 20, 110)
      pdf.text(`Phone: ${formData.phoneNumber}`, 20, 120)

      // Add footer
      pdf.setFontSize(10)
      pdf.setTextColor(128, 128, 128)
      pdf.text("Thank you for choosing Mobile Care. We look forward to serving you!", 105, 280, { align: "center" })
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("📞 Support: (762) 444-9461", 105, 275, { align: "center" });
    pdf.text("🌐 Website: www.mobilecareusa.com", 105, 285, { align: "center" });
    pdf.text(`🕒 Generated on ${new Date().toLocaleString()}`, 105, 295, { align: "center" });

      pdf.save("Mobile_Care_Appointment_Confirmation.pdf")

      // Send Discord notification
      const response = await fetch("/api/send-discord-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          appointmentDetails: formData,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to send Discord notification: ${response.statusText}`)
      }

      console.log("PDF generated and Discord notification sent successfully")
    } catch (error) {
      console.error("Error in generatePDFAndNotify:", error)
      throw error // Re-throw the error to be caught in handleSubmit
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-lg font-semibold">
                Choose Location
              </Label>
              <Select name="location" onValueChange={(value) => handleSelectChange("location", value)}>
                <SelectTrigger className="w-full h-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(locations).map((location) => (
                    <SelectItem key={location} value={location} className="text-lg">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-lg font-semibold">
                Date
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200"
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-mint" />
              </div>
              {formData.date && (
                <p className="mt-2 text-sm text-gray-600">Selected date: {formatDate(formData.date)}</p>
              )}
            </div>
            {formData.location && formData.date && (
              <div className="space-y-2">
                <Label htmlFor="time" className="text-lg font-semibold">
                  Time
                </Label>
                <div className="relative">
                  <Select name="time" onValueChange={(value) => handleSelectChange("time", value)}>
                    <SelectTrigger className="w-full h-12 pl-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time} className="text-lg">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-mint" />
                </div>
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="deviceType" className="text-lg font-semibold">
                Select Your Device Type
              </Label>
              <Select name="deviceType" onValueChange={(value) => handleSelectChange("deviceType", value)}>
                <SelectTrigger className="w-full h-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                  <SelectValue placeholder="Select a device type" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes &&
                    deviceTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-lg">
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {formData.deviceType && (
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-lg font-semibold">
                  Select Brand
                </Label>
                <Select name="brand" onValueChange={(value) => handleSelectChange("brand", value)}>
                  <SelectTrigger className="w-full h-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.deviceType &&
                      brands[formData.deviceType as keyof typeof brands]?.map((brand) => (
                        <SelectItem key={brand} value={brand} className="text-lg">
                          {brand}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.brand && (
              <div className="space-y-2">
                <Label htmlFor="model" className="text-lg font-semibold">
                  Select Model
                </Label>
                <Select name="model" onValueChange={(value) => handleSelectChange("model", value)}>
                  <SelectTrigger className="w-full h-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.brand &&
                      formData.deviceType &&
                      models[formData.brand as keyof typeof models]?.[
                        formData.deviceType as keyof (typeof models)[keyof typeof models]
                      ]?.map((model) => (
                        <SelectItem key={model} value={model} className="text-lg">
                          {model}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="damageType" className="text-lg font-semibold">
                Type of Damage
              </Label>
              <Select name="damageType" onValueChange={(value) => handleSelectChange("damageType", value)}>
                <SelectTrigger className="w-full h-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200">
                  <SelectValue placeholder="Select damage type" />
                </SelectTrigger>
                <SelectContent>
                  {damageTypes &&
                    damageTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-lg">
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-lg font-semibold">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-mint" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-lg font-semibold">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200"
                />
                <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-mint" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-lg font-semibold">
                Is there anything else we need to know?
              </Label>
              <Textarea
                name="additionalInfo"
                onChange={handleInputChange}
                className="w-full min-h-[100px] text-lg bg-white border-2 border-brand-mint focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-brand-mint text-white hover:bg-brand-mintDark transition-colors duration-200"
            >
              Submit Appointment
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted, current step:", step)
    console.log("Current form data:", formData)

    try {
      if (step < 4) {
        nextStep()
      } else {
        await generatePDFAndNotify(formData)
        // Move to the confirmation page
        setStep(5)
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 5 ? (
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-brand-dark">Thank You!</h2>
                  <p className="text-xl text-gray-600">
                    Your appointment has been scheduled. We look forward to seeing you soon!
                  </p>
                  <div className="bg-gray-100 p-6 rounded-lg text-left">
                    <h3 className="text-xl font-semibold mb-4">Appointment Details:</h3>
                    <p>
                      <strong>Location:</strong> {formData.location}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(formData.date)}
                    </p>
                    <p>
                      <strong>Time:</strong> {formData.time}
                    </p>
                    <p>
                      <strong>Device:</strong> {formData.brand} {formData.model}
                    </p>
                    <p>
                      <strong>Service:</strong> {formData.damageType}
                    </p>
                    <p>
                      <strong>Name:</strong> {formData.fullName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phoneNumber}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600 text-lg">
                    Your appointment confirmation has been downloaded as a PDF. Please keep it for your records.
                  </p>
                  <div className="flex justify-between space-x-4">
                    <Button
                      onClick={() => {
                        window.location.href = "/"
                      }}
                      className="flex-1 h-12 text-lg bg-brand-dark text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      Return to Home
                    </Button>
                    <Button
                      onClick={() => {
                        setStep(1)
                        setFormData({
                          location: "",
                          date: "",
                          time: "",
                          deviceType: "",
                          brand: "",
                          model: "",
                          damageType: "",
                          fullName: "",
                          phoneNumber: "",
                          additionalInfo: "",
                        })
                      }}
                      className="flex-1 h-12 text-lg bg-brand-mint text-white hover:bg-brand-mintDark transition-colors duration-200"
                    >
                      Book Another Appointment
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">
                    {step === 1 && "Schedule Your Appointment"}
                    {step === 2 && "Device Information"}
                    {step === 3 && "Service Details"}
                    {step === 4 && "Personal Information"}
                  </h2>
                  {renderStep()}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {step < 4 && (
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline" className="h-12 text-lg">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
              )}
              <Button
                type="submit"
                className="ml-auto h-12 text-lg bg-brand-mint text-white hover:bg-brand-mintDark transition-colors duration-200"
              >
                {step < 3 ? "Next" : "Review & Submit"} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

const locations = {
  Augusta: "Augusta",
  Perimeter: "Perimeter",
  Cumberland: "Cumberland",
  Southlake: "Southlake",
  Lynnhaven: "Lynnhaven",
  "Carolina Place": "Carolina Place",
}

const locationDetails = {
  Augusta: {
    address: "3450 Wrightboro Rd. Suite 1125, Augusta, GA 30909",
    phone: "(762) 444-9461",
  },
  Perimeter: {
    address: "4400 Ashford Dunwoody Rd Space #2085, Dunwoody, GA 30346",
    phone: "(470) 983-1595",
  },
  Cumberland: {
    address: "2860 Cumberland Mall Suite # 208, Atlanta, GA 30339",
    phone: "(404) 271-6281",
  },
  Southlake: {
    address: "1000 Southlake Cir #1123, Morrow, GA 30260",
    phone: "(470) 546-9171",
  },
  Lynnhaven: {
    address: "701 Lynnhaven Pkwy, Virginia Beach, VA 23452",
    phone: "(757) 692-1915",
  },
  "Carolina Place": {
    address: "11025 Carolina Place Pkwy, Pineville, NC 28134",
    phone: "(704) 670-8479",
  },
}

const deviceTypes = ["Smartphones", "Tablets", "Computers", "Wearables"]

const brands = {
  Smartphones: ["Apple", "Samsung", "Google", "Motorola"],
  Tablets: ["Apple", "Samsung"],
  Computers: ["Apple"],
  Wearables: ["Apple"],
}

const models = {
  Apple: {
    Smartphones: [
      "iPhone 6",
      "iPhone 6 Plus",
      "iPhone 6S",
      "iPhone 6S Plus",
      "iPhone SE (1st gen)",
      "iPhone 7",
      "iPhone 7 Plus",
      "iPhone 8",
      "iPhone 8 Plus",
      "iPhone X",
      "iPhone XR",
      "iPhone XS",
      "iPhone XS Max",
      "iPhone 11",
      "iPhone 11 Pro",
      "iPhone 11 Pro Max",
      "iPhone SE (2nd gen)",
      "iPhone 12",
      "iPhone 12 mini",
      "iPhone 12 Pro",
      "iPhone 12 Pro Max",
      "iPhone 13",
      "iPhone 13 mini",
      "iPhone 13 Pro",
      "iPhone 13 Pro Max",
      "iPhone SE (3rd gen)",
      "iPhone 14",
      "iPhone 14 Plus",
      "iPhone 14 Pro",
      "iPhone 14 Pro Max",
      "iPhone 15",
      "iPhone 15 Plus",
      "iPhone 15 Pro",
      "iPhone 15 Pro Max",
    ],
    Tablets: [
      'iPad Pro 13" 7th Gen (2024)',
      'iPad Pro 12.9" 6th Gen (2022)',
      'iPad Pro 12.9" 5th Gen (2021)',
      'iPad Pro 12.9" 4th Gen (2020)',
      'iPad Pro 12.9" 3rd Gen (2018)',
      'iPad Pro 12.9" 2nd Gen (2017)',
      'iPad Pro 12.9" 1st Gen (2015)',
      'iPad Pro 11" 5th Gen (2024)',
      'iPad Pro 11" 4th Gen (2022)',
      'iPad Pro 11" 3rd Gen (2021)',
      'iPad Pro 11" 2nd Gen (2020)',
      'iPad Pro 11" 1st Gen (2018)',
      'iPad Pro 10.5" (2017)',
      'iPad Pro 9.7" (2016)',
      'iPad Air 13" (2024)',
      'iPad Air 11" (2024)',
      "iPad Air 5 (2022)",
      "iPad Air 4 (2020)",
      "iPad Air 3 (2019)",
      "iPad Air 2 (2014)",
      "iPad Air 1 (2013)",
      "iPad 10 (2022)",
      "iPad 9 (2021)",
      "iPad 8 (2020)",
      "iPad 7 (2019)",
      "iPad 6 (2018)",
      "iPad 5 (2017)",
      "iPad 4 (2012)",
      "iPad 3 (2012)",
      "iPad 2 (2011)",
      "iPad Mini 7 (2024)",
      "iPad Mini 6 (2021)",
      "iPad Mini 5 (2019)",
      "iPad Mini 4 (2015)",
      "iPad Mini 3 (2014)",
      "iPad Mini 2 (2013)",
      "iPad Mini 1 (2012)",
    ],
    Wearables: [
      "Series 10 (46MM)",
      "Series 10 (42MM)",
      "Series 9 (45MM)",
      "Series 9 (41MM)",
      "Series Ultra (2nd Gen) (49MM)",
      "Series Ultra (1st Gen) (49MM)",
      "Series 8 (45MM)",
      "Series 8 (41MM)",
      "Series SE (2nd Gen) (44MM)",
      "Series SE (2nd Gen) (40MM)",
      "Series 7 (45MM)",
      "Series 7 (41MM)",
      "Series 6 (44MM)",
      "Series 6 (40MM)",
      "Series SE (1st Gen) (44MM)",
      "Series SE (1st Gen) (40MM)",
    ],
    Computers: [
      '13" (A1181)',
      'Air 15" (A2941)',
      'Air 15" (A3114)',
      'Air 13" (A3113)',
      'Air 13" (A2681)',
      'Air 13" (A2337)',
      'Air 13" (A2179)',
      'Air 13" (A1932)',
      'Air 13" (A1466)',
      'Air 13" (A1369)',
      'Air 13" (A1304)',
      'Air 13" (A1237)',
      'Air 11" (A1465)',
      'Air 11" (A1370)',
      'Pro 16" (A2991)',
      'Pro 16" (A2780)',
      'Pro 16" (A2485)',
      'Pro 16" (A2141)',
      'Pro 15" (A1260)',
      'Pro 14" (A2992)',
      'Pro 14" (A2918)',
      "Pro",
    ],
  },
  Samsung: {
    Smartphones: [
      "Galaxy S8",
      "Galaxy S8+",
      "Galaxy S9",
      "Galaxy S9+",
      "Galaxy S10e",
      "Galaxy S10",
      "Galaxy S10+",
      "Galaxy S20",
      "Galaxy S20+",
      "Galaxy S20 Ultra",
      "Galaxy S21",
      "Galaxy S21+",
      "Galaxy S21 Ultra",
      "Galaxy S22",
      "Galaxy S22+",
      "Galaxy S22 Ultra",
      "Galaxy S23",
      "Galaxy S23+",
      "Galaxy S23 Ultra",
      "Galaxy S24",
      "Galaxy S24+",
      "Galaxy S24 Ultra",
      "Galaxy Note 8",
      "Galaxy Note 9",
      "Galaxy Note 10",
      "Galaxy Note 10+",
      "Galaxy Note 20",
      "Galaxy Note 20 Ultra",
      "Galaxy Z Flip",
      "Galaxy Z Flip 5G",
      "Galaxy Z Fold 2",
      "Galaxy Z Flip 3",
      "Galaxy Z Fold 3",
      "Galaxy Z Flip 4",
      "Galaxy Z Fold 4",
      "Galaxy Z Flip 5",
      "Galaxy Z Fold 5",
      "A73 5G (A736 / 2022)",
      "A73 (A735 / 2022)",
      "A72 (A725 / 2021)",
      "A71 5G (A716 / 2020)",
      "A71 (A715 / 2020)",
      "A70 (A705 / 2019)",
      "A54 5G (A546 / 2023)",
      "A53 5G (A536 / 2022)",
      "A52s (A528 / 2021)",
      "A52 5G (A526 / 2021)",
      "A52 4G (A525 / 2021)",
      "A51 5G (A516 / 2020)",
      "A51 4G (A515 / 2019)",
      "A50s (A507 / 2019)",
      "A50 (A505 / 2019)",
      "A42 5G (A426 / 2020)",
      "A32 5G (A326 / 2021)",
      "A32 4G (A325 / 2021)",
      "A23 5G (A236 / 2022)",
      "A23 (A235 / 2022)",
      "A21s (A217 / 2020)",
      "A21 (A215 / 2020)",
      "A20s (A207 / 2019)",
      "A20 (A205 / 2019)",
      "A13 5G (A136 / 2021)",
      "A13 (A135 / 2022)",
      "A12 (A125 / 2020)",
      "A11 (A115 / 2020)",
      "A10s (A107 / 2019)",
      "A10 (A105 / 2019)",
    ],
    Tablets: [
      "Galaxy Tab S9 Ultra",
      "Galaxy Tab S9+",
      "Galaxy Tab S9",
      "Galaxy Tab S8 Ultra",
      "Galaxy Tab S8+",
      "Galaxy Tab S8",
      "Galaxy Tab S7+",
      "Galaxy Tab S7",
      "Galaxy Tab S6 Lite",
      "Galaxy Tab S6",
      "Galaxy Tab S5e",
      "Galaxy Tab S4",
      "Galaxy Tab A 10.1 (2019)",
      "Galaxy Tab A 8.0 (2019)",
    ],
  },
  Google: {
    Smartphones: [
      "Pixel 8 Pro",
      "Pixel 8",
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 6 Pro",
      "Pixel 6",
      "Pixel 5a",
      "Pixel 5",
      "Pixel 4a 5G",
      "Pixel 4a",
      "Pixel 4 XL",
      "Pixel 4",
      "Pixel 3a XL",
      "Pixel 3a",
      "Pixel 3 XL",
      "Pixel 3",
      "Pixel 2 XL",
      "Pixel 2",
      "Pixel XL",
      "Pixel",
    ],
  },
  Motorola: {
    Smartphones: [
      "Moto G Power (2023)",
      "Moto G Stylus 5G (2023)",
      "Moto G Play (2023)",
      "Moto Edge+ (2023)",
      "Moto G 5G (2023G (2023)",
      "Moto G Stylus (2023)",
      "Moto G Pure (2023)",
      "Moto G Power 5G (2023)",
      "Moto Razr+ (2023)",
      "Moto Razr (2023)",
      "Edge 30 Ultra",
      "Edge 30 Fusion",
      "Edge 30 Neo",
      "Moto G72",
      "Moto G62 5G",
      "Moto G42",
      "Moto G32",
      "Moto G22",
    ],
  },
}

const damageTypes = [
  "Cracked Screen",
  "Battery Replacement",
  "Water Damage",
  "Charging Port Repair",
  "Camera Repair",
  "Speaker Repair",
  "Microphone Repair",
  "Button Repair",
  "Software Issue",
  "Data Recovery",
  "Other (Please specify in additional info)",
]

