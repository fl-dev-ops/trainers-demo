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
