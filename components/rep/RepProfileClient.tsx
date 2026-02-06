'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import RepAppShell from './RepAppShell'
import TopAppBar from './TopAppBar'
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react'
import { format } from 'date-fns'

interface RepProfileClientProps {
  email: string
  fullName: string
  role: string
  createdAt: string
}

export default function RepProfileClient({
  email,
  fullName,
  role,
  createdAt,
}: RepProfileClientProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out?')) {
      return
    }

    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <RepAppShell>
      <TopAppBar
        title="Profile"
        subtitle="Account settings"
      />

      <div className="p-4 space-y-4">
        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#1E88E5] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-sm text-gray-600 capitalize">{role}</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-gray-900">{email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{role}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                <p className="text-sm font-medium text-gray-900">
                  {format(new Date(createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="w-full ios-action-btn border-2 border-red-500 text-red-600 hover:bg-red-50 active:bg-red-100 flex items-center justify-center gap-3"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-lg">Sign Out</span>
        </button>

        {/* App Info */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>HPS Routes v1.0</p>
          <p className="mt-1">Door-to-Door Sales Route Management</p>
        </div>
      </div>
    </RepAppShell>
  )
}
