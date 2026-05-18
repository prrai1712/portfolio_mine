import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Building2, Rocket, ChevronRight } from 'lucide-react'
import type { TechSystem } from '@/data/techArsenal'
import { TechFlowDiagram } from './TechFlowDiagram'

interface TechDetailModalProps {
  tech: TechSystem | null
  onClose: () => void
}

export function TechDetailModal({ tech, onClose }: TechDetailModalProps) {
  useEffect(() => {
    if (!tech) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onEsc)
    }
  }, [tech, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {tech && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-lg"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-[301] flex flex-col overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#060a14] shadow-2xl left-4 right-4 top-4 bottom-4 sm:left-6 sm:right-6 sm:top-6 sm:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[min(calc(100%-3rem),56rem)] md:right-auto"
            style={{ boxShadow: `0 0 80px ${tech.glow}, 0 25px 50px rgba(0,0,0,0.5)` }}
            role="dialog"
            aria-modal
            aria-label={`${tech.name} engineering deep dive`}
          >
            {/* Header glow */}
            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none opacity-40"
              style={{
                background: `linear-gradient(180deg, ${tech.glow}, transparent)`,
              }}
            />

            <header className="relative flex items-start justify-between gap-4 px-6 py-6 md:px-8 border-b border-indigo-500/15 shrink-0">
              <div className="min-w-0 flex-1 pr-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  {tech.category} · SYS_MODULE
                </p>
                <h2
                  className="font-display text-3xl md:text-4xl font-bold mt-1"
                  style={{ color: tech.accent }}
                >
                  {tech.name}
                </h2>
                <p className="text-slate-400 mt-1">{tech.tagline}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tech.telemetry.map((t) => (
                    <span
                      key={t.label}
                      className="font-mono text-[9px] rounded border border-slate-700/80 bg-slate-900/80 px-2 py-1 text-slate-400"
                    >
                      {t.label}: <span style={{ color: tech.accent }}>{t.value}</span>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 md:px-8 md:py-8 space-y-8">
              {/* What is it */}
              <section>
                <SectionLabel icon={Zap} label="What is it?" accent={tech.accent} />
                <p className="text-slate-300 leading-relaxed text-sm md:text-base mt-3">
                  {tech.simpleWhat}
                </p>
              </section>

              {/* Why it exists */}
              <section>
                <SectionLabel icon={Building2} label="Why does it exist?" accent={tech.accent} />
                <p className="text-slate-400 leading-relaxed text-sm mt-3">{tech.whyExists}</p>
                <ul className="mt-4 space-y-2">
                  {tech.whyCompaniesUse.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-400">
                      <ChevronRight className="h-4 w-4 shrink-0" style={{ color: tech.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Production use - highlighted */}
              <section
                className="rounded-xl border p-5 relative overflow-hidden"
                style={{ borderColor: `${tech.accent}40`, background: `${tech.accent}08` }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${tech.glow}, transparent 60%)`,
                  }}
                />
                <SectionLabel icon={Rocket} label="How I used it in production" accent={tech.accent} />
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  {tech.useCases.map((u) => (
                    <span
                      key={u}
                      className="font-mono text-[10px] px-2 py-1 rounded-full border"
                      style={{ borderColor: `${tech.accent}50`, color: tech.accent }}
                    >
                      {u}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3 relative">
                  {tech.productionUse.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 text-sm text-slate-200 leading-relaxed"
                    >
                      <span
                        className="font-mono text-[10px] shrink-0 mt-0.5"
                        style={{ color: tech.accent }}
                      >
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Flow diagram */}
              <section>
                <SectionLabel icon={Zap} label="System flow" accent={tech.accent} />
                <div className="mt-4">
                  <TechFlowDiagram tech={tech} active />
                </div>
              </section>

              {/* Concepts */}
              <section>
                <SectionLabel icon={Zap} label="Key concepts" accent={tech.accent} />
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {tech.concepts.map((c, i) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-4"
                    >
                      <p className="font-medium text-sm text-white">{c.title}</p>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{c.body}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

function SectionLabel({
  icon: Icon,
  label,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  accent: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" style={{ color: accent }} />
      <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">{label}</h3>
    </div>
  )
}
