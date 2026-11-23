import Image from 'next/image'
import Link from 'next/link'
import { COLLY_GRAHAM } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={COLLY_GRAHAM.face} alt={COLLY_GRAHAM.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {COLLY_GRAHAM.name} · Demo</span>
          <h1>Meet {COLLY_GRAHAM.firstName}’s AI Twin</h1>
          <p>Ask {COLLY_GRAHAM.firstName}’s AI twin about brain-based selling, handling objections, discovery questions, your sales mindset and using AI in sales.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Websites</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <TwinNotebook trainer={{ ...COLLY_GRAHAM, portrait: COLLY_GRAHAM.face }} livePath="/colly-graham/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {COLLY_GRAHAM.firstName}’s twin live</h2>
              <p>Choose how to talk with {COLLY_GRAHAM.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/colly-graham/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{COLLY_GRAHAM.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={COLLY_GRAHAM} />
      </div>
    </section>
  )
}
