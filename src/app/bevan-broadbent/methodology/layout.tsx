import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Bevan's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Bevan Broadbent's AI twin learns from.",
}

export default function BevanBroadbentMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
