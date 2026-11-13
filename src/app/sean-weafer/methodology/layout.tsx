import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Seán's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Seán Weafer's AI twin learns from.",
}

export default function SeanWeaferMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
