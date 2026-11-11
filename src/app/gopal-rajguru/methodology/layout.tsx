import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "How Gopal's Twin Learns · Demo · TrainerTwin",
  description: "See the coaching methodology Gopal RajGuru's AI twin learns from.",
}

export default function GopalRajguruMethodologyLayout({ children }: { children: ReactNode }) {
  return children
}
