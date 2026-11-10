import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Bevan's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Bevan Broadbent, a founder coach, about delegation, trust, self-doubt and the problem behind the problem.",
}

export default function BevanBroadbentLayout({ children }: { children: ReactNode }) {
  return children
}
