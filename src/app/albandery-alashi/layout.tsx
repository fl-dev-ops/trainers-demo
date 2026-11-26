import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Albandery's coaching method · Demo · TrainerTwin",
  description: 'How an AI twin of Albandery Alashi, presentation, communication and influence trainer in Riyadh, learns her training method.',
  robots: { index: false, follow: false },
}

export default function AlbanderyAlashiLayout({ children }: { children: ReactNode }) {
  return children
}
