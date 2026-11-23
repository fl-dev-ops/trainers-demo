import Image from 'next/image'
import Link from 'next/link'
import { AISHWARYA_REGANTI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Aishwarya's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'ship-the-ai-agent-on-friday',
    title: 'Ship the AI agent on Friday',
    coachee: { role: 'AI engineering lead', text: 'An AI engineering lead at a mid-sized online travel company, meeting the VP of Product two days before he wants a new AI booking assistant live for every customer.', practises: ['Explaining AI risk in plain words', 'Proposing a staged launch'] },
    persona: { role: 'VP of Product', name: 'Tom Callahan', photo: '/media/aishwarya-roleplay-tom.jpg', behaviour: ['Warm but Cautious'], speaking: ['Casual', 'Medium answers'], text: 'VP of Product at a mid-sized online travel company. Quick, friendly and commercial, he has just shown his board a very successful AI booking assistant demo and wants it live on Friday.' },
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
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Websites</span>
          </div>
        </div>
        <div className="paths">
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
        <TrustFooter twin={AISHWARYA_REGANTI} />
      </div>
    </section>
  )
}
