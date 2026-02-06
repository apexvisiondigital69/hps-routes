'use client'

import { User, Map, Route as RouteIcon, List, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const isRouteActive = pathname?.startsWith('/rep/today') || pathname?.startsWith('/rep/route')

  const tabs = [
    {
      label: 'Profile',
      icon: User,
      href: '#',
      active: false,
      disabled: true
    },
    {
      label: 'Map',
      icon: Map,
      href: '#',
      active: false,
      disabled: true
    },
    {
      label: 'Route',
      icon: RouteIcon,
      href: '/rep/today',
      active: isRouteActive,
      disabled: false
    },
    {
      label: 'List',
      icon: List,
      href: '#',
      active: false,
      disabled: true
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '#',
      active: false,
      disabled: true
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="max-w-[520px] mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const content = (
              <div className="flex flex-col items-center py-2 px-3 min-w-[60px]">
                <Icon
                  className={`w-6 h-6 mb-1 ${
                    tab.active
                      ? 'text-[#1E88E5]'
                      : tab.disabled
                        ? 'text-gray-300'
                        : 'text-gray-500'
                  }`}
                />
                <span
                  className={`text-xs ${
                    tab.active
                      ? 'text-[#1E88E5] font-medium'
                      : tab.disabled
                        ? 'text-gray-300'
                        : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            )

            if (tab.disabled) {
              return (
                <div key={tab.label} className="cursor-not-allowed opacity-50">
                  {content}
                </div>
              )
            }

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className="hover:bg-gray-50 transition-colors rounded-lg"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
