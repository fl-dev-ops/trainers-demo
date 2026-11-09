import Image from 'next/image'
import Link from 'next/link'
import { MARCUS_CAUCHI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Play, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'My pipeline is full of maybes. How do I fix my prospecting?',
  'A buyer says it is not in the budget. What should I do?',
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={MARCUS_CAUCHI.face} alt={MARCUS_CAUCHI.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {MARCUS_CAUCHI.name} · Demo</span>
          <h1>Meet {MARCUS_CAUCHI.firstName}’s AI Twin</h1>
          <p>Ask {MARCUS_CAUCHI.firstName}’s AI twin about prospecting, finding the right customers and selling as your buyer’s ally.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill">Podcast</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={MARCUS_CAUCHI.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {MARCUS_CAUCHI.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {MARCUS_CAUCHI.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/marcus-cauchi/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/marcus-cauchi/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={MARCUS_CAUCHI.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {MARCUS_CAUCHI.firstName}’s twin live</h2>
              <p>Talk to {MARCUS_CAUCHI.firstName}’s twin using your mic and camera, and ask about your pipeline, your buyers or your sales team.</p>
              <div className="row">
                <Link href="/marcus-cauchi/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{MARCUS_CAUCHI.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={MARCUS_CAUCHI} />
      </div>
    </section>
  )
}
