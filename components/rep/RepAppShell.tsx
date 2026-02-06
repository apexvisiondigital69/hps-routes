'use client'

import BottomNav from './BottomNav'

export default function RepAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content area with bottom nav spacing */}
      <div className="flex-1 pb-20">
        {/* Center content on desktop, full width on mobile */}
        <div className="max-w-[520px] mx-auto bg-white min-h-screen shadow-sm">
          {children}
        </div>
      </div>

      {/* Fixed bottom navigation */}
      <BottomNav />
    </div>
  )
}
