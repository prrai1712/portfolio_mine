import { motion } from 'framer-motion'
import { observabilityStack, architectureLayers } from '@/data/architecture'

interface ObservabilityRailProps {
  isInView: boolean
}

export function ObservabilityRail({ isInView }: ObservabilityRailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.4 }}
      className="glass-panel rounded-xl p-4 h-full flex flex-col border border-cyan-500/15"
    >
      <div className="mb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
          Telemetry taps
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          Every layer emits metrics, logs & traces downstream
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[480px] pr-1">
        {architectureLayers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="flex items-center gap-2 py-1.5 border-b border-slate-800/40 last:border-0"
          >
            <span className="font-mono text-[8px] text-slate-600 w-5">{String(layer.index).padStart(2, '0')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/40 to-cyan-500/20 relative overflow-hidden">
              {isInView && (
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              )}
            </div>
            <span className="font-mono text-[8px] text-cyan-500/70 shrink-0">OBS</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-indigo-500/15 space-y-2">
        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-2">
          Observability stack
        </p>
        {observabilityStack.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-2.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: tool.color, boxShadow: `0 0 8px ${tool.color}80` }}
              />
              <span className="text-xs font-medium text-white">{tool.name}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 pl-4">{tool.role}</p>
            <p className="font-mono text-[9px] mt-1 pl-4" style={{ color: tool.color }}>
              {tool.metric}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
