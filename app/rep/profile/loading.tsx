import RepAppShell from '@/components/rep/RepAppShell'
import TopAppBar from '@/components/rep/TopAppBar'

export default function Loading() {
  return (
    <RepAppShell>
      <TopAppBar
        title="Profile"
        subtitle="Account settings"
      />

      <div className="p-4 space-y-4 animate-pulse">
        {/* Profile card skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-12" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign out button skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl w-full" />

        {/* App info skeleton */}
        <div className="text-center pt-4 space-y-1">
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-48 mx-auto" />
        </div>
      </div>
    </RepAppShell>
  )
}
