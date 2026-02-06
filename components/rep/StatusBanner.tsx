'use client'

import { CheckCircle, RefreshCw, WifiOff, AlertCircle } from 'lucide-react'
import type { SyncStatus } from '@/types/rep'

export default function StatusBanner({ status }: { status: SyncStatus }) {
  const config = {
    synced: {
      icon: CheckCircle,
      text: 'All changes are synced',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
    },
    syncing: {
      icon: RefreshCw,
      text: 'Syncing changes...',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
    },
    offline: {
      icon: WifiOff,
      text: 'You are offline',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      iconColor: 'text-gray-600',
    },
    error: {
      icon: AlertCircle,
      text: 'Sync failed - please try again',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-600',
    },
  }

  const { icon: Icon, text, bgColor, textColor, iconColor } = config[status]

  return (
    <div className={`${bgColor} px-4 py-2 flex items-center gap-2`}>
      <Icon className={`w-4 h-4 ${iconColor} ${status === 'syncing' ? 'animate-spin' : ''}`} />
      <span className={`text-sm ${textColor}`}>{text}</span>
    </div>
  )
}
