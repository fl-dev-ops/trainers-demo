import Image from 'next/image'
import Link from 'next/link'
import { JOHNNY_DANIELE } from '@/data.js'
import { Play, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I have a sprint review tomorrow and need to explain a delay. Can we practise?',
  'I have a job interview in English next week. Can you interview me?',
]

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
          <p>For IT and tech professionals who work in English as a second language. Practise your meetings, presentations and interviews with Johnny, trained on Daniele’s method.</p>
        </div>
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Start your practice</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/johnny-daniele/live', query: { q } }} className="rprow" aria-label={'Start practising: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={JOHNNY_DANIELE.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Practise a real tech work situation</h2>
              <p>A sprint review, a stakeholder update or a job interview: Johnny plays your team or interviewer, interrupts like they would, then gives you feedback at the end.</p>
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
