import RepAppShell from '@/components/rep/RepAppShell'
import TopAppBar from '@/components/rep/TopAppBar'
import { format } from 'date-fns'

export default function Loading() {
  return (
    <RepAppShell>
      <TopAppBar
        title="Today's Route"
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

      {/* Loading skeleton */}
      <div className="p-4">
        <div className="card animate-pulse">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-20 h-20 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-40" />
              <div className="h-4 bg-gray-200 rounded w-36" />
            </div>
          </div>
        </div>
      </div>
    </RepAppShell>
  )
}
