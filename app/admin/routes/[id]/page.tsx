import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import LogoutButton from '@/components/LogoutButton'
import RouteDetailClient from '@/components/RouteDetailClient'

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch route with stops
  const { data: route, error } = await supabase
    .from('routes')
    .select(`
      *,
      stops (*),
      profiles!routes_rep_id_fkey (full_name)
    `)
    .eq('id', id)
    .single()

  if (error || !route) {
    redirect('/admin/routes')
  }

  const stops = (route.stops || []).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/admin/routes" className="text-blue-600 text-xl">
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold">
                  {route.title || 'Untitled Route'}
                </h1>
                <p className="text-sm text-gray-600">
                  {route.profiles?.full_name} • {format(new Date(route.route_date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <RouteDetailClient route={route} stops={stops} />
    </div>
  )
}
