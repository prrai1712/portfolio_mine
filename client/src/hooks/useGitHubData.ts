import { useEffect, useState } from 'react'
import { profile } from '@/data/resume'

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
}

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
}

export function useGitHubData() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const username = profile.githubUsername

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
          ),
        ])

        if (userRes.ok) {
          setUser(await userRes.json())
        }

        if (reposRes.ok) {
          const data = await reposRes.json()
          setRepos(
            data.map((r: GitHubRepo) => ({
              name: r.name,
              description: r.description,
              html_url: r.html_url,
              language: r.language,
              stargazers_count: r.stargazers_count,
              updated_at: r.updated_at,
            }))
          )
        }
      } catch {
        setError('Could not load GitHub data')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { user, repos, loading, error }
}
