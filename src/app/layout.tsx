import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ErrorBoundary'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fledge - Your Travel Companion',
  description: 'Book flights, hotels, and vacation packages with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}