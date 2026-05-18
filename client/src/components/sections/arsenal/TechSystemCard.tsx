import { motion } from 'framer-motion'
import { ChevronRight, Cpu } from 'lucide-react'
import type { TechSystem } from '@/data/techArsenal'

interface TechSystemCardProps {
  tech: TechSystem
  index: number
  isInView: boolean
  onOpen: () => void
}

export function TechSystemCard({ tech, index, isInView, onOpen }: TechSystemCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group relative w-full text-left rounded-xl border border-indigo-500/15 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-5 overflow-hidden transition-shadow hover:shadow-lg"
      style={{
        ['--tech-accent' as string]: tech.accent,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${tech.glow}, transparent 70%)`,
        }}
      />

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="h-4 w-4" style={{ color: tech.accent }} />
      </div>

      <div
        className="flex h-11 w-11 items-center justify-center rounded-lg border font-display font-bold text-lg mb-4"
        style={{
          borderColor: `${tech.accent}40`,
          backgroundColor: `${tech.accent}15`,
          color: tech.accent,
          boxShadow: `0 0 20px ${tech.glow}`,
        }}
      >
        {tech.name.slice(0, 2).toUpperCase()}
      </div>

      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
        {tech.category}
      </p>
      <h3 className="font-display text-lg font-bold text-white mt-1 group-hover:text-cyan-100 transition-colors">
        {tech.name}
      </h3>
      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{tech.tagline}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {tech.useCases.slice(0, 2).map((u) => (
          <span
            key={u}
            className="font-mono text-[8px] text-slate-600 border border-slate-800 rounded px-1.5 py-0.5"
          >
            {u}
          </span>
        ))}
      </div>

      <p
        className="mt-4 font-mono text-[9px] flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ color: tech.accent }}
      >
        <Cpu className="h-3 w-3" />
        Open deep dive
      </p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: tech.accent }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
