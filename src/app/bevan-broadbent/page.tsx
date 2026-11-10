import Image from 'next/image'
import Link from 'next/link'
import { BEVAN_BROADBENT } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Play, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I know I should delegate more, but I just don’t. Why?',
  'I keep feeling like I’ll be found out. What do I do?',
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={BEVAN_BROADBENT.face} alt={BEVAN_BROADBENT.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {BEVAN_BROADBENT.name} · Demo</span>
          <h1>Meet {BEVAN_BROADBENT.firstName}’s AI Twin</h1>
          <p>Ask {BEVAN_BROADBENT.firstName}’s AI twin about letting go, trusting your team, self-doubt and the problem behind the problem.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Client videos</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={BEVAN_BROADBENT.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {BEVAN_BROADBENT.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {BEVAN_BROADBENT.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/bevan-broadbent/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/bevan-broadbent/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={BEVAN_BROADBENT.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {BEVAN_BROADBENT.firstName}’s twin live</h2>
              <p>Talk to {BEVAN_BROADBENT.firstName}’s twin using your mic and camera, and ask about your team, your doubts or what keeps not happening.</p>
              <div className="row">
                <Link href="/bevan-broadbent/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{BEVAN_BROADBENT.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={BEVAN_BROADBENT} />
      </div>
    </section>
  )
}
