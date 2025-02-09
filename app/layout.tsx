import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mobile Care USA',
  description: 'Expert smartphone repair services you can trust.',
  icons: {
    icon: '/favicon.ico', // Correct syntax for the icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
