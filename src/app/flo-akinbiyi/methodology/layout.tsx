import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Flo's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Flo Akinbiyi's AI twin learns from.",
}

export default function FloAkinbiyiMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
