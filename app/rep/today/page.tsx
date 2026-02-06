import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import RepDashboardClient from '@/components/rep/RepDashboardClient'

export default async function RepTodayPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get rep profile for name
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const params = await searchParams
  const selectedDate = params.date || format(new Date(), 'yyyy-MM-dd')

  // Fetch routes for the selected date
  const { data: routes } = await supabase
    .from('routes')
    .select(`
      id,
      created_at,
      stops (
        id,
        address,
        status,
        sort_order
      )
    `)
    .eq('rep_id', user.id)
    .eq('route_date', selectedDate)
    .order('created_at', { ascending: true })

  const allStops = routes?.flatMap((r: any) => r.stops).sort((a: any, b: any) => a.sort_order - b.sort_order) || []
  const finishedCount = allStops.filter((s: any) => s.status === 'finished').length
  const skippedCount = allStops.filter((s: any) => s.status === 'skipped').length
  const totalCount = allStops.length
  const pendingStops = allStops.filter((s: any) => s.status === 'pending')

  return (
    <RepDashboardClient
      initialDate={selectedDate}
      repName={(profile as any)?.full_name || 'Rep'}
      completedCount={finishedCount + skippedCount}
      totalCount={totalCount}
      hasStops={totalCount > 0}
      pendingStops={pendingStops.map((s: any) => ({ id: s.id, address: s.address }))}
    />
  )
}
