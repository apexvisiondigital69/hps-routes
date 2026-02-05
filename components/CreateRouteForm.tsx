'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/types'

export default function CreateRouteForm({ reps }: { reps: Pick<Profile, 'id' | 'full_name'>[] }) {
  const router = useRouter()
  const [repId, setRepId] = useState('')
  const [routeDate, setRouteDate] = useState('')
  const [title, setTitle] = useState('')
  const [addresses, setAddresses] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const addressList = addresses
        .split('\n')
        .map(a => a.trim())
        .filter(a => a.length > 0)

      if (addressList.length === 0) {
        throw new Error('Please add at least one address')
      }

      const response = await fetch('/api/admin/create-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repId,
          routeDate,
          title,
          addresses: addressList,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create route')
      }

      router.push(`/admin/routes/${data.routeId}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to create route')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Route Details</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="repId" className="block text-sm font-medium mb-1">
              Assign to Rep *
            </label>
            <select
              id="repId"
              value={repId}
              onChange={(e) => setRepId(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a rep...</option>
              {reps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.full_name || rep.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="routeDate" className="block text-sm font-medium mb-1">
              Route Date *
            </label>
            <input
              id="routeDate"
              type="date"
              value={routeDate}
              onChange={(e) => setRouteDate(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Route Title (optional)
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="e.g., Downtown Route A"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Addresses</h2>

        <div>
          <label htmlFor="addresses" className="block text-sm font-medium mb-1">
            Paste addresses (one per line) *
          </label>
          <textarea
            id="addresses"
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
            className="input"
            rows={10}
            placeholder="123 Main St, City, State ZIP&#10;456 Oak Ave, City, State ZIP&#10;789 Elm Rd, City, State ZIP"
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter each address on a new line. They will be added in the order you paste them.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Creating Route...' : 'Create Route'}
      </button>
    </form>
  )
}
