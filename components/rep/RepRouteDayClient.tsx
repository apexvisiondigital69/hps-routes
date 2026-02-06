'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import RepAppShell from './RepAppShell'
import TopAppBar from './TopAppBar'
import RouteProgressHeader from './RouteProgressHeader'
import RouteActionButtons from './RouteActionButtons'
import StopList from './StopList'
import BottomDirectionsBar from './BottomDirectionsBar'
import { ArrowLeft, Clipboard, Plus } from 'lucide-react'
import type { StopUIData } from '@/types/rep'

interface RepRouteDayClientProps {
  date: string
  repName: string
  completedCount: number
  totalCount: number
  stops: StopUIData[]
  nextStopAddress: string | null
  nextStopId: string | null
  pendingStops: { id: string; address: string }[]
}

export default function RepRouteDayClient({
  date,
  repName,
  completedCount,
  totalCount,
  stops,
  nextStopAddress,
  nextStopId,
  pendingStops,
}: RepRouteDayClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/rep/today')
  }

  const handleStartRoute = () => {
    if (pendingStops.length === 0) {
      alert('No pending stops to navigate to')
      return
    }

    // Build Google Maps URL with all pending stops
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

  return (
    <RepAppShell>
      <TopAppBar
        title={repName}
        subtitle={format(new Date(date), 'EEEE, MMMM d, yyyy')}
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: handleBack,
          label: 'Back',
        }}
        rightActions={[
          {
            icon: <Clipboard className="w-5 h-5" />,
            onClick: () => {
              // Clipboard/notes action - placeholder
              alert('Notes - Coming soon!')
            },
            label: 'Notes',
          },
          {
            icon: <Plus className="w-5 h-5" />,
            onClick: () => {
              // Add lead/stop action - placeholder
              alert('Add lead - Coming soon!')
            },
            label: 'Add',
          },
        ]}
      />

      <RouteProgressHeader completed={completedCount} total={totalCount} />

      <RouteActionButtons onStartRoute={pendingStops.length > 0 ? handleStartRoute : undefined} />

      <StopList stops={stops} />

      {/* Add padding at bottom for directions bar */}
      <div className="h-16" />

      <BottomDirectionsBar
        nextStopAddress={nextStopAddress}
        nextStopId={nextStopId}
      />
    </RepAppShell>
  )
}
