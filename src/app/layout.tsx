import type { Metadata } from 'next'

import { notoSans } from '@/lib/font'
import { cn } from '@/lib/utils'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Providers } from '@/components/providers'
import Sidebar from '@/components/sidebar'

import './globals.css'

export const metadata: Metadata = {
  title: 'Hacker News Client',
  description: 'Hacker News Client',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={cn('h-full w-full antialiased', notoSans.className, {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        <Providers>
          <div className="flex h-full w-full flex-col lg:flex-row">
            <Navbar />
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-auto px-4 md:px-8 lg:px-16">
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
