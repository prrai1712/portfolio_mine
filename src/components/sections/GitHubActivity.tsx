'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code2, Star, GitBranch } from 'lucide-react'
import { profile } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { GitHubData } from '@/lib/github'

interface GitHubActivityProps {
  initialData: GitHubData
}

export function GitHubActivity({ initialData }: GitHubActivityProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { user, repos, error } = initialData

  return (
    <section id="github" ref={ref} className="space-y-6">
      <SectionHeader
        tag="GITHUB"
        title="Recent Repositories"
        subtitle={`Open source & projects from @${profile.githubUsername}`}
      />

      <motion.a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 group max-w-2xl"
      >
        {user?.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={64}
            height={64}
            className="h-16 w-16 rounded-xl border border-indigo-500/30 shrink-0 object-cover"
          />
        ) : (
          <Code2 className="h-10 w-10 text-indigo-400 shrink-0" />
        )}
        <motion.div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            @{profile.githubUsername}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {user?.bio ?? 'Backend engineer · MANIT Bhopal'}
          </p>
          {user && (
            <p className="font-mono text-[10px] text-slate-500 mt-2">
              {user.public_repos} repos · {user.followers} followers
            </p>
          )}
        </motion.div>
        <span className="font-mono text-xs text-indigo-400 shrink-0">View profile →</span>
      </motion.a>

      {error && (
        <p className="font-mono text-xs text-amber-400/90">{error}</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06 }}
            className="glass-panel glass-panel-hover rounded-xl p-5 group block"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-mono text-sm text-indigo-300 group-hover:text-cyan-300 truncate">
                {repo.name}
              </h4>
              <ExternalLink className="h-3.5 w-3.5 text-slate-600 shrink-0" />
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5rem]">
              {repo.description ?? 'No description'}
            </p>
            <div className="flex items-center gap-4 mt-4 font-mono text-[10px] text-slate-600">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {repo.stargazers_count}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
