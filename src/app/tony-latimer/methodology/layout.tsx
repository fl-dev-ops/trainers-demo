import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Tony's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Tony Latimer's AI twin learns from.",
}

export default function TonyLatimerMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
