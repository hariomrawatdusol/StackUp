import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'StackUp - Hire Expert Creators in 1 Click | Save 70%',
  description: 'Marketplace where brands hire expert writers, actors, editors & more in 1 click. Build your creator team at ₹2k vs ₹6k. UPI escrow protected. Save 70%.',
  metadataBase: new URL('https://skill-overlap.emergent.host'),
  openGraph: {
    title: 'StackUp - Hire Expert Creators in 1 Click',
    description: 'Build your creator team at ₹2k vs ₹6k. Writers, actors, editors & more. UPI escrow protected. Save 70%.',
    url: 'https://skill-overlap.emergent.host',
    siteName: 'StackUp',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1424,
        height: 752,
        alt: 'StackUp — Hire Expert Creators in 1 Click. Save 70%. UPI Escrow Protected.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackUp - Hire Expert Creators in 1 Click',
    description: 'Build your creator team at ₹2k vs ₹6k. UPI escrow protected.',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-bg text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
