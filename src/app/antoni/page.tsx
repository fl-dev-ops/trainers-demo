import Image from 'next/image'
import Link from 'next/link'
import { ANTONI } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { TwinNotebook } from '@/components/ProfileCards.jsx'
import { Sparkle } from '@/components/Icons.jsx'

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
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/antoni-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {ANTONI.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/antoni/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={ANTONI} livePath="/antoni/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Practise your pitch live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/antoni/live" className="btn btn--strong card-link">Start practising</Link>
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
