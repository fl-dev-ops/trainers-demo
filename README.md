# Trainer demos

A Next.js app for trainer twins, with each trainer under their own `/trainers/<slug>` route. Olga is the first trainer. No authentication.

| Route   | Page                                                                |
| ------- | ------------------------------------------------------------------- |
| `/trainers/olga` | Overview: what the twin is, the two paths, and the sources drawer |
| `/trainers/olga/meet` | Preview video of Olga's twin (`public/media/olga-intro.mp4`) |
| `/trainers/olga/live` | Real-time role play against the LiveKit agent; `?s=<id>` picks a scenario |
| `/trainers/olga/removed` | Shown after confirming "Remove my twin" on the overview (UI only, nothing is deleted yet) |
| `POST /api/connection-details` | Mints the LiveKit join token, creates the room and dispatches the agent |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the LiveKit credentials
npm run dev
```

The LiveKit agent worker must also be running for `/trainers/olga/live` to connect. Credentials are read from
`.env.local` on the server only — the browser never sees the API secret.

## Deploy to Vercel

Import the folder in Vercel, or run `npx vercel` from it. Next.js is detected automatically; add the
same four `LIVEKIT_*` variables as environment variables in the project settings. No rewrite rules
are needed.

## How `/live` is wired

- `src/app/trainers/olga/live/page.tsx` — obtains connection details via `POST /api/connection-details`, then mounts the
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
- Scenario copy lives in `SCENARIOS` in `src/data.js`; `/trainers/olga/live?s=<id>` picks one (defaults to the
  first).
