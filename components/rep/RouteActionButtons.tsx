'use client'

import { Save, RotateCcw, Navigation } from 'lucide-react'

interface RouteActionButtonsProps {
  onSaveDefaultOrder?: () => void
  onResetDefaultOrder?: () => void
  onStartRoute?: () => void
  loading?: boolean
}

export default function RouteActionButtons({
  onSaveDefaultOrder,
  onResetDefaultOrder,
  onStartRoute,
  loading = false,
}: RouteActionButtonsProps) {
  const handleSave = () => {
    if (!onSaveDefaultOrder) {
      alert('Save default order - Coming soon!')
      return
    }
    onSaveDefaultOrder()
  }

  const handleReset = () => {
    if (!onResetDefaultOrder) {
      alert('Reset to default order - Coming soon!')
      return
    }
    onResetDefaultOrder()
  }

  return (
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 space-y-3">
      {/* Start Route - Full Width Primary */}
      {onStartRoute && (
        <button
          onClick={onStartRoute}
          disabled={loading}
          className="w-full ios-action-btn-primary flex items-center justify-center gap-3"
        >
          <Navigation className="w-6 h-6" />
          <span className="text-lg">Start Route in Google Maps</span>
        </button>
      )}

      {/* Save and Reset - Side by Side */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="ios-action-btn-outline flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span className="text-sm">Save Default</span>
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="ios-action-btn-outline flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset Order</span>
        </button>
      </div>
    </div>
  )
}
