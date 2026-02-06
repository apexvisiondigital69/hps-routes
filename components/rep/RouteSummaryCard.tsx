'use client'

import CircularProgress from './CircularProgress'
import { MapPin, Clock } from 'lucide-react'

interface RouteSummaryCardProps {
  repName: string
  completedCount: number
  totalCount: number
  distanceLabel?: string
  durationLabel?: string
  remainingCount: number
  onOpen: () => void
}

export default function RouteSummaryCard({
  repName,
  completedCount,
  totalCount,
  distanceLabel,
  durationLabel,
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
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{repName}</h3>

          <div className="space-y-1.5">
            {distanceLabel && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{distanceLabel}</span>
              </div>
            )}

            {durationLabel && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{durationLabel}</span>
              </div>
            )}

            <div className="text-sm font-medium text-gray-700">
              {remainingCount} stop{remainingCount !== 1 ? 's' : ''} remaining
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
