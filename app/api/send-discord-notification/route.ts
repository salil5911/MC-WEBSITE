import { NextResponse } from "next/server"
import axios from "axios"

const webhookUrls = {
  Augusta:
    "https://discord.com/api/webhooks/1334959230507028531/hwMvM4ZMEGUqZZ8KnqdHGZDUbhHgw_NzZi7SA4k4morUzgoZa1iqWgbM0meQHUvVQNUS",
  Perimeter:
    "https://discord.com/api/webhooks/1334978939797635072/M58O3kUcCwoW125g4XFqs8xypRjNY1_dISo6RNnDtKrHhnQVzXYe_pVZt_Q4y1h-xgP3",
  Cumberland:
    "https://discord.com/api/webhooks/1334979816570486834/VkH3LYA6h67d_kwdr2UXlgbdQtg2P1BC1HAzQmvESKGIveU16DrHoX1WyU26WCJUJpt2",
  Lynnhaven:
    "https://discord.com/api/webhooks/1334979970681802857/OM18n_O3oFFZHps9tyD__gnb5qfMu8S_oCD76jWu3Nxeo7GrxExrwXn-9w4MajUDhO4i",
  "Carolina Place":
    "https://discord.com/api/webhooks/1334980030853550173/msqOPk1eYgx6oS3GlcmJSPfgjbSBIaDdF8WOdBCrONxQx7p-6vzEzSPay6ppBK1QEVU1",
  Southlake:
    "https://discord.com/api/webhooks/1334981090128957512/Mi6AhIOGmghYVONOtcFJr0xczGXN9x-R88HPE3T4k7Hw5J21Qzr4kE-RuOyDukAQTAWW",
}

export async function POST(request: Request) {
  try {
    const { location, appointmentDetails } = await request.json()
    const webhookUrl = webhookUrls[location as keyof typeof webhookUrls]

    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: "Invalid location" }, { status: 400 })
    }

    const message = {
      content: "New Appointment Booked!",
      embeds: [
        {
          title: "Appointment Details",
          fields: [
            { name: "Location", value: location, inline: true },
            { name: "Date", value: appointmentDetails.date, inline: true },
            { name: "Time", value: appointmentDetails.time, inline: true },
            { name: "Customer Name", value: appointmentDetails.fullName, inline: true },
            { name: "Phone Number", value: appointmentDetails.phoneNumber, inline: true },
            { name: "Device", value: `${appointmentDetails.brand} ${appointmentDetails.model}`, inline: true },
            { name: "Service", value: appointmentDetails.damageType, inline: true },
          ],
          color: 5814783, // A nice teal color
        },
      ],
    }

    await axios.post(webhookUrl, message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending Discord notification:", error)
    return NextResponse.json({ success: false, error: "Failed to send Discord notification" }, { status: 500 })
  }
}

