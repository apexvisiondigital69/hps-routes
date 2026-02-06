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
}

export default function RepRouteDayClient({
  date,
  repName,
  completedCount,
  totalCount,
  stops,
  nextStopAddress,
  nextStopId,
}: RepRouteDayClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/rep/today')
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

      <RouteActionButtons />

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
