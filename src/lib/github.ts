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

export interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  error: string | null
}

const GITHUB_HEADERS: HeadersInit = {
  Accept: 'application/vnd.github+json',
}

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  if (!token) return GITHUB_HEADERS
  return { ...GITHUB_HEADERS, Authorization: `Bearer ${token}` }
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const username = profile.githubUsername

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: authHeaders(),
        next: { revalidate: 3600, tags: ['github-user'] },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers: authHeaders(),
          next: { revalidate: 3600, tags: ['github-repos'] },
        }
      ),
    ])

    const user = userRes.ok ? ((await userRes.json()) as GitHubUser) : null
    const reposRaw = reposRes.ok ? await reposRes.json() : []
    const repos: GitHubRepo[] = Array.isArray(reposRaw)
      ? reposRaw.map((r: GitHubRepo) => ({
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          updated_at: r.updated_at,
        }))
      : []

    return { user, repos, error: null }
  } catch {
    return { user: null, repos: [], error: 'Could not load GitHub data' }
  }
}
