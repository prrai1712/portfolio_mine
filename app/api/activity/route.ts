import { NextResponse } from 'next/server'
import { getActivity } from '@/lib/telemetry'

export const revalidate = 60

export async function GET() {
  const activity = await getActivity()
  return NextResponse.json(activity)
}
