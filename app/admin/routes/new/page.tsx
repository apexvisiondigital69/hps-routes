import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreateRouteForm from '@/components/CreateRouteForm'
import LogoutButton from '@/components/LogoutButton'

export default async function CreateRoutePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
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
              <Link href="/admin/routes" className="text-blue-600 text-xl">
                ←
              </Link>
              <h1 className="text-2xl font-bold">Create Route</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <CreateRouteForm reps={reps || []} />
      </div>
    </div>
  )
}
