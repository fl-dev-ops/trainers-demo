import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Darren's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Darren Mitchell about leading a sales team, coaching salespeople and building a sales culture.",
}

export default function DarrenMitchellLayout({ children }: { children: ReactNode }) {
  return children
}
