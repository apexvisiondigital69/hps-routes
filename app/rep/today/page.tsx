import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function RepTodayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const today = format(new Date(), 'yyyy-MM-dd')

  // Fetch today's routes for this rep
  const { data: routes } = await supabase
    .from('routes')
    .select(`
      *,
      stops (*)
    `)
    .eq('rep_id', user.id)
    .eq('route_date', today)
    .order('created_at', { ascending: true })

  const allStops = routes?.flatMap((r: any) => r.stops).sort((a: any, b: any) => a.sort_order - b.sort_order) || []
  const finishedCount = allStops.filter((s: any) => s.status === 'finished').length
  const skippedCount = allStops.filter((s: any) => s.status === 'skipped').length
  const totalCount = allStops.length

  // Get next pending stop
  const nextStop = allStops.find((s: any) => s.status === 'pending')

  // Build Google Maps URL for full route
  const buildFullRouteUrl = () => {
    const pendingStops = allStops.filter((s: any) => s.status === 'pending')
    if (pendingStops.length === 0) return null
    if (pendingStops.length === 1) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((pendingStops[0] as any).address)}&travelmode=walking`
    }

    const origin = encodeURIComponent((pendingStops[0] as any).address)
    const destination = encodeURIComponent((pendingStops[pendingStops.length - 1] as any).address)
    const waypoints = pendingStops.slice(1, -1).map((s: any) => encodeURIComponent(s.address)).join('|')

    // Google Maps has URL length limits, so check length
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`

    return url.length > 2000 ? null : url
  }

  const fullRouteUrl = buildFullRouteUrl()

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Today</h1>
              <p className="text-sm text-gray-600">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Progress Card */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Progress</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{finishedCount + skippedCount} / {totalCount}</p>
              <p className="text-sm text-gray-600">
                {finishedCount} finished, {skippedCount} skipped
              </p>
            </div>
            {nextStop && (
              <Link
                href={`/rep/stop/${nextStop.id}`}
                className="btn btn-primary"
              >
                Next Stop
              </Link>
            )}
          </div>
        </div>

        {/* Open Full Route */}
        {fullRouteUrl && (
          <a
            href={fullRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block btn btn-secondary text-center"
          >
            Open Full Route in Google Maps
          </a>
        )}

        {!fullRouteUrl && allStops.filter(s => s.status === 'pending').length > 1 && (
          <div className="text-sm text-gray-600 text-center">
            Too many stops for full route view. Use "Next Stop" button instead.
          </div>
        )}

        {/* Route List */}
        {routes && routes.length > 0 ? (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold px-1">Stops</h2>
            {allStops.map((stop) => (
              <Link
                key={stop.id}
                href={`/rep/stop/${stop.id}`}
                className="flex card hover:shadow-md transition-shadow"
              >
                <div className={`status-indicator status-${stop.status}`} />
                <div className="flex-1 pl-3">
                  <p className="font-medium">{stop.address}</p>
                  <p className="text-sm text-gray-600 capitalize">{stop.status}</p>
                </div>
                <div className="text-gray-400">›</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center text-gray-600">
            <p>No routes assigned for today.</p>
          </div>
        )}
      </div>
    </div>
  )
}
