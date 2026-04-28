import { Inter, JetBrains_Mono } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import LenisProvider from '@/components/motion/lenis-provider'

import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata = {
  title: 'OZ Frequency — Mark Geist',
  description:
    'OZ Frequency: Mark "Oz" Geist broadcasts from the field. Operators, lawmakers, families — on the record, off the script.',
  metadataBase: new URL('https://markgeist.com')
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} style={{ '--font-display': 'var(--font-sans)' }}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <LenisProvider>{children}</LenisProvider>
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
