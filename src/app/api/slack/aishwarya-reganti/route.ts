import { createHmac, timingSafeEqual } from 'node:crypto'
import { after, NextResponse } from 'next/server'
import { askAishwarya, type Turn } from '@/lib/aishwarya-reganti/twin'

/* Slack Events API endpoint for Aishwarya's twin. It answers @mentions in channels (in a thread)
   and direct messages. Slack wants a reply within 3 seconds, so the answer is posted after the ack.
   Needs SLACK_AISHWARYA_SIGNING_SECRET and SLACK_AISHWARYA_BOT_TOKEN; see slack/aishwarya-reganti-manifest.json. */

type SlackMessage = { user?: string; bot_id?: string; text?: string; ts: string; thread_ts?: string; subtype?: string }

const FALLBACK_ERROR = 'Sorry, I could not answer that just now. Please try again in a minute.'

function verified(req: Request, raw: string): boolean {
  const secret = process.env.SLACK_AISHWARYA_SIGNING_SECRET
  const ts = req.headers.get('x-slack-request-timestamp')
  const sig = req.headers.get('x-slack-signature')
  if (!secret || !ts || !sig) return false
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 60 * 5) return false
  const expected = 'v0=' + createHmac('sha256', secret).update(`v0:${ts}:${raw}`).digest('hex')
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

async function slack(method: string, args: Record<string, string | number | undefined>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.SLACK_AISHWARYA_BOT_TOKEN}`, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
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

/* Where the bot may answer. Set SLACK_AISHWARYA_ALLOWED_CHANNELS to one or more channel IDs (comma separated, e.g. C0123ABCD)
   and it ignores @mentions everywhere else. Direct messages are then off unless SLACK_AISHWARYA_ALLOW_DMS is "true".
   With the variable empty the bot answers everywhere it has been added, as before. */
const ALLOWED_CHANNELS = (process.env.SLACK_AISHWARYA_ALLOWED_CHANNELS || '').split(',').map((c) => c.trim()).filter(Boolean)
const channelAllowed = (channel: string) => ALLOWED_CHANNELS.length === 0 || ALLOWED_CHANNELS.includes(channel)
const dmsAllowed = () => ALLOWED_CHANNELS.length === 0 || process.env.SLACK_AISHWARYA_ALLOW_DMS === 'true'

/* The thread so far, oldest first, so follow-up questions keep their context. */
async function threadTurns(channel: string, threadTs: string, botUserId: string): Promise<Turn[]> {
  const { messages } = await slack('conversations.replies', { channel, ts: threadTs, limit: 20 })
  return (messages as SlackMessage[])
    .filter((m) => !m.subtype || m.subtype === 'bot_message')
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

async function answer(event: SlackMessage & { channel: string }, botUserId: string, inThread: boolean) {
  const threadTs = event.thread_ts || (inThread ? event.ts : undefined)
  try {
    const current: Turn[] = [{ role: 'user', content: clean(event.text) }]
    let turns: Turn[] = current
    if (event.thread_ts) {
      // Reading the thread needs the channels:history (public) or groups:history (private) scope in the installed app.
      // If that call fails, still answer the message itself instead of giving up.
      try {
        turns = await threadTurns(event.channel, event.thread_ts, botUserId)
      } catch (error) {
        console.error('[slack:aishwarya-reganti] could not read the thread, answering the message alone', error)
        turns = current
      }
    }
    if (!turns.length || turns[turns.length - 1].role !== 'user') return
    const reply = await askAishwarya(turns, await firstName(event.user))
    await slack('chat.postMessage', { channel: event.channel, thread_ts: threadTs, text: reply })
  } catch (error) {
    console.error('[slack:aishwarya-reganti] reply failed', error)
    await slack('chat.postMessage', { channel: event.channel, thread_ts: threadTs, text: FALLBACK_ERROR }).catch(() => {})
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

  const event = body.event
  const botUserId: string = body.authorizations?.[0]?.user_id ?? ''
  const fromBot = Boolean(event.bot_id) || event.user === botUserId || Boolean(event.subtype)

  if (!fromBot && event.type === 'app_mention' && !String(event.channel).startsWith('D')) {
    if (channelAllowed(String(event.channel))) after(() => answer(event, botUserId, true))
  } else if (!fromBot && event.type === 'message' && event.channel_type === 'im') {
    if (dmsAllowed()) after(() => answer(event, botUserId, false))
  }
  return new NextResponse(null, { status: 200 })
}
