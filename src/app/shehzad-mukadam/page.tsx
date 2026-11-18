import Image from 'next/image'
import Link from 'next/link'
import { SHEHZAD_MUKADAM } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { Instagram, LinkedIn, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'My team loved the training, but three weeks later nothing has changed. Why?',
  'My best salesperson just became a sales manager and is struggling. What should I do?',
]

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Shehzad's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'this-won-t-sell-in-my-store',
    title: 'This won’t sell in my store',
    coachee: { role: 'Field sales representative', text: 'A field sales representative for a consumer goods supplier, introducing a premium range to a store manager who has said no before.', practises: ['Asking before assuming', 'Reframing, not pushing'] },
    persona: { role: 'Store Manager', name: 'Faisal Hamdan', photo: '/media/shehzad-roleplay-faisal.jpg', behaviour: ['Warm but Cautious'], speaking: ['Casual', 'Medium answers'], voice: 'Ethan', text: 'Runs a busy supermarket in Sharjah with fourteen years in retail. Friendly but short on time, and wary of anything that adds stock he has to explain or write off.' },
  },
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={SHEHZAD_MUKADAM.face} alt={SHEHZAD_MUKADAM.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {SHEHZAD_MUKADAM.name} · Demo</span>
          <h1>Meet {SHEHZAD_MUKADAM.firstName}’s AI Twin</h1>
          <p>Ask {SHEHZAD_MUKADAM.firstName}’s AI twin about sales training that sticks, leading managers, handling objections and building trust with clients.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill"><Instagram />Instagram</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <TwinNotebook trainer={{ ...SHEHZAD_MUKADAM, portrait: SHEHZAD_MUKADAM.face }} livePath="/shehzad-mukadam/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {SHEHZAD_MUKADAM.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/shehzad-mukadam/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{SHEHZAD_MUKADAM.room.kind}</span>
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
        <TrustFooter twin={SHEHZAD_MUKADAM} />
      </div>
    </section>
  )
}
