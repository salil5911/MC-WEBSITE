import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mobile Care USA',
  description: 'Expert smartphone repair services you can trust.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
