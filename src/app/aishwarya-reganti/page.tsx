import Image from 'next/image'
import Link from 'next/link'
import { AISHWARYA_REGANTI } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { Sparkle } from '@/components/Icons.jsx'
import SlackDemo from './SlackDemo.jsx'

const STEPS = [
  ['Add the app', 'Install Aishwarya’s twin in your Slack workspace and invite it to the channels where your team talks about AI.'],
  ['Mention it', 'Ask @Aishwarya’s twin in any channel and it answers in a thread, so follow-up questions keep their context.'],
  ['Answers in her words', 'It answers only from Aishwarya’s own posts and videos. When a question is outside what she has covered, it says so and points to her.'],
]

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Aishwarya's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'hand-the-ticket-queue-to-ai',
    title: 'Hand the ticket queue to AI?',
    coachee: { role: 'Support analyst', text: 'A support operations analyst at a mid-sized online retailer, with ten minutes to propose which parts of the ticket workflow AI should handle and where people still review.', practises: ['Choosing what AI handles', 'Keeping people in the loop'] },
    persona: { role: 'Support Team Lead', name: 'Rachel Brooks', photo: '/media/aishwarya-roleplay-rachel.jpg', behaviour: ['Skeptical & Reserved'], speaking: ['Casual', 'Medium answers'], text: 'Support Team Lead in Manchester with a team of eight agents. Practical, protective of her team and her customers, and tired of tools that promise a lot. She wants numbers and plain answers.' },
  },
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
          <h1>Meet {AISHWARYA_REGANTI.firstName}’s AI Twin</h1>
          <p>Ask {AISHWARYA_REGANTI.firstName}’s AI twin about building AI products that work in production, evals, AI agents and getting into AI engineering.</p>
          <MadeFrom youtubeOnly linkedin />
        </div>

        <div className="paths">
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
          <article className="path">
            <TwinNotebook trainer={{ ...AISHWARYA_REGANTI, portrait: AISHWARYA_REGANTI.face }} livePath="/aishwarya-reganti/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {AISHWARYA_REGANTI.firstName}’s twin live</h2>
              <p>Choose how to talk with {AISHWARYA_REGANTI.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/aishwarya-reganti/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{AISHWARYA_REGANTI.room.kind}</span>
              </div>
            </div>
          </article>
          {ROLE_PLAYS.map((r) => (
            <article key={r.slug} className="path path--wide">
              <RoleplayPair coachee={r.coachee} persona={r.persona} />
              <div className="path-b">
                <h2>{r.title}</h2>
                <div className="row">
                  <a href={DASH + r.slug} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                  <span className="meta">Opens the role-play app</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="slk-more">
          <h2>Also in Slack</h2>
          <p>The same twin can answer in the place your team already asks questions.</p>
          <div className="slk-wrap--small">
            <SlackDemo />
          </div>
          <div className="slk-steps">
            {STEPS.map(([title, text], i) => (
              <div key={title} className="slk-step">
                <span className="slk-step-n num">{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <TrustFooter twin={AISHWARYA_REGANTI} />
      </div>
    </section>
  )
}
