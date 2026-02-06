'use client'

import Link from 'next/link'
import type { StopUIData } from '@/types/rep'
import { Clock } from 'lucide-react'

interface StopRowProps {
  stop: StopUIData
}

export default function StopRow({ stop }: StopRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished':
        return 'bg-finished'
      case 'skipped':
        return 'bg-skipped'
      case 'pending':
      default:
        return 'bg-pending'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'finished':
        return 'bg-finished'
      case 'skipped':
        return 'bg-skipped'
      case 'pending':
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <Link href={`/rep/stop/${stop.id}`}>
      <div className="ios-stop-row p-4 pl-14 mb-2">
        {/* Left number badge with status color */}
        <div className={`ios-stop-number-badge ${getStatusBadgeColor(stop.status)}`}>
          {stop.stopNumber}
        </div>

        <div className="flex items-start justify-between gap-3">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{stop.primaryLabel}</p>
            <p className="text-sm text-gray-600 mt-0.5 truncate">{stop.secondaryLabel}</p>

            {/* Tag if present */}
            {stop.tag && (
              <div className="mt-2">
                <span className={`ios-tag-${stop.tag}`}>
                  {stop.tag}
                </span>
              </div>
            )}
          </div>

          {/* Right metadata */}
          <div className="text-right shrink-0">
            {stop.etaLabel && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <Clock className="w-3 h-3" />
                <span>{stop.etaLabel}</span>
              </div>
            )}
            {stop.metaRight && (
              <p className="text-xs font-medium text-gray-600">{stop.metaRight}</p>
            )}
          </div>
        </div>

        {/* Status indicator line at bottom */}
        <div className={`absolute bottom-0 left-10 right-0 h-0.5 ${getStatusColor(stop.status)}`} />
      </div>
    </Link>
  )
}
