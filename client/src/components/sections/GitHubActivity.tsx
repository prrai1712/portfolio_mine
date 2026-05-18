import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code2, Star, GitBranch, Loader2 } from 'lucide-react'
import { profile } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useGitHubData } from '@/hooks/useGitHubData'

export function GitHubActivity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { user, repos, loading, error } = useGitHubData()

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
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-16 w-16 rounded-xl border border-indigo-500/30 shrink-0"
          />
        ) : (
          <Code2 className="h-10 w-10 text-indigo-400 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            @{profile.githubUsername}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
            {user?.bio ?? 'Backend engineer · MANIT Bhopal'}
          </p>
          {user && (
            <div className="flex gap-4 mt-3 font-mono text-[10px] text-slate-500">
              <span>
                <span className="text-white font-semibold">{user.public_repos}</span> repos
              </span>
              <span>
                <span className="text-white font-semibold">{user.followers}</span> followers
              </span>
              <span>
                <span className="text-white font-semibold">{user.following}</span> following
              </span>
            </div>
          )}
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 shrink-0">
          View profile
          <ExternalLink className="h-3 w-3" />
        </span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-xl p-5"
      >
        {error && (
          <p className="text-sm text-amber-400/90 mb-4">{error}</p>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4 hover:border-indigo-500/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-sm text-indigo-300 group-hover:text-cyan-300 truncate">
                    {repo.name}
                  </span>
                  <GitBranch className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 min-h-[2rem]">
                  {repo.description ?? 'No description'}
                </p>
                <div className="flex items-center gap-3 mt-3 font-mono text-[9px] text-slate-600">
                  {repo.language && <span>{repo.language}</span>}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
