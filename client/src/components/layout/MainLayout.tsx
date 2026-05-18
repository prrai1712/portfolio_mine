import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { ParticleField } from '@/components/effects/ParticleField'
import { HeroSection } from '@/components/hero/HeroSection'
import { SystemOverview } from '@/components/sections/SystemOverview'
import { GitHubActivity } from '@/components/sections/GitHubActivity'
import { TechArsenal } from '@/components/sections/TechArsenal'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { TerminalSection } from '@/components/sections/TerminalSection'
import { InfrastructureMap } from '@/components/sections/InfrastructureMap'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { ObservabilityStack } from '@/components/sections/ObservabilityStack'
import { useCommandPalette } from '@/components/CommandPalette'

const sections = [
  'overview',
  'github',
  'arsenal',
  'projects',
  'terminal',
  'infra',
  'experience',
  'observability',
]

export function MainLayout() {
  const [activeSection, setActiveSection] = useState('overview')

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveSection(id)
  }, [])

  const { setOpen, palette } = useCommandPalette(handleNavigate)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030712]">
      <ParticleField />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/8 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <TopNav onOpenCommandPalette={() => setOpen(true)} />
      {palette}

      <main className="relative z-10 ml-[104px] pt-24 pr-4 pb-16 pl-4 max-w-[1600px]">
        <HeroSection />

        <div className="mt-24 space-y-24">
          <SystemOverview />
          <GitHubActivity />
          <TechArsenal />
          <FeaturedProjects />
          <TerminalSection />
          <InfrastructureMap />
          <ExperienceTimeline />
          <ObservabilityStack />
        </div>

        <footer className="mt-24 pt-8 border-t border-indigo-500/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-slate-600">
          <span>PriyanshuOS — Built with React · TypeScript · Three.js</span>
          <motion.div className="flex flex-wrap items-center gap-4">
            <a href="https://github.com/prrai1712" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/prrai1712/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:ppprai1712@gmail.com" className="hover:text-cyan-400 transition-colors">
              Email
            </a>
            <span className="text-slate-700">·</span>
            <span>© 2026 Priyanshu Rai · SDE @ Park+ · MANIT Bhopal</span>
          </motion.div>
        </footer>
      </main>
    </div>
  )
}
