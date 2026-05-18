import { motion } from 'framer-motion'

interface SectionHeaderProps {
  tag: string
  title: string
  subtitle?: string
}

export function SectionHeader({ tag, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-end justify-between border-b border-indigo-500/10 pb-4"
    >
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-indigo-400/70">
          {tag}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1 max-w-xl">{subtitle}</p>
        )}
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-[9px] text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-blink" />
        SECTION_ACTIVE
      </div>
    </motion.div>
  )
}
