import Image from 'next/image'
import Link from 'next/link'
import { PRATHOSH } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import { Chat, PlayBox, Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={PRATHOSH.face} alt={PRATHOSH.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {PRATHOSH.name} · Demo</span>
          <h1>Meet {PRATHOSH.firstName}’s AI Twin</h1>
          <p>Clear your doubts on Mathematical Foundations of Machine Learning today!</p>
          <MadeFrom youtubeOnly />
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={PRATHOSH.face} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
            </div>
            <div className="path-b">
              <div className="row">
                <Link href="/prathosh/live" className="btn btn--strong">Meet your twin</Link>
              </div>
            </div>
          </article>
        </div>
        <footer className="trust" aria-label="About Prathosh’s demo">
          <div className="tr">
            <PlayBox />
            <div>
              <h3>Demo experience</h3>
              <p>Try Prathosh’s AI twin for his NPTEL course, Mathematical Foundations of Machine Learning.</p>
            </div>
          </div>
          <div className="tr">
            <Chat />
            <div>
              <h3>Course doubts</h3>
              <p>Ask about any lecture or tutorial, from probability and ERM to SVMs, neural networks and GANs.</p>
            </div>
          </div>
          <div className="tr">
            <Sparkle />
            <div>
              <h3>Lecture pointers</h3>
              <p>Get a direct answer in Prathosh’s teaching style, with the lecture where the topic is covered.</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
