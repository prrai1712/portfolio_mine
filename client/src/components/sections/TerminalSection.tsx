import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { terminalLines } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function TerminalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (visibleLines >= terminalLines.length) return
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1)
    }, 120)
    return () => clearTimeout(timer)
  }, [isInView, visibleLines])

  return (
    <section id="terminal" ref={ref} className="space-y-6">
      <SectionHeader
        tag="QUICK_FACTS"
        title="Quick Facts"
        subtitle="A short snapshot of who I am as an engineer"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="glass-panel rounded-xl overflow-hidden border border-emerald-500/10"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800/50">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="flex-1 text-center font-mono text-[10px] text-slate-500">
            priyanshu@priyanshuos — zsh — 120×32
          </span>
          <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
            LIVE
          </span>
        </div>

        <div className="p-4 font-mono text-sm leading-relaxed min-h-[320px] bg-[#0a0e17]/90">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              {line.type === 'prompt' ? (
                <>
                  <span className="text-emerald-400 shrink-0">→</span>
                  <span
                    className={
                      i === visibleLines - 1 && line.text.endsWith('_')
                        ? 'text-slate-200 terminal-cursor'
                        : 'text-slate-200'
                    }
                  >
                    {line.text.replace(/_$/, '')}
                  </span>
                </>
              ) : (
                <span className="text-slate-500 pl-4">{line.text}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
