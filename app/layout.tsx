import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { JsonLd } from '@/components/json-ld';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, organizationSchema } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE.url],
  },
  formatDetection: { telephone: true, address: true },
  title: 'Same-Day Phone Repair in GA, VA, NC & MI | Mobile Care USA',
  description: 'Walk-in iPhone, Samsung, iPad & laptop repair at 8 mall stores in Georgia, Virginia, North Carolina & Michigan. Most repairs done same day, 30-day warranty.',
  keywords: [
    'Mobile Phone Repair in Atlanta, Georgia',
    'iPhone repair service in Atlanta, Georgia',
    'Android phone repair in Atlanta, Georgia',
    'phone repair shop in Augusta Mall',
    'phone repair shop in Perimeter Mall',
    'phone repair shop in Cumberland Mall',
    'phone repair shop in Southlake Mall',
    'phone repair shop in Lynnhaven Mall',
    'phone repair shop in Carolina Place Mall',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Same-Day Phone Repair in GA, VA, NC & MI | Mobile Care USA',
    description: 'Walk-in iPhone, Samsung, iPad & laptop repair at 8 mall stores in Georgia, Virginia, North Carolina & Michigan. Most repairs done same day, 30-day warranty.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${mono.variable} bg-background`}>
      <head>
        {/* Structured Data (Schema.org) */}
        <JsonLd data={organizationSchema()} />

      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
        {/* Google Tag (gtag.js), loaded after the page is interactive so it doesn't compete with first paint */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-P17FFSKJVN" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P17FFSKJVN');
          `}
        </Script>
      </body>
    </html>
  );
}
