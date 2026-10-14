'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import SourcesDrawer from './SourcesDrawer.jsx'
import RemoveDialog from './RemoveDialog.jsx'
import { PlayBox, Shield, Trash } from './Icons.jsx'

export default function TrustFooter({ twin }) {
  const router = useRouter()
  const [showSources, setShowSources] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const closeSources = useCallback(() => setShowSources(false), [])
  const closeRemove = useCallback(() => setShowRemove(false), [])

  return (
    <>
      <div className="trust">
        <div className="tr">
          <PlayBox />
          <div>
            <h3>Only your public content</h3>
            <p className="num">{twin.sourceSummary}</p>
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
      {showSources && <SourcesDrawer sources={twin.sources} onClose={closeSources} />}
      {showRemove && <RemoveDialog onCancel={closeRemove} onConfirm={() => router.push(`/${twin.id}/removed`)} />}
    </>
  )
}
