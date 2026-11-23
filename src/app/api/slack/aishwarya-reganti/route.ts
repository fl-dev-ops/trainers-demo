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
    headers: { Authorization: `Bearer ${process.env.SLACK_AISHWARYA_BOT_TOKEN}`, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(args),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(`Slack ${method}: ${data.error}`)
  return data
}

const clean = (text = '') => text.replace(/<@[A-Z0-9]+>/g, '').trim()

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
    const turns: Turn[] = event.thread_ts
      ? await threadTurns(event.channel, event.thread_ts, botUserId)
      : [{ role: 'user', content: clean(event.text) }]
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
    after(() => answer(event, botUserId, true))
  } else if (!fromBot && event.type === 'message' && event.channel_type === 'im') {
    after(() => answer(event, botUserId, false))
  }
  return new NextResponse(null, { status: 200 })
}
