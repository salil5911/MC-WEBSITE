import { Nav } from "@/components/nav"
import AppointmentForm from "@/components/appointment-form"
import { Footer } from "@/components/footer"

export default function ScheduleAppointmentPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Nav />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-brand-dark mb-4">Schedule an Appointment</h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            Book your device repair or service with our expert technicians.
          </p>
          <AppointmentForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}

