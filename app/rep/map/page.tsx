import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import RepMapClient from '@/components/rep/RepMapClient'

export default async function RepMapPage({
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
        sort_order,
        notes
      )
    `)
    .eq('rep_id', user.id)
    .eq('route_date', selectedDate)
    .order('created_at', { ascending: true })

  const allStops = routes?.flatMap((r: any) => r.stops).sort((a: any, b: any) => a.sort_order - b.sort_order) || []

  // Transform stops for map
  const mapStops = allStops.map((stop: any, index: number) => ({
    id: stop.id,
    address: stop.address,
    status: stop.status,
    stopNumber: index + 1,
    notes: stop.notes,
  }))

  return (
    <RepMapClient
      date={selectedDate}
      repName={(profile as any)?.full_name || 'Rep'}
      stops={mapStops}
    />
  )
}
