import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Marcus's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Marcus Cauchi's AI twin learns from.",
}

export default function MarcusCauchiMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
