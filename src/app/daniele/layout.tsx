import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Daniele's AI Twin · Demo · TrainerTwin",
  description: "Talk to the AI twin of Daniele Ponzo.",
}

export default function DanieleLayout({ children }: { children: ReactNode }) {
  return children
}
