'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays, subDays } from 'date-fns'
import RepAppShell from './RepAppShell'
import TopAppBar from './TopAppBar'
import DayStrip from './DayStrip'
import { Navigation, List } from 'lucide-react'
import type { DayInfo } from '@/types/rep'

interface MapStop {
  id: string
  address: string
  status: string
  stopNumber: number
  notes: string | null
}

interface RepMapClientProps {
  date: string
  repName: string
  stops: MapStop[]
}

export default function RepMapClient({ date, repName, stops }: RepMapClientProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(date)
  const [mapUrl, setMapUrl] = useState('')

  // Get Google Maps API key from env
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  // Generate 7 days (3 before, today, 3 after)
  const generateDays = (): DayInfo[] => {
    const today = new Date()
    const days: DayInfo[] = []

    for (let i = -3; i <= 3; i++) {
      const date = i < 0 ? subDays(today, Math.abs(i)) : addDays(today, i)
      const dateStr = format(date, 'yyyy-MM-dd')

      days.push({
        date: dateStr,
        dayName: format(date, 'EEE'),
        dayNumber: parseInt(format(date, 'd')),
        isSelected: dateStr === selectedDate,
        isToday: dateStr === format(today, 'yyyy-MM-dd'),
      })
    }

    return days
  }

  const handleSelectDay = (date: string) => {
    setSelectedDate(date)
    router.push(`/rep/map?date=${date}`)
  }

  const handleOpenInGoogleMaps = () => {
    const pendingStops = stops.filter(s => s.status === 'pending')

    if (pendingStops.length === 0) {
      alert('No pending stops to navigate to')
      return
    }

    if (pendingStops.length === 1) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pendingStops[0].address)}&travelmode=walking`
      window.open(url, '_blank')
      return
    }

    const origin = encodeURIComponent(pendingStops[0].address)
    const destination = encodeURIComponent(pendingStops[pendingStops.length - 1].address)
    const waypoints = pendingStops.slice(1, -1).map(s => encodeURIComponent(s.address)).join('|')

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`
    window.open(url, '_blank')
  }

  const handleViewList = () => {
    router.push(`/rep/route/${selectedDate}`)
  }

  // Build Google Maps Embed API URL
  useEffect(() => {
    if (stops.length === 0) {
      setMapUrl('')
      return
    }

    const pendingStops = stops.filter(s => s.status === 'pending')

    if (pendingStops.length === 0) {
      // Show all stops on map view mode
      const center = encodeURIComponent(stops[0].address)
      const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${center}&zoom=13`
      setMapUrl(url)
      return
    }

    if (pendingStops.length === 1) {
      // Single stop - use place mode
      const destination = encodeURIComponent(pendingStops[0].address)
      const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${destination}&zoom=15`
      setMapUrl(url)
      return
    }

    // Multiple stops - use directions mode
    const origin = encodeURIComponent(pendingStops[0].address)
    const destination = encodeURIComponent(pendingStops[pendingStops.length - 1].address)

    // Google Maps Embed API has waypoint limits, so only include first few
    const waypointsToInclude = pendingStops.slice(1, Math.min(pendingStops.length - 1, 10))
    const waypoints = waypointsToInclude.map(s => encodeURIComponent(s.address)).join('|')

    const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&mode=walking`
    setMapUrl(url)
  }, [stops, apiKey])

  return (
    <RepAppShell>
      <TopAppBar
        title="Route Map"
        subtitle={format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
      />

      <DayStrip days={generateDays()} onSelectDay={handleSelectDay} />

      {/* Map Container */}
      <div className="flex-1 relative">
        {stops.length > 0 && mapUrl ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
          />
        ) : (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center text-gray-600">
              {stops.length === 0 ? (
                <p>No stops to display on map</p>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      {stops.length > 0 && (
        <div className="fixed bottom-24 right-4 z-20 flex flex-col gap-3">
          <button
            onClick={handleOpenInGoogleMaps}
            className="ios-action-btn-primary flex items-center gap-2 shadow-lg"
            title="Open in Google Maps"
          >
            <Navigation className="w-5 h-5" />
            <span>Navigate</span>
          </button>

          <button
            onClick={handleViewList}
            className="ios-action-btn-secondary flex items-center gap-2 shadow-lg"
            title="View stop list"
          >
            <List className="w-5 h-5" />
            <span>List View</span>
          </button>
        </div>
      )}
    </RepAppShell>
  )
}
