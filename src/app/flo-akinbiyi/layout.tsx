import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Flo's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Flo Akinbiyi, a communication coach and TEDx speaker, about stage fright, energy, presence and human-first communication.",
}

export default function FloAkinbiyiLayout({ children }: { children: ReactNode }) {
  return children
}
