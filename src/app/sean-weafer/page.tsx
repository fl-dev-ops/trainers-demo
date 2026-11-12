import Image from 'next/image'
import Link from 'next/link'
import { SEAN_WEAFER } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Play, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'My clients like me, but they don’t give me all their work. Why?',
  'How do I answer “what do you do?” without sounding salesy?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/we-already-have-an-accountant'

const SITUATION = 'Niamh is an AI persona. She is Managing Director of a family-owned food distribution business in Dublin with about 40 staff. She met the accountant briefly at a business breakfast and agreed to a 20-minute coffee. She already has an accountant and doesn’t see why she would need another one.'

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
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                <Link href={{ pathname: '/sean-weafer/live', query: { mode: 'ama' } }} className="rprow" aria-label="Ask me anything">
                  <span className="cl" aria-hidden="true">Y</span>
                  <span className="q">Ask me anything</span>
                  <img className="tw" src={SEAN_WEAFER.face} alt="" />
                  <span className="pl" aria-hidden="true"><Play /></span>
                </Link>
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/sean-weafer/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={SEAN_WEAFER.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {SEAN_WEAFER.firstName}’s twin live</h2>
              <p>Talk to {SEAN_WEAFER.firstName}’s twin using your mic and camera, and ask about a client, a deal or a conversation you find awkward.</p>
              <div className="row">
                <Link href="/sean-weafer/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{SEAN_WEAFER.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--wrap peek--scn">
              <span className="peek-k">Role play</span>
              <div className="scn">
                <h3 className="scn-t">We already have an accountant</h3>
                <span className="scn-k">Client persona</span>
                <div className="scn-p">
                  <img src="/media/sean-roleplay-niamh.jpg" alt="" />
                  <span>Niamh Kelly (Demo for Sean)</span>
                </div>
                <span className="scn-k">Situation</span>
                <p>{SITUATION}</p>
              </div>
            </div>
            <div className="path-b">
              <h2>Practise turning a coffee into a client</h2>
              <p>Meet Niamh, a business owner who already has an accountant, and win a next step by raising her pain with a question and shaping the solution with her.</p>
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
