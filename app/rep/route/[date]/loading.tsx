import RepAppShell from '@/components/rep/RepAppShell'
import TopAppBar from '@/components/rep/TopAppBar'

export default function Loading() {
  return (
    <RepAppShell>
      <TopAppBar
        title="Route Details"
        subtitle="Loading..."
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

      {/* Loading skeleton for progress header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-6 animate-pulse">
          <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>

      {/* Loading skeleton for stop list */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ios-stop-row p-4 pl-14 animate-pulse">
              <div className="ios-stop-number-badge bg-gray-200">
                <span className="invisible">{i}</span>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </RepAppShell>
  )
}
