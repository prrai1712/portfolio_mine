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
