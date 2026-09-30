'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SCENARIOS, TWIN } from '@/data.js'
import SourcesDrawer from '@/components/SourcesDrawer.jsx'
import RemoveDialog from '@/components/RemoveDialog.jsx'
import { Eye, Instagram, LinkedIn, Play, PlayBox, Shield, Sparkle, Trash, XLogo, YouTube } from '@/components/Icons.jsx'

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
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill"><Instagram />Instagram</span>
            <span className="srcpill">X (Twitter)</span>
          </div>
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
                <Link href="/trainers/olga/meet" className="btn btn--strong">Meet your twin</Link>
                <span className="meta">1 min</span>
              </div>
            </div>
          </article>

          <article className="path">
            <div className="peek peek--rps">
              <span className="peek-k">{SCENARIOS.length} role plays from your videos</span>
              <div className="rprows">
                {SCENARIOS.map((s) => (
                  <Link key={s.id} href={`/trainers/olga/live?s=${s.id}`} className="rprow" aria-label={'Start the role play: ' + s.title}>
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
                <Link href={`/trainers/olga/live?s=${SCENARIOS[0].id}`} className="btn btn--strong">Start a role play</Link>
                <span className="meta">{SCENARIOS.length} scenarios · about 2 min each</span>
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
      {showRemove && <RemoveDialog onCancel={closeRemove} onConfirm={() => router.push('/trainers/olga/removed')} />}
    </section>
  )
}
