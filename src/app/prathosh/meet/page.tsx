'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { PRATHOSH as TWIN } from '@/data.js'
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
            <Link href="/prathosh" className="back"><ChevronLeft />Back</Link>
            <span className="kind"><VideoCam />Video · made by your twin</span>
            <h1>Hi, I'm {TWIN.firstName}’s AI twin.</h1>
            <p>I learned how {TWIN.firstName} teaches from his YouTube lectures and LinkedIn posts. Press play to meet me.</p>
          </div>
          <div className="m3cta">
            <p><b>Got a doubt on the course?</b></p>
            <Link href="/prathosh/live" className="btn btn--strong">Ask the twin live</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
