'use client'

import { Save, RotateCcw } from 'lucide-react'

interface RouteActionButtonsProps {
  onSaveDefaultOrder?: () => void
  onResetDefaultOrder?: () => void
  loading?: boolean
}

export default function RouteActionButtons({
  onSaveDefaultOrder,
  onResetDefaultOrder,
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
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="ios-action-btn-primary flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Default</span>
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="ios-action-btn-secondary flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset Order</span>
        </button>
      </div>
    </div>
  )
}
