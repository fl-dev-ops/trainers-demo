'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { OLGA_AMA, SCENARIOS, TWIN } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import SourcesDrawer from '@/components/SourcesDrawer.jsx'
import RemoveDialog from '@/components/RemoveDialog.jsx'
import { PlayBox, Shield, Sparkle, Trash } from '@/components/Icons.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Olga's role plays on the role-play dashboard, as portrait cards (Gopal's page is the standard). Third person. */
const ROLE_PLAYS = [
  {
    slug: 'sales-options-collector',
    title: 'Win back the options-collector',
    coachee: { role: 'Property agent', text: 'An agent whose new lead keeps asking for options, then goes quiet.', practises: ['Handling “send me options”', 'Getting a real conversation'] },
    persona: { role: 'Investor', name: 'Priya Shah', photo: '/media/olga-roleplay-priya.jpg', text: 'Priya is a 36-year-old NHS pharmacist from Manchester. She clicked an Instagram ad for a Dubai off-plan project, has spoken to several agents this week and keeps asking for options, the price and the payment plan. It would be her first investment property.' },
  },
  {
    slug: 'sales-wait-and-see-investor',
    title: 'Move the wait-and-see investor',
    coachee: { role: 'Property agent', text: 'An agent following up a lead who put his purchase on hold months ago.', practises: ['Handling “I’ll wait”', 'Market objections'] },
    persona: { role: 'Investor', name: 'Daniel Hart', photo: '/media/olga-roleplay-daniel.jpg', text: 'Daniel is 44, from London, and works in finance operations. He has about AED 1 million in savings he calls safe, thinks the market looks oversupplied, and says he will wait for prices to hit the bottom, or maybe buy gold.' },
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
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/olga-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how your twin was built from your coaching, layer by layer.</p>
              <div className="row">
                <Link href="/olga/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>

          <article className="path">
            <TwinNotebook
              trainer={TWIN}
              livePath="/olga/live"
              notes={[
                { label: 'Ask me anything', query: { s: OLGA_AMA.id, mode: 'ama' } },
                ...SCENARIOS.map((s) => ({ label: s.ask, query: { s: s.id, q: s.ask } })),
              ]}
            />
            <div className="path-b">
              <h2>Ask {TWIN.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href={{ pathname: '/olga/live', query: { s: OLGA_AMA.id, mode: 'ama' } }} className="btn btn--strong card-link">Start asking</Link>
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
