import { useAgent, VideoTrack } from '@livekit/components-react'
import { useState } from 'react'

const STATE_LABEL = { speaking: 'Speaking', thinking: 'Thinking', listening: 'Listening', idle: 'Listening', failed: 'Unavailable' }

// Keep the loading state until this video track has decoded its first frame.
export default function AvatarStage({ name = "Olga's twin" }) {
  const agent = useAgent()
  const [readyTrackSid, setReadyTrackSid] = useState(null)
  const avatarTrack = agent.cameraTrack
  const avatarTrackSid = avatarTrack?.publication.trackSid ?? null
  const label = STATE_LABEL[agent.state] ?? 'Joining…'
  const ready = !!avatarTrackSid && readyTrackSid === avatarTrackSid
  const failed = agent.state === 'failed'

  return (
    <div className="rtile rtile--twin" data-state={agent.state} aria-label={name + ' video'}>
      <div className="rtile-slot" id="twin-avatar">
        {!ready && (
          <div className="avatar-wait" role="status">
            {!failed && <span className="avatar-spinner" aria-hidden="true" />}
            <p>{failed ? 'Avatar unavailable' : 'Starting avatar…'}</p>
          </div>
        )}
        {avatarTrack && (
          <VideoTrack
            trackRef={avatarTrack}
            style={{ opacity: ready ? 1 : 0 }}
            onLoadedData={() => setReadyTrackSid(avatarTrackSid)}
            onEmptied={() => setReadyTrackSid(null)}
            onError={() => setReadyTrackSid(null)}
          />
        )}
      </div>
      <span className="rstate"><i />{label}</span>
      <span className="rname">{name}</span>
    </div>
  )
}
