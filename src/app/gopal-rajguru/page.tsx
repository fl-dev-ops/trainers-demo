import Image from 'next/image'
import Link from 'next/link'
import { GOPAL_RAJGURU } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'Procurement keeps pushing me for a bigger discount. What do I do?',
  'How do I give my team feedback that actually lands?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/hold-your-price-with-procurement'


export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={GOPAL_RAJGURU.face} alt={GOPAL_RAJGURU.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {GOPAL_RAJGURU.name} · Demo</span>
          <h1>Meet {GOPAL_RAJGURU.firstName}’s AI Twin</h1>
          <p>Ask {GOPAL_RAJGURU.firstName}’s AI twin about B2B selling, the customer’s buying journey, negotiation and giving feedback as a leader.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Website</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/gopal-rajguru-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {GOPAL_RAJGURU.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/gopal-rajguru/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={GOPAL_RAJGURU} livePath="/gopal-rajguru/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {GOPAL_RAJGURU.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/gopal-rajguru/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{GOPAL_RAJGURU.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Account manager', text: 'A supplier’s account manager whose proposal is 15 percent above two cheaper offers.', practises: ['Holding the price', 'Trading value for value'] }}
              persona={{ role: 'Procurement Manager', name: 'Peter Brunner', photo: '/media/gopal-roleplay-peter.jpg', behaviour: ['Skeptical & Reserved'], speaking: ['Formal', 'Short answers'], voice: 'Oliver', text: 'Procurement Manager at a mid-sized construction contractor, with 20 years’ experience. Has bought standard ready-mix concrete from the same supplier for years. Polite, direct, short on time and measured on documented savings.' }}
            />
            <div className="path-b">
              <h2>Hold your price with procurement</h2>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={GOPAL_RAJGURU} />
      </div>
    </section>
  )
}
