import Image from 'next/image'
import Link from 'next/link'
import { SEAN_WEAFER } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I’m a new partner meeting a prospective client tonight. I’m not a seller. How do I become a trusted advisor?',
  'I freeze when people ask what I do. What do I say?',
]

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Seán's role play on the role-play dashboard (Cathy's #1, picked as the best of four; the others stay on the dashboard). Third person. */
const ROLE_PLAYS = [
  {
    slug: 'the-first-meeting',
    title: 'The first meeting',
    coachee: { role: 'Accountant', text: 'A partner at an accounting firm, in a first meeting with a business owner a contact introduced.', practises: ['The 12-month values question', 'Empathy before engagement'] },
    persona: { role: 'Managing Director', name: 'Declan Byrne', photo: '/media/sean-roleplay-declan.jpg', behaviour: ['Warm but Cautious', 'Skeptical & Reserved'], speaking: ['Casual', 'Short answers'], voice: 'Oliver', text: 'Runs a second-generation family manufacturing business in County Kildare with about 80 staff. It has doubled in size in three years, and he has met plenty of advisers.' },
  },
]


export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={SEAN_WEAFER.face} alt={SEAN_WEAFER.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {SEAN_WEAFER.name} · Demo</span>
          <h1>Meet {SEAN_WEAFER.firstName}’s AI Twin</h1>
          <p>Ask {SEAN_WEAFER.firstName}’s AI twin about business development, client conversations, building trust and leading a sales team.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill">Podcast</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Website</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/sean-weafer-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {SEAN_WEAFER.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/sean-weafer/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...SEAN_WEAFER, portrait: SEAN_WEAFER.face }} livePath="/sean-weafer/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {SEAN_WEAFER.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/sean-weafer/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{SEAN_WEAFER.room.kind}</span>
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
        <TrustFooter twin={SEAN_WEAFER} />
      </div>
    </section>
  )
}
