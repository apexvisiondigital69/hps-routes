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

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { routeId, stops: csvStops } = await request.json()

    if (!routeId || !csvStops || csvStops.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get current max sort_order
    const { data: existingStops } = await supabase
      .from('stops')
      .select('sort_order')
      .eq('route_id', routeId)
      .order('sort_order', { ascending: false })
      .limit(1)

    const startingSortOrder = existingStops && existingStops.length > 0
      ? existingStops[0].sort_order + 1
      : 0

    // Validate and transform stops
    const validStops = csvStops
      .filter((stop: unknown) => {
        if (typeof stop !== 'object' || stop === null) return false
        const s = stop as { address?: string }
        return s.address && s.address.trim().length > 0
      })
      .map((stop: {
        address: string
        phone?: string
        email?: string
        notes?: string
        status?: string
        sort_order?: number
      }, index: number) => {
        const status = ['pending', 'finished', 'skipped'].includes(stop.status || '')
          ? stop.status
          : 'pending'

        return {
          route_id: routeId,
          address: stop.address.trim(),
          phone: stop.phone?.trim() || null,
          email: stop.email?.trim() || null,
          notes: stop.notes?.trim() || null,
          status,
          sort_order: stop.sort_order !== undefined ? stop.sort_order : startingSortOrder + index,
        }
      })

    if (validStops.length === 0) {
      return NextResponse.json({ error: 'No valid stops found in CSV' }, { status: 400 })
    }

    // Insert stops
    const { error: insertError } = await supabase
      .from('stops')
      .insert(validStops)

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, count: validStops.length })
  } catch (error: unknown) {
    console.error('Import stops error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to import stops' },
      { status: 500 }
    )
  }
}
