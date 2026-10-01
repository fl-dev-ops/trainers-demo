import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TWIN } from '../data.js'

export const metadata: Metadata = {
  title: 'Trainer demos · TrainerTwin',
  description: 'Explore trainer AI twins and try their demos.',
}

export default function Home() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <h1>Meet the trainers.</h1>
          <p>Explore their AI twins and try a demo.</p>
        </div>
        <div className="paths">
          <article className="path">
            <div className="path-b">
              <Image
                src={TWIN.face}
                alt={TWIN.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{TWIN.name}</h2>
              <p>Meet Olga’s video twin and practise with her interactive twin.</p>
              <div className="row">
                <Link href="/olga" className="btn btn--strong">
                  Explore Olga’s demo
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
