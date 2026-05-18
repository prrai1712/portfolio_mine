'use client'

import { motion } from 'framer-motion'
import { Command, Radio, Wifi, Zap } from 'lucide-react'
import { useSystemClock } from '@/hooks/useSystemClock'
import { profile } from '@/data/resume'

interface TopNavProps {
  onOpenCommandPalette: () => void
}

export function TopNav({ onOpenCommandPalette }: TopNavProps) {
  const { formatted, date } = useSystemClock()

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 right-4 left-[104px] z-40 flex h-14 items-center justify-between px-6 glass-panel rounded-2xl"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 font-mono text-xs text-slate-400 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">⌘K Command Palette</span>
          <span className="sm:hidden">⌘K</span>
        </button>
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <span className="text-indigo-400">{profile.osName}</span>
          <span className="text-slate-700">/</span>
          <span>v2.4.1</span>
        </div>
      </div>

      <motion.div className="flex items-center gap-6">
        <TelemetryPill icon={Radio} label="TELEMETRY" status="ACTIVE" color="emerald" />
        <TelemetryPill icon={Wifi} label="NETWORK" status="STABLE" color="cyan" />
        <TelemetryPill icon={Zap} label="PIPELINES" status="LIVE" color="purple" />

        <div className="h-8 w-px bg-indigo-500/20" />

        <div className="text-right font-mono">
          <div className="text-sm font-medium text-slate-200 tabular-nums">{formatted}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">{date}</div>
        </div>
      </motion.div>
    </motion.header>
  )
}

function TelemetryPill({
  icon: Icon,
  label,
  status,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  status: string
  color: 'emerald' | 'cyan' | 'purple'
}) {
  const colors = {
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
  }

  return (
    <div className="hidden lg:flex items-center gap-2">
      <Icon className={`h-3.5 w-3.5 ${colors[color]}`} />
      <div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</div>
        <div className={`font-mono text-[10px] font-medium ${colors[color]}`}>{status}</div>
      </div>
    </div>
  )
}
