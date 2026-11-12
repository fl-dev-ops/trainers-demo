import Image from 'next/image'
import Link from 'next/link'
import { SEAN_WEAFER } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'My clients like me, but they don’t give me all their work. Why?',
  'How do I answer “what do you do?” without sounding salesy?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/we-already-have-an-accountant'


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
          <article className="path path--wide">
            <TwinNotebook trainer={SEAN_WEAFER} livePath="/sean-weafer/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {SEAN_WEAFER.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/sean-weafer/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{SEAN_WEAFER.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Accountant', text: 'A partner at a small accounting firm, meeting a business owner for coffee after a business breakfast.', practises: ['Raising the pain first', 'Shaping the next step together'] }}
              persona={{ role: 'Managing Director', name: 'Niamh Kelly', photo: '/media/sean-roleplay-niamh.jpg', behaviour: ['Skeptical & Reserved'], speaking: ['Casual', 'Short answers'], voice: 'Charlotte', text: 'Managing Director of a family-owned food distribution business in Dublin with about 40 staff. Already has an accountant, and has been oversold by advisers before.' }}
            />
            <div className="path-b">
              <h2>We already have an accountant</h2>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={SEAN_WEAFER} />
      </div>
    </section>
  )
}
