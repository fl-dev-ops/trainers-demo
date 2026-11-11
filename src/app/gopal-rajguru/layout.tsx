import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Gopal's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Gopal RajGuru, a sales, leadership and negotiation coach, about B2B selling, negotiation and leadership.",
}

export default function GopalRajguruLayout({ children }: { children: ReactNode }) {
  return children
}
