import Image from 'next/image'
import Link from 'next/link'
import { ANTONI } from '@/data.js'
import { Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={ANTONI.face} alt={ANTONI.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {ANTONI.name} · Demo</span>
          <h1>Meet {ANTONI.firstName}’s AI Twin</h1>
          <p>Have a live conversation with {ANTONI.firstName}’s AI twin.</p>
        </div>
        <div className="paths">
          <article className="path">
            <div className="path-b">
              <h2>Meet the interactive twin</h2>
              <p>Talk to {ANTONI.firstName}’s twin using your mic and camera.</p>
              <div className="row">
                <Link href="/antoni/live" className="btn btn--strong">Talk to the twin</Link>
                <span className="meta">{ANTONI.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
