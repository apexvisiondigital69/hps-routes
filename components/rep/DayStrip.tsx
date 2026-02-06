'use client'

import type { DayInfo } from '@/types/rep'

interface DayStripProps {
  days: DayInfo[]
  onSelectDay: (date: string) => void
}

export default function DayStrip({ days, onSelectDay }: DayStripProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
      <div className="flex gap-2 justify-between min-w-max">
        {days.map((day) => (
          <button
            key={day.date}
            onClick={() => onSelectDay(day.date)}
            className={`flex flex-col items-center min-w-[48px] ${
              day.isSelected
                ? 'ios-day-pill-selected'
                : day.isToday && !day.isSelected
                  ? 'ios-day-pill-today'
                  : 'ios-day-pill-unselected'
            }`}
          >
            <span className="text-xs mb-1">{day.dayName}</span>
            <span className="text-lg font-bold">{day.dayNumber}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
