import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TelegramFAB from '@/components/ui/TelegramFAB'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Mtaa Leaks | Street News, Gossip & Viral Videos',
  description: 'Your source for the hottest street news, exclusive gossip, and viral videos from the neighborhood. First to know, always authentic.',
  keywords: ['gossip', 'viral videos', 'street news', 'local news', 'trending', 'mtaa'],
  authors: [{ name: 'Mtaa Leaks' }],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mtaa-leaks.vercel.app',
    title: 'Mtaa Leaks',
    description: 'Street-smart news and viral content',
    siteName: 'Mtaa Leaks',
    images: [
      {
        url: '/logo.jpg', // Updated to use your logo
        width: 800,
        height: 800,
        alt: 'Mtaa Leaks Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mtaa Leaks',
    description: 'Street-smart news and viral content',
    images: ['/logo.jpg'], // Updated to use your logo
    creator: '@mtaaleaks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpg', // Favicon
    shortcut: '/logo.jpg',
    apple: '/logo.jpg', // Apple touch icon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.jpg" type="image/jpeg" sizes="any" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/logo.jpg" />
        {/* PWA Manifest (optional) */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
        {/* Viewport for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Additional SEO */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Telegram Channel Link */}
        <meta name="telegram:channel" content="@mtaaleaks" />
        <meta property="telegram:channel" content="@mtaaleaks" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <TelegramFAB />
        <Analytics />
      </body>
    </html>
  )
}
