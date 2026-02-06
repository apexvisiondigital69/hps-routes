'use client'

import { Navigation, Phone } from 'lucide-react'

interface BottomDirectionsBarProps {
  nextStopAddress: string | null
  nextStopId: string | null
  onNavigate?: () => void
  onQuickAction?: () => void
}

export default function BottomDirectionsBar({
  nextStopAddress,
  nextStopId,
  onNavigate,
  onQuickAction,
}: BottomDirectionsBarProps) {
  if (!nextStopAddress || !nextStopId) {
    return null
  }

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate()
    } else {
      // Default: Open Google Maps
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(nextStopAddress)}&travelmode=walking`
      window.open(url, '_blank')
    }
  }

  const handleQuickAction = () => {
    if (onQuickAction) {
      onQuickAction()
    }
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-[#1E88E5] text-white shadow-lg z-20">
      <div className="max-w-[520px] mx-auto">
        <button
          onClick={handleNavigate}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#1976D2] transition-colors active:bg-[#1565C0]"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Navigation className="w-5 h-5 shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-sm font-semibold">Directions to Next Stop</p>
              <p className="text-xs text-white/80 truncate">{nextStopAddress}</p>
            </div>
          </div>

          {onQuickAction && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction()
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2"
            >
              <Phone className="w-5 h-5" />
            </button>
          )}
        </button>
      </div>
    </div>
  )
}
