import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Marcus's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Marcus Cauchi about prospecting, finding the right customers and selling as your buyer's ally.",
}

export default function MarcusCauchiLayout({ children }: { children: ReactNode }) {
  return children
}
