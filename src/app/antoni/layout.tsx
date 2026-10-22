import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Antoni's AI Twin · Demo · TrainerTwin",
  description: "Practise your pitch with the AI twin of Antoni Lacinai, keynote speaker and communication coach.",
}

export default function AntoniLayout({ children }: { children: ReactNode }) {
  return children
}
