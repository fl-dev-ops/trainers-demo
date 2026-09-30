import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '../styles.css'
import AppBar from '../components/AppBar.jsx'

export const metadata: Metadata = {
  title: "Olga's Twin · TrainerTwin",
  description: 'Meet the AI twin of Olga Sinenko, built from her public teaching content.',
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap" />
      </head>
      <body>
        <AppBar>{children}</AppBar>
      </body>
    </html>
  )
}
