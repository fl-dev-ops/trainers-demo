import { NextResponse } from 'next/server'
import { CALL_URL, verifiedDemo } from '@/lib/aishwarya-reganti/slack-demo'

/* Slash command /call-aishwarya in the demo workspace: replies (only to the person who typed it) with a
   button that opens a one-to-one voice call with Aishwarya's twin. Slack can't put an app into a huddle,
   so the call opens in the browser. */
export async function POST(req: Request) {
  const raw = await req.text()
  if (!verifiedDemo(req, raw)) return new NextResponse('Invalid signature', { status: 401 })
  return NextResponse.json({
    response_type: 'ephemeral',
    text: `Start a voice call with Aishwarya's twin: ${CALL_URL}`,
    blocks: [
      { type: 'section', text: { type: 'mrkdwn', text: "*Talk to Aishwarya's twin*\nA one-to-one voice call in your browser. Allow the microphone when asked." } },
      {
        type: 'actions',
        elements: [
          { type: 'button', style: 'primary', action_id: 'open_call', text: { type: 'plain_text', text: 'Start the call' }, url: CALL_URL },
        ],
      },
    ],
  })
}
