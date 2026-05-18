import { NextResponse } from 'next/server'
import { getMetrics } from '@/lib/telemetry'

export const revalidate = 60

export async function GET() {
  const metrics = await getMetrics()
  return NextResponse.json(metrics)
}
