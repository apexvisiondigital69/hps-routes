import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import RepRouteDayClient from '@/components/rep/RepRouteDayClient'
import type { StopUIData } from '@/types/rep'

export default async function RepRouteDayPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { date } = await params

  // Get rep profile for name
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

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
        sort_order,
        notes
      )
    `)
    .eq('rep_id', user.id)
    .eq('route_date', date)
    .order('created_at', { ascending: true })

  const allStops = routes?.flatMap((r: any) => r.stops).sort((a: any, b: any) => a.sort_order - b.sort_order) || []
  const finishedCount = allStops.filter((s: any) => s.status === 'finished').length
  const skippedCount = allStops.filter((s: any) => s.status === 'skipped').length
  const totalCount = allStops.length
  const completedCount = finishedCount + skippedCount

  // Transform stops to UI data
  const stopsUIData: StopUIData[] = allStops.map((stop: any, index: number) => ({
    id: stop.id,
    stopNumber: index + 1,
    status: stop.status,
    primaryLabel: stop.address,
    secondaryLabel: stop.notes || 'No additional details',
    tag: undefined,
    etaLabel: undefined,
    metaRight: undefined,
  }))

  // Get next pending stop
  const nextStop = allStops.find((s: any) => s.status === 'pending')
  const pendingStops = allStops.filter((s: any) => s.status === 'pending')

  return (
    <RepRouteDayClient
      date={date}
      repName={(profile as any)?.full_name || 'Rep'}
      completedCount={completedCount}
      totalCount={totalCount}
      stops={stopsUIData}
      nextStopAddress={nextStop?.address || null}
      nextStopId={nextStop?.id || null}
      pendingStops={pendingStops.map((s: any) => ({ id: s.id, address: s.address }))}
    />
  )
}
