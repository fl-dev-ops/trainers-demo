import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Jameel's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Jameel Hye's AI twin learns from.",
}

export default function JameelMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
