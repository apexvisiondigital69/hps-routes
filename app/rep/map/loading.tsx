import RepAppShell from '@/components/rep/RepAppShell'
import TopAppBar from '@/components/rep/TopAppBar'
import { format } from 'date-fns'

export default function Loading() {
  return (
    <RepAppShell>
      <TopAppBar
        title="Route Map"
        subtitle={format(new Date(), 'EEEE, MMMM d, yyyy')}
      />

      {/* Day strip skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 justify-between animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex flex-col items-center min-w-[48px] px-3 py-2">
              <div className="h-3 w-8 bg-gray-200 rounded mb-1" />
              <div className="h-5 w-6 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Map loading skeleton */}
      <div className="flex-1 relative bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-[#1E88E5] rounded-full animate-spin mx-auto mb-4" />
            <p>Loading map...</p>
          </div>
        </div>
      </div>
    </RepAppShell>
  )
}
