import { Anton, Bebas_Neue, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import LenisProvider from '@/components/motion/lenis-provider'
import TopNav from '@/components/nav/top-nav'
import TailCall from '@/components/sections/tail-call'

import './globals.css'

const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap'
})

const sub = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sub',
  display: 'swap'
})

const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata = {
  title: 'The Oz Cast — Hosted by Mark "Oz" Geist · 13 Hours · Benghazi Survivor',
  description:
    'The Oz Cast — hosted by Mark "Oz" Geist: U.S. Marine (1984–1996), Annex Security Team in Benghazi, co-author of 13 Hours, co-founder of Shadow Warriors Project. Long-form interviews, on the record. Credited with helping save 25+ Americans during the September 11–12, 2012 attack.',
  metadataBase: new URL('https://theozcast.com'),
  openGraph: {
    title: 'The Oz Cast — Hosted by Mark "Oz" Geist',
    description:
      'Long-form interviews on the record with Mark "Oz" Geist — Marine, Annex Security Team in Benghazi, co-author of 13 Hours, co-founder of Shadow Warriors Project.',
    type: 'website',
    url: 'https://theozcast.com'
  }
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${display.variable} ${sub.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased" suppressHydrationWarning>
        <LenisProvider>
          <TopNav />
          {children}
          <TailCall />
        </LenisProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'border border-border bg-surface text-ink rounded-none',
              title: 'font-mono text-xs uppercase tracking-[0.2em] text-accent',
              description: 'text-mute text-xs'
            }
          }}
        />
      </body>
    </html>
  )
}

export default RootLayout
