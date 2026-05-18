import { fetchGitHubData } from '@/lib/github'
import { MainLayout } from '@/components/layout/MainLayout'

export const revalidate = 3600

export default async function HomePage() {
  const github = await fetchGitHubData()

  return <MainLayout github={github} />
}
