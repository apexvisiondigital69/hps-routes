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

    const { routeId, address, phone, email, notes } = await request.json()

    if (!routeId || !address) {
      return NextResponse.json({ error: 'Route ID and address are required' }, { status: 400 })
    }

    // Get current max sort_order for this route
    const { data: existingStops } = await supabase
      .from('stops')
      .select('sort_order')
      .eq('route_id', routeId)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = existingStops && existingStops.length > 0
      ? (existingStops[0] as any).sort_order + 1
      : 0

    // Insert the new stop
    const { data: newStop, error: insertError } = await (supabase
      .from('stops') as any)
      .insert({
        route_id: routeId,
        address: address.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        notes: notes?.trim() || null,
        status: 'pending',
        sort_order: nextSortOrder,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, stop: newStop })
  } catch (error: unknown) {
    console.error('Add stop error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add stop' },
      { status: 500 }
    )
  }
}
