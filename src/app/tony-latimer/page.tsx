import Image from 'next/image'
import Link from 'next/link'
import { TONY_LATIMER } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Play, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I have just been appointed CEO. What matters most in my first 90 days?',
  'How do I know if I have the right leadership team?',
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={TONY_LATIMER.face} alt={TONY_LATIMER.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {TONY_LATIMER.name} · Demo</span>
          <h1>Meet {TONY_LATIMER.firstName}’s AI Twin</h1>
          <p>Ask {TONY_LATIMER.firstName}’s AI twin about stepping into a CEO or senior leadership role, building a leadership team and coaching.</p>
          <MadeFrom x={false} />
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/tony-latimer/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={TONY_LATIMER.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {TONY_LATIMER.firstName}’s twin live</h2>
              <p>Talk to {TONY_LATIMER.firstName}’s twin using your mic and camera, and ask about your role or transition.</p>
              <div className="row">
                <Link href="/tony-latimer/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{TONY_LATIMER.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={TONY_LATIMER} />
      </div>
    </section>
  )
}
