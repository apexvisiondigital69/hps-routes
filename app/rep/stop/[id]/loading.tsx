import RepAppShell from '@/components/rep/RepAppShell'
import TopAppBar from '@/components/rep/TopAppBar'
import { ArrowLeft } from 'lucide-react'

export default function Loading() {
  return (
    <RepAppShell>
      <TopAppBar
        title="Stop Details"
        subtitle="Loading..."
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => {},
          label: 'Back',
        }}
      />

      <div className="px-4 py-6 space-y-6 animate-pulse">
        {/* Address skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Status buttons skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="h-3 bg-gray-200 rounded w-24 mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>

        {/* Quick actions skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="h-3 bg-gray-200 rounded w-24 mb-4" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Form skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
          <div className="h-3 bg-gray-200 rounded w-32 mb-4" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-24 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </RepAppShell>
  )
}
