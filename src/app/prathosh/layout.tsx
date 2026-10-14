import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Prathosh's AI Twin · Demo · TrainerTwin",
  description: "Ask Prathosh's AI twin your doubts on his NPTEL course, Mathematical Foundations of Machine Learning.",
}

export default function PrathoshLayout({ children }: { children: ReactNode }) {
  return children
}
