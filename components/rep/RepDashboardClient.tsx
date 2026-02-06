'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays, subDays } from 'date-fns'
import RepAppShell from './RepAppShell'
import TopAppBar from './TopAppBar'
import DayStrip from './DayStrip'
import StatusBanner from './StatusBanner'
import RouteSummaryCard from './RouteSummaryCard'
import { Calendar, Plus } from 'lucide-react'
import type { DayInfo } from '@/types/rep'

interface RepDashboardClientProps {
  initialDate: string
  repName: string
  completedCount: number
  totalCount: number
  hasStops: boolean
}

export default function RepDashboardClient({
  initialDate,
  repName,
  completedCount,
  totalCount,
  hasStops,
}: RepDashboardClientProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(initialDate)

  // Generate 7 days (3 before, today, 3 after)
  const generateDays = (): DayInfo[] => {
    const today = new Date()
    const days: DayInfo[] = []

    for (let i = -3; i <= 3; i++) {
      const date = i < 0 ? subDays(today, Math.abs(i)) : addDays(today, i)
      const dateStr = format(date, 'yyyy-MM-dd')

      days.push({
        date: dateStr,
        dayName: format(date, 'EEE'),
        dayNumber: parseInt(format(date, 'd')),
        isSelected: dateStr === selectedDate,
        isToday: dateStr === format(today, 'yyyy-MM-dd'),
      })
    }

    return days
  }

  const handleSelectDay = (date: string) => {
    setSelectedDate(date)
    // Navigate to the new date
    router.push(`/rep/today?date=${date}`)
  }

  const handleOpenRoute = () => {
    router.push(`/rep/route/${selectedDate}`)
  }

  const remainingCount = totalCount - completedCount

  return (
    <RepAppShell>
      <TopAppBar
        title="Route Dashboard"
        subtitle={format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
        rightActions={[
          {
            icon: <Calendar className="w-5 h-5" />,
            onClick: () => {
              // Calendar action - placeholder for now
            },
            label: 'Calendar',
          },
          {
            icon: <Plus className="w-5 h-5" />,
            onClick: () => {
              // Add action - placeholder for now
            },
            label: 'Add',
          },
        ]}
      />

      <DayStrip days={generateDays()} onSelectDay={handleSelectDay} />

      <StatusBanner status="synced" />

      <div className="p-4 space-y-4">
        {hasStops ? (
          <RouteSummaryCard
            repName={repName}
            completedCount={completedCount}
            totalCount={totalCount}
            distanceLabel="Estimated distance: calculating..."
            durationLabel="Estimated time: calculating..."
            remainingCount={remainingCount}
            onOpen={handleOpenRoute}
          />
        ) : (
          <div className="card text-center text-gray-600">
            <p>No routes assigned for this date.</p>
          </div>
        )}
      </div>
    </RepAppShell>
  )
}
