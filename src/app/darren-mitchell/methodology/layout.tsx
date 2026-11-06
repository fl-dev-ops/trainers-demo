import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Darren's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Darren Mitchell's AI twin learns from.",
}

export default function DarrenMitchellMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
