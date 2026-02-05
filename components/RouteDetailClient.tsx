'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Route, Stop } from '@/types'
import Papa from 'papaparse'

export default function RouteDetailClient({
  route,
  stops: initialStops,
}: {
  route: Route
  stops: Stop[]
}) {
  const router = useRouter()
  const [stops, setStops] = useState(initialStops)
  const [optimizing, setOptimizing] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const finished = stops.filter(s => s.status === 'finished').length
  const skipped = stops.filter(s => s.status === 'skipped').length
  const total = stops.length

  const handleExportCSV = () => {
    const csvData = stops.map(stop => ({
      address: stop.address,
      phone: stop.phone || '',
      email: stop.email || '',
      notes: stop.notes || '',
      status: stop.status,
      sort_order: stop.sort_order,
    }))

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `route-${route.id}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setError('')
    setSuccess('')

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const response = await fetch('/api/admin/import-stops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              routeId: route.id,
              stops: results.data,
            }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || 'Import failed')
          }

          setSuccess(`Imported ${data.count} stops successfully`)
          router.refresh()
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('Import failed')
          }
        } finally {
          setImporting(false)
        }
      },
      error: () => {
        setError('Failed to parse CSV file')
        setImporting(false)
      },
    })
  }

  const handleOptimizeRoute = async () => {
    setOptimizing(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/admin/optimize-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId: route.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Optimization failed')
      }

      setSuccess(data.message || 'Route optimized successfully')
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Optimization failed')
      }
    } finally {
      setOptimizing(false)
    }
  }

  const handleDeleteStop = async (stopId: string) => {
    if (!confirm('Are you sure you want to delete this stop?')) return

    try {
      const response = await fetch('/api/admin/delete-stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stopId }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete stop')
      }

      setStops(stops.filter(s => s.id !== stopId))
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to delete stop')
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Progress Card */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Progress</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{finished + skipped} / {total}</p>
            <p className="text-sm text-gray-600">
              {finished} finished, {skipped} skipped
            </p>
          </div>
          {route.last_optimized_at && (
            <p className="text-sm text-gray-500">
              Last optimized: {new Date(route.last_optimized_at).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Actions Card */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={handleOptimizeRoute}
            disabled={optimizing}
            className="btn btn-primary"
          >
            {optimizing ? 'Optimizing...' : 'Optimize Route'}
          </button>

          <button
            onClick={handleExportCSV}
            className="btn btn-secondary"
          >
            Export CSV
          </button>

          <label className="btn btn-secondary cursor-pointer text-center">
            {importing ? 'Importing...' : 'Import CSV'}
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              disabled={importing}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          CSV format: address (required), phone, email, notes, status, sort_order
        </p>
      </div>

      {/* Stops List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Stops ({total})</h2>
        {stops.length > 0 ? (
          <div className="space-y-2">
            {stops.map((stop, index) => (
              <div key={stop.id} className="flex card">
                <div className={`status-indicator status-${stop.status}`} />
                <div className="flex-1 pl-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">
                        #{index + 1} - {stop.address}
                      </p>
                      <div className="text-sm text-gray-600 space-y-1 mt-2">
                        {stop.phone && <p>Phone: {stop.phone}</p>}
                        {stop.email && <p>Email: {stop.email}</p>}
                        {stop.notes && <p>Notes: {stop.notes}</p>}
                      </div>
                      <p className="text-sm text-gray-500 mt-2 capitalize">
                        Status: {stop.status}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteStop(stop.id)}
                      className="text-red-600 hover:text-red-700 text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center text-gray-600">
            <p>No stops in this route.</p>
          </div>
        )}
      </div>
    </div>
  )
}
