'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Stop } from '@/types'
import RepAppShell from './rep/RepAppShell'
import TopAppBar from './rep/TopAppBar'
import { ArrowLeft, Navigation, Phone, MessageSquare, CheckCircle, XCircle, Save } from 'lucide-react'

export default function StopDetailClient({ stop }: { stop: Stop }) {
  const router = useRouter()
  const supabase = createClient()
  const [phone, setPhone] = useState(stop.phone || '')
  const [email, setEmail] = useState(stop.email || '')
  const [notes, setNotes] = useState(stop.notes || '')
  const [status, setStatus] = useState(stop.status)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.address)}&travelmode=walking`

  const handleSave = async (newStatus: string) => {
    setSaving(true)
    setError('')

    try {
      const { error: updateError } = await (supabase
        .from('stops') as any)
        .update({
          phone: phone.trim() || null,
          email: email.trim() || null,
          notes: notes.trim() || null,
          status: newStatus,
          completed_at: newStatus !== 'pending' ? new Date().toISOString() : null,
        })
        .eq('id', stop.id)

      if (updateError) {
        throw updateError
      }

      router.push('/rep/today')
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleMarkFinished = async () => {
    setStatus('finished')
    await handleSave('finished')
  }

  const handleMarkSkipped = async () => {
    setStatus('skipped')
    await handleSave('skipped')
  }

  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      alert('No phone number available')
    }
  }

  const handleMessage = () => {
    if (phone) {
      window.location.href = `sms:${phone}`
    } else {
      alert('No phone number available')
    }
  }

  const handleNavigate = () => {
    window.open(googleMapsUrl, '_blank')
  }

  const handleBack = () => {
    router.push('/rep/today')
  }

  return (
    <RepAppShell>
      <TopAppBar
        title="Stop Details"
        subtitle={`Status: ${status}`}
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: handleBack,
          label: 'Back',
        }}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Address Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Address
          </h2>
          <p className="text-lg font-semibold text-gray-900">{stop.address}</p>
        </div>

        {/* Big Status Buttons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Update Status
          </h2>

          <div className="space-y-3">
            <button
              onClick={handleMarkFinished}
              disabled={saving}
              className="w-full ios-action-btn-primary flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Mark Finished</span>
            </button>

            <button
              onClick={handleMarkSkipped}
              disabled={saving}
              className="ios-action-btn border-2 border-orange-500 text-orange-600 hover:bg-orange-50 active:bg-orange-100 flex items-center justify-center gap-3"
            >
              <XCircle className="w-6 h-6" />
              <span className="text-lg">Mark Skipped</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleCall}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-[#1E88E5] hover:bg-blue-50 transition-all active:scale-95"
            >
              <Phone className="w-6 h-6 text-[#1E88E5]" />
              <span className="text-xs font-medium text-gray-700">Call</span>
            </button>

            <button
              onClick={handleMessage}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-[#1E88E5] hover:bg-blue-50 transition-all active:scale-95"
            >
              <MessageSquare className="w-6 h-6 text-[#1E88E5]" />
              <span className="text-xs font-medium text-gray-700">Message</span>
            </button>

            <button
              onClick={handleNavigate}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-[#1E88E5] hover:bg-blue-50 transition-all active:scale-95"
            >
              <Navigation className="w-6 h-6 text-[#1E88E5]" />
              <span className="text-xs font-medium text-gray-700">Navigate</span>
            </button>
          </div>
        </div>

        {/* Contact Information & Notes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Contact & Notes
          </h2>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              placeholder="(optional)"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="(optional)"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input"
              rows={4}
              placeholder="Add any notes about this stop..."
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Save Changes Button */}
        <button
          onClick={() => handleSave(status)}
          disabled={saving}
          className="w-full ios-action-btn-outline flex items-center justify-center gap-3"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Changes & Return'}</span>
        </button>

        {/* Bottom padding for nav */}
        <div className="h-4" />
      </div>
    </RepAppShell>
  )
}
