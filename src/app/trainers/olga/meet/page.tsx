'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { TWIN } from '@/data.js'
import { ChevronLeft, Play, Sparkle, VideoCam } from '@/components/Icons.jsx'

export default function Meet() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    videoRef.current?.play().catch(() => {})
  }

  return (
    <section className="wrap">
      <div className="fold meet3">
        <div className="vplayer m3v">
          <video
            ref={videoRef}
            src={TWIN.video}
            poster={TWIN.poster}
            controls={started}
            playsInline
            preload="metadata"
            onPlay={() => setStarted(true)}
          />
          {/*<span className="vtag"><Sparkle />AI twin of {TWIN.name}</span>*/}
          {!started && (
            <button type="button" className="bigplay" aria-label="Play video" onClick={play}><Play /></button>
          )}
        </div>
        <div className="m3r">
          <div className="m3h">
            <Link href="/trainers/olga" className="back"><ChevronLeft />Back</Link>
            <span className="kind"><VideoCam />Video · made by your twin</span>
            <h1>Hi {TWIN.firstName}. I'm your twin.</h1>
            <p>I learned how you teach from your YouTube, LinkedIn and Instagram. Press play to meet me.</p>
          </div>
          <div className="m3cta">
            <p><b>Want me to sound even more like you?</b></p>
            <button type="button" className="btn btn--strong">Tweak me further</button>
          </div>
        </div>
      </div>
    </section>
  )
}
