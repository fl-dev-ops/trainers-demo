import Image from 'next/image'
import Link from 'next/link'
import { SHELLEY_WALTERS } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={SHELLEY_WALTERS.face} alt={SHELLEY_WALTERS.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {SHELLEY_WALTERS.name} · Demo</span>
          <h1>Meet {SHELLEY_WALTERS.firstName}’s AI Twin</h1>
          <p>Ask {SHELLEY_WALTERS.firstName}’s AI twin about building confidence in sales, managing your pipeline, coaching your sales team and winning bigger B2B deals.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Websites</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/shelley-walters-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {SHELLEY_WALTERS.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/shelley-walters/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...SHELLEY_WALTERS, portrait: SHELLEY_WALTERS.face }} livePath="/shelley-walters/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {SHELLEY_WALTERS.firstName}’s twin live</h2>
              <p>Choose how to talk with {SHELLEY_WALTERS.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/shelley-walters/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{SHELLEY_WALTERS.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={SHELLEY_WALTERS} />
      </div>
    </section>
  )
}
