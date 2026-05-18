import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Priyanshu Rai — Backend Engineer · PriyanshuOS',
  description:
    'Priyanshu Rai — Backend Software Engineer at Park+. Python, Django, Kafka, Celery, data validation, and production systems.',
  authors: [{ name: 'Priyanshu Rai' }],
  openGraph: {
    title: 'Priyanshu Rai — Backend Engineer',
    description:
      'Production backend systems · Django · Kafka · 35M+ row migrations · Park+',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${orbitron.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
