import Image from 'next/image'
import Link from 'next/link'
import { ANTONI } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Play, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'How do I give tough feedback without hurting the relationship?',
  'How do I keep a room’s attention when I present?',
]

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
          <MadeFrom x={false} />
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask {ANTONI.firstName}’s twin anything</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href="/antoni/live" className="rprow" aria-label={'Ask the twin: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={ANTONI.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
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
        <TrustFooter twin={ANTONI} />
      </div>
    </section>
  )
}
