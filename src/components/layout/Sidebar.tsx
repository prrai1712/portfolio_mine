'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Activity,
  Cpu,
  FolderKanban,
  Terminal,
  Network,
  Briefcase,
  BarChart3,
  FileDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { profile } from '@/data/resume'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons/SocialIcons'

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'github', icon: Activity, label: 'Repos' },
  { id: 'arsenal', icon: Cpu, label: 'Arsenal' },
  { id: 'projects', icon: FolderKanban, label: 'Projects' },
  { id: 'terminal', icon: Terminal, label: 'Quick Facts' },
  { id: 'infra', icon: Network, label: 'Architecture' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'observability', icon: BarChart3, label: 'Monitoring' },
]

const socialLinks = [
  {
    id: 'github',
    href: profile.github,
    label: 'GitHub',
    short: 'GH',
    Icon: GitHubIcon,
    hoverClass: 'hover:text-white hover:border-slate-500 hover:bg-slate-800/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.15)]',
  },
  {
    id: 'linkedin',
    href: profile.linkedin,
    label: 'LinkedIn',
    short: 'IN',
    Icon: LinkedInIcon,
    hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_16px_rgba(10,102,194,0.25)]',
  },
  {
    id: 'email',
    href: `mailto:${profile.email}`,
    label: 'Email',
    short: '@',
    Icon: MailIcon,
    hoverClass: 'hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]',
  },
]

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-4 top-4 bottom-4 z-50 flex w-[72px] flex-col items-center py-5 glass-panel rounded-2xl neon-border"
    >
      <button
        type="button"
        onClick={() => onNavigate('overview')}
        className="mb-6 flex flex-col items-center gap-1 group"
        title="PriyanshuOS Home"
      >
        <div className="relative">
          <motion.div
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center transition-transform group-hover:scale-105"
            animate={{
              boxShadow: [
                '0 0 20px rgba(99,102,241,0.4)',
                '0 0 40px rgba(34,211,238,0.3)',
                '0 0 20px rgba(99,102,241,0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-display text-xs font-bold text-white">PR</span>
          </motion.div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0f1e] animate-blink" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest text-indigo-400/80 group-hover:text-indigo-300">
          OS
        </span>
      </button>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item, i) => {
          const isActive = activeSection === item.id
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300'
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
              )}
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl border border-indigo-500/40 bg-indigo-500/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="relative h-[18px] w-[18px]" />
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}
            </motion.button>
          )
        })}
      </nav>

      <div className="mt-auto flex w-full flex-col items-center gap-3 px-2">
        <div className="w-full glass-panel rounded-lg px-2 py-2 text-center border border-emerald-500/15">
          <motion.div className="flex items-center gap-1.5 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider">ONLINE</span>
          </motion.div>
          <span className="font-mono text-[8px] text-slate-600 block mt-0.5">Park+ · SDE</span>
        </div>

        <a
          href={profile.cvUrl}
          download={profile.cvFileName}
          className="flex h-9 w-full items-center justify-center gap-1 rounded-lg border border-indigo-500/20 bg-indigo-500/5 text-indigo-400/90 transition-all hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-indigo-300"
          title="Download resume"
        >
          <FileDown className="h-3.5 w-3.5" />
          <span className="font-mono text-[8px] uppercase tracking-wider">CV</span>
        </a>

        <div className="w-full">
          <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-600 text-center mb-2">
            Connect
          </p>
          <div className="flex flex-col gap-1.5">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={cn(
                  'group/social relative flex h-10 w-full items-center justify-center rounded-lg border border-slate-800/80 bg-slate-900/50 text-slate-500 transition-all duration-300',
                  link.hoverClass
                )}
                title={link.label}
              >
                <link.Icon className="h-[18px] w-[18px] transition-transform group-hover/social:scale-110" />
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[10px] text-slate-300 opacity-0 transition-opacity group-hover/social:opacity-100 lg:group-hover/social:block">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
