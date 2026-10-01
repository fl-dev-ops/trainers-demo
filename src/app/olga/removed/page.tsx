'use client'

import { Check } from '@/components/Icons.jsx'

export default function Removed() {
  return (
    <section className="wrap">
      <div className="done">
        <span className="ic"><Check /></span>
        <h1>Your twin has been removed.</h1>
        <p>We've deleted your twin and everything we collected. A confirmation is on its way to you.</p>
      </div>
    </section>
  )
}
