# PriyanshuOS

Cinematic engineering operating system — a live systems intelligence platform built as an immersive command center UI.

## Stack

**Frontend:** React, TypeScript, Vite, TailwindCSS, Framer Motion, GSAP, React Three Fiber, Three.js

**Backend:** Node.js, Express, PostgreSQL, Prisma

## Quick Start

```bash
# Frontend
cd client
npm install
npm run dev

# Backend (optional — serves telemetry API)
cd server
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Frontend runs at `http://localhost:5173`. API proxies to `http://localhost:3001`.

## Structure

```
client/          # React + Vite frontend
server/          # Express + Prisma API
```

## Deploy on Render

Uses a **Node web service** that builds the Vite app and serves `client/dist` with `serve` (reliable SPA + assets).

1. [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint** → repo **`portfolio_mine`**.
2. Or edit existing **priyanshuos** service:
   - **Runtime:** Node
   - **Build Command:** `./scripts/render-build.sh`
   - **Start Command:** `cd client && npm start`
   - **Publish Directory:** leave empty (not a static site)
3. **Manual Deploy** → check **Clear build cache**, then deploy.

Live URL: [https://priyanshuos.onrender.com](https://priyanshuos.onrender.com)

**If you see “Not Found”:** the publish path was likely wrong (`dist` instead of `client/dist`) or the service was still a static site with a bad deploy. Switch to Node + commands above and redeploy.
