import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Tony's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Tony Latimer about CEO transitions, leadership teams and coaching.",
}

export default function TonyLatimerLayout({ children }: { children: ReactNode }) {
  return children
}
