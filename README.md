# PriyanshuOS

Cinematic engineering operating system — Next.js fullstack portfolio optimized for **Vercel**.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion, GSAP, React Three Fiber
- **Backend:** Next.js Route Handlers (no Express)
- **Database:** Prisma + Neon PostgreSQL (optional — site works with static fallbacks)

## Quick start

```bash
npm install
cp .env.example .env   # add Neon DATABASE_URL when ready
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel (recommended)

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import **`portfolio_mine`**.
3. Framework: **Next.js** (auto-detected).
4. Environment variables:
   - `DATABASE_URL` — Neon connection string ([neon.tech](https://neon.tech))
   - `GITHUB_TOKEN` — optional, for higher GitHub API limits
5. Deploy.

```bash
npx prisma db push   # after DATABASE_URL is set (optional)
```

## API routes

| Route | Description |
|-------|-------------|
| `GET /api/health` | Edge health check |
| `GET /api/metrics` | Telemetry (Prisma or resume defaults) |
| `GET /api/activity` | Activity log |
| `GET /api/github` | Cached GitHub profile + repos |

## Project structure

```
app/              # App Router, API routes, globals.css
src/components/   # UI (client components)
src/data/         # Resume & arsenal content
src/lib/          # Prisma, GitHub, telemetry helpers
prisma/           # Schema
public/           # Static assets + resume PDF
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run db:push` | Push Prisma schema to Neon |
