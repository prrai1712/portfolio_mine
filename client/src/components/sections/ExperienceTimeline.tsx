import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Building2 } from 'lucide-react'
import { experience } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

const typeIcons = {
  current: Briefcase,
  past: Building2,
  education: GraduationCap,
}

const typeColors = {
  current: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
  past: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400',
  education: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
}

export function ExperienceTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="space-y-6">
      <SectionHeader
        tag="EXPERIENCE"
        title="Work & Education"
        subtitle="What I've done at Park+ and where I studied"
      />

      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent md:-translate-x-px" />

        <div className="space-y-8">
          {experience.map((item, i) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons]
            const isEven = i % 2 === 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className={cn(
                  'relative grid md:grid-cols-2 gap-8 items-center',
                  !isEven && 'md:[&>*:first-child]:order-2'
                )}
              >
                <motion.div
                  className={cn(
                    'md:px-8',
                    isEven ? 'md:text-right md:pr-16' : 'md:pl-16'
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-widest mb-3',
                      typeColors[item.type as keyof typeof typeColors]
                    )}
                  >
                    {item.type === 'current' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-blink" />
                    )}
                    {item.period}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">{item.role}</h3>
                  <p className="text-indigo-400 font-medium mt-1">{item.company}</p>
                </motion.div>

                <div
                  className={cn(
                    'absolute left-8 md:left-1/2 -translate-x-1/2 z-10',
                    'flex h-10 w-10 items-center justify-center rounded-xl glass-panel border border-indigo-500/30'
                  )}
                >
                  <Icon className="h-4 w-4 text-indigo-400" />
                </div>

                <div className={cn('md:px-8', isEven ? 'md:pl-16' : 'md:pr-16 md:text-right')}>
                  <div className="glass-panel rounded-xl p-5 space-y-2">
                    {item.highlights.map((h, hi) => (
                      <motion.div
                        key={hi}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: i * 0.2 + hi * 0.08 }}
                        className="flex gap-2 text-sm text-slate-400"
                      >
                        <span className="text-cyan-500 shrink-0 font-mono">›</span>
                        <span>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
