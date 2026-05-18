import { motion } from 'framer-motion'
import type { FlowEdge, FlowNode, TechSystem } from '@/data/techArsenal'

const typeStyles: Record<FlowNode['type'], string> = {
  source: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
  process: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
  store: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  observe: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
}

interface TechFlowDiagramProps {
  tech: TechSystem
  active: boolean
}

export function TechFlowDiagram({ tech, active }: TechFlowDiagramProps) {
  const nodes = tech.flowNodes
  const edges = tech.flowEdges

  return (
    <div className="relative rounded-xl border border-indigo-500/15 bg-slate-950/60 p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <p className="relative font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-4">
        Architecture flow · click nodes in mind while reading
      </p>

      <div className="relative flex flex-col items-center gap-0">
        {nodes.map((node, i) => {
          const incoming = edges.find((e) => e.to === node.id)
          const outgoing = edges.find((e) => e.from === node.id)

          return (
            <div key={node.id} className="flex flex-col items-center w-full max-w-xs">
              {incoming && i > 0 && (
                <FlowBeam label={incoming.label} accent={tech.accent} active={active} delay={i * 0.15} />
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`relative z-10 w-full rounded-lg border px-4 py-3 text-center font-mono text-xs ${typeStyles[node.type]}`}
                style={{ boxShadow: `0 0 24px ${tech.glow}` }}
              >
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {node.label}
              </motion.div>
              {outgoing && i === nodes.length - 1 && null}
            </div>
          )
        })}
      </div>

      {/* Horizontal mini map for multi-branch */}
      {edges.length > nodes.length - 1 && (
        <div className="relative mt-4 pt-4 border-t border-slate-800/50">
          <p className="font-mono text-[8px] text-slate-600 mb-2">Connection map</p>
          <motion.div className="flex flex-wrap gap-2 justify-center">
            {edges.map((e, i) => (
              <span
                key={`${e.from}-${e.to}`}
                className="font-mono text-[9px] text-slate-500 border border-slate-800 rounded px-2 py-1"
              >
                {tech.flowNodes.find((n) => n.id === e.from)?.label} →{' '}
                <span style={{ color: tech.accent }}>{e.label ?? 'flow'}</span> →{' '}
                {tech.flowNodes.find((n) => n.id === e.to)?.label}
              </span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

function FlowBeam({
  label,
  accent,
  active,
  delay,
}: {
  label?: string
  accent: string
  active: boolean
  delay: number
}) {
  return (
    <div className="relative flex flex-col items-center py-2 min-h-[48px] w-full max-w-[2px]">
      <motion.div
        className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-indigo-500/50 to-cyan-500/30"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : {}}
        transition={{ delay, duration: 0.4 }}
        style={{ originY: 0 }}
      />
      {active && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay, ease: 'linear' }}
        />
      )}
      {label && (
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[8px] whitespace-nowrap"
          style={{ color: accent }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
