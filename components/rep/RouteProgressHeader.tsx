'use client'

import CircularProgress from './CircularProgress'

interface RouteProgressHeaderProps {
  completed: number
  total: number
}

export default function RouteProgressHeader({ completed, total }: RouteProgressHeaderProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center gap-4">
        {/* Left: Circular progress */}
        <div className="shrink-0">
          <CircularProgress completed={completed} total={total} size={64} strokeWidth={6} />
        </div>

        {/* Right: Horizontal progress bar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Route Completion</span>
            <span className="text-sm font-bold text-[#43A047]">{percentage}%</span>
          </div>
          <div className="ios-progress-bar">
            <div
              className="ios-progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {completed} of {total} stops completed
          </p>
        </div>
      </div>
    </div>
  )
}
