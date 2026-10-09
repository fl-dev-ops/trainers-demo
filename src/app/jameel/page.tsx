import Image from 'next/image'
import Link from 'next/link'
import { JAMEEL } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import { Chat, PlayBox, Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <Image
                src={JAMEEL.face}
                alt={JAMEEL.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
          <span className="badge"><Sparkle />AI twin of {JAMEEL.name} · Demo</span>
          <h1>Meet {JAMEEL.firstName}’s AI Twin</h1>
          <p>Practise for your Demand Planner Job today!</p>
          <MadeFrom youtubeOnly />
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={JAMEEL.face} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
            </div>
            <div className="path-b">
              <div className="row">
                <Link href="/jameel/live" className="btn btn--strong">Meet your twin</Link>
              </div>
            </div>
          </article>
        </div>
        <footer className="trust" aria-label="About Jameel’s demo">
          <div className="tr">
            <PlayBox />
            <div>
              <h3>Demo experience</h3>
              <p>Try Jameel’s AI twin for Demand Planner interview preparation.</p>
            </div>
          </div>
          <div className="tr">
            <Chat />
            <div>
              <h3>Interview practice</h3>
              <p>Prepare for the top 10 frequently asked Demand Planner interview questions.</p>
            </div>
          </div>
          <div className="tr">
            <Sparkle />
            <div>
              <h3>Answer guidance</h3>
              <p>Get tips on answering effectively and impressing your potential employer.</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
