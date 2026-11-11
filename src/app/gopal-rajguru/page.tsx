import Image from 'next/image'
import Link from 'next/link'
import { GOPAL_RAJGURU } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Play, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'Procurement keeps pushing me for a bigger discount. What do I do?',
  'How do I give my team feedback that actually lands?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/hold-your-price-with-procurement'

const SITUATION = 'Peter is an AI persona. He is Head of Procurement at a mid-sized Swiss machine manufacturer, running the final negotiation for a new software contract. The person talking to him is the account manager. Their proposal is 15 percent above two cheaper offers, and Peter opens by asking them to bring the price down so he can sign this week. Finance wants him to show savings this year.'

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
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={GOPAL_RAJGURU.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {GOPAL_RAJGURU.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {GOPAL_RAJGURU.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/gopal-rajguru/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                <Link href={{ pathname: '/gopal-rajguru/live', query: { mode: 'ama' } }} className="rprow" aria-label="Ask me anything">
                  <span className="cl" aria-hidden="true">Y</span>
                  <span className="q">Ask me anything</span>
                  <img className="tw" src={GOPAL_RAJGURU.face} alt="" />
                  <span className="pl" aria-hidden="true"><Play /></span>
                </Link>
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/gopal-rajguru/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={GOPAL_RAJGURU.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {GOPAL_RAJGURU.firstName}’s twin live</h2>
              <p>Talk to {GOPAL_RAJGURU.firstName}’s twin using your mic and camera, and ask about a tough deal, a negotiation or how to lead your team.</p>
              <div className="row">
                <Link href="/gopal-rajguru/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{GOPAL_RAJGURU.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <div className="peek peek--wrap peek--scn">
              <span className="peek-k">Role play</span>
              <div className="scn">
                <h3 className="scn-t">Hold your price with procurement</h3>
                <span className="scn-k">Client persona</span>
                <div className="scn-p">
                  <img src="/media/gopal-roleplay-peter.jpg" alt="" />
                  <span>Peter Brunner (Demo for Gopal)</span>
                </div>
                <span className="scn-k">Situation</span>
                <p>{SITUATION}</p>
              </div>
            </div>
            <div className="path-b">
              <h2>Practise holding your price</h2>
              <p>Negotiate with Peter, a procurement head who wants 15 percent off, and hold your price by asking questions and trading value for value.</p>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong">Start the role play</a>
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
