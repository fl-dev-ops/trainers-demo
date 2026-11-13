import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Seán's AI Twin · Demo · TrainerTwin",
  description: "Ask the AI twin of Seán Weafer, a sales and leadership mentor, about business development, client conversations and becoming a highly trusted advisor.",
  robots: { index: false, follow: false },
}

export default function SeanWeaferLayout({ children }: { children: ReactNode }) {
  return children
}
