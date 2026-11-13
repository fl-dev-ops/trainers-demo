import Image from 'next/image'
import Link from 'next/link'
import { FLO_AKINBIYI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I freeze right before I walk on stage. What do I do?',
  'How do I make my presentation memorable?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/five-minutes-with-a-distracted-ceo-karim-flo-akinbiyi'


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
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/flo-akinbiyi-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {FLO_AKINBIYI.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/flo-akinbiyi/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={FLO_AKINBIYI} livePath="/flo-akinbiyi/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {FLO_AKINBIYI.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/flo-akinbiyi/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{FLO_AKINBIYI.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Manager', text: 'A manager with five minutes to present a project to the CEO and win his support.', practises: ['Getting to the point', 'Energy and presence'] }}
              persona={{ role: 'CEO', name: 'Karim Haddad', photo: '/media/flo-roleplay-karim.jpg', voice: 'Ethan', text: 'CEO of a 300-person logistics company in Dubai. Between meetings, short on time and attention, and wants the bottom line.' }}
            />
            <div className="path-b">
              <h2>Win five minutes with a busy CEO</h2>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
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
