import type { Metadata } from 'next'
import './sass/main.scss'
import { Poppins } from 'next/font/google'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'GlobePulse',
  description:
    "GlobePulse - Explorez l'actualité mondiale en temps réel grâce à une carte interactive innovante. Cliquez sur un pays pour découvrir les dernières actualités et événements marquants. GlobePulse vous connecte instantanément aux nouvelles internationales, offrant une expérience immersive pour suivre les tendances et faits divers. Restez informé, explorez le monde et plongez dans l'actualité en un clic avec GlobePulse.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
