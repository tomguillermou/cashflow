import './globals.css'

import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Cashflow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-base-200'>
        {children}
        <Toaster position='bottom-right' reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  )
}
