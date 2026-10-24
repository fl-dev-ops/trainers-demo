import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Johnny · Daniele's practice assistant · Demo · TrainerTwin",
  description: "English for IT professionals: practise meetings, presentations and interviews with Johnny, Daniele Ponzo's AI practice assistant.",
  robots: { index: false, follow: false },
}

export default function JohnnyDanieleLayout({ children }: { children: ReactNode }) {
  return children
}
