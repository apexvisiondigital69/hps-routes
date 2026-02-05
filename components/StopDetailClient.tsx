'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Stop } from '@/types'
import Link from 'next/link'

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

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      const { error: updateError } = await supabase
        .from('stops')
        .update({
          phone: phone.trim() || null,
          email: email.trim() || null,
          notes: notes.trim() || null,
          status,
          completed_at: status !== 'pending' ? new Date().toISOString() : null,
        })
        .eq('id', stop.id)

      if (updateError) throw updateError

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
    await new Promise(resolve => setTimeout(resolve, 100))
    await handleSave()
  }

  const handleMarkSkipped = async () => {
    setStatus('skipped')
    await new Promise(resolve => setTimeout(resolve, 100))
    await handleSave()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/rep/today" className="text-blue-600 text-xl">
              ←
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Stop Detail</h1>
              <p className="text-sm text-gray-600 capitalize">{status}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Address */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p className="text-gray-900 mb-4">{stop.address}</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            Open Walking Route in Google Maps
          </a>
        </div>

        {/* Contact Information */}
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
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
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
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

        {/* Actions */}
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Actions</h2>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleMarkFinished}
            disabled={saving}
            className="btn btn-success w-full"
          >
            {saving && status === 'finished' ? 'Saving...' : 'Mark Finished'}
          </button>

          <button
            onClick={handleMarkSkipped}
            disabled={saving}
            className="btn btn-warning w-full"
          >
            {saving && status === 'skipped' ? 'Saving...' : 'Mark Skipped'}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-secondary w-full"
          >
            {saving && status === 'pending' ? 'Saving...' : 'Save & Return'}
          </button>
        </div>
      </div>
    </div>
  )
}
