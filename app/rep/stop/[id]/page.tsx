import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StopDetailClient from '@/components/StopDetailClient'

export default async function StopDetailPage({
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

  // Fetch stop and verify it belongs to this rep
  const { data: stop, error } = await supabase
    .from('stops')
    .select(`
      id,
      address,
      phone,
      email,
      notes,
      status,
      routes!inner (
        rep_id
      )
    `)
    .eq('id', id)
    .single()

  if (error || !stop || (stop as any).routes.rep_id !== user.id) {
    redirect('/rep/today')
  }

  return <StopDetailClient stop={stop as any} />
}
