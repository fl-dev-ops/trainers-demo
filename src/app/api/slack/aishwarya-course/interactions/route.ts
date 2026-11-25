import { NextResponse } from 'next/server'
import { CALL_MODAL, demoSlack, verifiedDemo } from '@/lib/aishwarya-reganti/slack-demo'

/* Interactivity for the demo workspace app.
   - The "Call Aishwarya's twin" shortcut (callback_id call_twin) opens a small window with a Start the call button.
   - Clicks on link buttons such as "Start the call" only need acknowledging; the link opens in the browser. */
export async function POST(req: Request) {
  const raw = await req.text()
  if (!verifiedDemo(req, raw)) return new NextResponse('Invalid signature', { status: 401 })
  try {
    const payload = JSON.parse(new URLSearchParams(raw).get('payload') || '{}')
    if ((payload.type === 'shortcut' || payload.type === 'message_action') && payload.callback_id === 'call_twin' && payload.trigger_id) {
      await demoSlack('views.open', { trigger_id: payload.trigger_id, view: CALL_MODAL })
    }
  } catch (error) {
    console.error('[slack:aishwarya-course] interaction failed', error)
  }
  return new NextResponse(null, { status: 200 })
}
