import { motion } from 'framer-motion'
import type { ArchLayer, NodeStatus } from '@/data/architecture'
import { cn } from '@/lib/utils'

const statusConfig: Record<NodeStatus, { dot: string; label: string }> = {
  online: { dot: 'bg-emerald-400', label: 'ONLINE' },
  active: { dot: 'bg-cyan-400', label: 'ACTIVE' },
  processing: { dot: 'bg-amber-400', label: 'PROCESSING' },
  streaming: { dot: 'bg-purple-400', label: 'STREAMING' },
}

interface ArchLayerRowProps {
  layer: ArchLayer
  isInView: boolean
  delay: number
}

export function ArchLayerRow({ layer, isInView, delay }: ArchLayerRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-stretch gap-3">
        <div className="flex flex-col items-center justify-center w-10 shrink-0">
          <span className="font-mono text-[10px] font-bold text-indigo-400/90 tabular-nums">
            {String(layer.index).padStart(2, '0')}
          </span>
          <div className="w-px flex-1 min-h-[24px] bg-indigo-500/20 my-1" />
        </div>

        <div className="flex-1 rounded-xl border border-indigo-500/15 bg-gradient-to-r from-indigo-500/5 via-slate-900/40 to-transparent p-4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-400">
                {layer.title}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{layer.subtitle}</p>
            </div>
            {layer.throughput && (
              <span className="font-mono text-[9px] text-cyan-400/90 border border-cyan-500/20 rounded px-2 py-0.5 bg-cyan-500/5">
                {layer.throughput}
              </span>
            )}
          </div>

          <div
            className={cn(
              'relative grid gap-3',
              layer.nodes.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
            )}
          >
            {layer.nodes.map((node, ni) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay + 0.1 + ni * 0.08 }}
                className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 relative group"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm text-white">{node.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{node.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="flex items-center gap-1 font-mono text-[8px] text-slate-500">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full animate-pulse',
                          statusConfig[node.status].dot
                        )}
                      />
                      {statusConfig[node.status].label}
                    </span>
                    {node.metric && (
                      <span className="font-mono text-[9px] text-indigo-300/80">{node.metric}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {layer.nodes.length > 1 && (
            <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="font-mono text-[8px] text-slate-600 bg-slate-900 px-1.5 rounded">→</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
