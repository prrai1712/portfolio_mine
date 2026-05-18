import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

const defaultMetrics = {
  projects: 12,
  rowsValidated: 35_000_000,
  uptime: 99.97,
  kafkaPipelines: 8,
  apiThroughput: '24.7K',
  activeWorkers: 48,
  deployments: 156,
  errorRate: 0.03,
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'online', system: 'PriyanshuOS', version: '2.4.1' })
})

app.get('/api/metrics', async (_req, res) => {
  try {
    const latest = await prisma.telemetrySnapshot.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    if (latest) {
      res.json({
        projects: latest.projects,
        rowsValidated: Number(latest.rowsValidated),
        uptime: latest.uptime,
        kafkaPipelines: latest.kafkaPipelines,
        apiThroughput: latest.apiThroughput,
        activeWorkers: latest.activeWorkers,
      })
      return
    }
  } catch {
    // DB not configured — return defaults
  }
  res.json(defaultMetrics)
})

app.get('/api/activity', async (_req, res) => {
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    if (logs.length > 0) {
      res.json(logs)
      return
    }
  } catch {
    // fallback
  }
  res.json([
    { event: 'Kafka consumer lag normalized', level: 'success' },
    { event: 'Validation batch #4821 completed — 2.1M rows', level: 'info' },
    { event: 'Celery worker pool scaled to 48', level: 'warning' },
    { event: 'Redis cache hit ratio: 94.2%', level: 'success' },
    { event: 'Jenkins pipeline #156 deployed', level: 'info' },
  ])
})

app.listen(PORT, () => {
  console.log(`PriyanshuOS API running on http://localhost:${PORT}`)
})
