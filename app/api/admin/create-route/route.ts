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

    const { repId, routeDate, title, addresses } = await request.json()

    if (!repId || !routeDate || !addresses || addresses.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create route
    const { data: route, error: routeError } = await (supabase
      .from('routes') as any)
      .insert({
        rep_id: repId,
        route_date: routeDate,
        title: title || null,
        created_by: user.id,
      })
      .select()
      .single()

    if (routeError) {
      return NextResponse.json({ error: routeError.message }, { status: 400 })
    }

    // Create stops
    const stops = addresses.map((address: string, index: number) => ({
      route_id: route.id,
      address,
      sort_order: index,
      status: 'pending',
    }))

    const { error: stopsError } = await (supabase
      .from('stops') as any)
      .insert(stops)

    if (stopsError) {
      // Cleanup: delete the route if stops creation fails
      await supabase.from('routes').delete().eq('id', route.id)
      return NextResponse.json({ error: stopsError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, routeId: route.id })
  } catch (error: unknown) {
    console.error('Create route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create route' },
      { status: 500 }
    )
  }
}
