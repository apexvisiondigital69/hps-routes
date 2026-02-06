import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if ((profile as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { stopId } = await request.json()

    if (!stopId) {
      return NextResponse.json({ error: 'Stop ID required' }, { status: 400 })
    }

    const { error: deleteError } = await supabase
      .from('stops')
      .delete()
      .eq('id', stopId)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Delete stop error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete stop' },
      { status: 500 }
    )
  }
}
