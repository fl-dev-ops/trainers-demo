import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Antoni's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Antoni Lacinai's AI twin learns from.",
}

export default function AntoniMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
