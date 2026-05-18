'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { arsenalSystems } from '@/data/techArsenal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechSystemCard } from './arsenal/TechSystemCard'
import { TechDetailModal } from './arsenal/TechDetailModal'
import { getTechById } from '@/data/techArsenal'

const categories = [
  'All',
  'Languages',
  'Event Streaming',
  'Cache & Queue',
  'Application Framework',
  'Orchestration',
  'Containers',
  'Relational Database',
  'Document Database',
  'Observability',
  'CI/CD',
  'Cloud Platform',
]

export function TechArsenal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? arsenalSystems
      : arsenalSystems.filter((t) => t.category === filter)

  const selectedTech = selectedId ? getTechById(selectedId) : null

  return (
    <section id="arsenal" ref={ref} className="space-y-6">
      <SectionHeader
        tag="ENGINEERING_ARSENAL"
        title="Engineering Arsenal"
        subtitle="Interactive systems knowledge — click any technology for architecture, production usage, and animated flows"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="glass-panel rounded-xl p-4 flex flex-wrap gap-2"
      >
        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest w-full mb-1">
          Filter by layer
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-all ${
              filter === cat
                ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                : 'border-slate-800 text-slate-500 hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tech, i) => (
          <TechSystemCard
            key={tech.id}
            tech={tech}
            index={i}
            isInView={isInView}
            onOpen={() => setSelectedId(tech.id)}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-center font-mono text-[10px] text-slate-600"
      >
        {arsenalSystems.length} production systems documented · ESC to close detail view
      </motion.p>

      <TechDetailModal tech={selectedTech ?? null} onClose={() => setSelectedId(null)} />
    </section>
  )
}
