import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Download, Server, Database, Radio } from 'lucide-react'
import { InfrastructureGlobe } from '@/components/three/InfrastructureGlobe'
import { profile, roles, achievements, careerHighlights } from '@/data/resume'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[calc(100vh-120px)] pt-8">
      <motion.div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px]">
        <div className="space-y-8">
          <motion.div
            className="hero-stagger inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5"
            whileHover={{ scale: 1.02 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-blink" />
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              {profile.role} @ {profile.company} · {profile.period}
            </span>
          </motion.div>

          <div className="hero-stagger space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/80">
              {profile.title}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="block text-slate-100">{profile.name.split(' ')[0]}</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent neon-text">
                {profile.name.split(' ')[1]}
              </span>
            </h1>
          </div>

          <div className="hero-stagger h-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-lg md:text-xl text-cyan-400"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="hero-stagger max-w-lg text-slate-300 text-base leading-relaxed">
            {profile.pitch}
          </p>

          <p className="hero-stagger max-w-lg text-sm text-slate-500 leading-relaxed">
            {profile.summary}
          </p>

          <div className="hero-stagger flex flex-wrap gap-3">
            {achievements.map((a) => (
              <span
                key={a}
                className="rounded-lg border border-indigo-500/15 bg-indigo-500/5 px-3 py-1 font-mono text-[10px] text-indigo-300/80"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="hero-stagger flex flex-wrap gap-4">
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/25 transition-shadow hover:shadow-indigo-500/40"
            >
              See My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={profile.cvUrl}
              download={profile.cvFileName}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/5 px-6 py-3 font-medium text-indigo-300 transition-colors hover:bg-indigo-500/10"
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.a>
          </div>

          <div className="hero-stagger flex gap-6">
            <FloatingIcon icon={Server} label="K8s · Docker" delay={0} />
            <FloatingIcon icon={Database} label="35M+ rows" delay={0.2} />
            <FloatingIcon icon={Radio} label="Kafka" delay={0.4} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative h-[500px] lg:h-[600px]"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl animate-glow-pulse" />
          <div className="relative h-full glass-panel rounded-2xl overflow-hidden scan-overlay">
            <InfrastructureGlobe />
          </div>
          <HeroMetricCard
            className="absolute -left-4 top-1/4"
            label={careerHighlights[0].label}
            value={careerHighlights[0].value}
            trend={careerHighlights[0].detail}
          />
          <HeroMetricCard
            className="absolute -right-4 bottom-1/4"
            label={careerHighlights[1].label}
            value={careerHighlights[1].value}
            trend={careerHighlights[1].detail}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function FloatingIcon({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  delay: number
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
      className="flex flex-col items-center gap-1"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-panel border border-indigo-500/20">
        <Icon className="h-5 w-5 text-indigo-400" />
      </div>
      <span className="font-mono text-[10px] text-slate-500 text-center max-w-[72px]">{label}</span>
    </motion.div>
  )
}

function HeroMetricCard({
  className,
  label,
  value,
  trend,
}: {
  className?: string
  label: string
  value: string
  trend: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      className={cn('glass-panel rounded-xl px-4 py-3 neon-border max-w-[200px]', className)}
    >
      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500 leading-tight">{label}</p>
      <p className="font-display text-lg font-bold text-white">{value}</p>
      <p className="font-mono text-[9px] text-emerald-400/90 leading-snug">{trend}</p>
    </motion.div>
  )
}
