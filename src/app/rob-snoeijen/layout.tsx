import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Rob's AI Twin · Demo · TrainerTwin",
  description: 'How an AI twin of Rob Snoeijen, sales trainer and author of Sales-ABC, learns his sales method, and a role play built on it.',
  robots: { index: false, follow: false },
}

export default function RobSnoeijenLayout({ children }: { children: ReactNode }) {
  return children
}
