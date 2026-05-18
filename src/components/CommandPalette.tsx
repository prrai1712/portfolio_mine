'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  LayoutDashboard,
  Activity,
  Cpu,
  FolderKanban,
  Terminal,
  Network,
  Briefcase,
  BarChart3,
  Code2,
  Link2,
  Mail,
  Download,
  FileText,
} from 'lucide-react'
import { profile } from '@/data/resume'
import { cn } from '@/lib/utils'

export interface CommandItem {
  id: string
  label: string
  group: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onNavigate: (sectionId: string) => void
}

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const commands: CommandItem[] = useMemo(
    () => [
      { id: 'overview', label: 'What I\'ve Built', group: 'Navigate', icon: LayoutDashboard, action: () => onNavigate('overview') },
      { id: 'github', label: 'Recent Repositories', group: 'Navigate', icon: Activity, action: () => onNavigate('github') },
      { id: 'arsenal', label: 'Engineering Arsenal', group: 'Navigate', icon: Cpu, action: () => onNavigate('arsenal') },
      { id: 'projects', label: 'Personal Projects', group: 'Navigate', icon: FolderKanban, action: () => onNavigate('projects') },
      { id: 'terminal', label: 'Quick Facts', group: 'Navigate', icon: Terminal, action: () => onNavigate('terminal') },
      { id: 'infra', label: 'Distributed Systems Architecture', group: 'Navigate', icon: Network, action: () => onNavigate('infra') },
      { id: 'experience', label: 'Work & Education', group: 'Navigate', icon: Briefcase, action: () => onNavigate('experience') },
      { id: 'observability', label: 'Production Monitoring', group: 'Navigate', icon: BarChart3, action: () => onNavigate('observability') },
      { id: 'gh', label: 'Open GitHub Profile', group: 'Links', icon: Code2, action: () => window.open(profile.github, '_blank') },
      { id: 'li', label: 'Open LinkedIn Profile', group: 'Links', icon: Link2, action: () => window.open(profile.linkedin, '_blank') },
      { id: 'email', label: 'Send Email', group: 'Links', icon: Mail, action: () => { window.location.href = `mailto:${profile.email}` } },
      { id: 'cv', label: 'Download Resume (PDF)', group: 'Links', icon: Download, action: () => {
        const a = document.createElement('a')
        a.href = profile.cvUrl
        a.download = profile.cvFileName
        a.click()
      }},
    ],
    [onNavigate]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    )
  }, [commands, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault()
        filtered[activeIndex].action()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, filtered, activeIndex, onClose])

  const runCommand = (cmd: CommandItem) => {
    cmd.action()
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[290] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[18%] z-[291] w-full max-w-lg -translate-x-1/2 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="glass-panel rounded-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 overflow-hidden">
              <div className="flex items-center gap-3 border-b border-indigo-500/15 px-4 py-3">
                <Search className="h-4 w-4 text-indigo-400 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, links, actions…"
                  className="flex-1 bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 outline-none"
                />
                <kbd className="hidden sm:inline font-mono text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                  ESC
                </kbd>
              </div>

              <ul className="max-h-[320px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <li className="px-4 py-6 text-center font-mono text-xs text-slate-500">
                    No results for &quot;{query}&quot;
                  </li>
                ) : (
                  filtered.map((cmd, i) => (
                    <li key={cmd.id}>
                      <button
                        type="button"
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                          i === activeIndex
                            ? 'bg-indigo-500/15 text-white'
                            : 'text-slate-400 hover:bg-white/5'
                        )}
                      >
                        <cmd.icon className="h-4 w-4 shrink-0 text-indigo-400" />
                        <span className="flex-1 text-sm">{cmd.label}</span>
                        <span className="font-mono text-[9px] uppercase text-slate-600">
                          {cmd.group}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <div className="flex items-center justify-between border-t border-indigo-500/10 px-4 py-2 font-mono text-[9px] text-slate-600">
                <span className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  PriyanshuOS
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function useCommandPalette(onNavigate: (id: string) => void) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const palette = (
    <CommandPalette
      open={open}
      onClose={() => setOpen(false)}
      onNavigate={(id) => {
        onNavigate(id)
        setOpen(false)
      }}
    />
  )

  return { open, setOpen, palette }
}
