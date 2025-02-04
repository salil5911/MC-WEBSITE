import { NextResponse } from "next/server"
import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

export async function POST(request: Request) {
  console.log("SMS API route called")

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error("Twilio credentials are missing")
    return NextResponse.json({ success: false, error: "SMS service is not configured" }, { status: 500 })
  }

  try {
    const { to, body } = await request.json()
    console.log(`Attempting to send SMS to ${to}`)

    const client = twilio(accountSid, authToken)
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    })

    console.log(`SMS sent successfully. Message SID: ${message.sid}`)
    return NextResponse.json({ success: true, messageId: message.sid })
  } catch (error) {
    console.error("Error sending SMS:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to send SMS" }, { status: 500 })
  }
}

