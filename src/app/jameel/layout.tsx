import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Jameel's AI Twin · Demo · TrainerTwin",
  description: "Practise for your Demand Planner job interview with Jameel's AI twin demo.",
}

export default function JameelLayout({ children }: { children: ReactNode }) {
  return children
}
