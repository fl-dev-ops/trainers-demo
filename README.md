# Olga's Twin

A Next.js prototype of the Olga twin. No authentication.

| Route   | Page                                                                |
| ------- | ------------------------------------------------------------------- |
| `/`     | Overview: what the twin is, the two paths, and the sources drawer   |
| `/meet` | Preview video of Olga's twin (`public/media/olga-intro.mp4`)       |
| `/live` | Real-time role play against the LiveKit agent. Asks for your name first; `/live?s=<id>` picks a scenario |
| `/removed` | Shown after confirming "Remove my twin" on the overview (UI only, nothing is deleted yet) |
| `POST /api/connection-details` | Mints the LiveKit join token, creates the room and dispatches the agent |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the LiveKit credentials
npm run dev
```

The LiveKit agent worker must also be running for `/live` to connect. Credentials are read from
`.env.local` on the server only — the browser never sees the API secret.

## Deploy to Vercel

Import the folder in Vercel, or run `npx vercel` from it. Next.js is detected automatically; add the
same four `LIVEKIT_*` variables as environment variables in the project settings. No rewrite rules
are needed.

## How `/live` is wired

- `src/app/live/page.tsx` — a pre-join gate asks for the user's name (which the agent uses as
  `user_name`), trades it for connection details via `POST /api/connection-details`, then mounts the
  room with `useSession` + `SessionProvider`. The status pill, the mm:ss clock, the camera/mic
  toggles and the hang-up button are all driven by the room.
- `src/app/api/connection-details/route.ts` — creates the room, dispatches the agent and mints a
  participant token using the `olga` profile metadata.
- `src/lib/livekit.ts` — server-only LiveKit helpers (credentials, room + dispatch clients, token).
- `src/lib/connection.ts` — the client-side connection details shape and its sessionStorage key.
- `src/live/AvatarStage.jsx` — renders the agent's avatar video (`agent.cameraTrack`) into
  `.rtile-slot` (`#twin-avatar`).
- `src/live/TranscriptPanel.jsx` — renders the room's messages as `lines` (`{ id, who, text }`) and
  sends the typed message back to the room.
- Scenario copy lives in `SCENARIOS` in `src/data.js`; `/live?s=<id>` picks one (defaults to the
  first).
