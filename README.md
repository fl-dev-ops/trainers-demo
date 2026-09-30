# Trainer demos

A Next.js app for trainer twins, with each trainer under their own `/trainers/<slug>` route. Olga is the first trainer. No authentication.

Repository: [fl-dev-ops/trainers-demo](https://github.com/fl-dev-ops/trainers-demo).

| Route   | Page                                                                |
| ------- | ------------------------------------------------------------------- |
| `/trainers/olga` | Overview: what the twin is, the two paths, and the sources drawer |
| `/trainers/olga/meet` | Preview video of Olga's twin (`public/media/olga-intro.mp4`) |
| `/trainers/olga/live` | Real-time role play against the LiveKit agent; `?s=<id>` picks a scenario |
| `/trainers/olga/removed` | Shown after confirming "Remove my twin" on the overview (UI only, nothing is deleted yet) |
| `POST /api/connection-details` | Mints the LiveKit join token, creates the room and dispatches the agent |

`/` redirects to `/trainers/olga`. The previous `/meet`, `/live`, and `/removed` URLs redirect to their Olga routes, preserving query parameters.

## Adding trainers

Add each trainer's pages under `src/app/trainers/<slug>/`, for example `/trainers/vasanth`. Olga's pages and metadata live in `src/app/trainers/olga/`.

Trainer data in `src/data.js` and the LiveKit API currently support Olga only. Adding another trainer also requires their content, media, and agent configuration; adding a route alone does not switch the agent.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the LiveKit credentials
npm run dev
```

The LiveKit agent worker must also be running for `/trainers/olga/live` to connect. Credentials are read from
`.env.local` on the server only — the browser never sees the API secret.

## Deploy to Vercel

Import `fl-dev-ops/trainers-demo` as a new `trainers-demo` project under **Forever Learning's projects** (`forever-learnings-projects`). Next.js is detected automatically. Use `main` as the production branch and the repository root as the root directory.

Add these server-side environment variables from your local configuration:

- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_AGENT_NAME`

Keep credentials out of Git. The LiveKit agent worker must run separately; deploying this app does not deploy the worker.

Deployment is pending: the current Vercel CLI account was denied permission to create the project. Authenticate with an account that can create projects in the selected team before deploying.

## Redirecting from trainertwin.com

The existing app continues to serve `trainertwin.com`. Configure redirects in that existing website's Vercel project so only `/trainers` and `/trainers/*` send visitors to this app's production URL.

Expected behavior once configured:

- `trainertwin.com/trainers` → this app's `/trainers/olga` page.
- `trainertwin.com/trainers/olga` → this app's `/trainers/olga` page.
- Trainer subpaths and query parameters are preserved.

This is a redirect: the browser address changes to the demo app's hostname. The rule belongs in the existing website project, because that project receives requests for `trainertwin.com`. The redirect is pending until the new app has a verified production URL.

## How `/trainers/olga/live` is wired

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
