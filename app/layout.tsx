import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mobile Care - Professional Phone Repairs',
  description: 'Expert care for all your tech needs. From pocket-sized to professional-grade repairs, we service all major phone brands.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Mobile Care - Expert Phone Repairs',
    description: 'Professional phone repair services you can trust. We repair and upgrade all major brands from iPhones to Androids.',
    url: 'https://mobilecareusa.com',
    siteName: 'Mobile Care',
    images: [
      {
        url: '/og-image.png', // Add an Open Graph image in /public/
        width: 1200,
        height: 630,
        alt: 'Mobile Care',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Best Phone Repair Shop in Georgia",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Atlanta",
    "addressRegion": "GA",
    "addressCountry": "USA"
  },
  "service": [
    "Phone screen repair Atlanta",
    "iPhone repair near me",
    "Samsung screen repair Atlanta",
    "Fast phone repair in Atlanta",
    "Cell phone battery replacement Atlanta",
    "Best phone repair shop in Georgia"
  ],
  "url": "https://mobilecareusa.com"
})}} />
        <meta name="title" content="Mobile Care - Professional Smartphone Repairs" />
        <meta name="description" content="Expert care for all your tech needs. From pocket-sized to professional-grade repairs, we service all major smartphone brands." />
        <meta property="og:title" content="Mobile Care USA - Expert Smartphone Repairs" />
        <meta property="og:description" content="Professional smartphone repair services you can trust. We repair and upgrade all major brands from iPhones to Androids." />
        <meta property="og:url" content="https://mobilecareusa.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <title>Mobile Care USA - Professional Smartphone Repairs</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
