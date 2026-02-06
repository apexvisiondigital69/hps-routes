'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/types'
import { format } from 'date-fns'

interface EditRouteFormProps {
  route: {
    id: string
    rep_id: string
    route_date: string
    title: string | null
  }
  reps: Pick<Profile, 'id' | 'full_name'>[]
}

export default function EditRouteForm({ route, reps }: EditRouteFormProps) {
  const router = useRouter()
  const [repId, setRepId] = useState(route.rep_id)
  const [routeDate, setRouteDate] = useState(format(new Date(route.route_date), 'yyyy-MM-dd'))
  const [title, setTitle] = useState(route.title || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/update-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: route.id,
          repId,
          routeDate,
          title,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update route')
      }

      router.push(`/admin/routes/${route.id}`)
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to update route')
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

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.push(`/admin/routes/${route.id}`)}
          className="btn btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
