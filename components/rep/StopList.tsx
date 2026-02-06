'use client'

import StopRow from './StopRow'
import type { StopUIData } from '@/types/rep'

interface StopListProps {
  stops: StopUIData[]
}

export default function StopList({ stops }: StopListProps) {
  if (stops.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="card text-center text-gray-600">
          <p>No stops in this route.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Stops ({stops.length})
      </h2>
      <div className="space-y-0">
        {stops.map((stop) => (
          <StopRow key={stop.id} stop={stop} />
        ))}
      </div>
    </div>
  )
}
