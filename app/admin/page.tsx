import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import LogoutButton from '@/components/LogoutButton'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const today = format(new Date(), 'yyyy-MM-dd')

  // Get all reps
  const { data: reps } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'rep')
    .order('full_name')

  // Get today's routes
  const { data: todaysRoutes } = await supabase
    .from('routes')
    .select(`
      *,
      stops (*),
      profiles!routes_rep_id_fkey (full_name, id)
    `)
    .eq('route_date', today)

  const routeStats = todaysRoutes?.map((route: any) => {
    const stops = route.stops || []
    const finished = stops.filter((s: { status: string }) => s.status === 'finished').length
    const skipped = stops.filter((s: { status: string }) => s.status === 'skipped').length
    const total = stops.length
    return {
      route,
      finished,
      skipped,
      total,
      profile: route.profiles,
    }
  }) || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/reps" className="card hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Manage Reps</h2>
            <p className="text-gray-600">Create and manage rep accounts</p>
            <p className="text-2xl font-bold mt-2">{reps?.length || 0} reps</p>
          </Link>

          <Link href="/admin/routes/new" className="card hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Create Route</h2>
            <p className="text-gray-600">Assign new routes to reps</p>
          </Link>

          <Link href="/admin/routes" className="card hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">All Routes</h2>
            <p className="text-gray-600">View and manage all routes</p>
          </Link>
        </div>

        {/* Today's Routes */}
        <div>
          <h2 className="text-xl font-bold mb-4">Today's Routes</h2>
          {routeStats.length > 0 ? (
            <div className="space-y-3">
              {routeStats.map((stat) => (
                <Link
                  key={stat.route.id}
                  href={`/admin/routes/${stat.route.id}`}
                  className="card hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {stat.route.title || 'Untitled Route'}
                      </h3>
                      <p className="text-gray-600">
                        Rep: {stat.profile?.full_name || 'Unknown'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {stat.finished + stat.skipped} / {stat.total}
                      </p>
                      <p className="text-sm text-gray-600">
                        {stat.finished} finished, {stat.skipped} skipped
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card text-center text-gray-600">
              <p>No routes scheduled for today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
