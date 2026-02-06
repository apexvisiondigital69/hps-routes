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

    const { routeId, repId, routeDate, title } = await request.json()

    if (!routeId || !repId || !routeDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update route
    const { error: routeError } = await (supabase
      .from('routes') as any)
      .update({
        rep_id: repId,
        route_date: routeDate,
        title: title || null,
      })
      .eq('id', routeId)

    if (routeError) {
      return NextResponse.json({ error: routeError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, routeId })
  } catch (error: unknown) {
    console.error('Update route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update route' },
      { status: 500 }
    )
  }
}
