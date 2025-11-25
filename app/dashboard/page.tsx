import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { RecentActivityTable } from "@/components/recent-activity-table"
import { SectionCards } from "@/components/section-cards"
import { createServerClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createServerClient()

  const [
    { count: articlesCount },
    { count: projectsCount },
    { count: servicesCount },
    { count: inquiriesCount },
    { data: recentArticles },
    { data: recentProjects }
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('id, title, published, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('projects').select('id, title, published, created_at').order('created_at', { ascending: false }).limit(5)
  ])

  const counts = {
    articles: articlesCount || 0,
    projects: projectsCount || 0,
    services: servicesCount || 0,
    inquiries: inquiriesCount || 0
  }

  const activityData = [
    ...(recentArticles || []).map(a => ({
      id: a.id,
      title: a.title,
      type: 'Article' as const,
      status: a.published ? 'Published' : 'Draft',
      date: a.created_at
    })),
    ...(recentProjects || []).map(p => ({
      id: p.id,
      title: p.title,
      type: 'Project' as const,
      status: p.published ? 'Published' : 'Draft',
      date: p.created_at
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8">
      <SectionCards counts={counts} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-7">
          <ChartAreaInteractive />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <RecentActivityTable data={activityData} />
      </div>
    </div>
  )
}
