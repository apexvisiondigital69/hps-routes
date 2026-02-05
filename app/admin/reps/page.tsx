import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreateRepForm from '@/components/CreateRepForm'
import LogoutButton from '@/components/LogoutButton'

export default async function RepsManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all reps
  const { data: reps } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'rep')
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
              <h1 className="text-2xl font-bold">Manage Reps</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Create Rep Form */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Create New Rep</h2>
          <CreateRepForm />
        </div>

        {/* Reps List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Existing Reps</h2>
          {reps && reps.length > 0 ? (
            <div className="space-y-2">
              {reps.map((rep) => (
                <div key={rep.id} className="card">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{rep.full_name || 'No name'}</p>
                      <p className="text-sm text-gray-600">{rep.id}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Created: {new Date(rep.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center text-gray-600">
              <p>No reps created yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
