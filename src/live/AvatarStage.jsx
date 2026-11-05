import Image from 'next/image'
import { useAgent, VideoTrack } from '@livekit/components-react'
import { useState } from 'react'

/*
 * The twin's tile shows the trainer photo until the avatar video's first frame.
 */
export default function AvatarStage({ name = "Olga's twin", image = "", imageClassName = "" }) {
  const agent = useAgent()
  const [readyTrackSid, setReadyTrackSid] = useState(null)
  const avatarTrack = agent.cameraTrack
  const avatarTrackSid = avatarTrack?.publication.trackSid ?? null

  return (
    <div className="rtile" aria-label={name + ' video'}>
      <div className="rtile-slot" id="twin-avatar">
        {image && (!avatarTrackSid || readyTrackSid !== avatarTrackSid) && (
          <Image
            className={imageClassName}
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
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
