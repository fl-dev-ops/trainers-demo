import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Olga's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Olga Sinenko's AI twin learns from.",
}

export default function OlgaMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
