import Image from 'next/image'
import Link from 'next/link'
import { MARCUS_CAUCHI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

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
            <span className="srcpill"><LinkedIn />LinkedIn</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/marcus-cauchi-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {MARCUS_CAUCHI.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/marcus-cauchi/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={MARCUS_CAUCHI} livePath="/marcus-cauchi/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {MARCUS_CAUCHI.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/marcus-cauchi/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{MARCUS_CAUCHI.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Account Executive', text: 'A seller on a second call with the CFO about an £80k solution.', practises: ['Handing the objection back', 'The cost of doing nothing'] }}
              persona={{ role: 'CFO', name: 'Graham Pearce', photo: '/media/gopal-roleplay-peter.jpg', behaviour: ['Skeptical & Reserved', 'Direct & Challenging'], speaking: ['Formal', 'Short answers'], voice: 'Oliver', text: 'CFO of a UK software company with about £15M revenue. Signs off every spend above £25k and has seen plenty of projects promise savings that never arrived.' }}
            />
            <div className="path-b">
              <h2>It’s not in the budget</h2>
              <div className="row">
                <a href="https://dash.roleplay.foreverlearning.in/agents/it-s-not-in-the-budget-graham-cfo-marcus-cauchi" target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={MARCUS_CAUCHI} />
      </div>
    </section>
  )
}
