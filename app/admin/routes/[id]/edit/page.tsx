import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import EditRouteForm from '@/components/EditRouteForm'

export default async function EditRoutePage({
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

  // Fetch route
  const { data: route, error } = await supabase
    .from('routes')
    .select(`
      *,
      profiles!routes_rep_id_fkey (full_name)
    `)
    .eq('id', id)
    .single()

  if (error || !route) {
    redirect('/admin/routes')
  }

  // Fetch all reps
  const { data: reps } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'rep')
    .order('full_name')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href={`/admin/routes/${id}`} className="text-blue-600 text-xl">
                ←
              </Link>
              <h1 className="text-2xl font-bold">Edit Route</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <EditRouteForm route={route as any} reps={reps || []} />
      </div>
    </div>
  )
}
