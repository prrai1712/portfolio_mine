'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, Radio } from 'lucide-react'
import { architectureLayers, observabilityStack, pipelineTelemetry } from '@/data/architecture'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArchLayerRow } from './architecture/ArchLayerRow'
import { FlowConnector } from './architecture/FlowConnector'
import { ObservabilityRail } from './architecture/ObservabilityRail'

export function InfrastructureMap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infra" ref={ref} className="space-y-6 pb-12">
      <SectionHeader
        tag="PRODUCTION_TOPOLOGY"
        title="Distributed Systems Architecture"
        subtitle="Request flow through Park+ scale backend — sync path, async workers, event streams, validation, storage & observability"
      />

      {/* Live telemetry strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {pipelineTelemetry.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.08 }}
            className="glass-panel rounded-lg px-4 py-3 border border-indigo-500/10"
          >
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">{t.label}</p>
            <p className="font-display text-lg font-bold text-white mt-0.5">
              {t.value}
              <span className="text-[10px] font-normal text-slate-500 ml-1">{t.unit}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid xl:grid-cols-[1fr_260px] gap-4">
        {/* Main pipeline — top to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="glass-panel rounded-2xl p-5 md:p-8 relative overflow-visible border border-indigo-500/10"
        >
          <div className="absolute inset-0 grid-bg animate-grid-pulse opacity-20 rounded-2xl pointer-events-none" />

          {/* Flow direction legend */}
          <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-indigo-500/10">
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
              <ArrowDown className="h-3.5 w-3.5 text-cyan-400" />
              <span>REQUEST FLOW</span>
              <span className="text-slate-700">|</span>
              <span className="text-indigo-400">PRODUCTION PATH</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
              <Radio className="h-3 w-3 animate-pulse" />
              LIVE TOPOLOGY
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {architectureLayers.map((layer, i) => (
              <motion.div key={layer.id}>
                <ArchLayerRow layer={layer} isInView={isInView} delay={i * 0.08} />
                {i < architectureLayers.length - 1 && (
                  <FlowConnector
                    label={layer.flowLabel}
                    throughput={i === 0 ? layer.throughput : architectureLayers[i + 1]?.throughput}
                    isInView={isInView}
                    delay={i * 0.1}
                    variant={layer.nodes.length > 1 ? 'branch' : 'primary'}
                  />
                )}
              </motion.div>
            ))}

            {/* Final connector into observability layer */}
            <FlowConnector
              label="metrics · logs · traces"
              throughput="all layers"
              isInView={isInView}
              delay={0.55}
            />

            {/* Layer 07 — Observability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-cyan-500/25 bg-gradient-to-b from-cyan-500/10 to-indigo-500/5 p-5 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] font-bold text-cyan-400">07</span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                      OBSERVABILITY LAYER
                    </p>
                    <p className="text-[11px] text-slate-500">
                      SLA dashboards · log pipelines · APM — production control plane
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  {observabilityStack.map((tool, ti) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + ti * 0.08 }}
                      className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-4 text-center relative"
                    >
                      <motion.div
                        className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: tool.color }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="font-display text-sm font-bold" style={{ color: tool.color }}>
                        {tool.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">{tool.role}</p>
                      <p className="font-mono text-[9px] mt-2 text-slate-400">{tool.metric}</p>
                      {isInView && (
                        <motion.div
                          className="mt-3 h-1 rounded-full bg-slate-800 overflow-hidden"
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: tool.color }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.9 + ti * 0.1, duration: 1.2 }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Side rail — telemetry taps */}
        <ObservabilityRail isInView={isInView} />
      </div>

      {/* Data flow summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-xl p-4 font-mono text-[11px] text-slate-500 leading-relaxed"
      >
        <span className="text-indigo-400">FLOW SUMMARY · </span>
        Client traffic enters via{' '}
        <span className="text-slate-300">API Gateway</span>, handled synchronously by{' '}
        <span className="text-slate-300">Django</span>. Heavy work is offloaded to{' '}
        <span className="text-slate-300">Redis → Celery</span>. Events propagate through{' '}
        <span className="text-slate-300">Kafka</span> into{' '}
        <span className="text-slate-300">validation pipelines (DVT)</span> before persisting to{' '}
        <span className="text-slate-300">MySQL / MongoDB</span>.{' '}
        <span className="text-cyan-400">Grafana, Kibana & New Relic</span> observe every stage.
      </motion.div>
    </section>
  )
}
