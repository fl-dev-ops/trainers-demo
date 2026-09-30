import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Olga's Twin · TrainerTwin",
  description: 'Meet the AI twin of Olga Sinenko, built from her public teaching content.',
}

export default function OlgaLayout({ children }: { children: ReactNode }) {
  return children
}
