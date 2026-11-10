import Image from 'next/image'
import Link from 'next/link'
import { FLO_AKINBIYI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Play, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I freeze right before I walk on stage. What do I do?',
  'How do I make my presentation memorable?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/five-minutes-with-a-distracted-ceo-karim-flo-akinbiyi'

const SITUATION = 'Karim is an AI persona. He is the CEO of a 300-person logistics company in Dubai. The person talking to him is a manager who has five minutes to present a project and ask for his support. Karim is between meetings, keeps glancing at his phone and cuts in with: what’s the bottom line? He has sat through many flat, slide-heavy updates this week, and today he decides which projects keep their budget.'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={FLO_AKINBIYI.face} alt={FLO_AKINBIYI.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {FLO_AKINBIYI.name} · Demo</span>
          <h1>Meet {FLO_AKINBIYI.firstName}’s AI Twin</h1>
          <p>Ask {FLO_AKINBIYI.firstName}’s AI twin about stage fright, energy and presence, and connecting with people the human-first way.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={FLO_AKINBIYI.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {FLO_AKINBIYI.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {FLO_AKINBIYI.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/flo-akinbiyi/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                <Link href={{ pathname: '/flo-akinbiyi/live', query: { mode: 'ama' } }} className="rprow" aria-label="Ask me anything">
                  <span className="cl" aria-hidden="true">Y</span>
                  <span className="q">Ask me anything</span>
                  <img className="tw" src={FLO_AKINBIYI.face} alt="" />
                  <span className="pl" aria-hidden="true"><Play /></span>
                </Link>
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/flo-akinbiyi/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={FLO_AKINBIYI.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {FLO_AKINBIYI.firstName}’s twin live</h2>
              <p>Talk to {FLO_AKINBIYI.firstName}’s twin using your mic and camera, and ask about your next presentation, your nerves or how to connect with an audience.</p>
              <div className="row">
                <Link href="/flo-akinbiyi/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{FLO_AKINBIYI.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <div className="peek peek--wrap peek--scn">
              <span className="peek-k">Role play</span>
              <div className="scn">
                <h3 className="scn-t">Win five minutes with a busy CEO</h3>
                <span className="scn-k">Client persona</span>
                <div className="scn-p">
                  <img src="/media/flo-roleplay-karim.jpg" alt="" />
                  <span>Karim Haddad (Demo for Flo)</span>
                </div>
                <span className="scn-k">Situation</span>
                <p>{SITUATION}</p>
              </div>
            </div>
            <div className="path-b">
              <h2>Practise presenting to a distracted CEO</h2>
              <p>Present to Karim, a CEO who is short on time and attention, and win his support with energy, clarity and human connection.</p>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={FLO_AKINBIYI} />
      </div>
    </section>
  )
}
