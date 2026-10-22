import Image from 'next/image'
import Link from 'next/link'
import { ANTONI } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Play, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I’m pitching to investors next week. Can you help me practise?',
  'I have a big customer presentation coming up. Can we rehearse it?',
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
          <p>Practise your pitch with {ANTONI.firstName}’s AI twin and get feedback the way he gives it.</p>
          <MadeFrom x={false} />
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Start your practice</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/antoni/live', query: { q } }} className="rprow" aria-label={'Start practising: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={ANTONI.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Practise your pitch live</h2>
              <p>Pitch to {ANTONI.firstName}’s twin using your mic and camera, then try again with his feedback.</p>
              <div className="row">
                <Link href="/antoni/live" className="btn btn--strong">Start practising</Link>
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
