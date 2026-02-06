import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import LogoutButton from '@/components/LogoutButton'

export default async function RoutesListPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all routes
  const { data: routes } = await supabase
    .from('routes')
    .select(`
      *,
      stops (*),
      profiles!routes_rep_id_fkey (full_name)
    `)
    .order('route_date', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-blue-600 text-xl">
                ←
              </Link>
              <h1 className="text-2xl font-bold">All Routes</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/routes/new" className="btn btn-primary">
                Create Route
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {routes && routes.length > 0 ? (
          <div className="space-y-3">
            {routes.map((route: any) => {
              const stops = route.stops || []
              const finished = stops.filter((s: { status: string }) => s.status === 'finished').length
              const skipped = stops.filter((s: { status: string }) => s.status === 'skipped').length
              const total = stops.length

              return (
                <Link
                  key={route.id}
                  href={`/admin/routes/${route.id}`}
                  className="card hover:shadow-md transition-shadow block"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {route.title || 'Untitled Route'}
                      </h3>
                      <p className="text-gray-600">
                        Rep: {route.profiles?.full_name || 'Unknown'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {format(new Date(route.route_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {finished + skipped} / {total}
                      </p>
                      <p className="text-sm text-gray-600">
                        {total} stops
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="card text-center text-gray-600">
            <p>No routes created yet.</p>
            <Link href="/admin/routes/new" className="btn btn-primary mt-4 inline-block">
              Create First Route
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
