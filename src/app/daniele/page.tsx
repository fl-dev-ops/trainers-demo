import Image from 'next/image'
import Link from 'next/link'
import { DANIELE } from '@/data.js'
import { Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={DANIELE.face} alt={DANIELE.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {DANIELE.name} · Demo</span>
          <h1>Meet {DANIELE.firstName}’s AI Twin</h1>
          <p>Have a live conversation with {DANIELE.firstName}’s AI twin.</p>
        </div>
        <div className="paths">
          <article className="path">
            <div className="path-b">
              <h2>Meet the interactive twin</h2>
              <p>Talk to {DANIELE.firstName}’s twin using your mic and camera.</p>
              <div className="row">
                <Link href="/daniele/live" className="btn btn--strong">Talk to the twin</Link>
                <span className="meta">{DANIELE.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
