# OpenBlox

OpenBlox is a browser-based Roblox-inspired building and play platform. The repository is organized as an npm workspace with an independent Vite frontend and Node backend.

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:3001/health`

The current slice includes a Roblox-style launcher focused on one experience, RIVALS: a browser FPS with first-person mouse look, WASD movement, click-to-fire targets, ammo, reload, score, round completion, and a live Three.js arena. The backend still provides the Socket.io room protocol and bounded player snapshots.

Shared network contracts live in `packages/shared-types`, with browser transport in `frontend/src/networking` and room authority in `backend/src/realtime`.

## Validate

```bash
npm run typecheck
npm run build
```

During local development the Vite server sends `Cache-Control: no-store`. If a browser still shows an older screen, use a hard refresh (`Ctrl+Shift+R` on Linux/Windows or `Cmd+Shift+R` on macOS) with the dev server running.

## RIVALS controls

- Click inside the arena to capture the mouse and aim.
- Use `W`, `A`, `S`, and `D` to move.
- Click to fire at red and blue rivals.
- Use `R RELOAD` when the magazine is empty.
- Press `LEAVE` to return to the experience page.

The launcher direction is based on the public Roblox RIVALS page and its current metadata: a single experience detail view, large thumbnail treatment, prominent green Play action, player/like/visit stats, server joining, and FPS/competitive tags. Visual art in OpenBlox is CSS-generated and original rather than copied from Roblox assets.