import { createHmac, timingSafeEqual } from 'node:crypto'

/* Shared by the demo-workspace Slack endpoints (slash command and interactivity). The env names match
   /api/slack/aishwarya-course: SLACK_AISHWARYA_BOT_DEMO_SIGNING_SECRET (or the older COURSE name). */
export function verifiedDemo(req: Request, raw: string): boolean {
  const secret = process.env.SLACK_AISHWARYA_BOT_DEMO_SIGNING_SECRET || process.env.SLACK_AISHWARYA_COURSE_SIGNING_SECRET
  const ts = req.headers.get('x-slack-request-timestamp')
  const sig = req.headers.get('x-slack-signature')
  if (!secret || !ts || !sig) return false
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 60 * 5) return false
  const expected = 'v0=' + createHmac('sha256', secret).update(`v0:${ts}:${raw}`).digest('hex')
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

/* Her voice twin (no video): the same live room as the demo page's Voice post-it. Each visit gets its own room,
   so every call is one to one. */
export const CALL_URL = process.env.AISHWARYA_CALL_URL || 'https://trainers.trainertwin.com/aishwarya-reganti/live?mode=voice'

const DEMO_TOKEN = () =>
  process.env.SLACK_AISHWARYA_BOT_DEMO_BOT_TOKEN || process.env.SLACK_AISHWARYA_BOT_DEMO_TOKEN || process.env.SLACK_AISHWARYA_COURSE_BOT_TOKEN

/* Slack Web API call for the demo workspace app, form-encoded (objects and arrays sent as JSON strings). */
export async function demoSlack(method: string, args: Record<string, unknown>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${DEMO_TOKEN()}`, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    body: new URLSearchParams(
      Object.entries(args).filter(([, v]) => v !== undefined).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)]),
    ),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(`Slack ${method}: ${data.error}`)
  return data
}

const CALL_BUTTON = { type: 'actions', elements: [{ type: 'button', style: 'primary', action_id: 'open_call', text: { type: 'plain_text', text: 'Start the call' }, url: CALL_URL }] }

/* The app's Home tab: what people see when they click "Aishwarya's twin" under Apps in the sidebar. */
export const HOME_VIEW = {
  type: 'home',
  blocks: [
    { type: 'header', text: { type: 'plain_text', text: "Talk to Aishwarya's twin" } },
    { type: 'section', text: { type: 'mrkdwn', text: "A one-to-one voice call with Aishwarya Reganti's AI twin, built from her own posts and videos. It opens in your browser; allow the microphone when asked." } },
    CALL_BUTTON,
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: "*Other ways to ask*\n• @mention `@Aishwarya's twin` in a channel, by text or with a voice note, and it answers in a thread.\n• Send it a direct message or a voice note in the Messages tab.\n• Type `/call-aishwarya` anywhere to start a call." } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: 'A demo by TrainerTwin. It is not a replacement for Aishwarya.' }] },
  ],
}

/* The modal opened by the "Call Aishwarya's twin" shortcut in the + menu. */
export const CALL_MODAL = {
  type: 'modal',
  title: { type: 'plain_text', text: "Aishwarya's twin" },
  close: { type: 'plain_text', text: 'Close' },
  blocks: [
    { type: 'section', text: { type: 'mrkdwn', text: '*Start a voice call*\nA one-to-one call in your browser. Allow the microphone when asked.' } },
    CALL_BUTTON,
  ],
}
