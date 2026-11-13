import Image from 'next/image'
import Link from 'next/link'
import { TONY_LATIMER } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { Sparkle } from '@/components/Icons.jsx'

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
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/tony-latimer-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {TONY_LATIMER.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/tony-latimer/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={TONY_LATIMER} livePath="/tony-latimer/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {TONY_LATIMER.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/tony-latimer/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{TONY_LATIMER.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'New CEO', text: 'A newly appointed CEO, three weeks in, meeting the CFO one-to-one for the first time.', practises: ['Asking, not directing', 'Building the leadership team'] }}
              persona={{ role: 'Chief Financial Officer', name: 'Nadia Rahman', photo: '/media/tony-roleplay-nadia.jpg', behaviour: ['Skeptical & Reserved'], speaking: ['Formal', 'Medium answers'], voice: 'Olivia', text: 'CFO in Singapore with twelve years at the company. Composed, precise and guarded. Has prepared the numbers the new CEO asked for, and answers what is asked and no more.' }}
            />
            <div className="path-b">
              <h2>Your first one-to-one as the new CEO</h2>
              <div className="row">
                <a href="https://dash.roleplay.foreverlearning.in/agents/your-first-one-to-one-as-the-new-ceo" target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={TONY_LATIMER} />
      </div>
    </section>
  )
}
