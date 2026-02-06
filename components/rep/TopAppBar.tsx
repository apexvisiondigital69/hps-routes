'use client'

import Image from 'next/image'
import type { TopAppBarProps } from '@/types/rep'

export default function TopAppBar({ title, subtitle, leftAction, rightActions }: TopAppBarProps) {
  return (
    <div className="bg-[#1E88E5] text-white sticky top-0 z-20 shadow-md">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left action or logo */}
        <div className="w-10">
          {leftAction ? (
            <button
              onClick={leftAction.onClick}
              className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={leftAction.label}
            >
              {leftAction.icon}
            </button>
          ) : (
            <Image
              src="/android-chrome-512x512.png"
              alt="HPS Routes Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          )}
        </div>

        {/* Center: Title and subtitle */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-white/80 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 w-10 justify-end">
          {rightActions?.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
