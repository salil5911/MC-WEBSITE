import { Nav } from "@/components/nav"
import AppointmentForm from "@/components/appointment-form"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ClipboardCheck, Bell } from "lucide-react"

export default function ScheduleAppointmentPage() {

   return (
    <>
      <Head>
        <title>Schedule a Repair | Mobile Care USA</title>
        <meta name="description" content="Book an appointment online for fast and reliable phone repairs. Choose a time that works for you and get your device fixed today!" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main>
        <h1>Schedule Your Repair Appointment</h1>
        <p>Choose your repair service and book a time that fits your schedule.</p>
      </main>
    </>
  );
  
  const steps = [
    {
      icon: CheckCircle,
      title: "Select Your Service",
      description: "Choose the type of repair or service you need from our comprehensive list of options.",
    },
    {
      icon: Clock,
      title: "Pick a Time",
      description: "Select a convenient date and time slot. Most repairs can be completed within 30-45 minutes.",
    },
    {
      icon: ClipboardCheck,
      title: "Provide Details",
      description: "Tell us about your device and the issues you're experiencing to help us prepare for your repair.",
    },
    {
      icon: Bell,
      title: "Confirmation",
      description: "Receive instant confirmation and reminder notifications for your appointment.",
    },
  ]

  const expectations = [
    {
      title: "Before Your Appointment",
      items: [
        "Back up your device if possible",
        "Remove any screen protectors or cases",
        "Note down your device passcode",
        "Bring valid ID for check-in",
        "Arrive 5-10 minutes early",
      ],
    },
    {
      title: "During Your Appointment",
      items: [
        "Quick initial device assessment",
        "Detailed cost breakdown provided",
        "Repair process explanation",
        "Real-time update notifications",
        "Payment processing",
      ],
    },
    {
      title: "After Your Appointment",
      items: [
        "Quality assurance testing",
        "Repair warranty explanation",
        "Care instructions provided",
        "Follow-up satisfaction check",
        "Feedback request",
      ],
    },
  ]

  const schedulingFaqs = [
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule up to 2 hours before your appointment time through our online portal or by calling your selected location.",
    },
    {
      question: "What if I'm running late?",
      answer:
        "Please contact us if you're running late. We'll hold your slot for 15 minutes and try to accommodate you, or help reschedule if needed.",
    },
    {
      question: "Do you offer same-day appointments?",
      answer:
        "Yes, we often have same-day appointments available. Earlier booking is recommended for specific time slots or complex repairs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, cash, and digital payments including Apple Pay and Google Pay.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Nav />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-dark mb-4">Schedule an Appointment</h1>
            <p className="text-xl text-gray-600 mb-8">
              Book your device repair or service with our expert technicians. Most repairs completed within 30-45
              minutes.
            </p>
          </div>

          {/* Booking Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <step.icon className="w-12 h-12 text-brand-mint mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Appointment Form */}
          <div className="max-w-4xl mx-auto">
            <AppointmentForm />
          </div>

          {/* What to Expect */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {expectations.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-mint mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Scheduling FAQs */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Scheduling FAQs</h2>
            <div className="max-w-3xl mx-auto">
              {schedulingFaqs.map((faq, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

