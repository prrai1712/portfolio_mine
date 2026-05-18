'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function FeaturedProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="space-y-6">
      <SectionHeader
        tag="PROJECTS"
        title="Personal Projects"
        subtitle="Side projects that show how I design backends and APIs"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className="group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 space-y-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                  personal project
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className="font-mono text-[10px] text-indigo-400/80 mt-0.5">{project.subtitle}</p>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>

              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-[12px] text-slate-400">
                    <span className="text-cyan-500 shrink-0">›</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-indigo-500/15 bg-indigo-500/5 px-2 py-1 font-mono text-[10px] text-indigo-300/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-1 bg-slate-900 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 1.5 }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
