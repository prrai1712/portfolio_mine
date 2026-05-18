import { prisma } from '@/lib/prisma'
import { careerHighlights } from '@/data/resume'

export const defaultMetrics = {
  projects: 2,
  rowsValidated: 35_000_000,
  uptime: 99.9,
  kafkaPipelines: 8,
  apiThroughput: 'High',
  activeWorkers: 0,
}

export const defaultActivity = [
  {
    event: `DVT validated ${careerHighlights[0]?.value ?? '35M+'} rows (GCP → Linode)`,
    level: 'success',
  },
  {
    event: `Manual verification reduced by ${careerHighlights[1]?.value ?? '90%+'}`,
    level: 'info',
  },
  {
    event: `Bulk CSV pipelines — ${careerHighlights[2]?.value ?? '25L+'} records`,
    level: 'info',
  },
  { event: 'Grafana / Kibana / New Relic observability stack', level: 'success' },
]

function dbConfigured() {
  return Boolean(process.env.DATABASE_URL)
}

export async function getMetrics() {
  if (!dbConfigured()) return defaultMetrics
  try {
    const latest = await prisma.telemetrySnapshot.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    if (latest) {
      return {
        projects: latest.projects,
        rowsValidated: Number(latest.rowsValidated),
        uptime: latest.uptime,
        kafkaPipelines: latest.kafkaPipelines,
        apiThroughput: latest.apiThroughput,
        activeWorkers: latest.activeWorkers,
      }
    }
  } catch {
    // DB optional until Neon is configured
  }
  return defaultMetrics
}

export async function getActivity() {
  if (!dbConfigured()) return defaultActivity
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    if (logs.length > 0) {
      return logs.map((l) => ({ event: l.event, level: l.level }))
    }
  } catch {
    // fallback
  }
  return defaultActivity
}
