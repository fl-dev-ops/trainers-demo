import Image from 'next/image'
import Link from 'next/link'
import { JOHNNY_DANIELE } from '@/data.js'
import { Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={JOHNNY_DANIELE.face} alt={JOHNNY_DANIELE.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />Daniele Ponzo’s practice assistant · English for IT professionals</span>
          <h1>Meet {JOHNNY_DANIELE.firstName}</h1>
          <p>For IT and tech professionals who work in English as a second language.</p>
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="path-b">
              <h2>Who is Johnny?</h2>
              <p>Johnny is Daniele Ponzo’s AI practice assistant. Between coaching sessions, he helps you practise speaking English at work: he plays your colleagues in a real situation, then gives you short, honest feedback.</p>
              <p>He is trained on Daniele’s method, taken from his talks, YouTube videos and LinkedIn posts, including his HACK framework and his core rule: lead with the point, one sentence, one idea.</p>
              <p>Johnny is an AI assistant, not Daniele.</p>
              <div className="row">
                <Link href="/johnny-daniele/live" className="btn btn--strong">Start practising</Link>
                <span className="meta">{JOHNNY_DANIELE.room.kind}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
