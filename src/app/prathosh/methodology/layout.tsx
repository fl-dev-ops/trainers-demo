import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Prathosh's Twin Learns · Demo · TrainerTwin",
  description: "See the teaching methodology Prathosh A P's AI twin learns from.",
}

export default function PrathoshMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
