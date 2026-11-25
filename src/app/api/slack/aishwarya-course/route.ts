import { createHmac, timingSafeEqual } from 'node:crypto'
import { after, NextResponse } from 'next/server'
import { askAishwarya, type Turn } from '@/lib/aishwarya-reganti/twin'
import { SPOKEN_REPLY, speak, transcribe } from '@/lib/aishwarya-reganti/voice'

/* Slack Events API endpoint for Aishwarya's twin in the mock course workspace (a separate Slack app from the
   first demo bot, which keeps using /api/slack/aishwarya-reganti).
   - In any channel it is in: answers messages that @mention it, in a thread.
   - In direct messages: answers every message.
   - If the message carries a voice recording, it transcribes it and replies with a voice message in her
     cloned voice, with the text underneath. Text messages get a text reply.
   Needs SLACK_AISHWARYA_BOT_DEMO_SIGNING_SECRET, SLACK_AISHWARYA_BOT_DEMO_BOT_TOKEN, OPENROUTER_API_KEY,
   DEEPGRAM_API_KEY and TTS_SERVICE_KEY. Manifest: slack/aishwarya-course-manifest.json. */

export const maxDuration = 60

type SlackFile = { id: string; mimetype?: string; filetype?: string; subtype?: string; url_private_download?: string; url_private?: string; name?: string }
type SlackMessage = { user?: string; bot_id?: string; text?: string; ts: string; thread_ts?: string; subtype?: string; files?: SlackFile[] }
type SlackEvent = SlackMessage & { type: string; channel: string; channel_type?: string }

const FALLBACK_ERROR = 'Sorry, I could not answer that just now. Please try again in a minute.'
const NOT_HEARD = "Sorry, I couldn't make out that recording. Could you try again, or type your question?"
// Env names chosen by Lalith (26 Nov 2026); the older COURSE names still work.
const TOKEN = () =>
  process.env.SLACK_AISHWARYA_BOT_DEMO_BOT_TOKEN || process.env.SLACK_AISHWARYA_BOT_DEMO_TOKEN || process.env.SLACK_AISHWARYA_COURSE_BOT_TOKEN
const SIGNING_SECRET = () => process.env.SLACK_AISHWARYA_BOT_DEMO_SIGNING_SECRET || process.env.SLACK_AISHWARYA_COURSE_SIGNING_SECRET

function verified(req: Request, raw: string): boolean {
  const secret = SIGNING_SECRET()
  const ts = req.headers.get('x-slack-request-timestamp')
  const sig = req.headers.get('x-slack-signature')
  if (!secret || !ts || !sig) return false
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 60 * 5) return false
  const expected = 'v0=' + createHmac('sha256', secret).update(`v0:${ts}:${raw}`).digest('hex')
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

async function slack(method: string, args: Record<string, unknown>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN()}`, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    // Form encoding works for every Slack method; several read methods ignore JSON bodies. Objects and arrays go as JSON strings.
    body: new URLSearchParams(
      Object.entries(args).filter(([, v]) => v !== undefined).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)]),
    ),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(`Slack ${method}: ${data.error}`)
  return data
}

const clean = (text = '') => text.replace(/<@[A-Z0-9]+>/g, '').trim()
const isAudio = (f: SlackFile) =>
  f.subtype === 'slack_audio' || (f.mimetype || '').startsWith('audio/') || (f.mimetype || '').startsWith('video/') ||
  ['m4a', 'mp3', 'wav', 'webm', 'ogg', 'mp4', 'aac'].includes((f.filetype || '').toLowerCase())

async function threadTurns(channel: string, threadTs: string, botUserId: string): Promise<Turn[]> {
  const { messages } = await slack('conversations.replies', { channel, ts: threadTs, limit: 20 })
  return (messages as SlackMessage[])
    .map((m) => ({ role: m.bot_id || m.user === botUserId ? 'assistant' : 'user', content: clean(m.text) }) as Turn)
    .filter((t) => t.content)
}

async function firstName(user?: string): Promise<string | undefined> {
  if (!user) return undefined
  try {
    const { user: info } = await slack('users.info', { user })
    return info?.profile?.first_name || info?.profile?.display_name || info?.real_name || undefined
  } catch {
    return undefined
  }
}

async function heard(file: SlackFile): Promise<string> {
  const url = file.url_private_download || file.url_private
  if (!url) return ''
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN()}` } })
  if (!res.ok) throw new Error(`Slack file download ${res.status}`)
  return transcribe(await res.arrayBuffer(), file.mimetype || res.headers.get('content-type') || '')
}

/* Uploads her spoken reply into the thread, with the text as the message. */
async function postVoice(channel: string, threadTs: string, text: string) {
  const audio = await speak(text)
  const { upload_url, file_id } = await slack('files.getUploadURLExternal', { filename: 'aishwarya-reply.wav', length: audio.length })
  const up = await fetch(upload_url, { method: 'POST', body: Buffer.from(audio) })
  if (!up.ok) throw new Error(`Slack upload ${up.status}`)
  await slack('files.completeUploadExternal', {
    files: [{ id: file_id, title: "Aishwarya's twin" }],
    channel_id: channel,
    thread_ts: threadTs,
    initial_comment: text,
  })
}

async function answer(event: SlackEvent, botUserId: string, inThread: boolean) {
  const threadTs = event.thread_ts || (inThread ? event.ts : undefined)
  const say = (text: string) => slack('chat.postMessage', { channel: event.channel, thread_ts: threadTs, text })
  try {
    const audio = (event.files || []).find(isAudio)
    let question = clean(event.text)
    if (audio) {
      const spoken = await heard(audio)
      if (!spoken) return void (await say(NOT_HEARD))
      question = [question, spoken].filter(Boolean).join(' ')
      console.log('[slack:aishwarya-course] heard:', JSON.stringify(spoken))
    }
    if (!question) return

    let turns: Turn[] = [{ role: 'user', content: question }]
    if (event.thread_ts) {
      try {
        const earlier = (await threadTurns(event.channel, event.thread_ts, botUserId)).slice(0, -1)
        turns = [...earlier, { role: 'user', content: question }]
      } catch (error) {
        console.error('[slack:aishwarya-course] could not read the thread, answering the message alone', error)
      }
    }
    const reply = await askAishwarya(turns, await firstName(event.user), audio ? SPOKEN_REPLY : undefined)
    console.log('[slack:aishwarya-course] reply:', JSON.stringify(reply.slice(0, 200)))

    if (audio) {
      try {
        await postVoice(event.channel, threadTs || event.ts, reply)
        console.log('[slack:aishwarya-course] voice reply posted')
        return
      } catch (error) {
        console.error('[slack:aishwarya-course] voice reply failed, sending text', error)
      }
    }
    await say(reply)
  } catch (error) {
    console.error('[slack:aishwarya-course] reply failed', error)
    await say(FALLBACK_ERROR).catch(() => {})
  }
}

export async function POST(req: Request) {
  const raw = await req.text()
  if (!verified(req, raw)) return new NextResponse('Invalid signature', { status: 401 })
  const body = JSON.parse(raw)

  if (body.type === 'url_verification') return NextResponse.json({ challenge: body.challenge })
  // Slack retries when the ack is slow; the first delivery is already being answered.
  if (req.headers.get('x-slack-retry-num')) return new NextResponse(null, { status: 200 })
  if (body.type !== 'event_callback') return new NextResponse(null, { status: 200 })

  const event: SlackEvent = body.event
  const botUserId: string = body.authorizations?.[0]?.user_id ?? ''
  // Only plain messages and messages with files from people; never the bot's own posts or edits.
  const fromPerson = !event.bot_id && event.user !== botUserId && (!event.subtype || event.subtype === 'file_share')
  if (event.type !== 'message' || !fromPerson) return new NextResponse(null, { status: 200 })

  if (event.channel_type === 'im') {
    after(() => answer(event, botUserId, false))
  } else if ((event.text || '').includes(`<@${botUserId}>`)) {
    // Any channel or private channel it has been added to, when it is @mentioned (text or voice message).
    after(() => answer(event, botUserId, true))
  } else if (event.thread_ts && (event.files || []).some(isAudio)) {
    // A voice note in a thread the twin is already part of. Slack's phone app sends voice notes without a
    // chance to type an @mention, so a voice reply in the twin's own thread is answered too.
    after(async () => {
      try {
        const { messages } = await slack('conversations.replies', { channel: event.channel, ts: event.thread_ts, limit: 50 })
        if ((messages as SlackMessage[]).some((m) => m.user === botUserId || Boolean(m.bot_id))) await answer(event, botUserId, true)
      } catch (error) {
        console.error('[slack:aishwarya-course] could not check the thread for a voice note', error)
      }
    })
  }
  return new NextResponse(null, { status: 200 })
}
