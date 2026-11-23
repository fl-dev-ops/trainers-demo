import Image from 'next/image'
import Link from 'next/link'
import { AISHWARYA_REGANTI } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Sparkle } from '@/components/Icons.jsx'
import SlackDemo from './SlackDemo.jsx'

const STEPS = [
  ['Add the app', 'Install Aishwarya’s twin in your Slack workspace and invite it to the channels where your team talks about AI.'],
  ['Mention it or DM it', 'Ask @Aishwarya’s twin in any channel and it answers in a thread, so follow-up questions keep their context. Or send it a direct message.'],
  ['Answers in her words', 'It answers only from Aishwarya’s own posts and videos. When a question is outside what she has covered, it says so and points to her.'],
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={AISHWARYA_REGANTI.face} alt={AISHWARYA_REGANTI.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {AISHWARYA_REGANTI.name} · Demo</span>
          <h1>Ask {AISHWARYA_REGANTI.firstName}’s AI Twin in Slack</h1>
          <p>Bring {AISHWARYA_REGANTI.firstName}’s thinking on AI engineering, evals, agents and AI careers into the place your team already asks questions.</p>
          <MadeFrom youtubeOnly linkedin />
        </div>

        <SlackDemo />

        <div className="slk-steps">
          {STEPS.map(([title, text], i) => (
            <div key={title} className="slk-step">
              <span className="slk-step-n num">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 560 }}>
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/aishwarya-reganti-pyramid.jpg" alt="" />
              <span className="peek-k">Teaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your teaching method, which the twin learns from</h2>
              <p>See how the twin was built from {AISHWARYA_REGANTI.firstName}’s teaching, layer by layer.</p>
              <div className="row">
                <Link href="/aishwarya-reganti/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
        </div>

        <TrustFooter twin={AISHWARYA_REGANTI} />
      </div>
    </section>
  )
}
