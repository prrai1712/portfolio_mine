import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

function generateChartData(points: number) {
  return Array.from({ length: points }, (_, i) => ({
    x: i,
    y: 30 + Math.sin(i * 0.3) * 20 + Math.random() * 15,
  }))
}

export function ObservabilityStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const latencyData = useMemo(() => generateChartData(40), [])
  const errorData = useMemo(() => generateChartData(40), [])
  const throughputData = useMemo(() => generateChartData(40), [])

  const stacks = [
    { name: 'Grafana', color: '#f46800', metric: 'SLA dashboards & service health' },
    { name: 'Kibana', color: '#fec514', metric: 'Log search & incident debugging' },
    { name: 'New Relic', color: '#1ce783', metric: 'APM traces & production alerts' },
  ]

  return (
    <section id="observability" ref={ref} className="space-y-6">
      <SectionHeader
        tag="MONITORING"
        title="Production Monitoring"
        subtitle="Tools I use at Park+ to keep systems reliable — charts below are decorative"
      />

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {stacks.map((stack, i) => (
          <motion.div
            key={stack.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-xl p-4 flex items-center gap-4"
          >
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center font-display text-xs font-bold"
              style={{ backgroundColor: `${stack.color}20`, color: stack.color }}
            >
              {stack.name[0]}
            </div>
            <div>
              <p className="font-medium text-white">{stack.name}</p>
              <p className="font-mono text-[10px] text-slate-500">{stack.metric}</p>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-blink" />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <ChartPanel
          title="API Latency (p99)"
          unit="ms"
          data={latencyData}
          color="#6366f1"
          isInView={isInView}
          delay={0.2}
        />
        <ChartPanel
          title="Error Rate"
          unit="%"
          data={errorData}
          color="#ef4444"
          isInView={isInView}
          delay={0.3}
        />
        <ChartPanel
          title="Throughput"
          unit="req/s"
          data={throughputData}
          color="#22d3ee"
          isInView={isInView}
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400">
            Reliability wins
          </h3>
          <span className="font-mono text-[9px] text-slate-500">FROM RESUME</span>
        </div>
        <div className="space-y-2 font-mono text-[11px]">
          {[
            { level: 'DONE', msg: 'DVT validated 35M+ rows for GCP → Linode migration', time: 'Resume' },
            { level: 'DONE', msg: 'Automated audits cut manual DB checks by 90%+', time: 'Resume' },
            { level: 'DONE', msg: 'Bulk CSV pipelines optimized for 25L+ records', time: 'Resume' },
            { level: 'INFO', msg: 'Grafana / Kibana / New Relic dashboards & alert playbooks', time: 'Resume' },
            { level: 'INFO', msg: 'Docker · Jenkins · Kubernetes deploys in prod', time: 'Resume' },
          ].map((alert, i) => (
            <div
              key={i}
              className="flex gap-4 py-2 border-b border-slate-800/30 last:border-0"
            >
              <span
                className={`shrink-0 w-12 ${
                  alert.level === 'WARN'
                    ? 'text-amber-400'
                    : alert.level === 'OK'
                      ? 'text-emerald-400'
                      : 'text-blue-400'
                }`}
              >
                {alert.level}
              </span>
              <span className="text-slate-400 flex-1">{alert.msg}</span>
              <span className="text-slate-600">{alert.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ChartPanel({
  title,
  unit,
  data,
  color,
  isInView,
  delay,
}: {
  title: string
  unit: string
  data: { x: number; y: number }[]
  color: string
  isInView: boolean
  delay: number
}) {
  const maxY = Math.max(...data.map((d) => d.y))
  const pathD = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - (d.y / maxY) * 80
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const areaD = `${pathD} L 100 100 L 0 100 Z`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="glass-panel rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            {title}
          </p>
          <p className="font-display text-lg font-bold text-white">
            {(data[data.length - 1]?.y ?? 0).toFixed(1)}{' '}
            <span className="text-xs font-normal text-slate-500">{unit}</span>
          </p>
        </div>
        <span className="h-1.5 w-1.5 rounded-full animate-blink" style={{ backgroundColor: color }} />
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaD}
          fill={`url(#grad-${title})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: delay + 0.2, duration: 1.5 }}
        />
      </svg>
    </motion.div>
  )
}
