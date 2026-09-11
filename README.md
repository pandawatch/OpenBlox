# OpenBlox

OpenBlox is a browser-based Roblox-inspired building and play platform. The repository is organized as an npm workspace with an independent Vite frontend and Node backend.

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:3001/health`

The current slice includes the nostalgia-inspired discovery hub, avatar and friends views, a live Three.js world, a browser-side DataModel, character movement, and a Socket.io room protocol. Players join `brickbound`, publish movement snapshots, and receive synchronized player state. Server-side positions are bounded before broadcast.

Shared network contracts live in `packages/shared-types`, with browser transport in `frontend/src/networking` and room authority in `backend/src/realtime`.

## Validate

```bash
npm run typecheck
npm run build
```

During local development the Vite server sends `Cache-Control: no-store`. If a browser still shows an older screen, use a hard refresh (`Ctrl+Shift+R` on Linux/Windows or `Cmd+Shift+R` on macOS) with the dev server running.