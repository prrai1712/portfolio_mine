'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { careerHighlights, whatIDo, workLog } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function SystemOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="overview" ref={ref} className="space-y-6">
      <SectionHeader
        tag="HIGHLIGHTS"
        title="What I've Built"
        subtitle="Real numbers and work from my resume — backend engineering at scale"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {careerHighlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }}
            className="metric-glow glass-panel glass-panel-hover rounded-xl p-4 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent"
          >
            <p className="font-display text-2xl font-bold text-white">{item.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-1">
              {item.label}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-xl p-4 md:col-span-1"
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-4">
            Recent impact
          </h3>
          <ul className="space-y-2">
            {workLog.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex gap-2 text-[12px] text-slate-400 border-l border-indigo-500/25 pl-3 py-0.5"
              >
                <span className="text-cyan-500 shrink-0">›</span>
                {line}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-xl p-4 md:col-span-2"
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-4">
            What I do day to day
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatIDo.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.05 }}
                className="rounded-lg border border-slate-800/80 bg-slate-900/30 p-3"
              >
                <p className="text-sm font-medium text-white">{area.title}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{area.description}</p>
                <p className="font-mono text-[9px] text-indigo-400/80 mt-2">{area.stack}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
