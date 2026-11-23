import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Aishwarya's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Aishwarya Reganti about building AI products, evals, agents and AI engineering, by text, voice or video, or inside Slack.",
}

export default function AishwaryaRegantiLayout({ children }: { children: ReactNode }) {
  return children
}
