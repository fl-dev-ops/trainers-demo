import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Jameel's Twin · TrainerTwin",
  description: "Practise client conversations with Jameel's AI training twin.",
}

export default function JameelLayout({ children }: { children: ReactNode }) {
  return children
}
