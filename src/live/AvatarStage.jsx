import { useAgent, VideoTrack } from '@livekit/components-react'
import { useState } from 'react'

/*
 * The twin's tile. While the agent is still joining, the slot stays empty; once it
 * publishes a camera track the avatar video fades in on its first frame.
 */
export default function AvatarStage({ name = "Olga's twin" }) {
  const agent = useAgent()
  const [readyTrackSid, setReadyTrackSid] = useState(null)
  const avatarTrack = agent.cameraTrack
  const avatarTrackSid = avatarTrack?.publication.trackSid ?? null

  return (
    <div className="rtile" aria-label={name + ' video'}>
      <div className="rtile-slot" id="twin-avatar">
        {avatarTrack && (
          <VideoTrack
            trackRef={avatarTrack}
            style={{ opacity: readyTrackSid === avatarTrackSid ? 1 : 0 }}
            onLoadedData={() => setReadyTrackSid(avatarTrackSid)}
            onEmptied={() => setReadyTrackSid(null)}
            onError={() => setReadyTrackSid(null)}
          />
        )}
      </div>
      <span className="rname">{name} <i /></span>
    </div>
  )
}
