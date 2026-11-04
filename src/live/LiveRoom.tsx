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
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Brief, Chat, Check, ChevronLeft, Close, HangUp, Logo, Mic, MicOff, Pip, VideoCam, VideoOff } from '@/components/Icons.jsx'
import ThemeToggle from '@/components/ThemeToggle.jsx'
import { SCENARIOS } from '@/data.js'
import { getConnectionStorageKey, parseConnectionDetails, type ConnectionDetails } from '@/lib/connection'
import AvatarStage from '@/live/AvatarStage.jsx'
import TranscriptPanel from '@/live/TranscriptPanel.jsx'

type Scenario = (typeof SCENARIOS)[number]
type TrainerRoom = { kind: string; title: string; scenario: string }
type Trainer = { id: string; firstName: string; face: string; portrait?: string; portraitClass?: string; room?: TrainerRoom }

// Stand-in identity until the app has a signed-in profile to read a real name from.
const PARTICIPANT_NAME = 'Candidate'

export default function LiveRoom({ trainer }: { trainer: Trainer }) {
  // useSearchParams needs a boundary so the page can still be prerendered.
  return (
    <Suspense fallback={null}>
      <LiveEntry key={trainer.id} trainer={trainer} />
    </Suspense>
  )
}

function SessionHeader({ home, title, children }: { home: string; title: string; children: ReactNode }) {
  return (
    <header className="room-bar">
      <div className="room-brand">
        <Link href={home} className="btn btn--ghost session-back" aria-label="Back to trainer" title="Back to trainer"><ChevronLeft /></Link>
        <Link href={home} className="lockup" aria-label="TrainerTwin — trainer home"><Logo /><span>TrainerTwin</span></Link>
      </div>
      <h1 className="room-title" title={title}>{title}</h1>
      <div className="room-actions">{children}<ThemeToggle /></div>
    </header>
  )
}

/**
 * Mints LiveKit credentials on arrival (sessionStorage cache, else POST
 * /api/connection-details) and mounts the room as soon as they are ready.
 */
function LiveEntry({ trainer }: { trainer: Trainer }) {
  const trainerHome = `/${trainer.id}`
  const storageKey = getConnectionStorageKey(trainer.id)
  const searchParams = useSearchParams()
  const SCENARIO = SCENARIOS.find((s) => s.id === searchParams.get('s')) ?? SCENARIOS[0]
  // A conversation starter picked on the welcome page (?q=...), asked once the twin has greeted the user.
  const starter = searchParams.get('q')?.trim() || null
  const [error, setError] = useState<string | null>(null)
  const [connection, setConnection] = useState<ConnectionDetails | null>(null)
  const hasStartedRef = useRef(false)

  // Connects on mount; the agent addresses the user by this name.
  // The ref guard survives StrictMode's double invoke, so we never mint two rooms.
  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const cached = parseConnectionDetails(sessionStorage.getItem(storageKey))
    if (cached) {
      setConnection(cached)
      return
    }

    const startedAt = Date.now()
    console.info(`[EXT-API:connection-details] event=start agent_id=${trainer.id}`)
    fetch('/api/connection-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: PARTICIPANT_NAME, profile: trainer.id }),
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
        sessionStorage.setItem(storageKey, JSON.stringify(details))
        console.info(`[EXT-API:connection-details] event=end elapsed_ms=${Date.now() - startedAt}`)
        setConnection(details)
      })
      .catch((caught) => {
        console.error(`[EXT-API:connection-details] event=failure elapsed_ms=${Date.now() - startedAt}`, caught)
        setError(caught instanceof Error ? caught.message : 'Could not start the role play.')
      })
  }, [storageKey, trainer.id])

  if (connection) return <RolePlay connection={connection} scenario={SCENARIO} trainer={trainer} starter={starter} />

  // Same shell as the room, so the page doesn't jump when the call mounts.
  return (
    <section>
      <div className="room">
        <SessionHeader home={trainerHome} title={trainer.room ? trainer.room.title : SCENARIO.title}>
          <span className="rl idle"><i />{error ? 'Not connected' : 'Connecting…'}</span>
        </SessionHeader>
        <div className="room-main">
          <div className="stage">
            <div className="stage-wait" role={error ? 'alert' : 'status'}>
              <span className={'wait-face' + (error ? '' : ' pulse')}>
                <Image src={trainer.face} alt="" fill sizes="96px" />
              </span>
              <b>{error ? 'Couldn’t start the session' : `Getting ${trainer.firstName}’s twin ready…`}</b>
              <span>{error ?? 'Allow camera and microphone when your browser asks.'}</span>
              {error && <button type="button" className="btn btn--strong" onClick={() => window.location.reload()}>Try again</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** The live room: owns the LiveKit session and renders the role play UI. */
function RolePlay({ connection, scenario: SCENARIO, trainer, starter = null }: { connection: ConnectionDetails; scenario: Scenario; trainer: Trainer; starter?: string | null }) {
  const trainerHome = `/${trainer.id}`
  // Trainers with a fixed room (e.g. Jameel, Prathosh) skip the role-play scenario and cues.
  const fixedRoom = trainer.room
  const storageKey = getConnectionStorageKey(trainer.id)
  const router = useRouter()
  // One side panel with two tabs; opens on the brief, or on chat when a starter question was picked.
  const [panel, setPanel] = useState<'brief' | 'chat' | null>(starter ? 'chat' : 'brief')
  const [confirmEnd, setConfirmEnd] = useState(false)
  // shortcut: layout toggle is for comparing split vs picture-in-picture; drop the loser once decided.
  const [layout, setLayout] = useState<'split' | 'pip'>('split')
  const [seenCount, setSeenCount] = useState(0)
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
      sessionStorage.removeItem(storageKey)
      router.replace(trainerHome)
    }
    room.on(RoomEvent.Disconnected, handleDisconnected)
    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnected)
    }
  }, [router, session.room, storageKey, trainerHome])

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

  // Sends the conversation starter once, after the twin's greeting has finished, then drops it
  // from the URL so a refresh doesn't ask it again.
  const starterSentRef = useRef(false)
  useEffect(() => {
    if (!starter || starterSentRef.current) return
    const greeted = messages.some((message) => !message.from?.isLocal)
    if (!greeted || agent.state !== 'listening') return
    starterSentRef.current = true
    send(starter).catch((error) => {
      console.error('Failed to send conversation starter:', error)
    })
    router.replace(`${trainerHome}/live`)
  }, [agent.state, messages, router, send, starter, trainerHome])

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
        who: message.from?.isLocal ? 'You' : trainer.firstName,
        text: message.message,
        mine: !!message.from?.isLocal,
      })),
    [messages, trainer.firstName],
  )

  // Caption on the stage: the twin's latest line, tail-trimmed to about two lines.
  const caption = useMemo(() => {
    const last = [...lines].reverse().find((line) => !line.mine)?.text.trim() ?? ''
    if (last.length <= 160) return last
    const tail = last.slice(-160)
    return '…' + tail.slice(tail.indexOf(' ') + 1)
  }, [lines])

  // Messages that arrived while the chat tab wasn't visible light a dot on the chat button.
  useEffect(() => {
    if (panel === 'chat') setSeenCount(lines.length)
  }, [panel, lines.length])
  const unread = panel !== 'chat' && lines.length > seenCount

  const failed = agent.state === 'failed'
  const status = session.isConnected && !failed
    ? { className: 'rl', label: 'Live' }
    : { className: 'rl idle', label: failed ? 'Twin unavailable' : 'Connecting…' }
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

  const togglePanel = (tab: 'brief' | 'chat') => setPanel((open) => (open === tab ? null : tab))

  // Escape closes the end-session dialog.
  useEffect(() => {
    if (!confirmEnd) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setConfirmEnd(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirmEnd])

  // Hanging up leaves the room, drops the cached connection and returns to the welcome screen.
  async function leaveToHome() {
    sessionStorage.removeItem(storageKey)
    await session.end()
    router.push(trainerHome)
  }

  const title = fixedRoom ? fixedRoom.title : SCENARIO.title
  const youLabel = fixedRoom ? 'You' : SCENARIO.participant
  const twinName = `${trainer.firstName}'s twin`

  return (
    <SessionProvider session={session}>
      <RoomAudioRenderer room={session.room} />
      <section>
        <div className="room">
          <SessionHeader home={trainerHome} title={title}>
            <span className={status.className}>
              <i />{status.label}
              {session.isConnected && <span className="rclock" aria-label="Session time">{clock}</span>}
            </span>
          </SessionHeader>

          <div className="room-main">
            <div className="stage">
              <div className={'stage-tiles' + (layout === 'pip' ? ' pip' : '')}>
                <AvatarStage name={twinName} />
                <div className="rtile rtile--you" aria-label={youLabel + ' video'}>
                  <div className="rtile-slot" id="participant-video">
                    {camOn && session.local.cameraTrack && <VideoTrack trackRef={session.local.cameraTrack} />}
                  </div>
                  {!camOn && <span className="cav">{fixedRoom ? 'You' : SCENARIO.initials}</span>}
                  <span className="rname">
                    {youLabel}
                    {!micOn && <span className="rmuted" aria-label="Microphone off"><MicOff /></span>}
                  </span>
                </div>
              </div>
              {panel !== 'chat' && caption && <p className="rcap"><span>{caption}</span></p>}
            </div>

            {panel && (
              <aside className="rside" aria-label="Session panel">
                <div className="rtabs" role="tablist">
                  <button type="button" role="tab" aria-selected={panel === 'brief'} onClick={() => setPanel('brief')}>Brief</button>
                  <button type="button" role="tab" aria-selected={panel === 'chat'} onClick={() => setPanel('chat')}>
                    Chat{lines.length > 0 && <span className="cnt">{lines.length}</span>}
                  </button>
                  <button type="button" className="rx" aria-label="Close panel" onClick={() => setPanel(null)}><Close /></button>
                </div>
                {panel === 'brief' ? (
                  <div className="brief" role="tabpanel">
                    {!fixedRoom && <span className="rchip">{SCENARIO.tag}</span>}
                    <p className="sc">{fixedRoom ? fixedRoom.scenario : SCENARIO.scenario}</p>
                    {!fixedRoom && <div className="cues">
                      <p className="rk">Try to</p>
                      <ol>
                        {SCENARIO.cues.map((c, i) => (
                          <li key={c} className={i < activeCue ? 'ok' : i === activeCue ? 'now' : undefined}>
                            <span className="d">{i < activeCue ? <Check /> : i + 1}</span><span>{c}</span>
                          </li>
                        ))}
                      </ol>
                    </div>}
                    <p className="tip">Just talk — {trainer.firstName}&rsquo;s twin listens and answers out loud. You can also type in Chat.</p>
                    {!fixedRoom && <button type="button" className="rbtn">Customise my twin</button>}
                  </div>
                ) : (
                  <TranscriptPanel lines={lines} connected={session.isConnected} twinName={trainer.firstName} onSend={send} />
                )}
              </aside>
            )}
          </div>

          <div className="ctrl-row">
            <div className="ctrl" role="toolbar" aria-label="Session controls">
              <button type="button" className={'cb' + (camOn ? '' : ' off')} aria-pressed={camOn} aria-label={camOn ? 'Turn camera off' : 'Turn camera on'} title={camOn ? 'Turn camera off' : 'Turn camera on'} onClick={toggleCamera}>{camOn ? <VideoCam width={1.8} /> : <VideoOff />}</button>
              <button type="button" className={'cb' + (micOn ? '' : ' off')} aria-pressed={micOn} aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'} title={micOn ? 'Mute microphone' : 'Unmute microphone'} onClick={toggleMic}>{micOn ? <Mic /> : <MicOff />}</button>
              <span className="ctrl-sep" aria-hidden="true" />
              <button type="button" className="cb pnl" aria-pressed={layout === 'pip'} aria-label="Picture-in-picture layout" title={layout === 'pip' ? 'Switch to side-by-side' : 'Switch to picture-in-picture'} onClick={() => setLayout(layout === 'pip' ? 'split' : 'pip')}><Pip /></button>
              <button type="button" className="cb pnl" aria-pressed={panel === 'brief'} aria-label={panel === 'brief' ? 'Hide brief' : 'Show brief'} title="Brief" onClick={() => togglePanel('brief')}><Brief /></button>
              <button type="button" className="cb pnl" aria-pressed={panel === 'chat'} aria-label={(panel === 'chat' ? 'Hide chat' : 'Show chat') + (unread ? ', new messages' : '')} title="Chat" onClick={() => togglePanel('chat')}>
                <Chat width={1.8} />{unread && <i className="dot" aria-hidden="true" />}
              </button>
            </div>
            <button type="button" className="end" onClick={() => setConfirmEnd(true)}><HangUp /><span>End</span></button>
          </div>
        </div>
      </section>

      {confirmEnd && (
        <div className="scrim" onClick={() => setConfirmEnd(false)}>
          <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="endTitle" onClick={(event) => event.stopPropagation()}>
            <div>
              <h2 id="endTitle">End this session?</h2>
              <p className="sub">You&rsquo;ll leave the call with {twinName} and go back to the start.</p>
            </div>
            <div className="actions">
              <button type="button" className="btn btn--secondary" autoFocus onClick={() => setConfirmEnd(false)}>Keep talking</button>
              <button type="button" className="btn btn--end" onClick={() => { setConfirmEnd(false); void leaveToHome() }}>End session</button>
            </div>
          </div>
        </div>
      )}
    </SessionProvider>
  )
}
