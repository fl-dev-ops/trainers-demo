'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { OLGA_AMA, SCENARIOS, TWIN } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import SourcesDrawer from '@/components/SourcesDrawer.jsx'
import RemoveDialog from '@/components/RemoveDialog.jsx'
import { Eye, Play, PlayBox, Shield, Sparkle, Trash, XLogo } from '@/components/Icons.jsx'

const DASH = 'https://dash.trainertwin.216.48.181.196.nip.io/agents/'

/* Olga's role plays on the role-play dashboard (situations rewritten in the third person from the scenarios). */
const ROLE_PLAYS = [
  {
    slug: 'sales-options-collector',
    title: 'The options-collector who ghosts',
    persona: 'Priya Shah',
    face: '/media/olga-roleplay-priya.jpg',
    situation: 'Priya is a 36-year-old NHS pharmacist from Manchester. Two days ago she clicked an Instagram ad for a Dubai off-plan project. She has spoken to several other agents this week and her WhatsApp is full of brochures. It would be her first investment property. She is busy and brisk, and keeps asking the agent to just send some options, the price and the payment plan.',
  },
  {
    slug: 'sales-wait-and-see-investor',
    title: 'The wait-and-see investor',
    persona: 'Daniel Hart',
    face: '/media/olga-roleplay-daniel.jpg',
    situation: 'Daniel is 44, from London, and works in finance operations. He enquired about an off-plan project seven months ago and put it on hold. He has about AED 1 million in savings he calls safe. He keeps hearing negative news, thinks the market looks oversupplied, and says he will wait for prices to hit the bottom, or maybe buy gold.',
  },
]

export default function Welcome() {
  const router = useRouter()
  const [showSources, setShowSources] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const closeSources = useCallback(() => setShowSources(false), [])
  const closeRemove = useCallback(() => setShowRemove(false), [])

  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <div className="mono" aria-hidden="true"><span>{TWIN.initials}</span></div>
          <span className="badge"><Sparkle />AI twin of {TWIN.name} · Draft</span>
          <h1>Your twin is ready, {TWIN.firstName}.</h1>
          <MadeFrom />
        </div>

        <div className="paths">
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <img src={TWIN.poster} alt="" />
              <span className="peek-k">Your twin is waiting</span>
              <span className="tag"><Eye />Meet to reveal</span>
            </div>
            <div className="path-b">
              <h2>Meet your video twin</h2>
              <p>Use your twin to share content with your agents.</p>
              <div className="row">
                <Link href="/olga/meet" className="btn btn--strong">Meet your twin</Link>
                <span className="meta">1 min</span>
              </div>
            </div>
          </article>

          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask your twin</span>
              <div className="rprows">
                <Link href={{ pathname: '/olga/live', query: { s: OLGA_AMA.id, mode: 'ama' } }} className="rprow" aria-label="Ask me anything">
                  <span className="cl" aria-hidden="true">{OLGA_AMA.initials}</span>
                  <span className="q">{OLGA_AMA.quote}</span>
                  <img className="tw" src={TWIN.face} alt="" />
                  <span className="pl" aria-hidden="true"><Play /></span>
                </Link>
                {SCENARIOS.map((s) => (
                  <Link key={s.id} href={{ pathname: '/olga/live', query: { s: s.id, q: s.ask } }} className="rprow" aria-label={'Ask: ' + s.title}>
                    <span className="cl" aria-hidden="true">{s.initials}</span>
                    <span className="q">{s.quote}</span>
                    <img className="tw" src={TWIN.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Meet your interactive twin</h2>
              <p>Where your agents practise with you. Customise, tweak and personalise it anytime.</p>
              <div className="row">
                <Link href={`/olga/live?s=${SCENARIOS[0].id}`} className="btn btn--strong">Start a role play</Link>
                <span className="meta">{SCENARIOS.length} scenarios · about 2 min each</span>
              </div>
            </div>
          </article>

          <article className="path path--wide">
            <div className="peek peek--wrap peek--scn">
              <span className="peek-k">Role play</span>
              <div className="scn-grid">
                {ROLE_PLAYS.map((r) => (
                  <div key={r.slug} className="scn">
                    <h3 className="scn-t">{r.title}</h3>
                    <span className="scn-k">Client persona</span>
                    <div className="scn-p">
                      <img src={r.face} alt="" />
                      <span>{r.persona}</span>
                    </div>
                    <span className="scn-k">Situation</span>
                    <p>{r.situation}</p>
                    <div className="row">
                      <a href={DASH + r.slug} target="_blank" rel="noopener noreferrer" className="btn btn--strong">Start this role play</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Practise with AI clients</h2>
              <p>Your agents practise real client conversations with AI clients, then get a score and feedback after each call.</p>
              <div className="row">
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>

        <div className="trust">
          <div className="tr">
            <PlayBox />
            <div>
              <h3>Only your public content</h3>
              <p className="num">108&nbsp;videos · 211&nbsp;Shorts · 665&nbsp;LinkedIn&nbsp;posts · 32&nbsp;Instagram&nbsp;posts · 2&nbsp;X&nbsp;posts</p>
              <button type="button" className="linkbtn" onClick={() => setShowSources(true)}>See every source</button>
            </div>
          </div>
          <div className="tr">
            <Shield />
            <div>
              <h3>Your IP stays yours</h3>
              <p>Only you can see it until you approve.</p>
            </div>
          </div>
          <div className="tr">
            <Trash />
            <div>
              <h3>Don't want it?</h3>
              <button type="button" className="linkbtn linkbtn--danger" onClick={() => setShowRemove(true)}>Remove my twin</button>
            </div>
          </div>
        </div>
      </div>
      {showSources && <SourcesDrawer onClose={closeSources} />}
      {showRemove && <RemoveDialog onCancel={closeRemove} onConfirm={() => router.push('/olga/removed')} />}
    </section>
  )
}
