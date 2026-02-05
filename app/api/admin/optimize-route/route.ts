import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

// Haversine distance calculation (fallback)
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Nearest neighbor algorithm (fallback)
function nearestNeighborOptimization(stops: { id: string; lat: number; lng: number }[]): string[] {
  if (stops.length <= 1) return stops.map(s => s.id)

  const unvisited = [...stops]
  const route = [unvisited.shift()!]

  while (unvisited.length > 0) {
    const current = route[route.length - 1]
    let nearestIndex = 0
    let nearestDistance = Infinity

    unvisited.forEach((stop, index) => {
      const distance = haversineDistance(current.lat, current.lng, stop.lat, stop.lng)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    route.push(unvisited.splice(nearestIndex, 1)[0])
  }

  return route.map(s => s.id)
}

// Geocode an address using Google Maps Geocoding API
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!GOOGLE_MAPS_API_KEY) return null

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    )
    const data = await response.json()

    if (data.status === 'OK' && data.results[0]) {
      const location = data.results[0].geometry.location
      return { lat: location.lat, lng: location.lng }
    }

    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

// Optimize route using Google Maps Directions API
async function optimizeWithGoogle(stops: { id: string; lat: number; lng: number }[]): Promise<string[] | null> {
  if (!GOOGLE_MAPS_API_KEY || stops.length < 2) return null

  // Google Directions API has a limit of 25 waypoints (23 intermediate + origin + destination)
  if (stops.length > 25) {
    console.warn('Too many stops for Google optimization, using fallback')
    return null
  }

  try {
    const origin = `${stops[0].lat},${stops[0].lng}`
    const destination = `${stops[stops.length - 1].lat},${stops[stops.length - 1].lng}`
    const waypoints = stops
      .slice(1, -1)
      .map(s => `${s.lat},${s.lng}`)
      .join('|')

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=optimize:true|${waypoints}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.routes[0]) {
      const waypointOrder = data.routes[0].waypoint_order || []

      // Reconstruct the optimized order
      const optimizedIds = [stops[0].id]
      waypointOrder.forEach((index: number) => {
        optimizedIds.push(stops[index + 1].id)
      })
      optimizedIds.push(stops[stops.length - 1].id)

      return optimizedIds
    }

    return null
  } catch (error) {
    console.error('Google optimization error:', error)
    return null
  }
}

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

    const { routeId } = await request.json()

    if (!routeId) {
      return NextResponse.json({ error: 'Route ID required' }, { status: 400 })
    }

    // Fetch all stops for this route
    const { data: stops, error: stopsError } = await supabase
      .from('stops')
      .select('id, address, lat, lng, sort_order')
      .eq('route_id', routeId)
      .order('sort_order')

    if (stopsError || !stops || stops.length === 0) {
      return NextResponse.json({ error: 'No stops found' }, { status: 400 })
    }

    // Step 1: Geocode any stops that don't have lat/lng
    const stopsToGeocode = stops.filter(s => !s.lat || !s.lng)

    if (stopsToGeocode.length > 0) {
      for (const stop of stopsToGeocode) {
        const coords = await geocodeAddress(stop.address)
        if (coords) {
          await supabase
            .from('stops')
            .update({
              lat: coords.lat,
              lng: coords.lng,
              geocode_provider: 'google',
              geocoded_at: new Date().toISOString(),
            })
            .eq('id', stop.id)

          stop.lat = coords.lat
          stop.lng = coords.lng
        }
      }
    }

    // Filter stops that have coordinates
    const geocodedStops = stops.filter(s => s.lat && s.lng) as {
      id: string
      address: string
      lat: number
      lng: number
      sort_order: number
    }[]

    if (geocodedStops.length < 2) {
      return NextResponse.json({
        error: 'Not enough geocoded stops to optimize. Need at least 2 stops with valid addresses.',
      }, { status: 400 })
    }

    // Step 2: Try to optimize with Google Maps API
    let optimizedOrder: string[] | null = null
    let method = 'none'

    if (GOOGLE_MAPS_API_KEY) {
      optimizedOrder = await optimizeWithGoogle(geocodedStops)
      if (optimizedOrder) {
        method = 'google'
      }
    }

    // Step 3: Fallback to nearest neighbor if Google failed
    if (!optimizedOrder) {
      optimizedOrder = nearestNeighborOptimization(geocodedStops)
      method = 'nearest-neighbor'
    }

    // Step 4: Update sort_order for all stops
    const updates = optimizedOrder.map((stopId, index) => ({
      id: stopId,
      sort_order: index,
    }))

    for (const update of updates) {
      await supabase
        .from('stops')
        .update({ sort_order: update.sort_order })
        .eq('id', update.id)
    }

    // Update route's last_optimized_at
    await supabase
      .from('routes')
      .update({ last_optimized_at: new Date().toISOString() })
      .eq('id', routeId)

    const message = method === 'google'
      ? 'Route optimized successfully using Google Maps'
      : method === 'nearest-neighbor'
      ? 'Route optimized using nearest-neighbor algorithm (Google Maps API not configured or failed)'
      : 'Route optimized successfully'

    return NextResponse.json({ success: true, method, message })
  } catch (error: unknown) {
    console.error('Optimize route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to optimize route' },
      { status: 500 }
    )
  }
}
