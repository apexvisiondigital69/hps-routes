import type { StopStatus } from './index'

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error'

export interface DayInfo {
  date: string // ISO date (YYYY-MM-DD)
  dayName: string // 'Sun', 'Mon', etc.
  dayNumber: number // 1-31
  isSelected: boolean
  isToday: boolean
}

export interface StopUIData {
  id: string
  stopNumber: number
  status: StopStatus
  primaryLabel: string // address or lead name
  secondaryLabel: string // area/street
  tag?: 'custom' | 'priority' | 'follow-up'
  etaLabel?: string
  metaRight?: string // distance or duration
}

export interface RouteUIData {
  dateISO: string
  repName: string
  completedCount: number
  totalCount: number
  distanceLabel?: string
  durationLabel?: string
  stops: StopUIData[]
}

export interface TopAppBarProps {
  title: string
  subtitle?: string
  leftAction?: {
    icon: React.ReactNode
    onClick: () => void
    label: string
  }
  rightActions?: {
    icon: React.ReactNode
    onClick: () => void
    label: string
  }[]
}
