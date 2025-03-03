import Head from "next/head";
import { Nav } from "@/components/nav";
import AppointmentForm from "@/components/appointment-form";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, ClipboardCheck, Bell } from "lucide-react";

export default function ScheduleAppointmentPage() {
  return (
    <>
      <Head>
        <title>Schedule a Repair | Mobile Care USA</title>
        <meta
          name="description"
          content="Book an appointment online for fast and reliable phone repairs. Choose a time that works for you and get your device fixed today!"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <Nav />
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-dark mb-4">
                Schedule an Appointment
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Book your device repair or service with our expert technicians.
                Most repairs completed within 30-45 minutes.
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
              <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">
                What to Expect
              </h2>
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
              <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">
                Scheduling FAQs
              </h2>
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
    </>
  );
}
