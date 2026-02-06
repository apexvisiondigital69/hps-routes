'use client'

import { memo } from 'react'
import CircularProgress from './CircularProgress'
import { MapPin } from 'lucide-react'

interface RouteSummaryCardProps {
  repName: string
  completedCount: number
  totalCount: number
  remainingCount: number
  onOpen: () => void
}

function RouteSummaryCard({
  repName,
  completedCount,
  totalCount,
  remainingCount,
  onOpen,
}: RouteSummaryCardProps) {
  return (
    <button
      onClick={onOpen}
      className="w-full card hover:shadow-md transition-shadow duration-200 active:scale-[0.99]"
    >
      <div className="flex items-center gap-4">
        {/* Left: Circular Progress */}
        <div className="shrink-0">
          <CircularProgress completed={completedCount} total={totalCount} />
        </div>

        {/* Right: Details */}
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{repName}</h3>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{totalCount} total stop{totalCount !== 1 ? 's' : ''}</span>
            </div>

            <div className="text-sm font-medium text-[#43A047]">
              {remainingCount} stop{remainingCount !== 1 ? 's' : ''} remaining
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default memo(RouteSummaryCard)
