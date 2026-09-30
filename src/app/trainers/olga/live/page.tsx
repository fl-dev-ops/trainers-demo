"use client"

import {
  RoomAudioRenderer,
  SessionProvider,
  useAgent,
  useSession,
  useSessionMessages,
  VideoTrack,
} from '@livekit/components-react'
import { RoomEvent, TokenSource, Track } from 'livekit-client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chat, Check, ChevronLeft, HangUp, Mic, VideoCam } from '@/components/Icons.jsx'
import { SCENARIOS, TWIN } from '@/data.js'
import { CONNECTION_STORAGE_KEY, parseConnectionDetails, type ConnectionDetails } from '@/lib/connection'
import AvatarStage from '@/live/AvatarStage.jsx'
import TranscriptPanel from '@/live/TranscriptPanel.jsx'

type Scenario = (typeof SCENARIOS)[number]

// Stand-in identity until the app has a signed-in profile to read a real name from.
const PARTICIPANT_NAME = 'Candidate'

export default function LivePage() {
  // useSearchParams needs a boundary so the page can still be prerendered.
  return (
    <Suspense fallback={null}>
      <LiveEntry />
    </Suspense>
  )
}

/**
 * Mints LiveKit credentials on arrival (sessionStorage cache, else POST
 * /api/connection-details) and mounts the room as soon as they are ready.
 */
function LiveEntry() {
  const searchParams = useSearchParams()
  const SCENARIO = SCENARIOS.find((s) => s.id === searchParams.get('s')) ?? SCENARIOS[0]
  const [error, setError] = useState<string | null>(null)
  const [connection, setConnection] = useState<ConnectionDetails | null>(null)
  const hasStartedRef = useRef(false)

  // Connects on mount; the agent addresses the user by this name.
  // The ref guard survives StrictMode's double invoke, so we never mint two rooms.
  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const cached = parseConnectionDetails(sessionStorage.getItem(CONNECTION_STORAGE_KEY))
    if (cached) {
      setConnection(cached)
      return
    }

    const startedAt = Date.now()
    console.info(`[EXT-API:connection-details] event=start user_name=${PARTICIPANT_NAME}`)
    fetch('/api/connection-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: PARTICIPANT_NAME, profile: 'olga' }),
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null)
        if (!response.ok) {
          throw new Error(
            typeof payload?.error === 'string'
              ? payload.error
              : `Request failed with status ${response.status}`,
          )
        }
        return payload as ConnectionDetails
      })
      .then((details) => {
        sessionStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(details))
        console.info(`[EXT-API:connection-details] event=end elapsed_ms=${Date.now() - startedAt}`)
        setConnection(details)
      })
      .catch((caught) => {
        console.error(`[EXT-API:connection-details] event=failure elapsed_ms=${Date.now() - startedAt}`, caught)
        setError(caught instanceof Error ? caught.message : 'Could not start the role play.')
      })
  }, [])

  if (connection) return <RolePlay connection={connection} scenario={SCENARIO} />

  return (
    <section>
      <div className="room">
        <div className="room-bar">
          <Link href="/trainers/olga" className="back"><ChevronLeft />Back</Link>
          <span className="rl idle"><i />{error ?? 'Connecting…'}</span>
        </div>
      </div>
    </section>
  )
}

/** The live room: owns the LiveKit session and renders the role play UI. */
function RolePlay({ connection, scenario: SCENARIO }: { connection: ConnectionDetails; scenario: Scenario }) {
  const router = useRouter()
  const [chat, setChat] = useState(true)
  // Index of the cue in progress; earlier cues render as done. Advance it from agent events once LiveKit is wired.
  const [activeCue] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [camOn, setCamOn] = useState(false)
  const [micOn, setMicOn] = useState(false)

  const tokenSource = useMemo(
    () =>
      TokenSource.literal({
        serverUrl: connection.serverUrl,
        participantToken: connection.participantToken,
      }),
    [connection.serverUrl, connection.participantToken],
  )
  const session = useSession(tokenSource)
  const { messages, send } = useSessionMessages(session)
  const agent = useAgent(session)
  const hasStartedRef = useRef(false)

  // Join the room exactly once with mic and camera on; the ref survives StrictMode's double invoke.
  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    session
      .start({
        tracks: {
          microphone: { enabled: true },
          camera: { enabled: true },
        },
      })
      .catch((error) => {
        console.error('Failed to start session:', error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dropping out of the room (hang up, agent leaving or a network drop) sends the user back to the welcome screen.
  useEffect(() => {
    const room = session.room
    const handleDisconnected = () => {
      sessionStorage.removeItem(CONNECTION_STORAGE_KEY)
      router.replace('/trainers/olga')
    }
    room.on(RoomEvent.Disconnected, handleDisconnected)
    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnected)
    }
  }, [router, session.room])

  // The local track publications are the source of truth for the camera and mic buttons.
  useEffect(() => {
    const room = session.room
    const syncTracks = () => {
      const local = room.localParticipant
      const camera = local.getTrackPublication(Track.Source.Camera)
      const microphone = local.getTrackPublication(Track.Source.Microphone)
      setCamOn(!!camera && !camera.isMuted)
      setMicOn(!!microphone && !microphone.isMuted)
    }
    syncTracks()
    room.on(RoomEvent.LocalTrackPublished, syncTracks)
    room.on(RoomEvent.LocalTrackUnpublished, syncTracks)
    room.on(RoomEvent.TrackMuted, syncTracks)
    room.on(RoomEvent.TrackUnmuted, syncTracks)
    return () => {
      room.off(RoomEvent.LocalTrackPublished, syncTracks)
      room.off(RoomEvent.LocalTrackUnpublished, syncTracks)
      room.off(RoomEvent.TrackMuted, syncTracks)
      room.off(RoomEvent.TrackUnmuted, syncTracks)
    }
  }, [session.room])

  // Counts up from the moment the room connects, formatted mm:ss in the top bar.
  useEffect(() => {
    if (!session.isConnected) return
    const startedAt = Date.now()
    setElapsed(0)
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [session.isConnected])

  // Every transcript and chat message the room delivers renders as one feed line.
  const lines = useMemo(
    () =>
      messages.map((message) => ({
        id: message.id,
        who: message.from?.isLocal ? 'You' : TWIN.firstName,
        text: message.message,
      })),
    [messages],
  )

  const status =
    session.isConnected
      ? { className: 'rl', label: 'Live' }
      : agent.state === 'disconnected' || agent.state === 'failed'
        ? { className: 'rl idle', label: 'Not connected' }
        : { className: 'rl idle', label: 'Connecting…' }
  const clock = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`

  const toggleCamera = useCallback(() => {
    session.room.localParticipant.setCameraEnabled(!camOn).catch((error) => {
      console.error('Failed to toggle camera:', error)
    })
  }, [camOn, session.room])

  const toggleMic = useCallback(() => {
    session.room.localParticipant.setMicrophoneEnabled(!micOn).catch((error) => {
      console.error('Failed to toggle microphone:', error)
    })
  }, [micOn, session.room])

  // Hanging up leaves the room, drops the cached connection and returns to the welcome screen.
  async function leaveToHome() {
    sessionStorage.removeItem(CONNECTION_STORAGE_KEY)
    await session.end()
    router.push('/trainers/olga')
  }

  return (
    <SessionProvider session={session}>
      <RoomAudioRenderer room={session.room} />
      <section>
        <div className="room">
          <div className="room-bar">
            <Link href="/trainers/olga" className="back"><ChevronLeft />Back</Link>
            <span className={status.className}><i />{status.label}</span>
            <span className="rclock">{clock}</span>
          </div>

          <div className={'room-grid' + (chat ? '' : ' chat-off')}>
            <section className="rpanel scen" aria-labelledby="rpTitle">
              <span className="kind"><Chat />Live role play</span>
              <h1 id="rpTitle">{SCENARIO.title}</h1>
              <span className="rchip">{SCENARIO.tag}</span>
              <p className="sc">{SCENARIO.scenario}</p>
              <div className="cues">
                <p className="rk">Cues</p>
                <ol>
                  {SCENARIO.cues.map((c, i) => (
                    <li key={c} className={i < activeCue ? 'ok' : i === activeCue ? 'now' : undefined}>
                      <span className="d">{i < activeCue ? <Check /> : i + 1}</span><span>{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <button type="button" className="rbtn">Customise my twin</button>
            </section>

            <div className="rtiles">
              <AvatarStage />
              <div className="rtile" aria-label={SCENARIO.participant + ' video'}>
                <div className="rtile-slot" id="participant-video">
                  {session.local.cameraTrack && <VideoTrack trackRef={session.local.cameraTrack} />}
                </div>
                <span className="cav">{SCENARIO.initials}</span>
                <span className="rname">{SCENARIO.participant}</span>
              </div>
            </div>

            <TranscriptPanel lines={lines} connected={session.isConnected} onSend={send} />
          </div>

          <div className="ctrl" role="toolbar" aria-label="Role play controls">
            <button type="button" className="cb" aria-pressed={camOn} aria-label={camOn ? 'Turn camera off' : 'Turn camera on'} onClick={toggleCamera}><VideoCam width={1.8} /></button>
            <button type="button" className="cb" aria-pressed={micOn} aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'} onClick={toggleMic}><Mic /></button>
            <button type="button" className="cb chat" aria-pressed={chat} aria-label={chat ? 'Hide chat' : 'Show chat'} onClick={() => setChat(!chat)}><Chat width={1.8} /></button>
            <button type="button" className="cb end" aria-label="End role play" onClick={() => { void leaveToHome() }}><HangUp /></button>
          </div>
        </div>
      </section>
    </SessionProvider>
  )
}
