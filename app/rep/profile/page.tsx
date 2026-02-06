import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RepProfileClient from '@/components/rep/RepProfileClient'

export default async function RepProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get rep profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, created_at')
    .eq('id', user.id)
    .single()

  return (
    <RepProfileClient
      email={user.email || ''}
      fullName={(profile as any)?.full_name || 'Rep'}
      role={(profile as any)?.role || 'rep'}
      createdAt={(profile as any)?.created_at}
    />
  )
}
