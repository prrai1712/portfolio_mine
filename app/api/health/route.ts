import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    status: 'online',
    system: 'PriyanshuOS',
    version: '3.0.0',
    platform: 'vercel',
  })
}
